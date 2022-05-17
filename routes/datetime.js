var express = require('express');
var router = express.Router();
var datetime = new Date();

router.get('/', function(req, res, next) {
    res.send(datetime);
});

module.exports = router;