import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  const { email, items } = await req.json()

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000, // $20.00 in cents
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      email,
    },
  })

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  })
}

