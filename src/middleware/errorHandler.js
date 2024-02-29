// const { logEvents } = require('./logEvents');

// const errorHandler = (err, req, res, next) => {
//   logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
//   console.error(err.stack);
//   res.status(500).send(err.message);
// };

// module.exports = errorHandler;

// const { logger } = require("../utils/logger");
class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.status = 'error';
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, _req, res, next) => {
  const { statusCode, message } = err;

  console.error(err);

  res.status(statusCode || 500).json({
    status: 'error',
    statusCode: statusCode || 500,
    message: statusCode === 500 ? 'An error occurred' : message,
  });
  next();
};
module.exports = {
  ErrorHandler,
  handleError,
};
