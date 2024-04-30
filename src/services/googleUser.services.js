const GoogleUser = require("../models/googleUser.model");

const findGoogleUserByID = async (id) => {
  return await GoogleUser.findById(id);
};

const findUserByGoogleId = async (id) => {
  return await GoogleUser.findOne({ googleId: id });
};

const findOrCreate = async (googleAccount) => {
  const user = await GoogleUser.findOne({ googleId: googleAccount.id });

  // If a user is found, return that user
  if (user) {
    return user;
  }

  return (newUser = await GoogleUser.create({
    googleId: googleAccount.id,
    displayName: googleAccount.displayName,
    provider: "Google",
  }));
};

module.exports = { findOrCreate, findUserByGoogleId, findGoogleUserByID };
