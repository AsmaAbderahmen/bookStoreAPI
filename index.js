const express = require('express');
const cors = require('cors');
const http = require('http');
const logger = require('morgan');

const http_errors = require('http-errors');
let port = process.env.port || '3000';


let app = express();
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.enable('trust proxy', true);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, authorization, x-access-token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'production' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});


app.use(function (req, res, next) {
    next(http_errors(404));
});

http.createServer({
    passphrase: 'apiBookStore2021'
}, app)
    .listen(port, function (err) {
        if (err)
            console.error(err)
        console.log(`server is runing on port ${port}`)
    });




