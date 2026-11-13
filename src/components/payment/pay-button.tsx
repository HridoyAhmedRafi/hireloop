"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { formatAmount, type PaymentPlan } from "@/lib/payment/plans";

type PayButtonProps = {
  plan: PaymentPlan;
};

export function PayButton({ plan }: PayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const price = formatAmount(plan.amount, plan.currency);

  const handlePay = async () => {
    setIsLoading(true);

    try {
      // TODO(stripe): replace the toast below with a POST to /api/checkout:
      //   const response = await fetch("/api/checkout", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ planId: plan.id }),
      //   });
      //   const { url } = await response.json();
      //   window.location.assign(url);
      toast.add({
        title: "Stripe checkout coming soon",
        description: `Secure checkout for ${plan.name} (${price}/${plan.interval}) is not live yet.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className="w-full cursor-pointer gap-2"
      onClick={handlePay}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <Lock />}
      {isLoading ? "Redirecting…" : "Continue to payment"}
    </Button>
  );
}
