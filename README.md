# Portfolio — Sanapathi Sai Kumar

Personal portfolio for an Associate Software Engineer, built on the Next.js 15 App Router with live GitHub repository data.

**Repository:** https://github.com/SANAPATHISAIKUMAR/Portfolio-Webpage

## Structure

| Path      | What it is                                                            |
| --------- | --------------------------------------------------------------------- |
| `client/` | The portfolio itself — Next.js 15, React 19, TypeScript, Tailwind v4   |
| `server/` | A standalone Express + Mongoose API. **Not consumed by the frontend.** |

The site is self-contained: `client/` needs no backend, no database, and no environment variables to build or run.

## Quick start

```bash
cd client
npm install
npm run dev          # http://localhost:3000
```

| Script              | Purpose                    |
| ------------------- | -------------------------- |
| `npm run dev`       | Development server         |
| `npm run build`     | Production build           |
| `npm run start`     | Serve the production build |
| `npm run typecheck` | `tsc --noEmit`             |
| `npm run lint`      | ESLint                     |

## Configuration

Every variable is optional — copy `client/.env.example` to `client/.env.local` and fill in what you need.

| Variable               | Effect if unset                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Falls back to Vercel's production URL, then `localhost`. Drives canonicals + sitemap. |
| `GITHUB_TOKEN`         | Live GitHub stats use the unauthenticated 60 req/hour limit instead of 5,000.         |
| `WEB3FORMS_ACCESS_KEY` | The contact form opens the visitor's mail client instead of sending server-side.      |

## Live GitHub integration

Project cards and case-study pages show real stars, forks, primary language and last-push time straight from the GitHub API.

- `src/lib/github.ts` fetches **server-side**, cached and revalidated hourly. The site makes one upstream request an hour in total, rather than two per visitor — which is what kept the previous client-side version running into GitHub's 60-per-IP-per-hour limit.
- `src/app/api/github/route.ts` exposes that same snapshot to the browser for the "GitHub Activity" section.
- Projects reference a repository by bare name (`repo: "VAYU-DRISHTI"`), so the code link and the live stats can never point at different places.
- Forked, archived and empty repositories are filtered out.
- Repositories with no description on GitHub fall back to the curated tagline in `src/data/projects.ts`.

## Editing content

All content lives in `client/src/data/` and `client/src/config/site.ts`:

| File                     | Contents                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `data/projects.ts`       | Projects + case-study copy (drives `/projects/[slug]`)                                                |
| `data/experience.ts`     | Work history                                                                                         |
| `data/skills.ts`         | Skill groups                                                                                         |
| `data/hackathons.ts`     | Hackathons                                                                                           |
| `data/achievements.ts`   | Achievement tiles                                                                                    |
| `data/services.ts`       | Services offered                                                                                     |
| `data/certifications.ts` | Certifications — **empty**; the section and résumé block hide themselves until real entries are added |
| `config/site.ts`         | Name, role, contact details, social links                                                            |

Hero and achievement counts are derived from these files, so they cannot drift out of date.

## Routes

| Route                         | Rendering                                                     |
| ----------------------------- | ------------------------------------------------------------- |
| `/`                           | Static, revalidated hourly for GitHub data                    |
| `/projects/[slug]`            | SSG, one page per project, revalidated hourly                 |
| `/resume`                     | Static; the print stylesheet produces an A4 PDF via Ctrl/Cmd+P |
| `/api/github`                 | Cached GitHub snapshot                                        |
| `/api/contact`                | Contact form delivery (validated, honeypot, rate-limited)     |
| `/sitemap.xml`, `/robots.txt` | Generated from the project data                               |

Open Graph images are generated at build time (`opengraph-image.tsx`) — there is no static PNG to maintain.

## Deploying

Deploy `client/` to Vercel. No configuration is required; `NEXT_PUBLIC_SITE_URL` only becomes necessary once a custom domain is attached.

## Backend

`server/` is an independent Express + Mongoose API kept for future use. It requires MongoDB and its own `.env`:

```bash
cd server
npm install
npm run dev          # http://localhost:5000
```
