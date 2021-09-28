const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let author_schema = Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    biography: {
        type: String,
    },
    image: {
        type: String
    },

},
    { usePushEach: true, timestamps: true });

module.exports = mongoose.model('author', author_schema);

