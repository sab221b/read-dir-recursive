var express = require('express');
var path = require('path');
var router = express.Router();

const staticMiddleware = express.static(path.join(__dirname, 'build'));
router.use('/', (req, res, next) => {
    console.log('__dirname', __dirname)
    staticMiddleware(req, res, next);
})


module.exports = router;
