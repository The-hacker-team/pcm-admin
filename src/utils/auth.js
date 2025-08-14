/**
 * Decode JWT token without verification (client-side only)
 * Note: This only decodes the payload, it doesn't verify the token signature
 * Token verification should always be done on the server side
 */
export function decodeJWTToken(token) {
  try {
    // JWT tokens have 3 parts separated by dots: header.payload.signature
    const parts = token.split(".");

    if (parts.length !== 3) {
      throw new Error("Invalid JWT token format");
    }

    // Decode the payload (second part)
    const payload = parts[1];

    // Add padding if needed (JWT uses base64url encoding)
    const paddedPayload = payload + "=".repeat((4 - (payload.length % 4)) % 4);

    // Decode base64url to base64, then parse JSON
    const decodedPayload = atob(
      paddedPayload.replace(/-/g, "+").replace(/_/g, "/")
    );

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token) {
  try {
    const decoded = decodeJWTToken(token);
    if (!decoded || !decoded.exp) {
      return true; // If we can't decode or no expiration, consider it expired
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // If there's an error, consider it expired
  }
}

/**
 * Get user details from stored token
 */
export function getUserFromToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    if (isTokenExpired(token)) {
      // Remove expired token
      localStorage.removeItem("token");
      return null;
    }

    return decodeJWTToken(token);
  } catch (error) {
    console.error("Error getting user from token:", error);
    return null;
  }
}

/**
 * Clear authentication data
 */
export function clearAuth() {
  localStorage.removeItem("token");
  // Clear any other auth-related data if needed
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return token && !isTokenExpired(token);
}
