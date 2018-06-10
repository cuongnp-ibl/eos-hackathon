const mongoose = require('mongoose' )
const logger   = require('modules/logger')

class MongooseConnection {
  connect(uri, options, cb) {
    if (typeof(options)==='undefined') options = {};

    // This method use for single connection.
    mongoose.connect(uri, options);

    const connection = mongoose.connection;

    // NOTE: Don't use `createConnection` usually connected but can not create db or any collections
    // let connection = mongoose.createConnection(uri, options)

    connection.on('connected', function () {
      logger.info('mongoose-connection::connected:' + uri);
    });

    connection.on('disconnected', function () {
      logger.error('mongoose-connection::disconnected:' + uri);
    });

    connection.on('reconnected', function () {
      logger.warn('mongoose-connection::reconnected:' + uri);
    });

    connection.on('error',function (error) {
      logger.error('mongoose-connection::' + uri + '::error: ' + error);
    });

    const gracefulExit = () => {
      connection.close(function () {
        logger.warn('Mongoose default connection with database :' + uri + ' is disconnected through app termination');
        process.exit(0);
      });
    };

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

    return connection;
  }

}

module.exports = new MongooseConnection();

