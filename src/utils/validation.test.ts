import { isTokenValid, validatePriceAlert } from "./validation";

describe("isTokenValid", () => {
  it("returns false if no expiresAt is given", () => {
    expect(isTokenValid(0)).toBe(false);
  });

  it("returns true if expiresAt is in the future", () => {
    const future = Math.floor(Date.now() / 1000) + 1000;
    expect(isTokenValid(future)).toBe(true);
  });

  it("returns false if expiresAt is in the past", () => {
    const past = Math.floor(Date.now() / 1000) - 1000;
    expect(isTokenValid(past)).toBe(false);
  });
});

describe("validatePriceAlert", () => {
  it("requires a price", () => {
    expect(validatePriceAlert("", 100)).toBe("Price is required");
  });

  it("rejects non-numeric input", () => {
    expect(validatePriceAlert("abc", 100)).toBe("Price must be a number");
  });

  it("rejects equal to current price", () => {
    expect(validatePriceAlert("100", 100)).toBe("Price cannot be equal to current stock price: $100.00");
  });

  it("accepts valid different price", () => {
    expect(validatePriceAlert("120", 100)).toBeNull();
  });
});
