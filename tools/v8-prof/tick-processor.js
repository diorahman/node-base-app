'use strict';
var cp = require('child_process');
var fs = require('fs');
var path = require('path');

var scriptFiles = [
    path.join(__dirname, 'polyfill.js'),
    path.join(__dirname, 'splaytree.js'),
    path.join(__dirname, 'codemap.js'),
    path.join(__dirname, 'csvparser.js'),
    path.join(__dirname, 'consarray.js'),
    path.join(__dirname, 'csvparser.js'),
    path.join(__dirname, 'consarray.js'),
    path.join(__dirname, 'profile.js'),
    path.join(__dirname, 'profile_view.js'),
    path.join(__dirname, 'logreader.js'),
    path.join(__dirname, 'tickprocessor.js'),
    path.join(__dirname, 'SourceMap.js'),
    path.join(__dirname, 'tickprocessor-driver.js')];
var tempScript = path.join(__dirname, 'tick-processor-tmp-' + process.pid);

process.on('exit', function() {
  try { fs.unlinkSync(tempScript); } catch (e) {}
});
process.on('uncaughtException', function(err) {
  try { fs.unlinkSync(tempScript); } catch (e) {}
  throw err;
});

var inStreams = scriptFiles.map(function(f) {
  return fs.createReadStream(f);
});
var outStream = fs.createWriteStream(tempScript);
inStreams.reduce(function(prev, curr, i) {
  prev.on('end', function() {
    curr.pipe(outStream, { end: i === inStreams.length - 1});
  });
  return curr;
});
inStreams[0].pipe(outStream, { end: false });
outStream.on('close', function() {
  var tickArguments = [tempScript];
  if (process.platform === 'darwin') {
    tickArguments.push('--mac', '--nm=' + path.join(toolsPath, 'mac-nm'));
  } else if (process.platform === 'win32') {
    tickArguments.push('--windows');
  }
  tickArguments.push.apply(tickArguments, process.argv.slice(2));
  var processTicks = cp.spawn(process.execPath, tickArguments, { stdio: 'inherit' });
});
