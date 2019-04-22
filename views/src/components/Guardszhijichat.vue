<template>
    <div style="color:black">
        <div class="box2-nav">{{name}}</div>
        <div class="box2-nav1" id="scotop">
            <ul class="message">
                <div v-for="(chat,index) in chats" class="chatitem" :key="index">
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
</template>
<script>
export default {
    name: 'Guardszhijichat',
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
                    url:'http://111.230.155.152:3000/api/user/chatsAdd',
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
                url:'http://111.230.155.152:3000/api/user/chatInfoGetAll?charId='+char_Id,
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
                url:'http://111.230.155.152:3000/api/user/chatInfoGetAll?charId='+char_Id,
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
</script>
<style scope>

</style>
