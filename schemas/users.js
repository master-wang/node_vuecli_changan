var mongoose=require('mongoose');
//用户表结构
module.exports = new mongoose.Schema({
    username:String,//用户名
    password:String,//密码
    nicheng:{//昵称
        type:String,
        default:''
    },
    sex:{//性别
        type:String,
        default:''
    },
    disc:{//简介
        type:String,
        default:''
    },
    addTime:{//添加的时间
        type:Date,
        default:new Date()
    },
    head_img:{//头像
        type:String,
        default:'http://111.230.155.152:3000/upimgs/touxiang.jpg'
    },
    isAdmin:{//是否是管理员
        type:Boolean,
        default:false
    },

});