var express = require("express");
var router = express.Router();

const fileController = require("../controllers").files;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ message: "Access Restricted", error: { status: 403, stack: 'Forbidden' } });
});

// File Router 
router.get('/files/list', fileController.list);

module.exports = router;
