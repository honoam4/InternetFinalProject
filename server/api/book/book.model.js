'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;


/**
 * Book Schema
 */
var BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    bigPic: {
        type: String
    },
    price: {
        type: String,
        default: '0',
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    publishYear: {
        type: String
    },
    rating: {
        type: Number
    },
    reviews: {
        type: Array
    },
    synopsis: {
        type: String
    }
});

module.exports = mongoose.model('Books', BookSchema);