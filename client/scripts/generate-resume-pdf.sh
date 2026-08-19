#!/usr/bin/env bash
#
# Regenerates public/resume/Sanapathi_Sai_Kumar_Resume.pdf from the /resume page.
#
# The PDF is a build artifact of that page, not a separately maintained
# document: /resume renders from the same data files as the rest of the site
# (experience.ts, projects.ts, skills.ts, hackathons.ts, certifications.ts), so
# the page is always current and the PDF is a snapshot of it. Re-run this after
# changing any of that data, or the download will serve a stale résumé.
#
# Usage:  npm run resume:pdf        (from client/)
#
set -euo pipefail

cd "$(dirname "$0")/.."

OUT="public/resume/Sanapathi_Sai_Kumar_Resume.pdf"
PORT="${PORT:-3210}"          # uncommon port so it can't collide with a dev server
URL="http://localhost:${PORT}/resume"

# Locate Chrome. Add your path here if none of these match.
CHROME=""
for candidate in \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "$(command -v google-chrome || true)" \
  "$(command -v chromium || true)"
do
  if [ -n "$candidate" ] && [ -x "$candidate" ]; then CHROME="$candidate"; break; fi
done
if [ -z "$CHROME" ]; then
  echo "Could not find Chrome. Set CHROME=/path/to/chrome and re-run." >&2
  exit 1
fi

# A production build is what actually ships, so snapshot that rather than dev.
#
# .next is wiped first because a dev server writes its own artifacts into the
# same directory. Building over them leaves the prod HTML pointing at CSS chunks
# that no longer exist, and Chrome then prints a completely unstyled résumé —
# five pages of Times New Roman with the site navbar and "Skip to content" in
# it. That failure is silent: the script still reports success and overwrites the
# real PDF. Starting clean removes the race entirely.
echo "==> Building (clean)"
rm -rf .next
npm run build >/dev/null

# A server left over from an earlier run (or a stray dev server) still holding
# this port is poisonous: `next start` fails to bind, every request below is
# answered by the stale process, and it serves HTML referencing CSS chunks that
# the rebuild just deleted. Detect it rather than printing a broken résumé.
if [ "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:${PORT}/" || true)" != "000" ]; then
  echo "Aborting: something is already serving on port ${PORT}." >&2
  echo "Stop it first, then re-run. On Windows:" >&2
  echo "  powershell -c \"Get-Process node | Stop-Process -Force\"" >&2
  echo "Or pick another port:  PORT=3211 npm run resume:pdf" >&2
  exit 1
fi

echo "==> Serving on :${PORT}"
npx next start --port "$PORT" >/tmp/resume-pdf-server.log 2>&1 &
SERVER_PID=$!

# Always take the server down, even if the print step fails.
#
# `kill $SERVER_PID` alone is not enough on Windows: npx spawns node as a child,
# so killing the wrapper orphans the server, it keeps the port, and the next run
# aborts on the port pre-flight above. taskkill //T takes the whole tree.
cleanup() {
  if command -v taskkill >/dev/null 2>&1; then
    taskkill //PID "$SERVER_PID" //T //F >/dev/null 2>&1 || true
  fi
  kill "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT

for _ in $(seq 1 60); do
  if [ "$(curl -s -o /dev/null -w '%{http_code}' "$URL" || true)" = "200" ]; then break; fi
  sleep 1
done

# Belt-and-braces for the same failure: confirm the page's stylesheet actually
# resolves before printing. An unstyled résumé is worse than no résumé, and it is
# not obvious from the output that anything went wrong.
CSS_HREF="$(curl -s "$URL" | grep -o '/_next/static/css/[^"]*\.css' | head -1)"
if [ -z "$CSS_HREF" ]; then
  echo "Aborting: no stylesheet referenced by $URL — the résumé would print unstyled." >&2
  exit 1
fi
if [ "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:${PORT}${CSS_HREF}")" != "200" ]; then
  echo "Aborting: stylesheet ${CSS_HREF} did not resolve — the résumé would print unstyled." >&2
  exit 1
fi
echo "==> Stylesheet OK (${CSS_HREF})"

mkdir -p "$(dirname "$OUT")"

# Chrome on Windows is a native binary: it cannot resolve a relative or
# MSYS-style (/c/...) path, and silently writes nothing when given one. Hand it
# an absolute drive-letter path instead.
PRINT_TARGET="$OUT"
case "$CHROME" in
  *.exe)
    if command -v cygpath >/dev/null 2>&1; then
      PRINT_TARGET="$(cygpath -m "$(pwd)")/$OUT"
    else
      PRINT_TARGET="$(pwd -W 2>/dev/null || pwd)/$OUT"
    fi
    ;;
  *) PRINT_TARGET="$(pwd)/$OUT" ;;
esac

echo "==> Printing to ${PRINT_TARGET}"
# --no-pdf-header-footer strips Chrome's own URL/date furniture, which otherwise
# stamps "localhost:3210" across the top of every page.
"$CHROME" \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=20000 \
  --print-to-pdf="$PRINT_TARGET" \
  "$URL" 2>/dev/null

if [ ! -s "$OUT" ]; then
  echo "Print produced no output. Server log:" >&2
  cat /tmp/resume-pdf-server.log >&2
  exit 1
fi

echo "==> Done: $OUT ($(wc -c <"$OUT") bytes)"
