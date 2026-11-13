export type BillingInterval = "month" | "year";

export type PaymentPlan = {
  id: string;
  name: string;
  tagline: string;
  /** Price in cents, e.g. 2900 === $29.00 */
  amount: number;
  currency: "usd";
  interval: BillingInterval;
  /** Filled in once the matching price exists in the Stripe dashboard. */
  stripePriceId: string | null;
  features: string[];
};

export const RECRUITER_PRO_PLAN: PaymentPlan = {
  id: "recruiter-pro-monthly",
  name: "Recruiter Pro",
  tagline: "Everything you need to hire faster, without limits.",
  amount: 2900,
  currency: "usd",
  interval: "month",
  stripePriceId: null,
  features: [
    "Unlimited job postings",
    "Applicant tracking pipeline",
    "Featured job listings",
    "Advanced candidate search",
    "Priority email support",
    "Hiring analytics dashboard",
  ],
};

export const INTERVAL_LABEL: Record<BillingInterval, string> = {
  month: "Monthly",
  year: "Yearly",
};

/** 2900 -> "$29.00" */
export const formatAmount = (
  amount: number,
  currency: PaymentPlan["currency"] = "usd",
) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100);

/** Total charged today. Kept as a helper so discounts/tax can be added later. */
export const getTotalDue = (plan: PaymentPlan) => plan.amount;

/** "Dec 13, 2026" — the next billing date for the given interval. */
export const getRenewalDate = (interval: BillingInterval) => {
  const date = new Date();
  if (interval === "year") {
    date.setFullYear(date.getFullYear() + 1);
  } else {
    date.setMonth(date.getMonth() + 1);
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
