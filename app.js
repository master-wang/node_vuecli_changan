//express框架
var express = require("express");
var Vue = require("vue")
var VueRouter = require("vue-router")
//引用模块管理  可以直接渲染页面
var swig = require("swig");
//链接mongodb数据库
var mongoose=require('mongoose');
//用于post提交过来的数据
var bodyParse=require('body-parser');
//引用cookies模块
var cookies = require('cookies');

var User=require('./models/user');//导入用户
var path = require('path')
var app = express();

// 自定义跨域中间件
var allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCors);//使用跨域中间件

//模板引性，方法
app.engine('html',swig.renderFile);
//设置模板文件的存放目录，1不变
app.set('views','./views/dist');
//注册所使用的末班引擎，1不变
app.set('view engine','html');
//过程中需要取消模板缓存 不让页面缓存
swig.setDefaults({cache:false});

//设置静态文件的托管,公共的css js等
app.use(express.static( __dirname + '/views/dist'));
app.use(express.static( __dirname + '/public'));
//bodyParse设置  处理json数据
app.use(bodyParse.urlencoded({extended:true}));

//设置cookie
app.use(function(req,res,next){11111111111
    req.cookies = new cookies(req,res);
    req.userInfo={};
    if(req.cookies.get('userInfo')){
        try{
            console.log("try cookies");
            console.log(req.cookies.get('userInfo'));
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            if(req.cookies.get('addBoard_id')){
                req.addBoard_id=JSON.parse(req.cookies.get('addBoard_id'));
            }
            
            User.findById(req.userInfo._id).then(function(userInfo){
            
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
               
                next();
            });
        }
        catch(error){
            console.log(error);
            next();
        }
    }else{
        console.log("else: cookies");
        next();
    }

})
//前端的
app.use('/',require('./routers/main'));

//api接口
app.use('/api',require('./routers/api'));
// 测试的接口
// app.get('/img',function(req,res){
//     res.json({
//         "src":'http://localhost:3000/imgs/02.jpeg'
//     })
// })

//链接数据库
mongoose.connect('mongodb://localhost:27017/changan',{useNewUrlParser:true});
mongoose.connection.on('error', () => {
    console.log('db数据库链接失败')
});
mongoose.connection.on('open', () => {
    console.log('db数据库链接成功');
    console.log("localhost :3000");
    app.listen(3000);
});
