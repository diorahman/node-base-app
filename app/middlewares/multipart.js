
/*
  Multipart request handling with formidable
  uploaded files will be stored in config.uploadDir
  By default, files are kept 
  By setting req.removeFile somewhere in request handler, 
  file will be removed when request end
*/

var fs = require('fs-extra');

if (!fs.existsSync(config.uploadDir)) 
  fs.mkdirsSync(config.uploadDir);

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
    uploadDir: config.uploadDir, 
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

    // if we want it, delete it
    if (req.removeFile && req.removeFile === true) {
      if (req.files) {
        for (file in req.files) {
          var fileData = req.files[file];
          if (fs.existsSync(fileData.path))
            fs.unlinkSync(fileData.path);
        }
      }
    }
  };
}