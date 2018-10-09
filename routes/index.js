var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("index route");
  res.render('index.ejs');
});

router.get('/list', function(req, res, next){
	res.render('list.ejs');
});

module.exports = router;
