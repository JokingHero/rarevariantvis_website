var express = require('express');
var router = express.Router();

router.get('/downloads', function(req, res, next) {
    res.json(true);
});

router.get('/downloads/:id', function(req, res, next) {
    var id = req.params.id;
    if (id) {
        res.json(true);
    } else {
        res.json(false);
    }
});


module.exports = router;
