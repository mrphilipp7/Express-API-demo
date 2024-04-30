// dotenv.config.js
const dotenv = require("dotenv");

const initializeDotenv = () => {
  const configResult = dotenv.config();
  if (configResult.error) {
    console.error("Error loading .env file:", configResult.error);
  }
};

module.exports = initializeDotenv;
