var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Linguist Master'});
});
router.get('/index', function (req, res, next) {
  res.render('index', {title: 'Linguist Master'});
});

/* GET language pages */
router.get('/spanish', function (req, res, next) {
  res.render('spanish', {title: 'Spanish'});
});

module.exports = router;
