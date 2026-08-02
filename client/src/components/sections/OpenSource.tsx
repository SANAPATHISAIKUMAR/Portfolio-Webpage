"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GitBranch, Star, GitFork, ExternalLink, Users, UserPlus, AlertCircle } from "lucide-react";
import { RevealOnScroll } from "../effects/RevealOnScroll";
import { GlowCard } from "../effects/GlowCard";
import { SectionHeading } from "../ui/SectionHeading";
import { StatCard } from "../ui/StatCard";
import { GithubIcon } from "../ui/SocialIcons";
import { useGitHubStats } from "../../hooks/useGitHubStats";
import { GITHUB_PROFILE_URL as GITHUB_PROFILE, languageColor } from "../../config/github";
import { projects } from "../../data/projects";

/**
 * Curated one-liners keyed by repo name, used when a repository has no
 * description set on GitHub — a blank card reads as an abandoned repo.
 */
const taglineByRepo = new Map(
  projects
    .filter((p) => p.repo)
    .map((p) => [p.repo!.toLowerCase(), p.tagline] as const)
);

function OpenSourceContent() {
  const { data, isLoading, isError } = useGitHubStats();

  const user = data?.user ?? null;
  // Top 4 by stars, then most recently pushed — the server already ordered them.
  const repos = (data?.repos ?? []).slice(0, 4);
  const languages = data?.languages ?? [];
  const totalStars = data?.totalStars ?? 0;
  const totalLangRepos = languages.reduce((sum, l) => sum + l.count, 0) || 1;

  return (
    <div className="section-container">
      {/* Header */}
      <RevealOnScroll>
        <SectionHeading
          eyebrow="Open Source"
          title={
            <>
              GitHub <span className="gradient-text">Activity</span>
            </>
          }
          subtitle="Building in public, one commit at a time."
          headingId="opensource-heading"
        />
      </RevealOnScroll>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-surface-1 border border-hairline" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-surface-1 border border-hairline" />
            ))}
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <RevealOnScroll>
          <div className="max-w-md mx-auto text-center p-8 rounded-2xl bg-surface-1 border border-hairline">
            <AlertCircle size={28} className="mx-auto mb-3 text-text-muted" />
            <p className="text-sm text-text-secondary mb-5">
              Live GitHub stats couldn&apos;t be loaded right now. You can still
              explore everything on my profile.
            </p>
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-1 border border-hairline-strong text-sm text-text-primary hover:bg-surface-2 transition-colors"
            >
              <GithubIcon size={16} />
              View GitHub Profile
            </a>
          </div>
        </RevealOnScroll>
      )}

      {/* Success */}
      {user && (
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
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </RevealOnScroll>

          {/* Most-used languages — derived from real repos */}
          {languages.length > 0 && (
            <RevealOnScroll>
              <div className="max-w-2xl mx-auto mb-12 rounded-2xl bg-surface-1 border border-hairline p-5">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  Most Used Languages
                </h3>
                <div className="flex h-2.5 rounded-full overflow-hidden mb-4">
                  {languages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{
                        width: `${(lang.count / totalLangRepos) * 100}%`,
                        backgroundColor: languageColor(lang.name),
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
                        style={{ backgroundColor: languageColor(lang.name) }}
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

                      {(repo.description ?? taglineByRepo.get(repo.name.toLowerCase())) && (
                        <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">
                          {repo.description ?? taglineByRepo.get(repo.name.toLowerCase())}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-text-muted">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: languageColor(repo.language) }}
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-1 border border-hairline text-sm text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
              >
                <GithubIcon size={16} />
                View Full Profile on GitHub
              </a>
            </div>
          </RevealOnScroll>
        </>
      )}
    </div>
  );
}

export function OpenSource() {
  // Local QueryClient so React Query ships in this section's (lazily-loaded)
  // chunk rather than the initial bundle.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <section
        id="opensource"
        aria-labelledby="opensource-heading"
        className="relative section-padding overflow-hidden"
      >
        <OpenSourceContent />
      </section>
    </QueryClientProvider>
  );
}
