const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const password_recovering_Schema = new Schema({
    expiration_date: {
        type: Date
    },
    code: Number
},
    {
    usePushEach: true, timestamps: true
});

let user_schema = Schema({
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: function (email) {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(email)
            },
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required:true
        },
        password_recovering: password_recovering_Schema
    },
    {usePushEach: true, timestamps: true});

let User = mongoose.model('user', user_schema);
module.exports = User;
