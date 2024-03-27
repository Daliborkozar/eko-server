const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CookieOptions } = require('../config/cookie');

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;

  if (!email || !pwd) return res.status(400).json({ message: 'Email and password are required.' });

  const foundUser = await User.findOne({ email }).select('+password');

  if (!foundUser) return res.sendStatus(400);

  if (!foundUser.isActive) return res.status(400).send({ message: 'User not active' });

  // Evaluate password
  const match = await comparePassword(pwd, foundUser.password); // ovo se ne poklapa na create-u

  if (!match) return res.sendStatus(400);

  const { _id, role, organization, displayName } = foundUser;

  const accessToken = jwt.sign(
    {
      user: {
        _id,
        role,
        organization,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );

  const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });

  res.cookie('refreshToken', refreshToken, CookieOptions);

  return res.status(200).json({
    accessToken,
    user: {
      _id,
      displayName,
      role,
      organization,
    },
  });
};

const handleRefreshToken = async (req, res) => {
  if (!req.cookies?.refreshToken) return res.sendStatus(401);

  let userId = null;

  try {
    const decoded = verifyToken(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded._id) throw new Error();

    userId = decoded._id;
  } catch (err) {
    return res.sendStatus(401);
  }

  const user = await User.findById(userId).lean();

  if (!user) return res.sendStatus(404);

  const accessToken = signToken(
    {
      user: {
        _id: userId,
        role: user.role,
        organization: user.organization,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );

  const refreshToken = signToken({ _id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });

  res.cookie('refreshToken', refreshToken, CookieOptions);

  return res.status(200).send({ accessToken });
};

const me = async (req, res) => {
  if (!req.user) return res.sendStatus(400);

  const user = await User.findById(req.user._id).lean();

  if (!user) return res.sendStatus(404);

  return res.status(200).send(user);
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

module.exports.AuthController = {
  handleLogin,
  handleRefreshToken,
  me,
};
