import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Circle, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const CreateAccount = () => {
  const [seatCount, setSeatCount] = useState(10)
  const [billingType, setBillingType] = useState<"monthly" | "yearly">(
    "monthly"
  )

  const monthlyPrice = 20
  const yearlyPrice = 200
  const creditsPerSeat = 4000

  const totalCredits = seatCount * creditsPerSeat

  const totalPrice =
    billingType === "monthly"
      ? seatCount * monthlyPrice
      : seatCount * yearlyPrice

  return (
    <div className="mt-5 h-full min-h-0 overflow-y-auto">
      <div className="space-y-4 p-4">
        {/* PLAN SELECTION */}
        <div className="grid grid-cols-2 gap-3">
          {/* MONTHLY */}
          <Card
            onClick={() => setBillingType("monthly")}
            className={cn(
              "cursor-pointer border transition-all",
              billingType === "monthly"
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border"
            )}
          >
            <CardContent className="p-3">
              <Circle
                className={cn("mb-4 size-4", {
                  "fill-primary text-primary": billingType === "monthly",
                  "text-muted-foreground": billingType !== "monthly",
                })}
              />
              <p className="text-xl font-semibold">US$20</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Per seat / month
              </p>
            </CardContent>
          </Card>

          {/* YEARLY */}
          <Card
            onClick={() => setBillingType("yearly")}
            className={cn(
              "relative cursor-pointer border transition-all",
              billingType === "yearly"
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border"
            )}
          >
            <span
              className={cn(
                "absolute top-2 right-2 rounded border px-1.5 py-0.5 text-[10px]",
                billingType === "yearly"
                  ? "border-primary/40 bg-primary/15 text-primary"
                  : "border-border text-muted-foreground"
              )}
            >
              Save 17%
            </span>

            <CardContent className="p-3">
              <Circle
                className={cn("mb-4 size-4", {
                  "fill-primary text-primary": billingType === "yearly",
                  "text-muted-foreground": billingType !== "yearly",
                })}
              />
              <p className="text-xl font-semibold">US$200</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Per seat / year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* TEAM CONFIG */}
        <Card>
          <CardContent className="space-y-4 p-4">
            {/* SEAT CONTROL */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Total team seats</p>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSeatCount((prev) => Math.max(1, prev - 1))}
                >
                  <Minus className="size-3" />
                </Button>

                <div className="min-w-12 text-center text-sm font-semibold">
                  {seatCount}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setSeatCount((prev) => prev + 1)}
                >
                  <Plus className="size-3" />
                </Button>
              </div>
            </div>

            {/* DROPDOWN */}
            <Button
              variant="outline"
              className="h-9 w-full justify-between text-xs"
            >
              4,000 credits / seat / month
              <ChevronDown className="size-3" />
            </Button>

            {/* TOTAL CREDITS */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-medium">Total credits</p>
                <p className="text-xs text-muted-foreground">
                  Shared by all team members
                </p>
              </div>
              <p className="text-sm font-semibold">
                {totalCredits.toLocaleString()} / month
              </p>
            </div>

            <div className="border-t" />

            {/* TOTAL PRICE */}
            <div className="flex items-end justify-between">
              <p className="text-sm font-semibold">Total price</p>
              <p className="text-sm font-semibold">
                ${totalPrice} / {billingType === "monthly" ? "month" : "year"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FEATURES */}
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>SSO</p>
          <p>No training on your data</p>
          <p>Team usage analytics</p>
          <p>Internal access control</p>
          <p>Shared slides templates</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-2 pb-1">
          <Button variant="outline" className="h-9 text-xs">
            Contact sales
          </Button>
          <Button className="h-9 text-xs">Upgrade to Team</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
