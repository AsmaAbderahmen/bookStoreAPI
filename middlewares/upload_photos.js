const multer = require('multer');

let Storage = multer.diskStorage(
    {
        destination: function (req, file, callback) {

            callback(null, './storage');
        },
        
        /*the filename will be composed by the exact date of its uploading and then the original name of the file;
          to avoid the collision of files with same name*/
        filename: function (req, file, callback) {
            callback(null,new Date().toISOString().replace( /:/g, '-') + file.originalname.replace(/\s/g, ''))
        }
    });

let fileFilterFN = function (req, file, callback) {

    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG|svg)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    else {
        callback(null, true)
    }
};

module.exports = multer({
    storage: Storage,
    fileFilter: fileFilterFN,
    limits: {_fileSize: 1024 * 1024 * 5}
});

