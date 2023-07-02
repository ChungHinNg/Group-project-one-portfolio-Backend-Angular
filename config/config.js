// Do not expose your credentials in your code.

require("dotenv").config();
module.exports = {
  ATLASDB: process.env.ATLASDB,
  LOCALDB: "mongodb://localhost:27017/status200",
  SECRETKEY: process.env.SECRETKEY,
};
