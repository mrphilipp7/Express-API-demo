// morgan.config.js
const morgan = require("morgan");

const configureMorgan = (app) => {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
  }
};

module.exports = configureMorgan;
