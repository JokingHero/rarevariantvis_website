var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({ uploadDir: './uploads' });
var express = require('express');
var router = express.Router();


router.post('/uploads', multipartyMiddleware, function(req, res) {
	var id = req.body.id;
	
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    var file = req.files.file;
    console.log(file.name);
    console.log(file.type);
    console.log(id);

    //var tmp_path = req.files.thumbnail.path;
        // set where the file should actually exists - in this case it is in the "images" directory
      //  var target_path = './public/images/' + req.files.thumbnail.name;
        // move the file from the temporary location to the intended location
        //fs.rename(tmp_path, target_path, function(err) {
          //  if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            //fs.unlink(tmp_path, function() {
              //  if (err) throw err;
                //res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
            //});
        //});

    res.json({'id': id});
});

module.exports = router;