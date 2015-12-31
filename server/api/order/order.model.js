'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
    bookId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Orders', OrderSchema);
