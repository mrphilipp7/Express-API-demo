const bcrypt = require("bcrypt");

const validatePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = { validatePassword, hashPassword };
