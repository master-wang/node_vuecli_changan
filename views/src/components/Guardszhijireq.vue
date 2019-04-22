<template>
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
        <tr v-for="(user,index) in hail_req_notagree" :key="index">
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
            <li v-for="(item,index) in fenyesuoying" @click="jumppage(item)" :key="index"><a href="#">{{item}}</a></li>
            <li>
            <a href="#" aria-label="Next" @click="plus()">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
    </nav>
</div>
</template>
<script>
export default {
    name: 'Guardszhijireq',
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
                url:'http://111.230.155.152:3000/api/user/getAllHailsInfo?_id='+that.userInfo._id,
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
                url:'http://111.230.155.152:3000/api/user/FriendRequestnotAgree?req_id='+req_id,
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
                url:'http://111.230.155.152:3000/api/user/FriendRequestAgree?from_user_id='+from_user_id+'&to_user='+that.userInfo._id,
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
</script>
<style scope>

</style>

