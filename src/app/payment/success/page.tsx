import { Button } from "@/components/ui/button";
import { checkoutVarify } from "@/lib/api/payments";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/payment");
  }

  //   if (!session_id) {
  //     throw new Error("Please provide a valid session_id (`cs_test_...`)");
  //   }

  const { status, customer_email, metadata, payment_intent, payment_status } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete" && payment_status === "paid") {
    console.log({
      status,
      customer_email,
      metadata,
      payment_intent,
      payment_status,
    });

    const result = await checkoutVarify(session_id);
    console.log(result);
    return (
      <section id="success">
        <Button>
          <Link href={"/"}>Home</Link>
        </Button>
        <p>
          We appreciate your business! A confirmation email will be sent to . If
          you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }
}
