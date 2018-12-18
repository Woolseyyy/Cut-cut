/**
 * Created by admin on 2017/6/30.
 */

//temp I will change to qiniu yun
var fs = require('fs');
var util = require('util');

module.exports = function (url, next) {
    var name = new Buffer(url+new Date().toUTCString());
    name = name.toString('base64');

    var phantomjs = require('phantomjs-prebuilt');
    var program = phantomjs.exec('modules/screenShoot/phantomjs-script.js', url, name);
    program.stdout.pipe(process.stdout);
    program.stderr.pipe(process.stderr);
    program.on('exit', function(code) {
        try{
            if(code===0){
                var is = fs.createReadStream('modules/screenShoot/temp/'+name+'.png');
                var os = fs.createWriteStream('public/img/'+name+'.png');
                var newUrl = "http://localhost:3000/img/"+name+'.png';
                is.pipe(os);
                fs.unlinkSync('modules/screenShoot/temp/'+name+'.png');
                next(null, newUrl);
            }
        }
        catch (e){
            console.log(e);
        }
    });
};