"use strict";
exports.__esModule = true;
var Logger_1 = require("../../utities/Logger");
var ModelAccount_1 = require("../../models/ModelAccount");
/**
 * Created by NamTV on 3/16/2017.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var log = Logger_1.Logger.getNewLogger(__filename);
var mAccount = new ModelAccount_1.ModelAccount();
exports.passportConfig = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        mAccount.getAccountByEmail(email)
            .then(function (account) {
            if (account && account.password == password) {
                return done(null, account);
            }
            else {
                done({ ec: 'Password is wrong' });
            }
        })["catch"](function (error) {
            return done(error);
        });
        // return done(null, {username,password});
    }));
};
