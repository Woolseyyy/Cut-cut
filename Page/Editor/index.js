/**
 * Created by admin on 2017/4/13.
 */
module.exports={
    path:'/editor',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Entry.jsx"))
        })
    }
};