import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "@/lib/core/get-server-session";

export async function POST() {
  const userSession = await getServerSession();
  const user = userSession?.user;

  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1UbGrx90FD2C6xFrMdZvT7SL",
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId: user?.id as string,
      },
      customer_email: user?.email,
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: "hireloop_web",
    });
    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
