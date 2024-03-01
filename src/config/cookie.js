const isDev = process.env.NODE_ENV === 'development';

module.exports.CookieOptions = {
  httpOnly: true,
  sameSite: isDev ? true : 'none',
  secure: isDev ? false : true,
  //maxAge: '8 days', // more than length of refresh token, otherwise its lost
};
