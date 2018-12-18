/**
 * Created by admin on 2017/7/2.
 */
module.exports = {
    data : [
        "军事",
        "国际",
        "社会",
        "国内",
        "娱乐",
        "体育",
        "财经",
        "科技",
        "游戏",
        "汽车",
        "教育",
        "房产"
    ],
    area: function (str) {
        switch (str){
            case '推荐':
                return {
                    title:'推荐',
                    description:'你的心思我来猜'
                };
            case '军事':
                return {
                    title:'军事',
                    description:'兵者，诡道也'
                };
            case '国内':
                return {
                    title:'国内',
                    description:'我知国内事'
                };
            case '国外':
                return {
                    title:'国外',
                    description:'纵览天下闻'
                };
            case '娱乐':
                return {
                    title:'娱乐',
                    description:'娱乐圈水太深'
                };
            default:{
                return {
                    title:'推荐',
                    description:'你的心思我来猜'
                };
            }
        }
    },
    transform: function(str){
        switch (str){
            case '国际时事':
                return '国际';
            case  '社会万象':
                return '社会';
            case '各地新闻':
                return '国内';
            case '军事要闻':
                return '军事';
            case '时政新闻':
                return '国内';
            case '国际花边':
                return '国际';
            case '实用新闻':
                return '国内';
            case '港澳台新闻':
                return '国内';
            default :
                return null;
        }
    }
};