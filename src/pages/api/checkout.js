import Stripe from 'stripe';

// Initialize the Stripe client with the secret key from environment variables.
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10', // It's good practice to pin the API version.
});

/**
 * Astro API route handler for creating a Stripe Checkout session.
 * This function is executed on the server.
 */
export async function POST({ request }) {
  // Validate that the request is a JSON request.
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(JSON.stringify({ error: { message: "Invalid request: Content-Type must be application/json" } }), { status: 400 });
  }

  try {
    const { projectId, projectName } = await request.json();

    // Validate that the required data was sent.
    if (!projectId || !projectName) {
      return new Response(JSON.stringify({ error: { message: "Missing required project information (projectId, projectName)" } }), { status: 400 });
    }

    // Construct absolute URLs for the success and cancel pages.
    // This is required by Stripe.
    const successUrl = new URL('/success', request.url).toString();
    const cancelUrl = new URL('/cancel', request.url).toString();

    // Create a new Stripe Checkout session.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Interest Signal: ${projectName}`,
              // We can add more details here if needed, like an image or description.
            },
            unit_amount: 500, // $5.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      // Use metadata to store the projectId. This is crucial for the webhook later
      // to know which project's signal count to increment.
      metadata: {
        projectId: projectId,
      },
    });

    // Return the session ID to the client.
    return new Response(JSON.stringify({ id: session.id }), { status: 200 });

  } catch (error) {
    console.error('Stripe Checkout session creation failed:', error);
    return new Response(JSON.stringify({ error: { message: `Stripe error: ${error.message}` } }), { status: 500 });
  }
}
