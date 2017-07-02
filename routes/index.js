var express = require('express');
var router = express.Router();
var spiders = require('../modules/spider/index');
var screenShoot = require('../modules/screenShoot/screenShoot.js');
var News = require('../db/news');
var Cut = require('../db/cut');

var cors = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,If-Modified-Since, anonymous");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
};

router.options('/*', cors);
router.post('/*', cors);
router.get('/*', cors);

router.get('/', function(req, res, next) {
  spiders();
  res.json({ok:'ok'});
});

router.get('/list', function(req, res, next){
  News.find({},function(err, news){
      res.json({news:news});
  }).limit(50).sort({date:-1});
});

router.get('/article', function(req, res, next){
  var id = req.query.id;
  News.findOne({_id:id},function(err, news){
        res.json({news:news});
    })
});

router.get('/cut', function(req, res, next){
   var id = req.query.id;
   Cut.findOne({_id:id}, function(err, cut){
       res.json({cut:cut})
   })
});

router.post('/cutCreate', function(req,res,next){
    var cut = {
        state: req.body.data,
        title: req.body.title
    };
    Cut.create(cut, function(err, cut){
        if(err){
            res.json({
                code:500,
                msg:err,
                body:{}
            })
        }
        else{
            res.json({
                code:201,
                msg:'ok',
                body:{
                    cut:cut
                }
            })
        }
    })
});

router.post('/cutEdit', function(req,res,next){
    var id = req.body.id;
    var newState = req.body.data;
    var title = req.body.title;

    Cut.findOne({_id:id}, function(err, cut){
        if(cut && !err){
            cut.state = newState;
            cut.title = title;
            cut.save(function(err, cut){
                if(err){
                    res.json({
                        code:500,
                        msg:err,
                        body:{}
                    })
                }
                else{
                    res.json({
                        code:201,
                        msg:'ok',
                        body:{
                            cut:cut
                        }
                    })
                }
            })
        }
        else{
            res.json({
                code:500,
                msg:err,
                body:{}
            })
        }
    })
});

router.post('/screenShoot', function(req, res, next){
    var url = req.body.url;
    //var url = 'http://blog.csdn.net/sqzhao/article/details/48655979';
    screenShoot(url, function(err, url){
        if(err){
            res.json({
                code:500,
                msg:err,
                body:{}
            })
        }
        else{
            res.json({
                code:200,
                msg:'ok',
                body:{
                    url:url
                }
            })
        }
    });
});

router.post('/cutPush', function (req, res, next) {
    let image = req.body.get('image');
    console.log(image);
    res.json({
        code:'200'
    })

});

module.exports = router;
