<template>
    <div id="theme-content">
        <div class="backgd">
        <div class="bottom">
            <!-- 导航 -->
            <div class="list">
                <div class="list_mid">
                    <ul class="nav nav-tabs">
                        <li role="presentation" @click="isActive='1'" :class="{active:isActive=='1'}"><a href="#"><router-link to="/Cheng/footprint/Footprintlist"> 留下我的足迹 </router-link></a></li>
                        <li role="presentation" @click="isActive='2'" :class="{active:isActive=='2'}"><a href="#"><router-link to="/Cheng/Guards/Guardsmen"> 长安守卫军 </router-link></a></li>
                        <li role="presentation" @click="isActive='3'" :class="{active:isActive=='3'}"><a href="#"><router-link to="/Cheng/Administration/List"> 古城管理 </router-link></a></li>
                    </ul>
                </div>
            </div>
            <div class="middle">
                <!-- 中间信息主题部分 -->
                <div class="article">
                    <transition :name="transitionName"> 
                        <button v-if="!userInfo" class="btn btn-danger">您还没有登录，请先登录</button>
                        <router-view @show="show"  class="Router"></router-view> 
                    </transition>
                </div>
                <!-- 右侧的登录注册完善信息 -->
                <div class="aside">
                    <div class="denglu" id="UserIofo" v-if="login_stadus==='ok'">
                            <h2>我的信息</h2>
                            <hr>
                            <img :src="userInfo.head_img" alt="" style="width:60px;height:60px;border-radius:50%">
                            <a v-if="userInfo.isAdmin" class="info">你好，管理员:{{ userInfo.username }}！</a>

                            <a v-if="!userInfo.isAdmin" class="info">{{ userInfo.username }},你好！ 来到古城！</a>
                            
                            
                            <label for="">
                                <span>昵称:</span>{{ userInfo.nicheng }}
                            </label>
                            <label for="">
                                <span>性别:</span>{{ userInfo.sex }}
                            </label>
                            <label for="">
                                <span>简介:</span>{{ userInfo.disc }}
                            </label>
                            <label for="">
                                <span  ><router-link to='/Cheng/Upadateuserinfo' style="color:blue">完善个人信息</router-link></span>
                            </label>
                            <label for="">
                                <span><a href="javascript:;" id="logout" @click="login_out()" style="color:blue">退出登录</a></span> 
                            </label>
                            
                    </div>
                    
                    <div class="denglu" id="loginBox" v-if="login_stadus==='login'">
                            <div class="logo"></div>
                            <hr>
                            <div class="form-item">
                                <input v-model="login_userInfo.username" id="username" type="text" name="d_username" placeholder="用户名">
                            </div>
                            <div class="form-item">
                                <input v-model="login_userInfo.password" id="password" type="password" name="d_password" placeholder="密码">
                            </div>
                            <div class="form-item">
                                <button @click="User_login()">登陆</button>
                            </div>
                            <div class="reg-bar">
                                <a href="javascript:;" class="cloMint reg" @click="login_stadus='register'">马上注册</a>
                            </div>
                            <p></p>
                            <p class="info">{{login_tip}}</p>
                    </div>
                    <div class="denglu" id="registerBox" v-if="login_stadus==='register'">
                            <div class="logo"></div>
                            <h2>注册</h2>
                            <hr>
                            <div class="form-item">
                                <input v-model="register_userInfo.username" class="username" type="text" name="z_username" placeholder="用户名">
                            </div>
                            <div class="form-item">
                                <input v-model="register_userInfo.password" class="pwd" type="password" name="z_password" placeholder="密码">
                            </div>
                            <div class="form-item">
                                <input v-model="register_userInfo.repassword" class="pwd" type="password" name="z_repassword" placeholder="确认">
                            </div>
                            <div class="form-item">
                                <button @click="User_resister()">注册</button>
                            </div>
                            <br>
                            <p class="tip">{{register_tip}}</p>
                            <div class="reg-bar">
                                <a href="javascript:;"  class="cloMint reg" @click="login_stadus='login'">马上登陆</a>
                            </div>
                            <p></p>
                    </div>
                
            </div>
        </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Cheng',
    data(){
        return {
            isActive: '1',
            transitionName: 'slide-right',
            login_stadus:'login',
            userInfo:{},
            register_userInfo:{
                username:'',
                password:'',
                repassword:''
            },
            login_userInfo:{
                username:'',
                password:'',
            },
            register_tip:'',
            login_tip:'',
            loginOut_tip:''
        }
    },
    watch: {
　　　'$route' (to, from) {
　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退 对应相应的动画
　　　　　　if(isBack) {
　　　　　　　　this.transitionName = 'slide-right'
　　　　　　} else {
　　　　　　   this.transitionName = 'slide-left'
　　　　　}
　　  this.$router.isBack = false
　　  }
　  },
    methods:{
        User_resister(){
            var registerBox = $('#registerBox');
            var that=this;
            $.ajax({
                type:'post',
                url:'http://111.230.155.152:3000/api/user/register',
                data:that.register_userInfo,
                dataType:'json',
                success:function(result){
                    console.log(result)
                    that.register_tip=result.message;
                    if(!result.code){
                        setTimeout(function(){
                            that.login_stadus='login';
                        },1000);
                    }
                }
            });
        },
        show(info){
            console.log(info)
            this.userInfo = info;
        },
        //登录
        User_login(){
            var that=this;
            $.ajax({
                type:'post',
                url:'http://111.230.155.152:3000/api/user/login',
                data:that.login_userInfo,
                dataType:'json',
                success:function(result){
                    console.log(result);
                    that.login_tip=result.message;
                    that.userInfo=result.userInfo;
                    localStorage.setItem('userInfo',JSON.stringify(result.userInfo));
                    if(!result.code){
                        setTimeout(function(){
                            that.login_stadus='ok';
                            // window.location.reload();
                        },1000);
                    }
                }
            });
        },
        //退出登录
        login_out(){
            var that=this;
            $.ajax({
                type:'get',
                url:'http://111.230.155.152:3000/api/user/logout',
                success:function(result){
                    console.log(result);
                    that.loginOut_tip=result.message;
                    that.userInfo=null;
                    localStorage.setItem('userInfo',null);
                    if(!result.code){
                        alert("退出登录成功！");
                        setTimeout(function(){
                            that.login_stadus='login';
                        },1000);
                    }
                    that.$router.push('/');
                }
            });
        },
        //网页刷新 先获取本地存储的数据
        getuserInfo_bylocal(){
            this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
            if(this.userInfo){
                this.login_stadus='ok';
            }else{
                this.login_stadus='login';
            }
        }
    },
    created(){
        var that=this;
        this.getuserInfo_bylocal();
    }
}
</script>
<style scope>
h1{
    margin: 0;
    padding: 0;
}
#theme-content {
    position: relative;
    padding-left: 50px;
    z-index: 100;
}
.backgd{
    position: absolute;
    padding-left: 50px;
    z-index: 1;
    width: 100%;
    height: 920px;
    left:0;
    background-image: url(../assets/center.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
.bottom .list{
    position: absolute;
    top:0;
    width: 100%;
    height: 120px;
    text-align: center;
    padding-top: 30px;
    font-size: 2em;
    color:#d3354c!important;
}
.bottom .middle{
    width: 100%;
    position: absolute;
    top: 120px;
}
.middle{
    width:1600px!important;
    height: 800px;
    padding-right:200px;
}
.article{
    float: left;
    position: absolute;
    top: 0;
    width: 1100px;
    height: 800px;
}
.aside{
    position: absolute;
    right: 150px;
    top: 20px;
    margin-left: 10px;
    width: 300px;
    height: 200px;
    
}
.denglu{
    margin-top: 10px;
    border:1px solid yellow;
    padding: 10px;
    width: 300px;
    border: 1px solid #fff;
    border-radius: 20px;
}

.logo {
    width: 104px;
    height: 120px;
    margin: 10px auto 10px;
    background: url('../assets/login.png') 0 0 no-repeat;
}
.form-item placeholder {
    color: rgb(255,157,0)!important;
}
.form-item input {
    width: 230px;
    height: 40px;
    margin-top: 10px;
    padding-left: 70px;
    border: 1px solid #fff;
    border-radius: 25px;
    font-size: 18px;
    color:  rgb(255,157,0);
    background-color: transparent;
    outline: none;
}
.reg-bar {
    width: 360px;
    margin: 20px auto 0;
    font-size: 14px;
    overflow: hidden;
}
.reg-bar .reg {
    float: left;
}

.reg-bar a {
    color: #fff;
    text-decoration: none;
}
.aside a {
    color: #fff;
    text-decoration: none;
}
.form-item button {
    width: 230px;
    height: 40px;
    border: 0;
    margin-top: 10px;
    border-radius: 25px;
    font-size: 18px;
    color: #1f6f4a;
    outline: none;
    cursor: pointer;
    background-color: #fff;
}
#password , .pwd{
    background: url("../assets/password.png") 20px 6px no-repeat;
}
#username,.username{
    background: url("../assets/emil.png") 20px 6px no-repeat;
}
#UserIofo label{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
}
#UserIofo label span{
    float: left;
    text-align: right;
    width: 130px;
    height: 30px;
}
.table{
    color: aliceblue;
}
#classMate{
    height: 600px;
    width: 100%;
    overflow-y:scroll;
}
.footer{
    margin-top: 10px;
    background: white;
    height: 70px;
}
.focus{
    
    background: rgb(233, 185, 30);
}
.danger{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgb(245, 75, 8);
}
/* 定义路由动画 */
.Router {
    width: 100%;
    transition: all 2s ease;
    top: 0;
}

.slide-left-enter{
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(100% 0);
}
.slide-left-leave-active{
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(100% 0);
}
.slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(-100%, 0);
}
</style>
