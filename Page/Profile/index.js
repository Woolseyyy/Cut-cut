/**
 * Created by admin on 2017/4/13.
 */
module.exports={
    path:'/profile',
    getComponent:function(nextState,cb){
        require.ensure([],function(require){
            cb(null,require("./Profile.jsx"))
        })
    }
};