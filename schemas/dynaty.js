var mongoose=require('mongoose');
//朝代
module.exports = new mongoose.Schema({
    name:{// 朝代
        type:String,
        default:''
    },
    set_time:{// 创立的时间
        type:String,
        default:''
    },
    build_it:{// 创建人
        type:String,
        default:''
    },
    jianjie:{// 简介
        type:String,
        default:''
    },
    desc:{// 描述
        type:String,
        default:''
    },
    _img:{
        type:String,
        default:''
    },
    comments: {//存储评论
        type:Array,
        default:[]
    },

});