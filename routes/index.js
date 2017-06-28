var express = require('express');
var router = express.Router();
var spiders = require('../spider/index');
var News = require('../db/news');

/* GET home page. */
var cors = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,If-Modified-Since");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
};

router.get('/', function(req, res, next) {
  spiders();
  res.json({ok:'ok'});
});

router.get('/list', cors);
router.get('/list', function(req, res, next){
  News.find({},function(err, news){
      res.json({news:news});
  })
});

router.get('/article', cors);
router.get('/article', function(req, res, next){
  var id = req.query.id;
  News.findOne({_id:id},function(err, news){
        res.json({news:news});
    })
});


module.exports = router;
