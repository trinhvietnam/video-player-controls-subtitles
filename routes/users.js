"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var validate = require('express-validation');
var ModelAccount_1 = require("../models/ModelAccount");
var Accounts_1 = require("../middlewares/authorisation/Accounts");
var Logger_1 = require("../utities/Logger");
var accounts_1 = require("../validations/accounts");
var log = Logger_1.Logger.getNewLogger(__filename);
var mAccount = new ModelAccount_1.ModelAccount();
router.post(Accounts_1.PATH.DETAIL_ACCOUNT, validate(accounts_1.VALIDATION_ACCOUNTS_DETAIL_ONE), Accounts_1.accountRoles.can(Accounts_1.ACTION.VIEW_DETAIL), function (req, res) {
    var id = req.params.id;
    mAccount.getById(id)
        .then(function (user) {
        res.json({ error: null, data: user });
    })["catch"](function (error) {
        res.json({ error: error });
    });
});
router.post(Accounts_1.PATH.UPDATE_ACCOUNT, validate(accounts_1.VALIDATION_ACCOUNTS_UPDATE), Accounts_1.accountRoles.can(Accounts_1.ACTION.UPDATE_ACCOUNT), function (req, res) {
    var userId = req.session.user.id; //It up to you
    mAccount.updateProperties(userId, req.body, userId)
        .then(function (result) {
        res.json({ error: null, data: result });
    })["catch"](function (error) {
        res.json({ error: error });
    });
});
module.exports = router;
