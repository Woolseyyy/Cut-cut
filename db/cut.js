/**
 * Created by admin on 2017/6/28.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
module.exports = mongoose.model('cut', new Schema({
    state:{},
    title:String
}));
