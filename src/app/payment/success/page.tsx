import type { Metadata } from "next";
import type Stripe from "stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  CircleAlert,
  Home,
  LayoutDashboard,
  ReceiptText,
} from "lucide-react";

import { CopyButton } from "@/components/payment/copy-button";
import { Navbar } from "@/components/shared/navbar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { checkoutVarify } from "@/lib/api/payments";
import { getServerSession } from "@/lib/core/get-server-session";
import { HIRELOOP_PRO_PLAN, formatAmount } from "@/lib/payment-type/plans";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Payment successful · hireloop",
  robots: { index: false, follow: false },
};

const SUPPORT_EMAIL = "support@hireloop.com";

const CARD_BRANDS: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  diners: "Diners Club",
  jcb: "JCB",
  unionpay: "UnionPay",
};

const retrieveCheckoutSession = async (sessionId: string) => {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent", "payment_intent.payment_method"],
    });
  } catch {
    return null;
  }
};

/** "Visa •••• 4242" when the payment method is expanded, "Card" otherwise. */
const getPaymentMethodLabel = (intent: Stripe.PaymentIntent | null) => {
  if (!intent || typeof intent.payment_method === "string") return "Card";

  const card = intent.payment_method?.card;
  if (!card) return "Card";

  const brand = CARD_BRANDS[card.brand] ?? card.brand;
  return `${brand} •••• ${card.last4}`;
};

function DetailRow({
  label,
  value,
  copy = false,
}: {
  label: string;
  value: string | null;
  copy?: boolean;
}) {
  return (
    <div className="flex  items-start justify-between gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
      <dt className="pt-0.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="flex min-w-0 items-center justify-end gap-1.5 text-right text-sm font-medium">
        <span
          className={
            copy
              ? "font-mono text-xs break-all select-all"
              : "break-all text-sm"
          }
        >
          {value ?? "—"}
        </span>
        {copy && value ? <CopyButton value={value} label={label} /> : null}
      </dd>
    </div>
  );
}

function OrderIssue({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-lg px-4 py-16 text-center md:py-24">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <CircleAlert className="size-7" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11 gap-2 px-5",
            })}
          >
            <Home />
            Back to home
          </Link>
          <Link
            href="/payment"
            className={buttonVariants({
              size: "lg",
              className: "h-11 gap-2 px-5",
            })}
          >
            Try payment again
          </Link>
        </div>
      </main>
    </>
  );
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/payment");
  }

  const checkoutSession = await retrieveCheckoutSession(session_id);

  if (!checkoutSession) {
    return (
      <OrderIssue
        title="We could not find this order"
        description="The payment link is invalid or has expired. If you were charged, contact support with your receipt and we will help you out."
      />
    );
  }

  const { status, payment_status } = checkoutSession;

  if (status === "open") {
    redirect("/payment");
  }

  const isPaid =
    status === "complete" &&
    (payment_status === "paid" || payment_status === "no_payment_required");
  const isProcessing = status === "complete" && payment_status === "unpaid";

  if (!isPaid && !isProcessing) {
    return (
      <OrderIssue
        title="Payment not completed"
        description="This checkout did not go through, so you have not been charged. You can start a new payment whenever you are ready."
      />
    );
  }

  let verified = true;
  if (isPaid) {
    try {
      const result: { success?: boolean } = await checkoutVarify(session_id);
      verified = result?.success !== false;
    } catch {
      verified = false;
    }
  }

  const authSession = await getServerSession();
  const role = authSession?.user?.role ?? "seeker";

  const currency = checkoutSession.currency ?? "usd";
  const total = checkoutSession.amount_total ?? 0;
  const subtotal = checkoutSession.amount_subtotal ?? total;
  const tax = checkoutSession.total_details?.amount_tax ?? 0;
  const discount = checkoutSession.total_details?.amount_discount ?? 0;

  const lineItems = checkoutSession.line_items?.data ?? [];
  const paymentIntent =
    typeof checkoutSession.payment_intent === "string"
      ? null
      : checkoutSession.payment_intent;
  const transactionId = paymentIntent?.id ?? null;

  const email =
    checkoutSession.customer_details?.email ??
    checkoutSession.customer_email ??
    null;
  const paidAt = new Date(checkoutSession.created * 1000).toLocaleString(
    "en-US",
    { dateStyle: "medium", timeStyle: "short" },
  );

  const planName = lineItems[0]?.description ?? HIRELOOP_PRO_PLAN.name;
  const statusLabel = isProcessing ? "Processing" : "Paid";
  const statusTone = isProcessing
    ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
    : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <section className="flex flex-col items-center text-center">
          <span
            className={`flex size-14 items-center justify-center rounded-full ${
              isProcessing
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {isProcessing ? (
              <CircleAlert className="size-7" />
            ) : (
              <CheckCircle2 className="size-7" />
            )}
          </span>

          <h1 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
            {isProcessing ? "Payment is processing" : "Payment successful"}
          </h1>

          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {isProcessing
              ? "Your bank is still confirming this payment. We will activate your access as soon as it clears."
              : email
                ? `Your ${planName} access is active. A receipt has been sent to ${email}.`
                : `Your ${planName} access is active. A receipt has been sent to your account email.`}
          </p>

          <span
            className={`mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm ${statusTone}`}
          >
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {statusLabel} · {formatAmount(total, currency)}
          </span>
        </section>

        {!verified && (
          <div
            role="status"
            className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300"
          >
            <CircleAlert className="mt-0.5 size-4 shrink-0" />
            <p>
              Payment received, but we could not activate your Pro access
              automatically. Contact {SUPPORT_EMAIL} with your transaction ID
              and we will fix it right away.
            </p>
          </div>
        )}

        <div className="mt-8 grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ReceiptText className="size-4 text-muted-foreground" />
                Order receipt
              </CardTitle>
              <CardDescription>{paidAt}</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <ul className="grid gap-3">
                {lineItems.map((item, index) => (
                  <li
                    key={`${item.id}-${index}`}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">
                        {item.description ?? planName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Quantity {item.quantity ?? 1}
                      </p>
                    </div>
                    <span className="shrink-0 font-medium">
                      {formatAmount(item.amount_total ?? 0, currency)}
                    </span>
                  </li>
                ))}
              </ul>

              <Separator />

              <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-medium">
                    {formatAmount(subtotal, currency)}
                  </dd>
                </div>
                {tax > 0 && (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Tax</dt>
                    <dd className="font-medium">
                      {formatAmount(tax, currency)}
                    </dd>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted-foreground">Discount</dt>
                    <dd className="font-medium text-emerald-600 dark:text-emerald-400">
                      −{formatAmount(discount, currency)}
                    </dd>
                  </div>
                )}
              </dl>

              <Separator />

              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium">
                  {isProcessing ? "Total" : "Total paid"}
                </span>
                <span className="text-xl font-semibold tracking-tight">
                  {formatAmount(total, currency)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-medium ${statusTone}`}
                >
                  <span
                    className="size-1.5 rounded-full bg-current"
                    aria-hidden
                  />
                  {statusLabel}
                </span>
                <span>One-time payment</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction details</CardTitle>
              <CardDescription>Keep this for your records.</CardDescription>
            </CardHeader>

            <CardContent>
              <dl className="space-y-3">
                <DetailRow label="Transaction ID" value={transactionId} copy />
                <DetailRow label="Session ID" value={checkoutSession.id} copy />
                <DetailRow label="Status" value={statusLabel} />
                <DetailRow
                  label="Method"
                  value={getPaymentMethodLabel(paymentIntent)}
                />
                <DetailRow label="Date" value={paidAt} />
                <DetailRow label="Email" value={email} />
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11 gap-2 px-5",
            })}
          >
            <Home />
            Back to home
          </Link>
          <Link
            href={`/dashboard/${role}`}
            className={buttonVariants({
              size: "lg",
              className: "h-11 gap-2 px-5",
            })}
          >
            <LayoutDashboard />
            Go to dashboard
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Need help with this payment? Contact{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </main>
    </>
  );
}
