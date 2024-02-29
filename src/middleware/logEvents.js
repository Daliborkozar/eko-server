// const { format } = require('date-fns');
// const { v4: uuid } = require('uuid');

// const fs = require('fs');
// const fsPromises = require('fs').promises;
// const path = require('path');

// const logEvents = async (message, logName) => {
//   const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
//   const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

//   try {
//     // if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
//     //   await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
//     // }

//     await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const createLogFiles = () => {
//   const logsDir = path.join(__dirname, '..', 'logs');

//   if (!fs.existsSync(logsDir)) {
//     fs.mkdirSync(logsDir);
//   }

//   const logFilePath = path.join(logsDir, 'access.log');
//   const errorFilePath = path.join(logsDir, 'error.log');

//   // // Create an empty log file if it doesn't exist
//   // if (!fs.existsSync(logFilePath)) {
//   //     fs.writeFileSync(logFilePath, '');
//   //   }
//   fs.appendFileSync(logFilePath, '');
//   fs.appendFileSync(errorFilePath, '');
// };

// module.exports = { createLogFiles, logEvents };

//! NOT NEEDED SINCE WE CANNOT ACCESS THEM
