var mongoose=require('mongoose');
//公告表结构
module.exports = new mongoose.Schema({
    item:String,//什么公告
    b_img:{//公告照片
        type:Array,
        default:['http://localhost:3000/upimgs/board.jpg']
    },
    b_theme:{//主题
        type:String,
        default:''
    },
    b_disc:{//描述
        type:String,
        default:''
    },
    b_release:{//发布人
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    comments: {//存储对这个item评论的数组
        type:Array,
        default:[]
    },
    views:{//浏览量
        type:Number,
        default:0
    },
    b_cTime:{//创建时间
        type:Date,
        default:new Date()
    },
});