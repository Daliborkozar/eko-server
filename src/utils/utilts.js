const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sleep = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const comparePassword = async (plainPw, hash) => {
  return bcrypt.compare(plainPw, hash);
};

const verifyToken = (accessToken, key) => {
  return jwt.verify(accessToken, key);
};

const signToken = (payload, key, options) => {
  return jwt.sign(payload, key, options);
};

const hashPassword = plainPw => {
  return bcrypt.hash(plainPw, 10);
};
module.exports.Utils = {
  sleep,
  comparePassword,
  verifyToken,
  signToken,
  hashPassword,
};
