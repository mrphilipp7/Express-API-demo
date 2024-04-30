const express = require("express");
const compression = require("compression");
const createSession = require("./config/session.config");
const configureMorgan = require("./config/morgan.config");
const initializeDotenv = require("./config/dotenv.config");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const configureCors = require("./config/cors.config");
const passport = require("passport");
require("./config/passport.config");

// Required routes
const errorRoute = require("./routes/error.route");
const authRoute = require("./routes/auth.route");
const sessionRoute = require("./routes/session.route");

// Middleware
const { catchErrors } = require("./middleware/catchErrors");
const { controlHeaders } = require("./middleware/controlHeaders");

// Initialize app
const app = express();

// Protect headers
app.use(helmet());

// Use xss-clean middleware
app.use(xss());

// Initialize Dotenv
initializeDotenv();

// Compress res body to send JSON to client quicker
app.use(compression());

// Configure which domains can be access API
app.use(configureCors());

// Allows req.body and req.query params able to be accessed
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//----- log events in dev mode -----//
configureMorgan(app);

//-----session setup-----//
createSession(app);

//----middleware----//
app.use(controlHeaders);

//----passport setup-----//
app.use(passport.initialize());
app.use(passport.session());

//-----routes-----//
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/session", sessionRoute);
app.use("*", errorRoute);

//-----middleware-----//
app.use(catchErrors);

module.exports = app;
