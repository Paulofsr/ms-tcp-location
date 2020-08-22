var winston = require('winston');
require('winston-daily-rotate-file');
var HelperFactory = require('../helpers/mainHelper');

module.exports = function (settings) {
    var hashHelper = HelperFactory.getHelper('hash');
    var dateHelper = HelperFactory.getHelper('date');
    var logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: settings.logging.consoleLevel || 'debug'
            }),
            new(winston.transports.DailyRotateFile)({
                level: settings.logging.fileLevel || 'debug',
                filename: 'logs/location-%DATE%.log',
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: false,
                maxSize: '20m',
                maxFiles: '15d'
            })
        ]
    });

    var obj = {
        correlationId: null,
        currentUser: null,

        info: function (...args) {
            logger.info(args);
        },

        debug: function (...args) {
            logger.debug(args);
        },

        warn: function (...args) {
            logger.warn(args);
        },

        error: function (...args) {
            logger.error(args);
        },

        configureFormat: function () {
            var self = this;
            logger.format = winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(function (info) {
                    if (self.currentUser) {
                        return '[' + info.timestamp + '] ' + self.correlationId + '@' + self.currentUser.id + ' - ' + info.message;
                    } else {
                        return '[' + info.timestamp + '] ' + self.correlationId + ' ' + info.message;
                    }
                })
            );
        }
    };

    obj.correlationId = hashHelper(dateHelper.getNow().getTime() + Math.random());
    obj.configureFormat();

    return obj;
};