module.exports.LoadRoutes = app => {
  app.use('/auth', require('./auth'));
  app.use('/users', require('./user'));
  app.use('/patients', require('./patient'));
};
