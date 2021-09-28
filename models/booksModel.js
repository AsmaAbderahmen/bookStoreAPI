const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let book_schema = new Schema({
 
},
    { timestamps: true });

module.exports = mongoose.model('book', book_schema);
