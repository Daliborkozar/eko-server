const logger = app => {
  // const path = require('path');
  const morgan = require('morgan');
  // const rfs = require('rotating-file-stream');

  // create a rotating write stream
  //! NOT NEEDED
  // const accessLogStream = rfs.createStream('access.log', {
  //   interval: '1d', // rotate daily
  //   path: path.join(__dirname, '..', 'logs'),
  // });
  // app.use(morgan('tiny', { stream: accessLogStream }));

  app.use(morgan(':date[web] | :method :url :status :res[content-length] - :response-time ms'));
};

module.exports = logger;
