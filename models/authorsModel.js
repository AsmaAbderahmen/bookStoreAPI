const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let author_schema = Schema({
  

},
    { usePushEach: true, timestamps: true });

module.exports = mongoose.model('author', author_schema);

