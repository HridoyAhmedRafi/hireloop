import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { PayButton } from "@/components/payment/pay-button";
import { Navbar } from "@/components/shared/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  INTERVAL_LABEL,
  RECRUITER_PRO_PLAN,
  formatAmount,
  getRenewalDate,
  getTotalDue,
} from "@/lib/payment/plans";

export const metadata: Metadata = {
  title: "Payment · hireloop",
  description: "Complete your Recruiter Pro subscription payment.",
};

const NEXT_STEPS = [
  {
    title: "Review your order",
    description: "Check the plan and billing details before you continue.",
  },
  {
    title: "Pay securely on Stripe",
    description: "You will be redirected to Stripe to enter your card details.",
  },
  {
    title: "Unlock Recruiter Pro",
    description: "Pro features are enabled on your dashboard right away.",
  },
];

function BillingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0">
      <dt className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-right text-sm font-medium">{value}</dd>
    </div>
  );
}

const PaymentPage = () => {
  const plan = RECRUITER_PRO_PLAN;
  const price = formatAmount(plan.amount, plan.currency);
  const totalDue = formatAmount(getTotalDue(plan), plan.currency);
  const intervalLabel = INTERVAL_LABEL[plan.interval];

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-12">
        <Link
          href="/dashboard/recruiter"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to dashboard
        </Link>

        <header className="mt-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            Secure checkout
          </span>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Complete your payment
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            You are one step away from unlocking {plan.name}. Review your order,
            then continue to our secure Stripe checkout.
          </p>
        </header>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 ">
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      aria-hidden="true"
                      className=" flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                    >
                      <Sparkles className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <CardTitle className=" flex flex-wrap items-center gap-2">
                        {plan.name}
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                          Most popular
                        </span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {plan.tagline}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xl font-semibold tracking-tight">
                      {price}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      per {plan.interval}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid gap-4">
                <Separator />

                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="mt-px flex size-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Check className="size-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-muted-foreground">
                  Billed {plan.interval}ly · Cancel anytime from your dashboard.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing details</CardTitle>
                <CardDescription>
                  This is what your invoice will show.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3">
                  <BillingRow label="Plan" value={plan.name} />
                  <BillingRow label="Billing cycle" value={intervalLabel} />
                  <BillingRow
                    label="Payment method"
                    value="Card · entered on Stripe"
                  />
                  <BillingRow
                    label="Renews on"
                    value={getRenewalDate(plan.interval)}
                  />
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="grid gap-4">
                  {NEXT_STEPS.map((step, index) => (
                    <li key={step.title} className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{step.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <aside className="lg:sticky lg:top-24">
            <Card>
              <CardHeader>
                <CardTitle>Order summary</CardTitle>
                <CardDescription>
                  Charged today, then every {plan.interval}.
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4">
                <dl className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">
                      {plan.name} · {intervalLabel}
                    </dt>
                    <dd className="font-medium">{price}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="font-medium">{price}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Tax</dt>
                    <dd className="text-muted-foreground">
                      Calculated at checkout
                    </dd>
                  </div>
                </dl>

                <Separator />

                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium">Total due today</span>
                  <span className="text-2xl font-semibold tracking-tight">
                    {totalDue}
                  </span>
                </div>

                <PayButton plan={plan} />

                <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Lock className="mt-0.5 size-3.5 shrink-0" />
                  You will be redirected to Stripe to complete your payment
                  securely. We never store your card details.
                </p>

                <Separator />

                <div className="grid gap-2 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                    Payments secured by Stripe
                  </p>
                  <p className="flex items-center gap-2">
                    <CreditCard className="size-4" />
                    Visa, Mastercard, Amex & more
                  </p>
                </div>
              </CardContent>

              <CardFooter className="justify-center text-xs text-muted-foreground">
                Prices in USD. Taxes calculated at checkout.
              </CardFooter>
            </Card>
          </aside>
        </div>
      </main>
    </>
  );
};

export default PaymentPage;
