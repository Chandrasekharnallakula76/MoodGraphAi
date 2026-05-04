import { Monitor } from "lucide-react"

const connectorLogoMap: Record<string, { src?: string; alt: string }> = {
  github: { src: "/GitHub-Logo.wine.svg", alt: "GitHub" },
  "instagram-creator-marketplace": { src: "/Instagram_icon.png", alt: "Instagram Creator Marketplace" },
  gmail: {
    src: "/google-gmail-logo-symbol-design-illustration-free-vector.jpg",
    alt: "Gmail",
  },
  browser: { alt: "My Browser" },
  "my-browser": { alt: "My Browser" },
  meta: {
    src: "/meta-ads-manager.png",
    alt: "Meta Ads Manager",
  },
  "meta-ads-manager": {
    src: "/meta-ads-manager.png",
    alt: "Meta Ads Manager",
  },
  instagram: { src: "/Instagram_icon.png", alt: "Instagram" },
  outlook: {
    src: "/Microsoft_Outlook_Icon_(2025%E2%80%93present).svg.png",
    alt: "Outlook",
  },
  "outlook-mail": {
    src: "/Microsoft_Outlook_Icon_(2025%E2%80%93present).svg.png",
    alt: "Outlook Mail",
  },
  "outlook-calendar": {
    src: "/googel-calinder.webp",
    alt: "Outlook Calendar",
  },
  calendar: { src: "/googel-calinder.webp", alt: "Calendar" },
  "google-calendar": { src: "/googel-calinder.webp", alt: "Google Calendar" },
}

type ConnectorLogoProps = {
  icon: string
  className?: string
}

export function ConnectorLogo({ icon, className }: ConnectorLogoProps) {
  const logo = connectorLogoMap[icon]
  const isMetaLogo = icon === "meta" || icon === "meta-ads-manager"
  const isGitHubLogo = icon === "github"

  if (logo?.src) {
    return (
      <img
        src={logo.src}
        alt={logo.alt}
        className={
          className ??
          `size-4 object-contain ${isMetaLogo ? "mix-blend-multiply" : ""} ${isGitHubLogo ? "scale-125" : ""}`
        }
      />
    )
  }

  return (
    <Monitor
      className={
        className ??
        `size-4 ${isMetaLogo ? "mix-blend-multiply" : ""} ${isGitHubLogo ? "scale-125" : ""}`
      }
    />
  )
}
