var express=require('express');
var router=express.Router();
var User=require('../models/user');
var Boards = require('../models/board');
var Hails = require('../models/hail');
var Dynaty = require('../models/dynaty');
var responData;
//上传图片的 multer 配置
const multer = require('multer');
const path = require('path');
const lastdir = path.resolve(__dirname, '..');
var Bod_imgs = [];
var B_path = 'http://111.230.155.152:3000/upimgs/';

var imgpath = 'http://111.230.155.152:3000/upimgs/';
var user_img = ''
var storage = multer.diskStorage({
    destination: path.join(lastdir,'/public/upimgs'),

    filename: function (req, file, cb) {
        var str = file.originalname.split('.');
        var imgname = Date.now()+'.'+str[1];
        //处理单张图片
        user_img = imgname;
        //imgpath = imgpath + imgname;
        //处理多张图片
        B_path = B_path + imgname;
        Bod_imgs.push(B_path);
        B_path = 'http://111.230.155.152:3000/upimgs/';

        cb(null, imgname);
    }
})
var upload = multer({ storage: storage });//存储器

router.use(function(req,res,next){
    responData={
        code:0,
        message:''
    }
    next();
})

router.post('/user/register',function(req,res){
    var username = req.body.username;
    var password= req.body.password;
    var repassword = req.body.repassword;
    console.log(username+"---"+password+"--"+repassword);
    if(username == ''){
        responData.code=1;
        responData.message='账号不能为空';
        res.json(responData);
        return;
    }
    if(password == ''){
        responData.code=2;
        responData.message='密码不能为空';
        res.json(responData);
        return;
    }
    if(password != repassword){
        responData.code=3;
        responData.message='2次密码不一致';
        res.json(responData);
        return;
    }

    User.findOne({
        username:username
    }).then(function(userInfo){
        if(userInfo){
            responData.code=4;
            responData.message='用户已被注册';
            res.json(responData);
        return;
        }
        var user = new User({
            username:username,
            password:password
        });
        return user.save();
    }).then(function(newUserInfo){
        
        responData.message='注册成功,即将返回登录界面';
        res.json(responData);
    })


    
});
router.post('/user/login',function(req,res){
    var username = req.body.username;
    var password= req.body.password;
    console.log(username + '--'+password);
    if(username == '' || password == ''){
        responData.code = 1;
        responData.message = '用户名和密码不能为空';
        res.json(responData);
        return;
    }
    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        if(!userInfo){
            responData.code = 2;
            responData.message = '用户名或密码错误';
            res.json(responData);
            return;
        }
        responData.message = '登陆成功';
        responData.userInfo=userInfo;
        //登录成功设置cookies
        req.cookies.set('userInfo',JSON.stringify(
            {
                _id:userInfo._id,
                username:userInfo.username,
            }
        ));
        console.log(req.cookies.get('userInfo'));
        res.json(responData);
    })

})
router.post('/user/UpateInfo',upload.single('photo'),function(req,res){
    var nicheng = req.body.nicheng;
    var sex = req.body.sex;
    var disc = req.body.disc;
    var _id = req.body._id;
    responData.imgpath = imgpath +user_img;
    console.log("更新个人头像路径："+responData.imgpath);
    imgpath=imgpath +user_img;
    if(req.body.username == ''){
        responData.code = 1;
        responData.message = '用户名为空';
        res.json(responData);
        return;
    }
    if(req.body.nicheng == ''){
        responData.code = 2;
        responData.message = '不能为空';
        res.json(responData);
        return;
    }
    
    User.update({
        _id:_id
    },{
        nicheng : req.body.nicheng,
        sex : req.body.sex,
        disc : req.body.disc,
        _id : req.body._id,
        head_img:imgpath
    }).then(function(info){
        imgpath = 'http://111.230.155.152:3000/upimgs/';
        user_img = '';
        Bod_imgs = [];
        return User.findOne({
            _id:req.body._id
        })
    }).then(function(info){
        console.log(info);
        responData.message = '文字上传成功';
        responData.userInfo = info
        res.json(responData);
    });
})
router.post('/user/UpateInfoImg',upload.single('photo'),function(req,res){
    var id = req.userInfo._id
    responData.message = '上传成功';
    responData.imgpath = imgpath +user_img;
    console.log("更新个人头像路径："+responData.imgpath);
    imgpath=imgpath +user_img;
    console.log(id);
    User.update({
        _id:id
    },{
        head_img:imgpath
    }).then(function(info){
        imgpath = '/public/upimgs/';
        user_img = '';
        Bod_imgs = []
        if(!info){

        }
        return User.findOne({
            _id:id
        })
    }).then(function(userInfo){
        console.log(userInfo);
        responData.message = '信息上传成功';
        responData.userInfo = userInfo;
        res.json(responData);
        return;
    })
})
//获取所有的用户的信息
router.get('/user/getAllList',function(req,res){
    User.find().sort({_id:-1}).then(function(usersList){
        console.log(usersList,"11111111111111111111");
        responData.message = '请求公告数据成功！';
        responData.usersList = usersList;
        responData.usersList.forEach(e => {
            e.password = "你不需要知道哦。。。"
        });
        res.json(responData);
    })
})
router.get('/user/logout',function(req,res){
    req.cookies.set('userInfo',null);
    responData.message = '退出成功！';
    res.json(responData);
})
//添加公告
router.post('/boards/addInfo',function(req,res){
    var item = req.body.item;
    var b_theme = req.body.b_theme;
    var b_disc = req.body.b_disc;
    var _id = req.body._id;
    console.log("---------------------------------------------------");
    console.log(item+"---"+b_theme+"--"+b_disc+"---"+_id);

    // new Boards({
    //     item: item,
    //     b_theme: b_theme,
    //     b_disc:b_disc,
    //     b_release: req.userInfo._id.toString(),
    // }).save().then(function(Boardinfo){
    //     console.log(Boardinfo);
    //     responData.message = '发布公告成功！';
    //     req.cookies.set('addBoard_id',JSON.stringify(
    //         {
    //             _id:Boardinfo._id
    //         }
    //     ));
    //     // req.userInfo.addBoard_id= Boardinfo._id.toString();
    //     console.log(req.addBoard_id,"info");
    //     res.json(responData);
    //     return;
    // });

    // var addBoard_id= req.addBoard_id;
    // Boards.updateOne({
    //     _id:addBoard_id
    // },{
    //     item: item,
    //     b_theme: b_theme,
    //     b_disc:b_disc,
    //     b_release: req.userInfo._id.toString(),
    // }).then(function(info){
    //     if(!info){
    //         responData.message = '公告上传失败！';
    //         res.json(responData);
    //         return;
    //     }
    //     responData.message = '公告上传成功';
    //     res.json(responData);
    //     return;  
    // })
})
//添加公告图片
router.post('/boards/addInfoImg',upload.array("file",20),function(req,res){
    console.log(req.addBoard_id,"img");
    console.log(Bod_imgs);
    var addBoard_id= req.addBoard_id;

    var item = req.body.item;
    var b_theme = req.body.b_theme;
    var b_disc = req.body.b_disc;
    var br_id = req.body.br_id;
    console.log("---------------------------------------------------");
    console.log(item+"---"+b_theme+"--"+b_disc+"---"+br_id);

    new Boards({
        b_img:Bod_imgs,
        item:item,
        b_theme:b_theme,
        b_disc,b_disc,
        b_release:br_id
    }).save().then(function(Boardinfo){
        imgpath = 'http://111.230.155.152:3000/upimgs/';
        user_img = '';
        Bod_imgs = []
        console.log(Boardinfo);
        responData.message = '图片上传成功成功！';
        // req.cookies.set('addBoard_id',JSON.stringify(
        //     {
        //         _id:Boardinfo._id
        //     }
        // ));
        res.json(responData);
        return;
    });
})
//公告的请求
router.get('/boards/getAllBoardsList',function(req,res){
    Boards.find().sort({_id:-1}).populate('b_release').then(function(BoardsList){
        responData.message = '请求公告数据成功！';
        responData.BoardsList = BoardsList;
        res.json(responData);
    })
})
//获取某个item公告的信息
router.post('/boards/getItemBoardsInfo',function(req,res){
    var item = req.body.item;
    console.log(item);
    Boards.find({
        item:item
    }).sort({_id:-1}).populate('b_release').then(function(b_info){
        console.log("--------------------------");
        console.log(b_info);
        responData.message = '请求'+item+'公告数据成功！';
        responData.BoardsList = b_info;
        res.json(responData);
    })
})
//获取单个 公告的信息 和添加浏览量
router.get('/boards/getOneBoardinfo',function(req,res){
    var id=req.query.id || '';
    console.log(id);
    Boards.findOne({
        _id:id
    }).populate('b_release').then(function(info){
        info.views++;
        return info.save();
    }).then(function(newInfo){
        console.log(newInfo);
        responData.message = '获取单个公告信息成功！';
        responData.newInfo = newInfo;
        responData.newInfo.b_release.password = "别乱看。。。"
        res.json(responData);
    })
    
})
//删除自己发的item
router.get('/boards/delete',function(req,res){
    var id=req.query.id || '';
    console.log(id);
    Boards.remove({
        _id:id
    }).then(function(){
        responData.message = '删除成功！';
        res.json(responData);
    })
    
})
//评论提交

router.post('/boards/comment/post',function(req,res){
    var b_Id = req.body.b_Id || '';
    var username = req.body.username || '';
    var postData = {
        username:username,
        postTime:new Date(),
        content:req.body.messageContent
    };
    Boards.findOne({
        _id:b_Id
    }).then(function(content){
        content.comments.unshift(postData);
        return content.save();
    }).then(function(newContent){
        responData.message = '评论成功！';
        responData.newContent = newContent;
        res.json(responData);
    })

})
//删除自己的评论
router.post('/boards/comment/delete',function(req,res){
    var c = req.body.c || '';
    var b_Id = req.body.b_Id || '';
    c.postTime =new Date(c.postTime)
    Boards.findOne({
        _id:b_Id
    }).then(function(content){
        var length = content.comments.length;
        console.log(length,"555555555555555555555555");
        console.log(c)
        console.log("11111111111111111111")
        console.log(content.comments[0])
        console.log(c == content.comments[0],"ok???")
        console.log( content.comments[0].postTime.toString() == c.postTime.toString())
        for (var i = 0; i < length; i++) {
            if (
                content.comments[i].postTime.toString() == c.postTime.toString()
                ) {
                if (i == 0) {
                    console.log("0000000000")
                    content.comments.shift(); //删除并返回数组的第一个元素
                    return content.save();
                }
                else if (i == length - 1) {
                    console.log("11111")
                    content.comments.pop();  //删除并返回数组的最后一个元素
                    return content.save();
                }
                else {
                    console.log("endendende")
                    content.comments.splice(i, 1); //删除下标为i的元素
                    return content.save();
                }
            }
        }
    }).then(function(newContent){
        console.log("-----------------")
        console.log(newContent);
        responData.message = '删除评论成功！';
        responData.newContent = newContent;
        res.json(responData);
    })

})
//加好友请求
router.get('/user/FriendRequest',function(req,res){
    var to_user = req.query.to_id;
    var from_user = req.query.from_user;
    console.log(to_user+"---"+from_user);

    new Hails({
        from_user,
        to_user
    }).save().then(function(Hailsinfo){
        return Hails.find({from_user}).populate(['from_user','to_user']);
    }).then(function(Info){
        responData.message = '好友申请成功！';
        responData.Hailsinfo = Info;
        res.json(responData);
        return;
    })
})
//请求自己的或者自己请求的 所有好友情况
router.get('/user/getAllHailsInfo',function(req,res){
    var id = req.query._id
    var arr1 = [];
    var arr2 = []
    var arr = []
    Hails.find({from_user : id}).populate(['from_user','to_user']).then(function(Info){
        console.log("1111111111111111111111111111")
        arr1=Info;
        console.log(Info)
        return Hails.find({to_user : id}).populate(['from_user','to_user']);
    }).then(function(Info){
        console.log(Info)
        arr2 = Info;
        arr =arr1.concat(arr2);
        console.log(arr);
        responData.Hailsinfo = arr;
        
        
        res.json(responData);
    })
})
//同意好友请求
router.get('/user/FriendRequestAgree',function(req,res){
    var from_user_id = req.query.from_user_id;
    var to_user = req.query.to_user
    console.log(from_user_id);
    var arr1 = [];
    var arr2 = []
    var arr = []
    Hails.update({
        from_user:from_user_id,
        to_user:to_user,
    },{
        isFirends:true
    }).then(function(info){
        console.log(info)
        return Hails.find({from_user : req.userInfo._id}).populate(['from_user','to_user']);
    }).then(function(Info){
        arr1=Info;
       
        return Hails.find({to_user : req.userInfo._id}).populate(['from_user','to_user']);
    }).then(function(Info){
        arr2 = Info;
        arr =arr1.concat(arr2);
        console.log(arr);
        responData.Hailsinfo = arr;
        res.json(responData);
    });
})
//不同意好友请求
router.get('/user/FriendRequestnotAgree',function(req,res){
    var req_id = req.query.req_id;
    console.log(req_id);
    var arr1 = [];
    var arr2 = []
    var arr = []
    Hails.remove({
        _id:req_id
    }).then(function(info){
        console.log(info)
        return Hails.find({from_user : req.userInfo._id}).populate(['from_user','to_user']);
    }).then(function(Info){
        arr1=Info;
       
        return Hails.find({to_user : req.userInfo._id}).populate(['from_user','to_user']);
    }).then(function(Info){
        arr2 = Info;
        arr =arr1.concat(arr2);
        console.log(arr);
        responData.Hailsinfo = arr;
        res.json(responData);
    });
})
//保存两个人的聊天对话
router.post('/user/chatsAdd',function(req,res){
    var char_Id = req.body.chat_id || '';
    var chatmag = req.body.chatmag || '';
    var name = req.body.name || '';
    var chatData = {
        name,
        chatmag,
        chatTime:new Date()
    };
    Hails.findOne({
        _id:char_Id
    }).then(function(info){
        console.log(info);
        info.chatInfos.push(chatData);
        return info.save();
    }).then(function(newinfo){
        responData.message = '发送成功！';
        responData.newinfo = newinfo;
        res.json(responData);
    })
})
// get 请求两个人的聊天记录
router.get('/user/chatInfoGetAll',function(req,res){
    var char_Id = req.query.charId;
    console.log(char_Id);
    Hails.findOne({
        _id:char_Id
    }).then(function(info){
        responData.message = '请求聊天成功成功！';
        responData.newinfo = info;
        res.json(responData);
    })
})

// 朝代的添加
router.post('/dynary/add',upload.single('photo'),function(req,res){
    var name = req.body.name;
    var set_time = req.body.set_time;
    var build_it = req.body.build_it;
    var jianjie = req.body.jianjie;
    var desc = req.body.desc;
    console.log(name+"----"+set_time+"---"+build_it+"---"+jianjie+"---"+desc);
    imgpath=imgpath +user_img;
    console.log("朝代的图片路径："+imgpath);
    new Dynaty({
        name,
        set_time,
        build_it,
        jianjie,
        desc,
        _img:imgpath
    }).save().then(function(dynaryinfo){
        imgpath = 'http://111.230.155.152:3000/upimgs/';
        user_img = '';
        Bod_imgs = [];
        console.log(dynaryinfo);
        responData.message = '朝代信息成功成功！';
        res.json(responData);
        return;
    });
})
// 朝代的删除
router.get('/dynary/delete',function(req,res){
    var id=req.query.dynaty_id || '';
    console.log(id);
    Dynaty.deleteOne({
        _id:id
    }).then(function(){
        responData.message = '删除成功！';
        res.json(responData);
    })
    
})
// 朝代的查询
router.get('/dynary/getAllDynatiesList',function(req,res){
    Dynaty.find().sort({_id:-1}).then(function(DynatiesList){
        responData.message = '请求朝代数据成功！';
        responData.DynatiesList = DynatiesList;
        res.json(responData);
    })
})
// 单个朝代的查询
router.get('/dynary/getoneDynaty',function(req,res){
    var _id = req.query._id;
    console.log(_id)
    Dynaty.findOne({
        _id
    }).then(function(dynaty){
        console.log(dynaty);
        responData.message = '请求单个朝代数据成功！';
        responData.dynaty = dynaty;
        res.json(responData);
    })
})
// 朝代评论的发布
router.post('/dynary/postcomments',function(req,res){
    var d_Id = req.body._id || '';
    var username = req.body.username || '';
    console.log(d_Id+'-----'+username+'-------'+req.body.ms)
    var postData = {
        username:username,
        postTime:new Date(),
        content:req.body.ms
    };
    Dynaty.findOne({
        _id:d_Id
    }).then(function(content){
        content.comments.unshift(postData);
        return content.save();
    }).then(function(newContent){
        responData.message = '评论成功！';
        responData.newContent = newContent;
        res.json(responData);
    })

})
module.exports = router;