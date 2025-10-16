// Simple in-memory rate limiter for DDoS protection
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function checkRateLimit(identifier: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(identifier);

  if (!rateLimitData || now > rateLimitData.resetTime) {
    // New window or expired window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }

  if (rateLimitData.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  rateLimitData.count++;
  return true;
}
