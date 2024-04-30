const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  registerUser,
  loginUser,
  logoutUser,
  googleOauth2Callback,
} = require("../controllers/auth.controller");
const { validateLogin } = require("../validation/user.validation");
const loginLimit = require("../middleware/loginLimit");

router.post("/register", registerUser);

router.post(
  "/login",
  validateLogin,
  loginLimit,
  passport.authenticate("local"),
  loginUser
);

router.post("/logout", logoutUser);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3001/api/v1/auth/google/failureRedirect",
  }),
  googleOauth2Callback
);

router.get("/google/failureRedirect", (req, res, next) => {
  console.log("failed login");
  res.status(400).json({ message: "Google authentication failed" });
});

module.exports = router;
