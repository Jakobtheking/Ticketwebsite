require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const stripe = require("stripe")(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)

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

app.post('/create-checkout-session', async (req, res) => {
  const cartItems = req.body;

  const lineItems = cartItems.map(item => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'success.html',
    cancel_url: 'cancel.html',
  });

  res.json({ id: session.id });
});


app.listen(3000, () => {
  console.log("Server started at http://localhost:3000")
})
