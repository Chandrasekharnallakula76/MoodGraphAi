import { AlertCircle, Clock3, ExternalLink, GitFork, Lock, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ChatGitHubProfile, ChatGitHubRepoItem } from "@/apis/chat"

function formatUpdatedAt(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function getActionLabel(action?: string) {
  if (!action) return "GitHub results"
  if (action === "list_repositories") return "Repository list"
  return action.replace(/_/g, " ")
}

export function GitHubRepoListPreview({
  repositories,
  action,
}: {
  repositories: ChatGitHubRepoItem[]
  action?: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xs font-semibold tracking-tight">GH</span>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              GitHub
            </p>
            <h3 className="text-sm font-semibold text-foreground">
              {getActionLabel(action)}
            </h3>
          </div>
        </div>

        <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {repositories.length} results
        </span>
      </div>

      <div className="space-y-3">
        {repositories.map((repo, index) => (
          <div
            key={repo.full_name}
            className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/70 bg-muted/25 px-4 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-card text-[11px] font-semibold text-foreground">
                    {index + 1}
                  </span>
                  <h4 className="truncate text-sm font-semibold text-foreground">
                    {repo.name}
                  </h4>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {repo.full_name}
                </p>
              </div>

              <Badge
                variant="outline"
                className="flex items-center gap-1 border-border bg-background text-[11px]"
              >
                {repo.private ? <Lock className="size-3" /> : null}
                {repo.private ? "Private" : "Public"}
              </Badge>
            </div>

            <div className="space-y-4 px-4 py-4">
              <p className="text-sm leading-6 text-foreground/90">
                {repo.description?.trim() || "No description provided."}
              </p>

              <div className="flex flex-wrap gap-2">
                {repo.language ? (
                  <Badge variant="secondary" className="text-[11px]">
                    {repo.language}
                  </Badge>
                ) : null}
                <Badge variant="outline" className="text-[11px]">
                  <Star className="mr-1 size-3" />
                  {repo.stars}
                </Badge>
                <Badge variant="outline" className="text-[11px]">
                  <GitFork className="mr-1 size-3" />
                  {repo.forks}
                </Badge>
                <Badge variant="outline" className="text-[11px]">
                  <AlertCircle className="mr-1 size-3" />
                  {repo.open_issues} open issues
                </Badge>
                <Badge variant="outline" className="text-[11px]">
                  <Clock3 className="mr-1 size-3" />
                  Updated {formatUpdatedAt(repo.updated_at)}
                </Badge>
              </div>

              <div className="flex items-center justify-between gap-3">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Open repository
                  <ExternalLink className="size-3.5" />
                </a>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full px-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => window.open(repo.url, "_blank", "noreferrer")}
                >
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getProfileLabel(profile: ChatGitHubProfile) {
  return profile.name?.trim() || profile.login
}

export function GitHubProfilePreview({
  profile,
  action,
}: {
  profile: ChatGitHubProfile
  action?: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xs font-semibold tracking-tight">GH</span>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              GitHub
            </p>
            <h3 className="text-sm font-semibold text-foreground">
              {action ? action.replace(/_/g, " ") : "Profile"}
            </h3>
          </div>
        </div>

        <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          Profile
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm">
        <div className="border-b border-border/70 bg-muted/25 px-4 py-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h4 className="truncate text-sm font-semibold text-foreground">
                {getProfileLabel(profile)}
              </h4>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {profile.login}
              </p>
            </div>

            <Badge variant="outline" className="text-[11px]">
              GitHub Profile
            </Badge>
          </div>
        </div>

        <div className="space-y-4 px-4 py-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] text-muted-foreground">Repos</p>
              <p className="text-sm font-semibold text-foreground">
                {profile.public_repos}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] text-muted-foreground">Gists</p>
              <p className="text-sm font-semibold text-foreground">
                {profile.private_gists}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] text-muted-foreground">Followers</p>
              <p className="text-sm font-semibold text-foreground">
                {profile.followers}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 px-3 py-2">
              <p className="text-[11px] text-muted-foreground">Following</p>
              <p className="text-sm font-semibold text-foreground">
                {profile.following}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm leading-6 text-foreground/90">
            <p>
              <span className="font-medium text-foreground">Login:</span>{" "}
              {profile.login}
            </p>
            <p>
              <span className="font-medium text-foreground">Name:</span>{" "}
              {profile.name?.trim() || "Not provided"}
            </p>
            <p>
              <span className="font-medium text-foreground">Email:</span>{" "}
              {profile.email?.trim() || "Not provided"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <a
              href={profile.profile_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Open profile
              <ExternalLink className="size-3.5" />
            </a>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 rounded-full px-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() =>
                window.open(profile.profile_url, "_blank", "noreferrer")
              }
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
