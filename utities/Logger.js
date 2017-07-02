"use strict";
exports.__esModule = true;
/**
 * Created by NamTV on 3/20/2017.
 */
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: __dirname + '/../log/logFile.log', json: true })
    ]
});
var Logger = (function () {
    function Logger(tf) {
        this.tagFile = '[' + tf + ']';
    }
    Logger.prototype.getGoodFor = function (values) {
        var formatter = '';
        for (var i = 0; i < values.length; i++) {
            switch (typeof values[i]) {
                case 'string':
                    formatter += ' %s';
                    break;
                case 'number':
                    formatter += ' %d';
                    break;
                default:
                    formatter += ' %j';
                    break;
            }
        }
        return formatter;
    };
    Logger.prototype.log = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.info.apply(this, values);
    };
    Logger.prototype.info = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var formatter = this.tagFile + this.getGoodFor(values);
        // logger.log('info',formatter,...values);
        console.log.apply(console, ['TAG FILE = ' + this.tagFile].concat(values));
    };
    Logger.prototype.err = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var formatter = this.tagFile + this.getGoodFor(values);
        // logger.log('error',formatter,...values);
        console.error.apply(console, ['TAG FILE = ' + this.tagFile].concat(values));
    };
    Logger.prototype.errFormat = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        logger.log.apply(logger, ['error'].concat(values));
    };
    Logger.prototype.infoFormat = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        logger.log.apply(logger, ['info'].concat(values));
    };
    Logger.prototype.logFormat = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        logger.log.apply(logger, ['info'].concat(values));
    };
    Logger.getNewLogger = function (tf) {
        return new Logger(tf);
    };
    return Logger;
}());
exports.Logger = Logger;
