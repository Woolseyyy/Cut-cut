/**
 * Created by admin on 2017/4/13.
 */
module.exports={
    path:'/article',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Article.jsx"))
        })
    }
};