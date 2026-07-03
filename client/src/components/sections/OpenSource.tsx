import { useEffect, useState } from "react";
import { GitBranch, Star, GitFork, ExternalLink, Users, UserPlus, AlertCircle } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { GlowCard } from "../effects/GlowCard";
import { GithubIcon } from "../ui/SocialIcons";
import type { GitHubRepo, GitHubUser } from "../../types";

const GITHUB_USERNAME = "SANAPATHISAIKUMAR";
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;

type LoadState = "loading" | "success" | "error";

interface ApiRepo extends GitHubRepo {
  fork?: boolean;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Java: "#B07219",
  "C++": "#F34B7D",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Shell: "#89E051",
  Vue: "#41B883",
  Dart: "#00B4AB",
};

export function OpenSource() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<ApiRepo[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [languages, setLanguages] = useState<{ name: string; count: number }[]>([]);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    const controller = new AbortController();

    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
            { signal: controller.signal }
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const userData: GitHubUser = await userRes.json();
        const reposData: ApiRepo[] = await reposRes.json();

        const ownRepos = reposData.filter((r) => !r.fork);

        // Real aggregate stats
        const stars = ownRepos.reduce(
          (sum, r) => sum + (r.stargazers_count || 0),
          0
        );

        // Real language breakdown
        const langCount: Record<string, number> = {};
        ownRepos.forEach((r) => {
          if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
        });
        const langList = Object.entries(langCount)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        // Top repos by stars, then most recently updated
        const topRepos = [...ownRepos]
          .sort(
            (a, b) =>
              (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .slice(0, 4);

        setUser(userData);
        setRepos(topRepos);
        setTotalStars(stars);
        setLanguages(langList);
        setState("success");
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setState("error");
      }
    };

    fetchGitHub();
    return () => controller.abort();
  }, []);

  const totalLangRepos = languages.reduce((sum, l) => sum + l.count, 0) || 1;

  return (
    <section id="opensource" className="relative section-padding overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-green-400 mb-3 block">
              Open Source
            </span>
            <h2 className="font-display text-section-title font-bold text-text-primary mb-4">
              GitHub <span className="gradient-text">Activity</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-section-subtitle">
              Building in public, one commit at a time.
            </p>
          </div>
        </RevealOnScroll>

        {/* Loading skeleton */}
        {state === "loading" && (
          <div className="animate-pulse">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-white/[0.04] border border-white/[0.04]"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-white/[0.04] border border-white/[0.04]"
                />
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {state === "error" && (
          <RevealOnScroll>
            <div className="max-w-md mx-auto text-center p-8 rounded-2xl bg-background-secondary/30 border border-white/[0.06]">
              <AlertCircle size={28} className="mx-auto mb-3 text-text-muted" />
              <p className="text-sm text-text-secondary mb-5">
                Live GitHub stats couldn&apos;t be loaded right now. You can still
                explore everything on my profile.
              </p>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-text-primary hover:bg-white/[0.08] transition-colors"
              >
                <GithubIcon size={16} />
                View GitHub Profile
              </a>
            </div>
          </RevealOnScroll>
        )}

        {/* Success */}
        {state === "success" && user && (
          <>
            {/* GitHub Stats — real data */}
            <RevealOnScroll>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
                {[
                  { label: "Repositories", value: user.public_repos, icon: GitBranch },
                  { label: "Stars Earned", value: totalStars, icon: Star },
                  { label: "Followers", value: user.followers, icon: Users },
                  { label: "Following", value: user.following, icon: UserPlus },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-2xl bg-background-secondary/30 border border-white/[0.04]"
                  >
                    <stat.icon size={18} className="mx-auto mb-2 text-green-400" />
                    <div className="text-2xl font-display font-bold text-text-primary">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Most-used languages — derived from real repos */}
            {languages.length > 0 && (
              <RevealOnScroll>
                <div className="max-w-2xl mx-auto mb-12 rounded-2xl bg-background-secondary/20 border border-white/[0.04] p-5">
                  <h3 className="text-sm font-medium text-text-secondary mb-4">
                    Most Used Languages
                  </h3>
                  <div className="flex h-2.5 rounded-full overflow-hidden mb-4">
                    {languages.map((lang) => (
                      <div
                        key={lang.name}
                        style={{
                          width: `${(lang.count / totalLangRepos) * 100}%`,
                          backgroundColor: languageColors[lang.name] || "#8B949E",
                        }}
                        title={`${lang.name} — ${lang.count} repos`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {languages.map((lang) => (
                      <span
                        key={lang.name}
                        className="flex items-center gap-1.5 text-xs text-text-muted"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor: languageColors[lang.name] || "#8B949E",
                          }}
                        />
                        {lang.name}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* Top Repositories — real data */}
            {repos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map((repo, index) => (
                  <RevealOnScroll key={repo.id} delay={index * 0.1}>
                    <GlowCard
                      className="h-full"
                      glowColor="rgba(16, 185, 129, 0.1)"
                      borderColor="rgba(16, 185, 129, 0.25)"
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-5"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-mono text-sm font-semibold text-accent-blue hover:underline">
                            {repo.name}
                          </h3>
                          <ExternalLink size={14} className="text-text-muted" />
                        </div>

                        {repo.description && (
                          <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">
                            {repo.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-text-muted">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{
                                  backgroundColor:
                                    languageColors[repo.language] || "#8B949E",
                                }}
                              />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star size={12} />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={12} />
                            {repo.forks_count}
                          </span>
                        </div>
                      </a>
                    </GlowCard>
                  </RevealOnScroll>
                ))}
              </div>
            )}

            {/* View profile CTA */}
            <RevealOnScroll>
              <div className="flex justify-center mt-10">
                <a
                  href={GITHUB_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.07] transition-colors"
                >
                  <GithubIcon size={16} />
                  View Full Profile on GitHub
                </a>
              </div>
            </RevealOnScroll>
          </>
        )}
      </div>
    </section>
  );
}