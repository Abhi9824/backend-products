const mongoose = require("mongoose");
require('dotenv').config()

const mongoDB = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log(`Connection Successfully`);
    }
  } catch (error) {
    throw error;
  }
};
module.exports = { initializeDatabase };
