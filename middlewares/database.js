const mongoose = require('mongoose');
const mongoDB ='mongodb+srv://asma:LBcXeI02Qtwrmg2Y@cluster0.4du3t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.Promise = global.Promise;

mongoose.connect(mongoDB,{})
    .then(function(){
        mongoose.connection.on('connected',  function() {
            console.log('connected to mongo server.');
        });
        mongoose.connection.on('close', function (ref) {
            console.log('close connection to mongo server!');
        });
        mongoose.connection.db.on('reconnect', function (ref) {
            console.log('reconnect to mongo server!');
        });
    }).catch(function(err){
    mongoose.connection.on('error', function (err, next) {
        next(err);
    })}

);

module.exports = mongoose;
