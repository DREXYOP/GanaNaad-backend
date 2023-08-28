// set up rate limiter: maximum of five requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 10,
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  message: "Too many requests maid from this IP, please try again after an hour",
  skipFailedRequests : true,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;