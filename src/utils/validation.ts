// check if the token is still valid based on the current time and the expiration time
export function isTokenValid(expiresAt: number) {
  if (!expiresAt) return false;
  const now = Math.floor(Date.now() / 1000);
  return now < expiresAt;
}

// validate a price alert input to make sure it's a number and not equal to current price
export const validatePriceAlert = (price: string, currentPrice: number): string | null => {
  if (!price) return "Price is required";
  const numericValue = parseFloat(price);
  if (isNaN(numericValue)) return "Price must be a number";
  if (currentPrice !== undefined && numericValue === currentPrice) {
    return `Price cannot be equal to current stock price: $${currentPrice.toFixed(2)}`;
  }
  return null;
};
