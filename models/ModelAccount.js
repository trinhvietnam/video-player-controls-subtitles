/**
 * Created by nam on 3/11/2017.
 */
"use strict";
exports.__esModule = true;
var Logger_1 = require("../utities/Logger");
var DatabaseHelper_1 = require("../databases/DatabaseHelper");
var Promise = require("bluebird");
var log = Logger_1.Logger.getNewLogger(__filename);
/*
 * Do main task relative Acount
 * */
var ModelAccount = (function () {
    function ModelAccount() {
    }
    ModelAccount.prototype.getAccountByEmail = function (email) {
        return new Promise(function (resolve, reject) {
            var query = 'SELECT * FROM user WHERE email = ' + email; //that is example
            DatabaseHelper_1.DatabaseHelper.query(query)
                .then(function (account) {
                resolve(account);
            })["catch"](reject);
        });
    };
    ModelAccount.prototype.getById = function (id) {
        return new Promise(function (resolve, reject) {
            var query = 'SELECT * FROM user WHERE id = ' + id; //that is example
            DatabaseHelper_1.DatabaseHelper.query(query)
                .then(function (account) {
                resolve(account);
            })["catch"](reject);
        });
    };
    ModelAccount.prototype.updateProperties = function (id, properties, userIdExcute) {
        return new Promise(function (resolve, result) {
            //Do update by DatabaseHelper here
            resolve(true);
        });
    };
    return ModelAccount;
}());
exports.ModelAccount = ModelAccount;
