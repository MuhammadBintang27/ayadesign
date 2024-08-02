const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

const JWT_KEY = process.env.JWT_SECRET;
const MONGO_URL = process.env.MONGO_URL;
module.exports = {
  JWT_KEY,
  MONGO_URL
};
