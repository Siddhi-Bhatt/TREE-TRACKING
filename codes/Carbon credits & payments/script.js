// Payment calculation logic
document.getElementById('calculate-btn').addEventListener('click', () => {
  const credits = Math.floor(Math.random() * 100) + 50; // Random credits between 50-150
  const payment = credits * 10; // Payment multiplier per credit

  document.getElementById('credits').textContent = credits;
  document.getElementById('payment-amount').textContent = payment.toFixed(2);
  document.getElementById('payment-details').classList.remove('hidden');
});

// Handle payment form submission
document.getElementById('payment-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const paymentMethod = document.getElementById('payment-method').value;

  if (paymentMethod) {
    // Simulate transaction details
    const transactionId = `TXN${Math.floor(Math.random() * 1000000)}`;
    const transactionDate = new Date().toLocaleDateString();

    document.getElementById('transaction-id').textContent = transactionId;
    document.getElementById('transaction-date').textContent = transactionDate;
    document.getElementById('success-message').classList.remove('hidden');
  } else {
    alert('Please select a payment method!');
  }
});
