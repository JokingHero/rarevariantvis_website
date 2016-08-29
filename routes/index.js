var express = require('express');
var router = express.Router();

var shortid = require('shortid');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index');
});

router.get('/id', function(req, res, next) {
	res.json({'id': shortid.generate()});
});

module.exports = router;
