var express = require('express');
var router = express.Router();
var screenShoot = require('../modules/screenShoot/screenShoot.js');
var News = require('../db/news');
var Cut = require('../db/cut');
var User = require('../db/user');
var Category = require('../db/category');

var cors = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,If-Modified-Since, anonymous");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1');
    next();
};

//router.options('/*', cors);
//router.post('/*', cors);
//router.get('/*', cors);

/*router.get('/', function(req, res, next) {
  spiders();
  res.json({ok:'ok'});
});*/

router.post('/login', function(req,res,next){
   var username = req.body.user;
   var password = req.body.password;
   User.findOne({
       username:username,
       password:password
   }, function(err, user){
       if(err){
           console.log(err);
           res.json({
               code:500,
               msg:'something wrong about databse'
           })
       }
       else{
           if(!user){
               res.json({
                   code:204,
                   msg:'password or username error'
               })
           }
           else{
               user.password = null;
               req.session.user = user;
               //console.log(req.session.id)
               res.json({
                   code:200,
                   msg:'登陆成功',
                   interest:user.interest
               })
           }
       }
   })
});

router.post('/sign', function(req,res,next){
    var username = req.body.user;
    var password = req.body.password;
    var email = req.body.email;
    User.findOne({
        username:username
    }, function(err, user){
        if(err){
            console.log(err);
            res.json({
                code:500,
                msg:'something wrong about databse'
            })
        }
        else{
            if(user){
                res.json({
                    code:204,
                    msg:'username exits'
                })
            }
            else{
                new User({
                    username:username,
                    password:password,
                    email:email
                }).save(function (err, user) {
                    user.password = null;
                    req.session.user = user;
                    //console.log(req.session.id);
                    res.json({
                        code:200,
                        msg:'注册成功'
                    })
                });
            }
        }
    })
});

router.get('/interestList', function(req,res,next){
    res.json({
        code:200,
        list:Category.data
    })
});

router.post('/interest', function(req,res,next){
   var user =  req.session.user;
    User.findOne({
       _id:req.session.user._id
   }, function (err, user) {
       if(!err && user){
           user.interest = req.body.interest;
           req.session.user.interest = user.interest;
           user.save(function(err, user){
               res.json({
                   code:200,
                   interest:user.interest
               })
           })
       }
   })
});



router.get('/list', function(req, res, next){
    var user = req.session.user;
    var interest = user.interest;
    var type = req.query.id;
    if(!type || type==="推荐" ||type===undefined){
        News.find({
            category: {$in:interest}
        } , function (err, news) {
            res.json({
                code:200,
                news:news,
                area:Category.area(type)
            })
        }).sort({
            date:-1
        }).limit(100)
    }
    else{
        News.find({
            category: type
        } , function (err, news) {
            res.json({
                code:200,
                news:news,
                area:Category.area(type)
            })
        }).sort({
            date:-1
        }).limit(100)
    }

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
        title: req.body.title,
        author: req.session.user._id
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
    var image = req.body.get('image');
    console.log(image);
    res.json({
        code:'200'
    })

});

router.get('/profile', function(req, res, next){
    var id = req.session.user._id;
    Cut.find({
        author:id
    }, function (err, cuts) {
        if(cuts){
            for(var item in cuts){
                cuts[item].content = null;
            }
        }
        else{
            cuts = [];
        }
        res.json({
            cuts : cuts,
            user : req.session.user
        })
    })
})

module.exports = router;
