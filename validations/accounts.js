"use strict";
exports.__esModule = true;
/**
 * Created by NamTV on 3/28/2017.
 */
var Joi = require('joi');
exports.VALIDATION_ACCOUNTS_DETAIL_ONE = {
    options: { allowUnknownBody: false },
    params: {
        id: Joi.number().required()
    }
};
exports.VALIDATION_ACCOUNTS_UPDATE = {
    options: { allowUnknownBody: false },
    body: {
        name: Joi.string().max(200),
        email: Joi.string().email().required(),
        age: Joi.number()
    }
};
