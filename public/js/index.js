$(function(){
    //页面的 vue 的实例
    var index = {
        template : `
            <div style="color:white">
                <h1>首页</h1>
                <h3> 欢迎来到西邮娱乐之家</h3>
                <img  src="/public/imgs/index.jpeg" alt="" style="width:800px;">
                <h4>在这里你会找到你想要的，加入我们吧！</h4>
                
            </div>
            
        `
    }
    var classMate = {
        template : `
            <div id="classMate">
                <h1>寻找我的校友</h1>
                <label for="">
                    昵称：<input  v-model="seach_info.nicheng"   type="text" class="form-control" placeholder="昵称：">
                </label>
                <label for="">
                    性别：<select name=""  v-model="seach_info.sex"  class="form-control">
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                </label>
                <label for="">
                    院系<select name=""  v-model="seach_info.faculty"  class="form-control">
                            <option value="计院">计院</option>
                            <option value="通院">通院</option>
                            <option value="电院">电院</option>
                            <option value="理学院">理学院</option>
                            <option value="数媒">数媒</option>
                        </select>
                </label> 
                <label for="">
                    班级：<input  v-model="seach_info.Class"  type="text" class="form-control" placeholder="输入班级">
                </label>
                <label for="">
                    是否单身：<select name=""  v-model="seach_info.danshen"  class="form-control">
                            <option value="单身">单身</option>
                            <option value="已脱单">已脱单</option>
                        </select>
                </label>
                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th  style="text-align:center;">用户名</th>
                        <th style="text-align:center;">昵称</th>
                        <th style="text-align:center;">院系</th>
                        <th style="text-align:center;">班级</th>
                        <th style="text-align:center;">性别</th>
                        <th style="text-align:center;">是否单身</th>
                        <th style="text-align:center;">操作</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr v-for="user in searched_data">
                        <td>{{user.username}}</td>
                        <td>{{user.nicheng}}</td>
                        <td>{{user.faculty}}</td>
                        <td>{{user.Class}}</td>
                        <td>{{user.sex}}</td>
                        <td>{{user.danshen}}</td>
                        <td>
                            <div v-if="user._id != userInfo._id">
                                <button v-if="user.hail_stadus == 'none'" class="btn btn-primary" @click="request_hail(user._id)">添加好友</button>
                                <button v-if="user.hail_stadus == '等待同意'" type="button" class="btn btn-info">等待同意</button>
                                <button v-if="user.hail_stadus == '已是好友'" class="btn btn-success">已是好友</button>
                                <button v-if="user.hail_stadus == '对方已申请'" type="button" class="btn btn-warning">对方已申请</button>
                            </div>
                            <button v-if="user._id == userInfo._id" type="button" class="btn btn-default">我</button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li>
                        <a href="#" aria-label="Previous" @click="minus()">
                            <span aria-hidden="true" >&laquo;</span>
                        </a>
                        </li>
                        <li v-for="item in fenyesuoying" @click="jumppage(item)"><a href="#">{{item}}</a></li>
                        <li>
                        <a href="#" aria-label="Next" @click="plus()">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
            
        `,
        data:function(){
            return {
                seach_info:{
                    nicheng:'',
                    sex:'',
                    faculty:'',
                    Class:'',
                    danshen:''
                },
                userInfo:{},
                usersList:[
                    {
                        username:'王少',
                        nicheng:'wang',
                        sex:'男',
                        faculty:'计算机学院',
                        Class:'1703',
                        danshen:'单身'
                    }
                ],
                hail_user_id:'',
                hailsIdList:[],
                //分页
                parerPage:5,
                page : 1,
                pages : 0,
                fenyesuoying:[]
                
            }
        },
        methods:{
            seachUsers(){

            },
            getAllUserList(){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/user/getAllList',
                    success:function(result){
                        that.usersList=result.usersList;
                        that.usersList.forEach(item => item.hail_stadus = 'none' )
                    }
                });
            },
            request_hail(user_id){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/user/FriendRequest?to_id='+user_id,
                    success:function(result){
                        console.log(result);
                        that.hailsIdList=result.Hailsinfo;
                        // that.usersList.forEach(function(item){
                        //     that.hailsIdList.forEach(function(h){
                        //         if(item._id==h.to_user._id&&h.isFirends==false){
                        //             item.hail_stadus = '等待同意'
                        //         }
                        //         else if(item._id==h.to_user._id&&h.isFirends!=false){
                        //             item.hail_stadus = '已是好友'
                        //         }else{
                        //             item.hail_stadus = 'none'
                        //         }
                        //     })
                        // })
                    }
                });
            },
            request_Allhails(){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/user/getAllHailsInfo',
                    success:function(result){
                        console.log(result)
                        that.hailsIdList=result.Hailsinfo;
                        that.usersList.forEach(function(item){
                            that.hailsIdList.forEach(function(h){
                                if(item._id==h.to_user._id&&h.isFirends==false){
                                    item.hail_stadus = '等待同意'
                                }
                                if(item._id==h.to_user._id&&h.isFirends!=false){
                                    item.hail_stadus = '已是好友'
                                }
                            })
                        })
                    }
                });
            },
            minus(){
                this.page--;
                if(this.page<=1){
                    this.page=1;
                }
            },
            plus(){
                this.page++;
                if(this.page>=this.pages){
                    this.page=this.pages;
                }
            },
            jumppage(i){
                this.page = i;
            }
        },
        computed:{
            searched_data: function () {
                let arrList = [];//存放数据
                let fenye = [];
                let me = this;
                me.usersList.forEach(function(item){
                    me.hailsIdList.forEach(function(h){
                        if(item._id==h.to_user._id&&h.isFirends==false&&h.from_user._id==me.userInfo._id){
                            item.hail_stadus = '等待同意'
                        }
                        else if(item._id==h.from_user._id&&h.isFirends==true&&h.to_user._id==me.userInfo._id){
                            item.hail_stadus = '已是好友'
                        }
                        if(item._id==h.from_user._id&&h.isFirends==false&&h.to_user._id==me.userInfo._id){
                            item.hail_stadus = '对方已申请'
                        }
                    })
                })
                let list = this.usersList;
                for (let i = 0;i < list.length;i++){
                    if (list[i].nicheng.search(me.seach_info.nicheng) != -1&&
                        list[i].sex.search(me.seach_info.sex) != -1&&
                        list[i].faculty.search(me.seach_info.faculty) != -1&&
                        list[i].Class.search(me.seach_info.Class) != -1&&
                        list[i].danshen.search(me.seach_info.danshen) != -1
                    ) {
                        arrList.push(list[i]);
                    }
                }
                console.log(arrList)
                //分页
                this.pages  = Math.ceil(arrList.length / this.parerPage);
                for(var i=0;i<this.pages ;i++){
                    fenye.push(i+1);
                }
                this.fenyesuoying = fenye;
                var start = (this.page-1)*this.parerPage;
                var end = start+this.parerPage;
                var fenye_arr = []
                console.log(this.pages+'---'+start+'---'+end);
                if(this.page<=1){
                    this.page=1;
                }
                if(this.page>=this.pages){
                    this.page=this.pages;
                }
                if(end>=arrList.length){
                    end=arrList.length
                }
                if(arrList.length<this.parerPage){
                    for(var i=0;i<arrList.length;i++){
                        fenye_arr.push(arrList[i]);
                    }
                    
                }
                else{
                    for(var i=start;i<end;i++){
                        fenye_arr.push(arrList[i]);
                    }
                    
                }
                return fenye_arr;
            },
        },
        created() {
            this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
            this.getAllUserList();
            this.request_Allhails();
        }
    }
    var Hailrequestinfo = {
        template : `
            <div>
                <h1>好友请求</h1>
                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th  style="text-align:center;">用户名</th>
                        <th style="text-align:center;">昵称</th>
                        <th style="text-align:center;">院系</th>
                        <th style="text-align:center;">班级</th>
                        <th style="text-align:center;">性别</th>
                        <th style="text-align:center;">是否单身</th>
                        <th style="text-align:center;">操作</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr v-for="user in hail_req_notagree">
                        <td>{{user.from_user.username}}</td>
                        <td>{{user.from_user.nicheng}}</td>
                        <td>{{user.from_user.faculty}}</td>
                        <td>{{user.from_user.Class}}</td>
                        <td>{{user.from_user.sex}}</td>
                        <td>{{user.from_user.danshen}}</td>
                        <td>
                            <button @click="agree_friends(user.from_user._id)" type="button" class="btn btn-info">同意好友请求</button>
                            <button @click="reject_agr(user._id)" type="button" class="btn btn-danger">拒绝</button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li>
                        <a href="#" aria-label="Previous" @click="minus()">
                            <span aria-hidden="true" >&laquo;</span>
                        </a>
                        </li>
                        <li v-for="item in fenyesuoying" @click="jumppage(item)"><a href="#">{{item}}</a></li>
                        <li>
                        <a href="#" aria-label="Next" @click="plus()">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
        `,
        data:function(){
            return {
                userInfo:{},
                hailsIdList:[],
                parerPage:5,
                page : 1,
                pages : 0,
                fenyesuoying:[],
                timer:null,
            }
        },
        methods:{
            request_Allhails(){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/user/getAllHailsInfo',
                    success:function(result){
                        console.log(result)
                        that.hailsIdList=result.Hailsinfo;
                    }
                });
            },
            reject_agr(req_id){
                var that = this;
                console.log(req_id);
                $.ajax({
                    type:'get',
                    url:'/api/user/FriendRequestnotAgree?req_id='+req_id,
                    success:function(result){
                        console.log(result)
                        that.hailsIdList=result.Hailsinfo;
                        that.$emit('agree',that.hailsIdList)
                    }
                });
            },
            agree_friends(from_user_id){
                var that = this;
                console.log(from_user_id);
                $.ajax({
                    type:'get',
                    url:'/api/user/FriendRequestAgree?from_user_id='+from_user_id,
                    success:function(result){
                        console.log(result)
                        that.hailsIdList=result.Hailsinfo;
                        that.$emit('agree',that.hailsIdList)
                    }
                });
            },
            minus(){
                this.page--;
                if(this.page<=1){
                    this.page=1;
                }
            },
            plus(){
                this.page++;
                if(this.page>=this.pages){
                    this.page=this.pages;
                }
            },
            jumppage(i){
                this.page = i;
            }
        },
        computed: {
            hail_req_notagree:function(){
                var arr  = [];
                var fenye = [];
                var that = this;
                that.hailsIdList.forEach(function(item){
                    if(item.isFirends==false && item.to_user._id==that.userInfo._id){
                        arr.push(item);
                    }
                })

                this.pages  = Math.ceil(arr.length / this.parerPage);
                for(var i=0;i<this.pages ;i++){
                    fenye.push(i+1);
                }
                this.fenyesuoying = fenye;
                var start = (this.page-1)*this.parerPage;
                var end = start+this.parerPage;
                var fenye_arr = []
                console.log(this.pages+'---'+start+'---'+end);
                if(this.page<=1){
                    this.page=1;
                }
                if(this.page>=this.pages){
                    this.page=this.pages;
                }
                if(end>=arr.length){
                    end=arr.length
                }
                if(arr.length<this.parerPage){
                    for(var i=0;i<arr.length;i++){
                        fenye_arr.push(arr[i]);
                    }
                    
                }
                else{
                    for(var i=start;i<end;i++){
                        fenye_arr.push(arr[i]);
                    }
                    
                }
                return fenye_arr;
            },
        },
        created() {
            var that = this;
            this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
            //this.request_Allhails();
            setTimeout(function(){
                that.request_Allhails();
            },100)
            
            this.timer = setInterval(function(){
                that.request_Allhails();
            },2000)
            

        },
        destroyed(){
            clearInterval(this.timer);
        }
    }
    var Hailchatinfo = {
        template : `
            <div>
                <div class="box2-nav">{{name}}</div>
                <div class="box2-nav1" id="scotop">
                    <ul class="message">
                        <div v-for="chat in chats" class="chatitem">
                            <div v-if="userInfo.username !== chat.name">
                                <li class="left1"><img :src="he_img"><span>{{chat.chatmag}}</span>  </li>
                            </div>
                            <div v-if="userInfo.username == chat.name" >
                                <li class="right1"><span>{{chat.chatmag}}</span><img :src="userInfo.head_img"></li> 
                            </div>
                            
                        </div>
                    </ul>
                </div>
                <div class="box2-nav2">
                    <textarea v-model="chatmag"></textarea>
                    <button class="submit btn btn-primary" type="button" @click="chat_post()" name="submit">发送</button>
                </div>
            </div>
        `,
        data:function(){
            return {
                userInfo:{},
                chatmag:'',
                chat_id:'',
                he_img:'',
                chats:[],
                name:'',
                timer:null,
                box_height:''
            }
        },
        methods:{
            chat_post(){
                var that = this;
                var data = {
                    chatmag:this.chatmag,
                    chat_id:this.chat_id,
                    name:this.userInfo.username
                }
                if (this.chatmag == ''){
                    alert("消息不能为空！");
                }
                else{
                    $.ajax({
                        type:'post',
                        url:'/api/user/chatsAdd',
                        data:data,
                        dataType:'json',
                        success:function(result){
                           console.log(result);
                           that.chatmag = '';
                           that.chats = result.newinfo.chatInfos;
                           $("#scotop").scrollTop($("#scotop")[0].scrollHeight);
                        }
                    });
                }
            },
            getChatInfos(char_Id){
                console.log(char_Id);
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/user/chatInfoGetAll?charId='+char_Id,
                    success:function(result){
                        console.log(result)
                        that.chatmag = '';
                        that.chats = result.newinfo.chatInfos;
                        setTimeout(function(){
                            $("#scotop").scrollTop($("#scotop")[0].scrollHeight);
                        },20)
                    }
                });
            },
            zidong_getInfo(char_Id){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/user/chatInfoGetAll?charId='+char_Id,
                    success:function(result){
                        console.log(result)
                        that.chats = result.newinfo.chatInfos;
                    }
                });
            },
            formateData(d){
                var date = new Date(d);
                return date.getFullYear()+'年'+date.getMonth()+'月'+date.getDate()+'时'+date.getHours() +':'+date.getMinutes()+':'+date.getSeconds();
            },
        },
        created() {
            this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
            this.he_img=this.$route.query.img;
            this.chat_id=this.$route.query.id;
            this.name = this.$route.query.name;
            this.getChatInfos(this.$route.query.id);
            var that = this;
            this.timer = setInterval(function(){
                that.zidong_getInfo(that.$route.query.id);
            },2000)
            

        },
        destroyed(){
            clearInterval(this.timer);
        }

    }
    var friends = {
        template : `
            <div>
            <div class="box">

                <div class="box1">
                    <router-link to='/schoolFriends/friends/Hailrequestinfo' ><div class="box1-nav1"><img src="/public/imgs/info.png"><span style="color:red">好友请求({{hail_req_notagree.length}})</span></div></router-link>
                    <div  v-for="user in hails">
                    <div v-if="user.from_user._id == userInfo._id" @click="go_to_chat(user._id,user.to_user.head_img,user.to_user.username)"><div class="box1-nav1"><img :src="user.to_user.head_img"><span>{{user.to_user.username}}</span></div></div>
                    <div v-if="user.from_user._id != userInfo._id" @click="go_to_chat(user._id,user.from_user.head_img,user.from_user.username)"><div class="box1-nav1"><img :src="user.from_user.head_img"><span>{{user.from_user.username}}</span></div></div>
                    </div>
                </div>
                <div class="box2">
                    <router-view @agree="sonrouter_agreehail"></router-view> 
                </div>
    
            </div>
            </div>
            
        `,
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
                    url:'/api/user/getAllHailsInfo',
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
                    path: '/schoolFriends/friends/Hailchatinfo',
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
    var schoolFriends={
        template : `
            <div>
            <div class="list">
                <div class="list_mid">
                    <ul>
                        <li  @click="color_stasus='校友'" ><router-link to='/schoolFriends/classMate' :class="{check:color_stasus==='校友'}">校友</router-link></li>
                        <li  @click="color_stasus='我的好友'" ><router-link to='/scgoolBoard/friends' :class="{check:color_stasus==='我的好友'}">我的好友</router-link></li>
                    </ul>
                </div>
            </div>
            <div class="article_main">
            <router-view></router-view>
            </div>
            </div>
            
        `,
        data:function(){
            return {
                color_stasus:'校友'
            }
        },
    }
    var boardShow={
        template : `
            <div  class="jumbotron">
                <h3><label for="">
                公告类别：<select name="" v-model="item" @change="getBoardInfo()" class="form-control">
                        <option value="管理员公告">管理员公告</option>
                        <option value="找情侣">找情侣</option>
                        <option value="买卖物品">买卖物品</option>
                        <option value="约一起看电影">约一起看电影</option>
                        <option value="约一起学习">约一起学习</option>
                        <option value="表白墙">表白墙</option>
                        <option value="兼职墙">兼职墙</option>
                    </select>
                    </label>
                </h3>
                <div v-for="board in boardsList" style="margin-top:20px;border:2px solid red">
                    <div class="notice">
                        <div class="content">
                            <div class="client">
                                <img :src="board.b_release.head_img">
                                <p>{{board.b_release.nicheng}}&nbsp;&nbsp;&nbsp;&nbsp;{{board.b_release.faculty}}&nbsp;&nbsp;&nbsp;&nbsp;{{board.b_release.Class}}<br/>{{formateData(board.b_cTime)}} <span style="floatLright:margin-right:-130px">浏览量 {{board.views}}
                                    <button v-if="board.b_release._id==userInfo._id" type="button" class="btn btn-danger" @click="BoardsDelete(board._id)">删除</button>
                                    <button class="btn btn-primary" @click="oneBoardGet(board._id)">详情</button>
                                </span></p>
                                
                            </div>
                                <h2>{{board.b_theme}}</h2>
                                <p style="text-indent:2em;align:left;position:relative">{{board.b_disc}}</p>
                                <div class="content_img">
                                    <ul>
                                        <li v-for="img in board.b_img"><img :src="img" ></li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div class="discuss">
                        <h5>用户评论   (已有{{board.comments.length}}评论)</h5><br>
                        <img :src="userInfo.head_img" alt="">
                        <textarea v-model="addcomInfo" cols="50" rows="2"></textarea>
                        <span >
                            <button style="margin-top: -30px;" class="btn btn-primary" @click="addComment(board._id)">发表</button>
                        </span>
                    </div>
                    <div class="new_discuss">
                        <h5>最新评论</h5>
                        <div v-for="c in selectThree(board.comments)" style="width:100%;height:100px;">
                            
                            <span style="float:left;margin-left:20px;" > 
                            <span>{{c.username}}:</span>
                            </span>
                            <span style="float:right;margin-right:20px;">
                                <span>{{formateData(c.postTime)}}</span>
                                <button v-if="board.b_release._id==userInfo._id" type="button" class="btn btn-danger" @click="conmentDelete(c,board._id)">删除</button>
                            </span>
                            <br />
                            <span style="float:left;text-indent:4em">{{c.content}}</span>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        `,
        data:function(){
            return {
                boardsList:[],
                userInfo:{},
                item:'',
                addcomInfo:'',
            }
        },
        methods:{
            formateData(d){
                var date = new Date(d);
                return date.getFullYear()+'年'+date.getMonth()+'月'+date.getDate()+'时'+date.getHours() +':'+date.getMinutes()+':'+date.getSeconds();
            },
            getBoardInfo(){
                var that = this;
                console.log(that.item);
                var item = that.item;
                $.ajax({
                    type:'post',
                    url:'/api/boards/getItemBoardsInfo',
                    data:{
                        item
                    },
                    dataType:'json',
                    success:function(result){
                        that.boardsList = result.BoardsList;
                        that.boardsList.forEach(function(item){
                            item.b_release.password = '你不需要知道哦！';
                        })
                    }
                });
            },
            selectThree(comments){
                var arr=[]
                if(comments.length<=3){
                    return comments
                }else{
                    arr.push(comments[0]);
                    arr.push(comments[1]);
                    arr.push(comments[2]);
                    return arr
                }
            },
            getAllBoardsList(){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/boards/getAllBoardsList',
                    success:function(result){
                        that.boardsList = result.BoardsList;
                        that.boardsList.forEach(function(item){
                            item.b_release.password = '你不需要知道哦！';
                        })
                        
                    }
                });
            },
            oneBoardGet(b_id){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/boards/getOneBoardinfo?id='+b_id,
                    success:function(result){
                        that.boardsList.forEach((element,index)=> {
                            if(element._id==b_id){
                                that.boardsList[index].views=result.newInfo.views
                            }
                        });
                        that.$router.push({
                            path: '/scgoolBoard/boardView',
                            query: {
                                b_id
                            }
                        })
                    }
                });
            },
            BoardsDelete(board_id){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/boards/delete?id='+board_id,
                    success:function(result){
                        that.$router.push({
                            path: '/scgoolBoard/successInfo',
                            query: {
                            "msg":"删除成功！"
                            }
                        })
                        
                    }
                });
            },
            addComment(b_Id){
                var that = this;
                if(this.addcomInfo==''){
                    alert("评论不能为空！");
                }else{
                    $.ajax({
                        type:'post',
                        url:'/api/boards/comment/post',
                        data:{
                            b_Id,
                            messageContent:that.addcomInfo
                        },
                        dataType:'json',
                        success:function(result){
                            console.log(result);
                            that.addcomInfo='';
                            that.boardsList.forEach((element,index)=> {
                                if(element._id==b_Id){
                                    that.boardsList[index].comments=result.newContent.comments
                                    console.log(index);
                                    console.log(that.boardsList[index]);
                                }
                            });
                        }
                    });
                }
            },
            conmentDelete(c,b_Id){
                var that = this;
                $.ajax({
                    type:'post',
                    url:'/api/boards/comment/delete',
                    data:{
                        c,
                        b_Id
                    },
                    dataType:'json',
                    success:function(result){
                        console.log(result);
                        that.boardsList.forEach((element,index)=> {
                            if(element._id==b_Id){
                                that.boardsList[index].comments=result.newContent.comments
                                console.log(index);
                                console.log(that.boardsList[index].comments);
                            }
                        });
                    }
                });
            },
            formateData(d){
                var date = new Date(d);
                return date.getFullYear()+'年'+date.getMonth()+'月'+date.getDate()+'时'+date.getHours() +':'+date.getMinutes()+':'+date.getSeconds();
            }
        },
        created() {
            this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
            this.getAllBoardsList();
        },
    }
    var boardAdd={
        template : `
            <div>
                <h1>发布我的公告</h1>
                <div>
                    <label for="" v-if="userInfo.isAdmin">
                        公告类别：<select name="" v-model="boardInfo.item"  class="form-control">
                                <option value="管理员公告">管理员公告</option>
                                <option value="找情侣">找情侣</option>
                                <option value="买卖物品">买卖物品</option>
                                <option value="约一起看电影">约一起看电影</option>
                                <option value="约一起学习">约一起学习</option>
                                <option value="表白墙">表白墙</option>
                                <option value="兼职墙">兼职墙</option>
                            </select>
                    </label>
                    <label for="" v-if="!userInfo.isAdmin">
                        公告类别：<select name="" v-model="boardInfo.item"  class="form-control">
                                <option value="找情侣">找情侣</option>
                                <option value="买卖物品">买卖物品</option>
                                <option value="约一起看电影">约一起看电影</option>
                                <option value="约一起学习">约一起学习</option>
                                <option value="表白墙">表白墙</option>
                                <option value="兼职墙">兼职墙</option>
                            </select>
                    </label>
                    <br />
                    <label for="">
                        主题：<input  v-model="boardInfo.b_theme"  type="text" class="form-control" placeholder="主题">
                    </label>
                    <br />
                    <label for="">
                        描述：<textarea v-model="boardInfo.b_disc" name="" id="" cols="30" rows="5" placeholder="描述"></textarea>
                       
                    </label>
                    <br />
                    <label for="">照片
                            <input @change="obvies_imgs" type="file" name="file" id="updateBoard_imgs" accept="image/gif, image/jpeg,image/png,image/jpg" multiple>
                            <img src="" height="100px;width:100px">
                            <div id="b_imgs_box"></div>
                        <p class="" style="color:white">最多三张图片</p>
                    </label>
                </div>
                <div>
                    
                    <button type="button" class="btn btn-primary" @click="post_boardInfoImg()">发布</button>
                </div>
            </div>
            
        `,
        data:function(){
            return {
                boardInfo:{
                    item:'表白墙',
                    b_theme:'',
                    b_disc:'',
                    _id:''
                },
                userInfo:{}
            }
        },
        methods:{
            //返回上一层
            go_back_router(){
                this.$router.go(-1);
            },
            obvies_imgs(i){
                var htl = ``;
                for(var index = 0; index < $('#updateBoard_imgs')[0].files.length; index++){
                    htl+=`<img style="width:100px;height:100px;margin-left:10px" src="${URL.createObjectURL($("#updateBoard_imgs")[0].files[index])}"></img>`;
                }
                $('#b_imgs_box').html(htl);
                //$("[name='photo']").siblings('img').attr('src',URL.createObjectURL($("#updateUser_touxiang")[0].files[0])); 
            },
            post_boardInfo(){
                this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
                this.boardInfo._id=this.userInfo._id.toString();
                var that=this;
                let x = document.getElementById('updateBoard_imgs').files[0];
                if(this.boardInfo.b_theme==''||this.boardInfo.b_disc==''){
                    alert("主题和描述不能为空！");
                }else{
                    if(!x){
                        console.log("未选择图片，默认图片");
                        // $.ajax({
                        //     type:'post',
                        //     url:'/api/boards/addInfo',
                        //     data:that.boardInfo,
                        //     dataType:'json',
                        //     success:function(result){
                        //         that.$router.push({
                        //             path: '/successInfo',
                        //             query: {
                        //             "msg":"公告上传成功！"
                        //             }
                        //         })
                               
                        //     }
                        // });
                    }else{
                        $.ajax({
                            type:'post',
                            url:'/api/boards/addInfo',
                            data:that.update_userInfo,
                            dataType:'json',
                            success:function(result){
                                var Boardinfo_Id = result.Boardinfo_Id;
                                console.log("ready img");
                                console.log(result);
                                that.$router.push({
                                    path: '/cgoolBoard/successInfo',
                                    query: {
                                    "msg":"公告上传成功！"
                                    }
                                })
                            }
                        });
                    }
                }
                
            },
            post_boardInfoImg(){
                if(!this.userInfo){
                    alert("您还没有登录，请先登录");
                }else{
                    var that=this;
                    let x = document.getElementById('updateBoard_imgs').files[0];
                    // let params = new FormData() ; //创建一个form对象
                    // params.append('file',x,x.name);  //append 向form表单添加数据
                    // console.log(params);
                    if(this.boardInfo.b_theme==''||this.boardInfo.b_disc==''){
                        alert("主题和描述不能为空！");
                    }else{
                        if(!x){
                            alert("照片未选择！")
                       }else{
                            if($('#updateBoard_imgs')[0].files.length>3){
                                alert("图片最多可以上传三张！");
                            }else{
                                var formData = new FormData();
                                for(var index = 0; index < $('#updateBoard_imgs')[0].files.length; index++){
                                    formData.append('file', $('#updateBoard_imgs')[0].files[index]);
                                }
                                this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
                                this.boardInfo._id=this.userInfo._id.toString();
                
                                formData.append('item', that.boardInfo.item);
                                formData.append('b_theme', that.boardInfo.b_theme);
                                formData.append('b_disc', that.boardInfo.b_disc);
                                formData.append('_id', that.boardInfo.item);
                                console.log(formData);
                                $.ajax({
                                    type:'post',
                                    url:'/api/boards/addInfoImg',
                                    data:formData,
                                    dataType: 'JSON',  
                                    cache: false,  
                                    processData: false,  //不处理发送的数据，因为data值是FormData对象，不需要对数据做处理 
                                    contentType: false,
                                    success:function(result){
                                        console.log(result);
                                        // that.post_boardInfo();
                                        that.$router.push({
                                            path: '/scgoolBoard/successInfo',
                                            query: {
                                            "msg":"公告上传成功！"
                                            }
                                        })
                                    }
                                });
                            }
                       }
                    }
                }
                
                
            }
        },
        created() {
            this.userInfo=JSON.parse(localStorage.getItem('userInfo'));    
        },
    }
    var boardView={
        template : `
        <div  class="jumbotron">
        <div style="margin-top:20px;">
            <h3><img :src="board.b_release.head_img" style="width:100px;height:100px;">/{{board.b_release.nicheng}}/{{board.b_release.faculty}}
            /{{board.b_release.Class}}/{{formateData(board.b_cTime)}}/<button class="btn btn-primary">浏览量：{{board.views}}）</button> <button v-if="board.b_release._id==userInfo._id" type="button" class="btn btn-danger" @click="BoardsDelete(board._id)">删除</button>
            </h3>
            <h3>{{board.b_theme}}</h3>
            <h3>{{board.b_disc}}</h3>
            <h3><img v-for="img in board.b_img" :src="img" style="width:200px;height:200px;margin-left:10px"></h3>
           
            <div>
                <textarea  v-model="addcomInfo" name="" id="" cols="40" rows="4"></textarea>
                <button class="btn btn-primary" @click="addComment(board._id)">发表</button>
                <p v-for="c in board.comments" style="width:100%;height:100px;">
                    <span style="float:left;margin-left:20px;"> 
                        <span>{{c.username}}:</span>
                    </span>
                    <span style="float:right;margin-right:20px;">
                        <span>{{formateData(c.postTime)}}</span>
                        <button v-if="board.b_release._id==userInfo._id" type="button" class="btn btn-danger" @click="conmentDelete(c,board._id)">删除</button>
                    </span>
                    <br />
                    <span style="float:left;text-indent:2em">{{c.content}}</span>
                    
                </p>
            </div>
        </div>
    </div>
            
        `,
        data:function(){
            return {
                board:{},
                b_id:this.$route.query.b_id,
                userInfo:{},
                addcomInfo:''

            }
        },
        methods:{
            formateData(d){
                var date = new Date(d);
                return date.getFullYear()+'年'+date.getMonth()+'月'+date.getDate()+'时'+date.getHours() +':'+date.getMinutes()+':'+date.getSeconds();
            },
            oneBoardGet(b_id){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/boards/getOneBoardinfo?id='+b_id,
                    success:function(result){
                        that.board=result.newInfo;

                        console.log(that.board);
                    }
                });
            },
            BoardsDelete(board_id){
                var that = this;
                $.ajax({
                    type:'get',
                    url:'/api/boards/delete?id='+board_id,
                    success:function(result){
                        that.$router.push({
                            path: '/scgoolBoard/successInfo',
                            query: {
                            "msg":"删除成功！"
                            }
                        })
                        
                    }
                });
            },
            addComment(b_Id){
                var that = this;
                if(this.addcomInfo==''){
                    alert("评论不能为空！");
                }else{
                    $.ajax({
                        type:'post',
                        url:'/api/boards/comment/post',
                        data:{
                            b_Id,
                            messageContent:that.addcomInfo
                        },
                        dataType:'json',
                        success:function(result){
                            console.log(result);
                            that.addcomInfo='';
                            
                            that.board.comments=result.newContent.comments
                            
                        }
                    });
                }
            },
            conmentDelete(c,b_Id){
                var that = this;
                $.ajax({
                    type:'post',
                    url:'/api/boards/comment/delete',
                    data:{
                        c,
                        b_Id
                    },
                    dataType:'json',
                    success:function(result){
                        that.board.comments=result.newContent.comments
                    }
                });
            },
        },
        created() {
            this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
            console.log(this.$route.query.b_id);
            this.oneBoardGet(this.$route.query.b_id);
        }
    }
    var scgoolBoard={
        template : `
            <div>
                <div class="list">
                    <div class="list_mid">
                    <ul>
                    <li  @click="color_stasus='公告展示'" ><router-link to='/scgoolBoard/boardShow' :class="{check:color_stasus==='公告展示'}">公告展示</router-link></li>
                    <li  @click="color_stasus='发布公告'" ><router-link to='/scgoolBoard/boardAdd' :class="{check:color_stasus==='发布公告'}">发布公告</router-link></li>
                    </ul>
                    </div>
                </div>
                <div class="article_main">
                <router-view></router-view>
                </div>
            </div>
        `,
        data:function(){
            return {
                color_stasus:'公告展示'
            }
        }
    }
    var errorInfo ={
        template : `
        <div>
            <h1>出错！</h1>
            <h2>{{$route.query.msg}}</h2>
        </div>
        
        `
    }
    var successInfo ={
        template : `
        <div>
            <h1>{{$route.query.msg}}</h1>
        </div>
        
        `
    }
    var updateUserInfo={
        template : `
            <div>
                <h1>完善个人信息</h1>
                <div>
                    
                    <br />
                    <label for="">
                        昵称：<input v-model="update_userInfo.nicheng" type="text" class="form-control" placeholder="昵称：">
                    </label>
                    <br />
                    <label for="">
                        性别：<select name=""   v-model="update_userInfo.sex"  class="form-control">
                                <option value="男">男</option>
                                <option value="女">女</option>
                            </select>
                    </label> 
                    <br />
                    <label for="">
                        性别：<select name=""   v-model="update_userInfo.danshen"  class="form-control">
                                <option value="单身">单身</option>
                                <option value="已脱单">已脱单</option>
                            </select>
                    </label> 
                    <br />
                    <label for="">
                        描述：<textarea v-model="update_userInfo.disc" name="" id="" cols="30" rows="5" placeholder="描述"></textarea>
                       
                    </label>
                    <br />
                    <label for="">
                        院系<select name=""   v-model="update_userInfo.faculty"  class="form-control">
                                <option value="计院">计院</option>
                                <option value="通院">通院</option>
                                <option value="电院">电院</option>
                                <option value="理学院">理学院</option>
                                <option value="数媒">数媒</option>
                            </select>
                    </label> 
                    <br />
                    <label for="">
                        班级：<input v-model="update_userInfo.Class" type="text" class="form-control" placeholder="输入班级">
                    </label>
                    <br />
                    <label for="exampleInputFile">头像
                            <input @change="obvies_touxiang" type="file" name="photo" id="updateUser_touxiang" accept="image/gif, image/jpeg,image/png,image/jpg" >
                            <img src="" height="100px;width:100px">
                        <p class="help-block">不传头像会默认头像</p>
                    </label>
                </div>
                <div>
                    <button type="button" class="btn btn-default" data-dismiss="modal" @click="go_back_router()">Close</button>
                    <button type="button" class="btn btn-primary" @click="post_updateUserInfo()">确定修改</button>
                </div>
            </div>
            
        `,
        data:function(){
            return {
                update_userInfo:{
                    "nicheng":'',
                    "sex":'男',
                    "disc":'',
                    "faculty":'计院',
                    "Class":'',
                    "_id":'',
                    "danshen":'单身'
                }
            }
        },
        methods:{
            //返回上一层
            go_back_router(){
                this.$router.go(-1);
            },
            //更新个人信息
            post_updateUserInfo(){
                this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
                this.update_userInfo._id=this.userInfo._id.toString();
                var that=this;
                let x = document.getElementById('updateUser_touxiang').files[0];
                console.log(x);
                if(!x){
                    alert("未选择头像");
                }else{
                    $.ajax({
                        type:'post',
                        url:'/api/user/UpateInfo',
                        data:that.update_userInfo,
                        dataType:'json',
                        success:function(result){
                            console.log(result);
                            that.post_updateUserInfo_img();
                        }
                    });
                }
                
            },
            //更新的人信息的头像
            post_updateUserInfo_img(){
                var that=this;
                let x = document.getElementById('updateUser_touxiang').files[0];
                let params = new FormData() ; //创建一个form对象
                params.append('photo',x,x.name);  //append 向form表单添加数据
                console.log(params);
                $.ajax({
                    type:'post',
                    url:'/api/user/UpateInfoImg',
                    data:params,
                    dataType: 'JSON',  
                    cache: false,  
                    processData: false,  //不处理发送的数据，因为data值是FormData对象，不需要对数据做处理 
                    contentType: false,
                    success:function(result){
                        console.log(result);
                        localStorage.setItem('userInfo',JSON.stringify(result.userInfo));
                        vm.userInfo=result.userInfo;
                        that.$router.push({
                            path: '/successInfo',
                            query: {
                              "msg":"更新个人资料成功！"
                            }
                          })
                    }
                });
            },
            obvies_touxiang(i){
                 $("[name='photo']").siblings('img').attr('src',URL.createObjectURL($("#updateUser_touxiang")[0].files[0])); 
            }
        }
    }
    //路由
    var routes = [
        {
            path : '/',
            component : index

        },
        {
            path : '/errorInfo',
            component : errorInfo

        },
        {
            path : '/successInfo',
            component : successInfo

        },
        {
            path : '/scgoolBoard',
            component :scgoolBoard ,
            children:[
                {
                    path : '/scgoolBoard/boardShow',
                    component : boardShow
        
                },
                {
                    path : '/scgoolBoard/boardAdd',
                    component : boardAdd
        
                },
                {
                    path : '/scgoolBoard/successInfo',
                    component : successInfo
        
                },
                {
                    path : '/scgoolBoard/boardView',
                    component : boardView
        
                },
            ]

        },
        {
            path : '/schoolFriends',
            component : schoolFriends,
            children:[
                {
                    path : '/schoolFriends/classMate',
                    component : classMate
        
                },
                {
                    path : '/scgoolBoard/friends',
                    component : friends,
                    children:[
                        {
                            path : '/schoolFriends/friends/Hailrequestinfo',
                            component : Hailrequestinfo
                
                        },
                        {
                            path : '/schoolFriends/friends/Hailchatinfo',
                            component : Hailchatinfo
                
                        },
                    ]
        
                },
            ]

        },
        {
            path : '/updateUserInfo',
            component : updateUserInfo

        },
        {
            path : '/user/:id',
            name:'user',
            component : {
                template : 
                // <router-link to='/user' append>更多信息</router-link>
                `
                    <div>
                        <h1>用户:{{$route.params.id}}</h1>
                        <h1>用户:{{$route.query.age}}</h1>
                        <router-link :to="'/user/'+$route.params.id+'/more?age=18'">更多信息</router-link>
                    
                        
                        <router-view></router-view>
                    </div>
                `
            },
            children:[
                {
                    path:'more',
                    component : {
                    template : `
                    <div>
                        <h1>dffgf dsg dgdgdggdgddddddddddddddddddddddd dddddddddddddd</h1>
                    </div>
                `
                    }
                }
            ]

        }
    ];

    var router = new VueRouter({
        routes:routes,
    });
    var vm=new Vue({
        delimiters: ['${', '}'],
        el:'#app',
        router:router,
        data:{
            up_down:true,
            mark:0,
            timer:null,
            color_stasus:'index',
            login_stadus:'login',
            roundImgs:['/public/imgs/01.jpeg','/public/imgs/02.jpeg','/public/imgs/03.jpeg','/public/imgs/04.jpeg','/public/imgs/05.jpeg'],
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
        },
        methods: {
            //让页面上移动特效
            up_or_down(){
                console.log(this.up_down);
                if(this.up_down){
                    $(".bottom").animate({top: '200px'}, "slow");
                    $(".up_down_img").eq(0).attr("src",'/public/imgs/down.png');
                    this.up_down=!this.up_down;
                }else{
                    $(".bottom").animate({top: '96%'}, "slow");
                    $(".up_down_img").eq(0).attr("src",'/public/imgs/up.png');
                    this.up_down=!this.up_down;
                }
            },
            //首页的轮播效果
            autoPlay () {
                this.mark++;
                if (this.mark === 4) {
                    this.mark = -1
                }
            },
            play () {
                this.timer = setInterval(this.autoPlay, 2500)
            },
            change (i) {
                this.mark = i
            },
            stop () {
                clearInterval(this.timer)
            },
            move () {
                this.timer = setInterval(this.autoPlay, 2500)
            },
            //主页换颜色 橙色选中
            cp_color(str){
                this.color_stasus=str;
            },
            //注册
            User_resister(){
                var registerBox = $('#registerBox');
                var that=this;
                $.ajax({
                    type:'post',
                    url:'/api/user/register',
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
            //登录
            User_login(){
                var that=this;
                $.ajax({
                    type:'post',
                    url:'/api/user/login',
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
                    url:'/api/user/logout',
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
            this.play();
            this.getuserInfo_bylocal();
            setTimeout(function(){
                that.up_or_down();
            },1000);
        }
    });
});