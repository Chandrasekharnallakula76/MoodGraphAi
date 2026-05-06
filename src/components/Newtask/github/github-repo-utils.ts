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

export function formatGitHubRepoListCopyText(
  repositories: ChatGitHubRepoItem[],
  action?: string
) {
  const header = getActionLabel(action)

  return [
    header,
    ...repositories.map((repo, index) =>
      [
        `${index + 1}. ${repo.full_name} (${repo.private ? "private" : "public"})`,
        repo.description ? `Description: ${repo.description}` : null,
        repo.language ? `Language: ${repo.language}` : null,
        `Stars: ${repo.stars} | Forks: ${repo.forks} | Open issues: ${repo.open_issues}`,
        `Updated: ${formatUpdatedAt(repo.updated_at)}`,
        repo.url,
      ]
        .filter(Boolean)
        .join("\n")
    ),
  ].join("\n\n")
}

export function formatGitHubProfileCopyText(
  profile: ChatGitHubProfile,
  action?: string
) {
  return [
    action ? action.replace(/_/g, " ") : "GitHub profile",
    `Login: ${profile.login}`,
    profile.name ? `Name: ${profile.name}` : null,
    profile.email ? `Email: ${profile.email}` : null,
    `Public repos: ${profile.public_repos}`,
    `Private gists: ${profile.private_gists}`,
    `Followers: ${profile.followers}`,
    `Following: ${profile.following}`,
    profile.profile_url,
  ]
    .filter(Boolean)
    .join("\n")
}
