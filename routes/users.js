var express = require('express');
var router = express.Router();
var myName = 'Jesse';
var movies = ['Fallen Angels', 'Drive My car', 'Nightmare Before christmas'];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/myname', function(req, res, next) {
  res.send(myName);
});

router.get('/myfavoritemovies', function(req, res, next) {
  res.json(movies);
});

module.exports = router;
