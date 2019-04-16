<template>
    <div>
        <div class="box">

            <div class="box1">
                <router-link to='/Cheng/Guards/Guardszhiji/Guardszhijireq' ><div class="box1-nav1"><img src="../assets/info.png"><span style="color:red">好友请求({{hail_req_notagree.length}})</span></div></router-link>
                <div  v-for="(user,index) in hails" :key="index">
                    <div v-if="user.from_user._id == userInfo._id" @click="go_to_chat(user._id,user.to_user.head_img,user.to_user.username)"><div class="box1-nav1"><img :src="user.to_user.head_img"><span>{{user.to_user.username}}</span></div></div>
                    <div v-if="user.from_user._id != userInfo._id" @click="go_to_chat(user._id,user.from_user.head_img,user.from_user.username)"><div class="box1-nav1"><img :src="user.from_user.head_img"><span>{{user.from_user.username}}</span></div></div>
                </div>
            </div>
            <div class="box2">
                <router-view @agree="sonrouter_agreehail"></router-view> 
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: 'Guardszhiji',
    data:function(){
        return {
            userInfo:{},
            hailsIdList:[],
            user_click_color:'',
            timer:null,
        }
    },
    methods:{
        request_Allhails(){
            var that = this;
            console.log(0)
            $.ajax({
                type:'get',
                url:'http://localhost:3000/api/user/getAllHailsInfo?_id='+that.userInfo._id,
                success:function(result){
                    console.log(result)
                    that.hailsIdList=result.Hailsinfo;
                }
            });
        },
        sonrouter_agreehail(list){
            console.log(list);
            this.hailsIdList=list;
        },
        go_to_chat(id,img,name){
            this.$router.push({
                path: '/Cheng/Guards/Guardszhiji/Guardszhijichat',
                query: {
                    id,
                    img,
                    name
                }
                })
        }
    },
    computed: {
        hail_req_notagree:function(){
            var arr  = [];
            var that = this;
            that.hailsIdList.forEach(function(item){
                if(item.isFirends==false && item.to_user._id==that.userInfo._id){
                    arr.push(item);
                }
            })
            return arr;
        },
        hails:function(){
            var arr  = [];
            var that = this;
            this.hailsIdList.forEach(function(item){
                if(item.isFirends==true){
                    arr.push(item);
                }
            })
            return arr;
        }
    },
    created() {
        var that = this;
        this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
        this.request_Allhails();
        this.timer = setInterval(function(){
            that.request_Allhails();
        },2000)
        

    },
    destroyed(){
        clearInterval(this.timer);
    }
}
</script>
<style scope>
  /* 
    好友的
  */
  ul {
    list-style: none;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
    outline: none;
}

.box {
    position: absolute;
    width: 100%;
    height: 600px;
    border: 1px solid rgb(189, 188, 188);
    margin-top: 60px;
}

.box1 {
    float: left;
    overflow-y: scroll;
    left: 0;
    width: 30%;
    height: 100%;
    background-color: rgb(231, 227, 227);
}

.box1 div {
    left: 0;
    width: 100%;
    height: 60px;
    border-bottom:1px solid #ccc;
    line-height: 60px;
}
.box1 div:hover{
    background-color: rgba(136, 132, 132, 0.3);
}
.box1 .box1-nav1{
    top: 0px;
}
.box1 .box1-nav2{
    top: 65px;
}
.box1 .box1-nav3{
    top: 130px;
}

.box1 div img {
    margin-top: 10px;
    margin-left: 30px;
    float: left;
    width: 45px;
    height: 45px;
    border-radius:50%;
}

.box1 div span {
    left: 5px;
    top: 20px;
    display: inline-block;
}

.box2 {
    float: right;
    right: 0;
    width: 70%;
    height: 100%;
    background: rgba(112, 93, 93, 0.3);
}
.box2-nav{
    height: 30px;
    width:100%;
    background-color: rgb(245, 243, 243);
    border-bottom: 1px solid rgb(189, 188, 188);
    box-sizing: border-box;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
}
.box2-nav1 {
    width: 100%;
    height: 480px;
    overflow-y: scroll
}

.box2-nav1 .message {
    width: 100%;
    height: 100%;
}
.box2-nav1 .message img{
    width: 40px;
    height: 40px;
    margin-right: 10px;
    margin-left: 10px;
    border-radius:50%;
    display: inline-block
}
.box2-nav1 .message span{
    width: 80%;
    height: 60px;
    margin-right: 10px;
    margin-left: 10px;
    display: inline-block
}

.box2-nav1 .message .left2, .box2-nav1 .message .right1 {
    word-wrap:break-word;  
    word-break:break-all;  
    padding: 5px;
    white-space: wrap;
}
/* 我的代码 */
.box2-nav1 .message .chatitem {
    width: 100%;
    margin-top: 5px;
    border:1px solid #ccc;
    border-radius: 20px;
}
.box2-nav1 .message li{
    
    width: 100%;
    line-height: 60px;
}
.box2-nav1 .message li.left1 img{
    float: left;
}

.box2-nav1 .message li.right1 img{
    float: right;
}

/* 你的代码 */
.box2-nav1 .message .left1 {
    float: left;
    color: rgb(63, 54, 54);
    font-size: 28px;
    text-align: left;
}



.box2-nav1 .message  .right1 {
    float: right;
    text-align: right;
    width: 100;
    font-size: 28px;
    color: rgb(255,157,0);
}
.box2-nav1 .message .right2 {
    float: right;
    width: 100;
 
}

.box2-nav2 {
    width: 100%;
    height: 25%;
}

.box2-nav2 textarea {
    top: 0;
    left: 0;
    width: 60%;
    float: left;
    height: 80px;
    box-sizing: border-box;
    border: none;
}

.box2-nav2 .submit {
    width: 20%;
    height: 20%;
    margin: 7px;
    background-color: rgb(223, 213, 223, 0.7);
}

</style>

