const User = require("../services/user.services");
const { hashPassword } = require("../utils/password.utils");

/**
 * @desc make new user
 * @route POST api/v1/auth/register
 * @access public
 */
const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    newUser = await User.createNewUser(email, hashedPassword);

    res.status(200).json({
      email: newUser.email,
      id: newUser.id,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc log in user
 * @route POST api/v1/auth/login
 * @access public
 */
const loginUser = async (req, res, next) => {
  try {
    if (req.user) {
      return res.status(200).json({
        status: req.authInfo,
        user: { id: req.user.id, email: req.user.email },
      });
    } else {
      throw new Error("No user was found");
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @desc log user out
 * @route POST api/v1/auth/logout
 * @access public
 */
const logoutUser = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      // After successful logout
      return res.status(200).json({ message: "User logged out" });
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc login with google oauth2
 * @route GET api/v1/auth/google/callback
 * @access public
 */
const googleOauth2Callback = async (req, res, next) => {
  console.log("User logged in");
  res.status(200).json({ status: "success", user: req.user });
};

module.exports = { registerUser, loginUser, logoutUser, googleOauth2Callback };
