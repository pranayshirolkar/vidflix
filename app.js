/*A very good example of how to write recursive (parallel) function
var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};
*/
var connect = require('connect');
var serveStatic = require ('serve-static');
var fs = require('fs');
//read file system for mp4 files
//update the videoList.json file
var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
        	if(file.endsWith(".mp4")){
        		file=file.substring(file.indexOf("vidflix")+8);
          		results.push({
          			"name": file});        		
        	}
          if (!--pending) done(null, results);
        }
      });
    });
  });
};
walk(__dirname,function(err, results){
	if (err) throw err;
	fs.writeFile("videoList.json",JSON.stringify(results), "utf8", function(err, done){
		//if err throw err;		
		connect().use(serveStatic(__dirname)).listen(80, function(){
		console.log('Server running on port 80');
	});
});
});