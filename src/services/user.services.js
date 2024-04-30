const User = require("../models/user.model");

const findUserByID = async (id) => {
  return await User.findById(id);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createNewUser = async (email, password) => {
  return await User.create({
    email,
    password: password,
  });
};

const findOrCreate = async (googleAccount) => {
  const user = await User.findOne({ googleId: googleAccount.id });

  // If a user is found, return that user
  if (user) {
    return user;
  }

  return (newUser = await User.create({}));
};

module.exports = { findUserByID, findUserByEmail, createNewUser, findOrCreate };
