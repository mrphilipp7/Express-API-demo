const rateLimit = require("express-rate-limit");

const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Attempts limit exceeded. Please try again later.",
});

module.exports = loginLimit;
