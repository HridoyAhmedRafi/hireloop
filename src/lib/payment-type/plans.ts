export type PaymentPlan = {
  id: string;
  name: string;
  tagline: string;
  /** Price in cents, e.g. 2900 === $29.00 */
  amount: number;
  currency: "usd";
  /** Filled in once the matching one-time price exists in the Stripe dashboard. */
  stripePriceId: string | null;
  features: string[];
};

export const HIRELOOP_PRO_PLAN: PaymentPlan = {
  id: "hireloop-pro",
  name: "HireLoop Pro",
  tagline: "Everything you need to hire faster, in a single payment.",
  amount: 2900,
  currency: "usd",
  stripePriceId: "price_1UbGrx90FD2C6xFrMdZvT7SL",
  features: [
    "Unlimited job postings",
    "Applicant tracking pipeline",
    "Featured job listings",
    "Advanced candidate search",
    "Priority email support",
    "Hiring analytics dashboard",
  ],
};

/** 2900 -> "$29.00" */
export const formatAmount = (amount: number, currency: string = "usd") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount / 100);

/** Total charged today. Kept as a helper so discounts/tax can be added later. */
export const getTotalDue = (plan: PaymentPlan) => plan.amount;
