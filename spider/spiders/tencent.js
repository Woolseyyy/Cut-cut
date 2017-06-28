/**
 * Created by admin on 2017/6/28.
 */
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var http = require('http');

var update = require('../update');

var spiderArticle = function(url){
    request.get({url:url, encoding:null}, function(error, response, body) {
        if (!error && response.statusCode === 200 && body) {
            try {
                var html = iconv.decode(body, 'gb2312');
                html = iconv.encode(html, 'utf8');
                var $ = cheerio.load(html, {decodeEntities: false});
                var title = $('.hd').children()[0].children[0].data;
                var category = $('.a_catalog').children()[0].children[0].data;
                var article = $('#Cnt-Main-Article-QQ').children();

                var dateStrArray = $('.a_time')[0].children[0].data.split(/-|\s+|:/);
                var date = new Date(dateStrArray[0], dateStrArray[1], dateStrArray[2], dateStrArray[3], dateStrArray[4], "00");

                var author = $('.a_source');
                if(author.children()[0]){
                    author = author.children()[0].children[0].data;
                }
                else{
                    author = author[0].children[0].data;
                }

                var content = [];
                var img = null;
                for(var p=0; p<article.length; p++){

                    var d = article[p].children[0];
                    if(d && d.type==='text'){
                        content.push({
                            type:d.type,
                            data:d.data
                        })
                    }
                    else if(d && d.name==='img'){
                        content.push({
                            type:d.name,
                            alt:d.attribs.alt,
                            src:d.attribs.src
                        });
                        if(img===null){
                            img = d.attribs.src;
                        }
                    }
                }


                var news = {
                    title: title,
                    category:category,
                    author:author,
                    date: date,
                    img:img,
                    content:content
                };
                //console.log(news);
                update(news);
            }
            catch (err){
                //we have know it that it is caused by page full of image, but we don`t want to handle this page, so drop consoling the error
                //console.log("\nSomething goes wrong when spider tecent article!");
                //console.log("it happens when try to parse "+url);
                //console.log("the error says:" + err);
            }
        }
        else{
            console.error('spider failed : can`t connect to \n' + url);
        }
    })
};

var spiderList = function(){
    for(var i=0; i<5; i++){
        http.get({
                host:'roll.news.qq.com',
                port:80,
                path:'/interface/cpcroll.php?callback=rollback&site=news&mode=1&cata=&' +
                'date=' + new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate() +
                '&page=' + i +
                '&_=' + new Date().getTime(),
                method:'GET',
                headers: { // 必选信息, 如果不知道哪些信息是必须的, 建议用抓包工具看一下, 都写上也无妨...
                    'Content-Type': 'application/json',
                    'Referer':'http://news.qq.com/articleList/rolls/'//反防爬
                }
            }
            , function(res){
            var datas = '';

            res.on('data',function (chunk) {
                datas += chunk;
            });
            res.on('end',function(){
                datas = datas.substr(9,datas.length-10);
                datas = JSON.parse(datas);//由于获取到的数据是JSON格式的，所以需要JSON.parse方法浅解析

                if(datas.response.code==='0'){
                    var articles = datas.data.article_info;

                    for(var j=0; j<3; j++){
                        //console.log(articles[j].url);
                        spiderArticle(articles[j].url);
                    }
                }
                else{
                    console.error('spider list of tencent failed : '+ datas.response.msg);
                }
            })
        })
    }
};

var debug = function(){
    spiderArticle("http://news.qq.com/a/20170628/001422.htm");
};

module.exports = spiderList;
//module.exports = debug;