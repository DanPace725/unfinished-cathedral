import Stripe from 'stripe';
import { incrementProjectSignalCount } from '../../utils/notion.js';

// Get the webhook secret from environment variables for signature verification.
const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

/**
 * Astro API route for handling Stripe webhooks.
 * This endpoint listens for events from Stripe, primarily for successful payments.
 */
export async function POST({ request }) {
  // Initialize the Stripe client inside the handler.
  const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

  const signature = request.headers.get('stripe-signature');
  // Stripe requires the raw request body to construct the event, so we read it as text.
  const body = await request.text();

  let event;

  // 1. Verify the webhook signature to ensure the request is from Stripe.
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    // This error is thrown if the signature is invalid.
    console.error(`Webhook signature verification failed:`, err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 2. Handle the specific event we care about: 'checkout.session.completed'.
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const projectId = session.metadata.projectId;

    if (projectId) {
      console.log(`Webhook: Received successful checkout for project: ${projectId}`);
      // Asynchronously update the signal count in Notion.
      incrementProjectSignalCount(projectId).catch(err => {
        console.error(`Webhook: Failed to process signal count for project ${projectId}:`, err);
      });
    } else {
      console.warn('Webhook received checkout.session.completed but no projectId was found in metadata.');
    }
  } else {
    // Log other event types for debugging purposes, but don't treat them as an error.
    console.log(`Webhook: Received unhandled event type: ${event.type}`);
  }

  // 3. Return a 200 response to Stripe to acknowledge receipt of the event.
  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
