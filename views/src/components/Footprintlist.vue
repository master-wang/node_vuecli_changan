<template>
    <div  class="jumbotron" style="color:black">
        <h3 style="text-align:center"><label for="">
        公告类别：<select name="" v-model="item" @change="getBoardInfo()" class="form-control">
                <option value="管理员公告">管理员公告</option>
                <option value="相约西安之旅">相约西安之旅</option>
                <option value="话长安">话长安</option>
                <option value="分享长安小吃">分享长安小吃</option>
                <option value="长安推荐">长安推荐</option>
            </select>
            </label>
        </h3>
        <div v-for="(board,index) in boardsList" style="margin-top:20px;box-shadow: #ccc 0 0 50px" :key="index">
            <div class="notice">
                <div class="content">
                    <div class="client">
                        <img :src="board.b_release.head_img">
                        <p>{{board.b_release.nicheng}}&nbsp;&nbsp;&nbsp;&nbsp;<br/>{{formateData(board.b_cTime)}} <span style="floatLright:margin-right:-130px">浏览量 {{board.views}}
                            <button v-if="board.b_release._id==userInfo._id" type="button" class="btn btn-danger" @click="BoardsDelete(board._id)">删除</button>
                            <button class="btn btn-primary" @click="oneBoardGet(board._id)">详情</button>
                        </span></p>
                        
                    </div>
                        <h2>{{board.b_theme}}</h2>
                        <p style="text-indent:2em;align:left;position:relative">{{board.b_disc}}</p>
                        <div class="content_img">
                            <ul>
                                <li v-for="(item,index) in board.b_img" :key="index"><img :src="item"  ></li>
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
                <div v-for="(c,index) in selectThree(board.comments)" style="width:100%;height:100px;" :key="index">
                    
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
</template>
<script>
export default {
    name: 'Footprintlist',
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
                url:'http://localhost:3000/api/boards/getItemBoardsInfo',
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
                url:'http://localhost:3000/api/boards/getAllBoardsList',
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
                url:'http://localhost:3000/api/boards/getOneBoardinfo?id='+b_id,
                success:function(result){
                    that.boardsList.forEach((element,index)=> {
                        if(element._id==b_id){
                            that.boardsList[index].views=result.newInfo.views
                        }
                    });
                    that.$router.push({
                        path: '/Cheng/footprint/Footprintflistviw',
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
                url:'http://localhost:3000/api/boards/delete?id='+board_id,
                success:function(result){
                    that.$router.push({
                        path: '/Cheng/footprint/successInfo',
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
                    url:'http://localhost:3000/api/boards/comment/post',
                    data:{
                        b_Id,
                        messageContent:that.addcomInfo,
                        username:that.userInfo.username
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
                url:'http://localhost:3000/api/boards/comment/delete',
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
</script>
<style scope>
/* 
*公告
*/
.notice .content{
    height: 400px;
    left: 30px;
    top: 30px;
    width: 93%;
    border:1px #ccc solid;
    position: relative;
}.content ul li{
    list-style-type: none;
    display: inline-block;
}.content_img img{
    width: 150px;
    height: 150px;
    margin-left: 20px;
    margin: 20px 10px;
}.client img{
    border-radius: 50%;
    width: 50px;
    height: 50px;
}.content .client{
    position: absolute;
    left: 10px;
    top: 10px;
}
.content h2{
    margin-top: 90px;
    text-align: center;
}
.content h4{
    position: absolute;
    top: 70px;
    left: 20px;
    font-family: Times New Roman;
}.content .client p{
    position: absolute;
    top: 1px;
    left: 60px;
    height: 50px;
    width: 304px;
    /*border:1px red solid;*/
    font-family: Comic Sans MS;
}.client p span{
    position: absolute;
    top: 20px;
    right: -500px;
    font-size:14px;
    /*font-family:*/ 
    /*border:1px red solid;*/
}
/*用户评论区*/
 .discuss{
    height: 70px;
    margin-top: 60px;
    padding-left: 30px;
    /*border:1px red solid;*/
}.discuss img{
    width: 40px;
    height: 40px;
    margin-right:10px;
    border-radius:50%;
    margin-top: -30px;
}.discuss input{
    right: 40px;
    width: 60px;
    margin-top: -30px;
}.new_discuss{
    margin-top: 35px;
    margin-bottom: 20px;
    width: 100%;
    border-top: 1px #ddd solid;
    padding-left: 30px;
    /*border:1px red solid;*/
}
img {
    vertical-align:auto;
}
.new_discuss img{
    width: 100%;
    top: 20px;
    border-radius: 50%;
}.new_discuss p{
    left: 60px;
}.new_discuss p a{
    text-decoration:none;
}
.jumbotron{
    position: relative;
    background-image: url(../assets/wodezuji.jpg);
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: 80% 100%;
    background: rgba(185, 177, 177, 0.1);
}
</style>