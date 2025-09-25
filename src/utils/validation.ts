// check if the token is still valid based on the current time and the expiration time
export function isTokenValid(expiresAt: number) {
  if (!expiresAt) return false;
  const now = Math.floor(Date.now() / 1000);
  return now < expiresAt;
}
