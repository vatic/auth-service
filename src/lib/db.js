const MongoClient = require('mongodb').MongoClient;

const mongo = {
  connect: (config) => {
    const { host, port, db } = config;
    return MongoClient.connect(`mongodb://${host}:${port}/${db}`);
  },
};

module.exports = mongo;
