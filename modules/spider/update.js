/**
 * Created by admin on 2017/6/28.
 */
var News = require('../../db/news');

var update = function(news){
    News.findOne({
        title:news.title,
        date:news.date
    }, function (err, exist) {
        if(err){
            console.log("\nupdate error!");
            console.log("msg:"+err);
            console.log("happens when check exist:" + news);
        }
        else {
            if(exist===null){
                News.create(news, function(err){
                    if(err){
                        console.log("\nupdate error!");
                        console.log("msg:"+err);
                        console.log("happens when store:" + news);
                    }
                })
            }
        }
    })
};

module.exports = update;