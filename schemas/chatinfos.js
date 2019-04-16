var mongoose=require('mongoose');
//好友聊天表结构
module.exports = new mongoose.Schema({
    hailId:{//发送的人
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hails'
    },
    comments:{//聊天记录
        type:Array,
        default:[]
    },
});