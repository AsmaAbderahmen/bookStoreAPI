const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let book_schema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    pages: {
        type: String
    },
    image: {
        type: String
    },
    author: {
        ref: 'author',
        type: Schema.Types.ObjectId,
    },
    price: {
        type: String,
    }
},
    { timestamps: true });

module.exports = mongoose.model('book', book_schema);
