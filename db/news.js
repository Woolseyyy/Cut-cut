/**
 * Created by admin on 2017/6/28.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
module.exports = mongoose.model('news', new Schema({
    title:String,
    category:String,
    author:String,
    source:String,
    sourceAddress:String,
    date:String,
    abstract:String,
    img:String,
    content:[{}]
}));
