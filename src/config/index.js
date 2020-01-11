const NODE_ENV = process.env.NODE_ENV || "development";
if (NODE_ENV == "development") require("dotenv").config();

const config = {
  PORT: process.env.PORT
};

module.exports = config;
