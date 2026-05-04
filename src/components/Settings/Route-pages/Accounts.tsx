import { useRef, useState, type ChangeEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Settings,
  LogOut,
  Sparkles,
  CalendarDays,
  ChevronLeft,
} from "lucide-react"

const Accounts = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [name, setName] = useState("Chandrasekhar Nallakula")
  const [avatarUrl, setAvatarUrl] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const email = "nallakulasekhar9999@gmail.com"
  const userId = "310519663549404832"
  const initial = name.trim().charAt(0).toUpperCase() || "C"

  const onUploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const objectUrl = URL.createObjectURL(file)
    setAvatarUrl(objectUrl)
  }

  return (
    <div className="bg-background p-6 text-foreground">
      {/* ========================= */}
      {/* 🔹 PROFILE SCREEN */}
      {/* ========================= */}
      {isEditProfileOpen ? (
        <div>
          {/* Header */}
          <div className="mb-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditProfileOpen(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <h1 className="text-2xl font-semibold">Profile</h1>
          </div>

          <Separator className="mb-6" />

          <div className="space-y-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex flex-col items-center space-y-3">
                <Avatar
                  className="h-24 w-24 cursor-pointer border bg-orange-500 transition hover:opacity-80"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback className="text-5xl text-white">
                    {initial}
                  </AvatarFallback>
                </Avatar>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onUploadAvatar}
                  className="hidden"
                />
              </div>
              <div className="w-full max-w-md">
                <label className="mb-2 block text-sm text-muted-foreground">
                  Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <div>
              <p className="text-xl font-medium">Email</p>
              <p className="text-muted-foreground">{email}</p>
            </div>

            <div>
              <p className="text-xl font-medium">User ID</p>
              <p className="text-muted-foreground">{userId}</p>
            </div>

            <Separator />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-medium">Delete account</p>
                <p className="text-muted-foreground">
                  This will delete your account and all data.
                </p>
              </div>

              <Button
                variant="outline"
                className="border-red-500/30 text-red-500 hover:bg-red-500/10"
              >
                Delete account
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================= */
        /* 🔹 ACCOUNT SCREEN */
        /* ========================= */
        <div>
          <h1 className="mb-4 text-xl font-semibold">Account</h1>
          <Separator className="mb-6" />

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-orange-500">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback className="text-lg text-white">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-lg font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsEditProfileOpen(true)}
                    size="icon"
                    className="bg-emerald-900/25 text-emerald-400 hover:bg-emerald-900/40"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit profile</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-red-900/25 text-red-400 hover:bg-red-900/40"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Log out</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <Card className="rounded-2xl border bg-card">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Free</h2>
                <Button variant="secondary" size="sm">
                  Upgrade
                </Button>
              </div>

              <Separator className="mb-4" />

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Credits</p>
                    <p className="text-xs text-muted-foreground">
                      Free credits
                    </p>
                  </div>
                </div>

                <p className="font-semibold">0</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Daily refresh credits</p>
                    <p className="text-xs text-muted-foreground">
                      Refresh to 300 at 00:30 every day
                    </p>
                  </div>
                </div>

                <p className="font-semibold">300</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Accounts
