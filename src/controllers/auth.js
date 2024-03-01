const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CookieOptions } = require('../config/cookie');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  //console.log( user)
  if (!user || !pwd)
    return res.status(400).json({ message: 'Username and password are required.' });

  const foundUser = await User.findOne({ username: user }).select('+password');

  if (!foundUser) return res.sendStatus(400);

  // Evaluate password
  const match = await comparePassword(pwd, foundUser.password); // ovo se ne poklapa na create-u

  if (!match) return res.sendStatus(400);

  if (!foundUser.isActive) return res.status(400).send({ message: 'User not active' });

  console.log('user', foundUser);

  // create JWTs

  const { _id, username, role, organization, displayName } = foundUser;

  const token = jwt.sign(
    {
      UserInfo: {
        _id,
        username,
        role,
        organization,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '20min' }
  );

  const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

  res.cookie('refreshToken', refreshToken, CookieOptions);

  return res.status(200).json({
    token,
    user: {
      _id,
      displayName,
      role,
      organization,
    },
  });
};

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.sendStatus(204);
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies, 'refresh token');
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  const foundUser = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403); //Forbidden
      // Delete refresh tokens of hacked user
      const hackedUser = await User.findOne({ username: decoded.username }).exec();
      hackedUser.refreshToken = [];
      const result = await hackedUser.save();
    });
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      // expired refresh token
      foundUser.refreshToken = [...newRefreshTokenArray];
      const result = await foundUser.save();
    }
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

    // Refresh token was still valid
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    const newRefreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  });
};

const comparePassword = async (plainPw, hash) => {
  return bcrypt.compare(plainPw, hash);
};

module.exports.AuthController = {
  handleLogin,
  handleLogout,
  handleRefreshToken,
};
