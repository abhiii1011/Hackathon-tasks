import { Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
router.post("/create-checkout-session", async (req, res) => {
  // req.body = [{id,title,price,quantity,currency}]
  try {
    const line_items = req.body.map((item) => ({
      price_data: {
        currency: item.currency || "usd",
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;
