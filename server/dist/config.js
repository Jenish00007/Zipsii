"use strict";

var config = require("../package.json").projectConfig;
module.exports = {
  mongoConfig: {
    connectionUrl: config.mongoConnectionUrl,
    database: "db",
    collections: {
      VISITER: 'visitors',
      PASS_COLLECTION: 'passCollection'
    }
  },
  serverConfig: {
    ip: config.serverIp,
    port: config.serverPort
  },
  tokenSecret: "foodelivery_secret"
};