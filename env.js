require('dotenv').config();
const env = process.env;
module.exports = {
    port: env.PORT || 5000,
    CLEARDB_DATABASE_URL: process.env.CLEARDB_DATABASE_URL,
}