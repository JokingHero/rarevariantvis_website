var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({ uploadDir: './uploads' });
var express = require('express');
var router = express.Router();

var fs = require('fs-extra');
var queue = require('../jobs/queue');
var path = require('path');
var _ = require('lodash');

var definedExtensions = {
    'smth': ['.pdf', '.jpg'],
    'else': ['.pdf', '.gtf', '.jpg', '.add']
}

router.post('/submission', multipartyMiddleware, function(req, res) {
    var id = req.body.id;
    var file = req.files.file;
    //if (file.type != 'tomka format') res.status(500).send(err);
    var target_path = './public/analysis/' + id;

    fs.ensureDir(target_path, function(err) {

        if (err) res.status(500).send(err);
        fs.move(file.path, path.join(target_path, file.name), function(err) {

            if (err) res.status(500).send(err);
            fs.readdir(target_path, function(err, files) {

                if (err) res.status(500).send(err);
                var extensions = _.map(files, path.extname);
                if (_.isEqual(extensions.sort(), definedExtensions[req.body.type].sort())) {

                    var job = queue.create('script', {
                        id: id,
                        type: req.body.type
                    }).priority('high').save(function(err) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.send('Worker added.');
                        }
                    });

                    job.on('complete', function() {
                        console.log('job completed');
                    });

                } else {
                    res.send('File uplaoded.');
                }
            });
        });
    });
});

module.exports = router;
