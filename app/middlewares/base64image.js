
var path = require('path');
var fs = require("fs");

function checkBase64(raw) {
  return raw && typeof(raw) == 'string' && raw.match(/^data:image\/png;base64,/)
}

exports.get = function (req, res, next) {

  if (req.body.hasOwnProperty('base64image')) {
    var raw = req.body.base64image;
    if (!checkBase64(raw)) 
      return next();

    var base64 = raw.replace(/^data:image\/png;base64,/, "");
    var filename = Utils.uid(64) + '.png';
    var filepath = path.join(config.photoDir, filename);
    fs.writeFile(filepath, base64, 'base64', function(err) {
      if (err) return next(err);

      fs.stat(filepath, function(err, stat) {
        req.files.image = {
          name: filename,
          path: filepath,
          type: 'image/png',
          size: stat ? stat.size : base64.length/1.37
        };
        delete req.body.base64image;
        return next();
      })

    });
  }
  else {
    next();
  }

}
