"use strict";
exports.__esModule = true;
var EntityAccount_1 = require("../entities/EntityAccount");
/**
 * Created by NamTV on 5/25/2017.
 */
var Promise = require('bluebird');
var DatabaseHelper = (function () {
    function DatabaseHelper() {
    }
    /*
     * Excute query database here
     * */
    DatabaseHelper.query = function (query) {
        return new Promise(function (resolve, reject) {
            var account = new EntityAccount_1.EntityAccount('abc@gmail.com', 'abc', 18, 'password');
            resolve(account);
        });
    };
    return DatabaseHelper;
}());
exports.DatabaseHelper = DatabaseHelper;
