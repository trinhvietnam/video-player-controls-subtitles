/**
 * Created by NamTV on 3/28/2017.
 */
"use strict";
exports.__esModule = true;
var ConnectRoles_1 = require("./ConnectRoles");
var Logger_1 = require("../../utities/Logger");
var Promise = require('bluebird');
var log = Logger_1.Logger.getNewLogger(__filename);
exports.PATH = {
    DETAIL_ACCOUNT: '/:id',
    UPDATE_ACCOUNT: '/:id/update',
    UPDATE_ACCOUNT_PARAMS: {
        id: 'id'
    }
};
exports.ACTION = {
    VIEW_DETAIL: 'VIEW_DETAIL',
    UPDATE_ACCOUNT: 'UPDATE_ACCOUNT'
};
ConnectRoles_1["default"].use(exports.ACTION.UPDATE_ACCOUNT, exports.PATH.UPDATE_ACCOUNT, function (req) {
    return new Promise(function (resolve, reject) {
        /*
        * Check role in here
        * call resolve(true) if ok
        * call resolve(false)  if haven't role
        * call(null) to next
        * */
    });
});
ConnectRoles_1["default"].use(exports.ACTION.VIEW_DETAIL, exports.PATH.DETAIL_ACCOUNT, function (req) {
    return new Promise(function (resolve, reject) {
        resolve(true);
    });
});
exports.accountRoles = ConnectRoles_1["default"];
