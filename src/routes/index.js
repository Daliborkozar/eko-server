module.exports.LoadRoutes = app => {
  app.use('/auth', require('./auth'));
  app.use('/users', require('./users'));
  app.use('/patient', require('./patient'));
};
