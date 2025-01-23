import { initRateLimit } from 'next-rate-limit';

const rateLimit = initRateLimit({
  headers: true, // Sends rate-limit headers in the response
  // Define your rate limits here
  limits: [
    { interval: 60 * 1000, max: 15 }, // Max 10 requests per minute
  ],
});

export default async function withRateLimit(req, res, next) {
  try {
    // Check rate limit
    await rateLimit.check(req, res);
    return next();
  } catch (error) {
    res.status(429).json({
      error: 'Too many requests. Please try again later.',
    });
  }
}