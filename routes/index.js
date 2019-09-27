var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Linguist Master'});
});

router.get('/spanish', function (req, res, next) {
  res.render('spanish', {title: 'Spanish'}, {layout: 'layoutWithJQUERY'});
});

module.exports = router;
