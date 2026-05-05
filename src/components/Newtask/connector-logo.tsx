import {
  Mail,
  Monitor,
  Globe,
  CalendarDays,
  type LucideProps,
} from "lucide-react"
import type { ComponentType } from "react"

const GitHubIcon = ({ className }: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2.5A9.5 9.5 0 0 0 8.99 21c.48.08.66-.21.66-.47v-1.66c-2.68.58-3.25-1.12-3.25-1.12-.44-1.1-1.07-1.39-1.07-1.39-.88-.6.07-.59.07-.59.97.07 1.48 1 1.48 1 .85 1.46 2.23 1.04 2.77.8.08-.62.34-1.04.62-1.28-2.14-.24-4.39-1.08-4.39-4.82 0-1.06.38-1.93 1-2.61-.1-.24-.43-1.23.1-2.57 0 0 .8-.25 2.63 1a9.2 9.2 0 0 1 4.78 0c1.84-1.25 2.64-1 2.64-1 .52 1.34.19 2.33.1 2.57.62.68 1 1.55 1 2.61 0 3.75-2.26 4.58-4.41 4.82.35.3.66.88.66 1.77v2.62c0 .26.18.55.67.46A9.5 9.5 0 0 0 12 2.5Z"
      fill="currentColor"
    />
  </svg>
)

type ConnectorLogoProps = {
  icon: string
  className?: string
}

type IconComponent = ComponentType<{ className?: string }>

const InstagramIcon = ({ className }: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f58529" />
        <stop offset="35%" stopColor="#dd2a7b" />
        <stop offset="70%" stopColor="#8134af" />
        <stop offset="100%" stopColor="#515bd4" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#instagram-gradient)" />
    <rect x="6.25" y="6.25" width="11.5" height="11.5" rx="3.8" stroke="white" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.1" stroke="white" strokeWidth="1.5" />
    <circle cx="17.05" cy="6.95" r="1.05" fill="white" />
  </svg>
)

const MetaIcon = ({ className }: LucideProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M5 16.5c1.8 0 3.5-2.2 5-5 1.5 2.8 3.2 5 5 5 1.9 0 3-1.6 3-4s-1.1-6-3.6-6c-1.7 0-3.2 1.5-4.4 3.6C8.8 6.9 7.3 5.5 5.6 5.5 3.1 5.5 2 8 2 10.5s1.1 6 3 6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const connectorLogoMap: Record<string, IconComponent> = {
  github: GitHubIcon,
  "instagram-creator-marketplace": InstagramIcon,
  gmail: Mail,
  browser: Monitor,
  "my-browser": Monitor,
  meta: MetaIcon,
  "meta-ads-manager": MetaIcon,
  instagram: InstagramIcon,
  outlook: Mail,
  "outlook-mail": Mail,
  "outlook-calendar": CalendarDays,
  calendar: CalendarDays,
  "google-calendar": CalendarDays,
  "google-drive": Globe,
}

export function ConnectorLogo({ icon, className }: ConnectorLogoProps) {
  const Icon = connectorLogoMap[icon] ?? Monitor

  return <Icon className={className ?? "size-4"} aria-hidden="true" />
}
