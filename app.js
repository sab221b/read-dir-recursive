var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var apiRouter = require('./routes/apiRouter');

app.get("/", function (req, res, next) {
    res.send({ message: "Access Restricted", error: { status: 403, stack: 'Forbidden' } });
});

app.use('/api', apiRouter);

module.exports = app;
