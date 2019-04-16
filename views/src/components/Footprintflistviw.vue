<template>
    <div  class="jumbotron" style="color:black;height:800px;">
        <div style="margin-top:20px;">
            <h3 style="text-align:center"><img :src="board.b_release.head_img" style="width:100px;height:100px;"> {{board.b_release.nicheng}}{{formateData(board.b_cTime)}} <button class="btn btn-primary">浏览量：{{board.views}}</button> <button v-if="board.b_release._id==userInfo._id" type="button" class="btn btn-danger" @click="BoardsDelete(board._id)">删除</button>
            </h3>
            <h3 style="text-align:center">{{board.b_theme}}</h3>
            <h3 style="text-indent:2em">{{board.b_disc}}</h3>
            <h3 style="text-align:center"><img v-for="(img,index) in board.b_img" :src="img" style="width:200px;height:200px;margin-left:10px" :key="index"></h3>
           
            <div style="text-align:center">
                <textarea  v-model="addcomInfo" name="" id="" cols="40" rows="4"></textarea>
                <button class="btn btn-primary" @click="addComment(board._id)">发表</button>
                <p v-for="(c,ind) in board.comments" style="width:100%;height:100px;" :key="ind">
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
</template>
<script>
export default {
    name: 'Footprintflistviw',
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
                url:'http://localhost:3000/api/boards/getOneBoardinfo?id='+b_id,
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
                        
                        that.board.comments=result.newContent.comments
                        
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
</script>
<style scope>
.jumbotron{
    overflow-y: scroll;
}
.jumbotron::-webkit-scrollbar {display:none}
</style>