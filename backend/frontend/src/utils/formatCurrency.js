function formatCurrency(amount, currencyCode = 'ILS') {
  // Always add a check for valid 'amount' to prevent errors if it's undefined/null/not a number
  if (typeof amount !== 'number' || isNaN(amount)) {
    return ''; // Or '0.00', 'N/A', or throw an error, depending on desired behavior
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default formatCurrency; // <-- Remove the parentheses () here