const button = document.querySelector("button")

button.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lineItems: [
          { price: 'price_1I5Iq3Lq5PimH2hMAeYwYnq3', quantity: 3 },
          { price: 'price_1I5IrSLq5PimH2hMNrCzLnT8', quantity: 1 },
        ],
      }),
    });

    const session = await response.json();
    console.log(session.id);
    const stripe = Stripe('pk_test_51I5InOLq5PimH2hMJnfoQDjK65dHrtB2OQGIfKsyzN7NSzHHpYAzkeTJzKMXc1tMC0nvjZiJKB7VW4sf8evv7VcS00KfQyvpW8');

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error(error);
    }
  } catch (e) {
    console.error(e);
  }
});