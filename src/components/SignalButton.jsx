import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// It's best practice to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// The public key must be prefixed with `PUBLIC_` to be exposed to the client by Astro.
const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY);

const SignalButton = ({ projectId, projectName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    setError('');

    try {
      // 1. Call our server-side API endpoint to create a checkout session.
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, projectName }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'Failed to create the checkout session.');
      }

      const { id: sessionId } = await response.json();

      // 2. When the session is created, redirect to the Stripe-hosted checkout page.
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe.js has not loaded yet. Please check your connection.');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      // This point will only be reached if there is an immediate error when
      // redirecting to checkout (e.g., a network error).
      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        setError(stripeError.message);
      }

    } catch (err) {
      console.error('Error during signal process:', err);
      setError(err.message);
    } finally {
      // If there's an error before redirect, we should stop the loading state.
      // If the redirect is successful, the user navigates away anyway.
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
        aria-label={`Signal $5 interest for ${projectName}`}
      >
        {isLoading ? 'Processing...' : 'Signal Interest ($5)'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default SignalButton;
