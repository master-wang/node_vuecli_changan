var mongoose=require('mongoose');
//公告表结构
module.exports = new mongoose.Schema({
    c_board:{//属于那个 公告
        type:mongoose.Schema.Types.ObjectId,
        ref:'Boards'
    },
    c_user:{//评论的 人
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    comment:{//公告评论
        type:String,
        default:''
    },

});