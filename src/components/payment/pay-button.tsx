import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PayButton() {
  return (
    <form action="/api/checkout_sessions" method="POST">
      <Button type="submit" size="lg" className="w-full cursor-pointer gap-2">
        <Lock />
        Continue to payment
      </Button>
    </form>
  );
}
