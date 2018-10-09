var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/getlist', function(req, res, next){
	
	var con = req.con;
	con.query('SELECT * FROM `world`.`city`', function(err, rows) {
        if (err) {
            console.log(err);
        }        
        res.json(rows);
    });
});

module.exports = router;
