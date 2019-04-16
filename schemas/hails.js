var mongoose=require('mongoose');
//好友表结构
module.exports = new mongoose.Schema({
    from_user:{//发送好友请求的人
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    to_user:{//接受请求的人
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    isFirends:{//是否是好友
        type:Boolean,
        default:false
    },
    chatInfos: {//存储两人的对话
        type:Array,
        default:[]
    },

});