import { useState, type FormEvent } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  LoaderCircle,
  Sparkles,
  User,
  ShieldCheck,
  Zap,
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

import { Separator } from "@/components/ui/separator"
import { setAuthFlashToast, setStoredEmail, setStoredToken } from "@/lib/auth"

type RegisterPageProps = {
  defaultTab: "register" | "login"
}

type AuthMode = "register" | "login"

type AuthResponse = {
  access_token?: string
  token?: string
  token_type?: string
  message?: string
  detail?: string
}

const RegisterPage = ({ defaultTab }: RegisterPageProps) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [submittingMode, setSubmittingMode] = useState<AuthMode | null>(null)

  const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? ""

  const handleAuthSubmit = async (
    event: FormEvent<HTMLFormElement>,
    mode: AuthMode
  ) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "").trim()

    if (!apiBaseUrl) {
      setAuthFlashToast({
        kind: "error",
        message: "API URL is missing in .env",
      })
      return
    }

    if (mode === "register" && !name) {
      setAuthFlashToast({
        kind: "error",
        message: "Please enter your user name",
      })
      return
    }

    if (!email || !password) {
      setAuthFlashToast({
        kind: "error",
        message: "Email and password are required",
      })
      return
    }

    setSubmittingMode(mode)

    try {
      const payload =
        mode === "register"
          ? { username: name, email, password }
          : { email, password }

      const { data } = await axios.post<AuthResponse>(
        `${apiBaseUrl}/auth/${mode}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (mode === "register") {
        setAuthFlashToast({
          kind: "success",
          message: "Account created successfully",
        })
        return
      }

      const token = data.access_token ?? data.token

      if (token) {
        setStoredToken(token)
      }

      setStoredEmail(email)

      setAuthFlashToast({
        kind: "success",
        message: "Logged in successfully",
      })

      navigate("/newtask", { replace: true })
    } catch (error) {
      let message = "Request failed"

      if (
        axios.isAxiosError(error) &&
        typeof error.response?.data === "object" &&
        error.response?.data !== null
      ) {
        if ("detail" in error.response.data) {
          message = String(error.response.data.detail)
        } else if ("message" in error.response.data) {
          message = String(error.response.data.message)
        }
      }

      setAuthFlashToast({
        kind: "error",
        message,
      })
    } finally {
      setSubmittingMode(null)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.12),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.12),_transparent_22%),linear-gradient(180deg,_color-mix(in_oklch,var(--background)_92%,white)_0%,var(--background)_100%)] text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-[-6rem] size-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute right-[-5rem] bottom-[-4rem] size-80 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-xl flex-1 items-center px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <section className="w-full">
          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-border/50 bg-background/40 p-1.5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.55)] backdrop-blur-sm sm:max-w-xl sm:rounded-[2.25rem] sm:p-2">
            <Card className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-background/95 shadow-xl shadow-primary/5 backdrop-blur sm:rounded-[1.9rem]">
              <CardHeader className="space-y-4 border-b border-border/60 px-4 pb-5 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                    <Sparkles className="size-5" />
                  </div>

                  <div>
                    <CardTitle className="text-lg">Daisy AI Studio</CardTitle>

                    <CardDescription className="text-sm">
                      Secure access to your workspace.
                    </CardDescription>
                  </div>
                </div>

                  <div className="flex w-fit items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-primary" />
                    {defaultTab === "register" ? "Create account" : "Secure login"}
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-[2rem]">
                    {defaultTab === "register"
                      ? "Create your account"
                      : "Welcome back"}
                  </h1>

                  <p className="max-w-md text-sm leading-6 text-muted-foreground">
                    {defaultTab === "register"
                      ? "Set up your profile in a few quick steps and start using Daisy AI Studio."
                      : "Sign in with your email and password to continue to your workspace."}
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-muted/35 px-3 py-2 text-xs text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-primary" />
                    Protected workspace access
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-muted/35 px-3 py-2 text-xs text-muted-foreground">
                    <Zap className="size-3.5 text-primary" />
                    Fast setup on any device
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 px-4 pt-5 pb-4 sm:px-6 sm:pb-6">
                <Tabs
                  value={defaultTab}
                  onValueChange={(value) =>
                    navigate(value === "login" ? "/login" : "/register")
                  }
                  className="w-full"
                >
                  <TabsList className="grid h-12 w-full grid-cols-2 rounded-2xl bg-muted/60 p-1">
                    <TabsTrigger value="login" className="rounded-xl text-sm">
                      Login
                    </TabsTrigger>

                    <TabsTrigger value="register" className="rounded-xl text-sm">
                      Register
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="register" className="mt-5">
                    <form
                      className="space-y-4"
                      onSubmit={(event) => handleAuthSubmit(event, "register")}
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <label
                            htmlFor="register-name"
                            className="text-sm font-medium"
                          >
                            User name
                          </label>

                          <div className="relative">
                            <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id="register-name"
                              name="name"
                              autoComplete="name"
                              placeholder="Enter your full name"
                              required
                              className="h-12 rounded-xl bg-background/80 pl-9"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label
                            htmlFor="register-email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>

                          <div className="relative">
                            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id="register-email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              placeholder="name@example.com"
                              required
                              className="h-12 rounded-xl bg-background/80 pl-9"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <label
                            htmlFor="register-password"
                            className="text-sm font-medium"
                          >
                            Password
                          </label>

                          <div className="relative">
                            <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              id="register-password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              placeholder="Create a secure password"
                              required
                              className="h-12 rounded-xl bg-background/80 pr-10 pl-9"
                            />

                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <EyeOff className="size-4" />
                              ) : (
                                <Eye className="size-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="h-12 w-full gap-2 rounded-xl"
                        disabled={submittingMode === "register"}
                      >
                        {submittingMode === "register" ? (
                          <>
                            <LoaderCircle className="size-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>Create account</>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="login" className="mt-5">
                    <form
                      className="space-y-4"
                      onSubmit={(event) => handleAuthSubmit(event, "login")}
                    >
                      <div className="space-y-2">
                        <label
                          htmlFor="login-email"
                          className="text-sm font-medium"
                        >
                          Email
                        </label>

                        <div className="relative">
                          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id="login-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="name@example.com"
                            required
                            className="h-12 rounded-xl bg-background/80 pl-9"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="login-password"
                          className="text-sm font-medium"
                        >
                          Password
                        </label>

                        <div className="relative">
                          <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                          <Input
                            id="login-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                            className="h-12 rounded-xl bg-background/80 pr-10 pl-9"
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                        <label className="flex items-center gap-2 text-muted-foreground">
                          <input
                            type="checkbox"
                            className="size-4 rounded border-border text-primary focus:ring-primary"
                          />
                          Remember me
                        </label>

                        <button
                          type="button"
                          className="w-fit font-medium text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <Button
                        type="submit"
                        className="h-12 w-full gap-2 rounded-xl"
                        disabled={submittingMode === "login"}
                      >
                        {submittingMode === "login" ? (
                          <>
                            <LoaderCircle className="size-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          <>Login</>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <Separator />

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Accessible at
                  <span className="font-medium text-foreground"> #/login</span>
                  <span className="mx-1">and</span>
                  <span className="font-medium text-foreground"> #/register</span>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

export default RegisterPage
