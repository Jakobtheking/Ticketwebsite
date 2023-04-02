// Get the "cart-items" div
let cartItemsDiv = document.getElementById('cart-items');

// Initialize cartItems with items from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Update the total price
function updateTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let itemPrice = cartItems[i].price;
    let quantityInput = cartItemsDiv.children[i].querySelector('.quantity');
    let quantity = parseInt(quantityInput.value);
    totalPrice += itemPrice * quantity;
  }
  document.querySelector('.total-price').innerText = '$' + totalPrice.toFixed(2);
}

// Loop through the cart items and create HTML elements to display them
for (let i = 0; i < cartItems.length; i++) {
  let itemName = cartItems[i].name;
  let itemPrice = cartItems[i].price;

  // Create a div to hold the item name, price, and remove button
  let itemDiv = document.createElement('div');
  itemDiv.dataset.id = i; // Set the data-id attribute to the index of the item in the cartItems array

  // Create a span for the item name
  let nameSpan = document.createElement('span');
  nameSpan.innerText = itemName;

  // Create a span for the item price
  let priceSpan = document.createElement('span');
  priceSpan.classList.add('price'); // Add the "price" class to the span
  priceSpan.innerText = '$' + itemPrice;

  // Create an input for the item quantity
  let quantityInput = document.createElement('input');
  quantityInput.classList.add('quantity'); // Add the "quantity" class to the input
  quantityInput.type = 'number';
  quantityInput.min = 1;
  quantityInput.value = 1;

  // Add the event listener to update the total price when the quantity is changed
  quantityInput.addEventListener('change', () => {
    updateTotalPrice();
  });

  // Create a button to remove the item
  let removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.classList.add('remove-button');

  // Add the event listener to remove the item
  removeButton.addEventListener('click', () => {
    cartItems.splice(i, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    itemDiv.remove();
    updateTotalPrice();
  });

  // Add the spans, input, and button to the item div
  itemDiv.appendChild(nameSpan);
  itemDiv.appendChild(priceSpan);
  itemDiv.appendChild(quantityInput);
  itemDiv.appendChild(removeButton);

  // Add the item div to the "cart-items" div
  cartItemsDiv.appendChild(itemDiv);
}

// Call the updateTotalPrice function to set the initial total price
updateTotalPrice();

// Call the updateTotalPrice function whenever a quantity input is changed
const quantityInputs = document.querySelectorAll('.quantity');
quantityInputs.forEach((input) => {
  input.addEventListener('change', () => {
    updateTotalPrice();
  });
});

// Initialize Stripe
const stripe = Stripe('pk_live_51Ms4gFBmuDpo9we22og4OgLx3ax5KSSnA5xaj3VMDjF0pXCRUTLRV1kpSI5uV1GMb3pUCDtWtVyBiKJlyXlaWehK00A6nPXt9C');

// Create the checkout session
async function createCheckoutSession() {
  const response = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItems)
  });

  const session = await response.json();
  return session;
}

// Handle

let checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', async () => {
// Create the checkout session
let session = await createCheckoutSession();

// Redirect to Stripe checkout page
let result = await stripe.redirectToCheckout({
sessionId: session.id
});

if (result.error) {
console.log(result.error);
alert('Failed to redirect to Stripe checkout page. Please try again later.');
}
});

// Function to create the checkout session on the server
async function createCheckoutSession() {
// Make a POST request to the server with the cart items
let response = await fetch('/create-checkout-session', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(cartItems)
});

if (!response.ok) {
throw new Error('Failed to create checkout session.');
}

// Parse the response as JSON
let session = await response.json();

return session;
}