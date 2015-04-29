
var fs = require('fs');
var util = require('util');
var mkdirp = require('mkdirp');

if (!fs.existsSync(config.photoDir)) 
  mkdirp.sync(config.photoDir);

var formidable = require('formidable');

function hasBody(req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
};

function mime(req) {
  var str = req.headers['content-type'] || '';
  return str.split(';')[0];
};

exports.do = function(req, res, next) {

  if (req._body) return next();
  req.body = req.body || {};
  req.files = req.files || {};

  if (!hasBody(req)) return next();
  if ('GET' == req.method || 'HEAD' == req.method) return next();
  if ('multipart/form-data' != mime(req)) return next();

  req._body = true;

  var form = new formidable.IncomingForm({ 
    keepExtensions: true, 
    uploadDir: config.photoDir, 
    multiples: true,
    maxFieldsSize: 10 * 1024 * 1024 
  });

  form.parse(req, function(err, fields, files) { 
    if (err) {
      return next(err);
    }

    req.body = fields;
    req.files = files;
    next();
  });

  var end = res.end;
  res.end = function(chunk, encoding){
    res.end = end;
    res.end(chunk, encoding);

    // if we want it
    if (!(req.keepFile && req.keepFile === true)) {
      // delete temp when done
      if (req.files) {
        for (file in req.files) {
          var fileData = req.files[file];
          //console.log('Delete file', fileData.path);
          if (fs.existsSync(fileData.path))
            fs.unlinkSync(fileData.path);
        }
      }
    }
  };
}