const mongoose = require('mongoose');
const { sleep } = require('../utils/utilts.js');

const connectDB = async () => {
  const MAX_CONNECTION_RETRIES = 3;
  const CONNECTION_RETRY_DELAY = 2000; // in milliseconds
  let RETRY_COUNT = 0;

  const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017/test';

  while (RETRY_COUNT < MAX_CONNECTION_RETRIES) {
    try {
      mongoose.set('strictQuery', true);
      await mongoose.connect(uri);

      console.log(`Mongodb connection established`);

      break;
    } catch (error) {
      console.log('MongoDB connection error:', error);
      RETRY_COUNT++;

      if (RETRY_COUNT === MAX_CONNECTION_RETRIES) {
        console.log('Maximum connection retries reached. Exiting...');
        throw error;
      }

      console.log(`Retrying connection in ${CONNECTION_RETRY_DELAY / 1000} seconds...`);
      await sleep(CONNECTION_RETRY_DELAY);
    }
  }
};

module.exports = connectDB;
