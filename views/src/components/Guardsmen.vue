<template>
    <div id="men" style="text-align:center;color:black">
        <h1>长安守卫军</h1>
        <label for="">
            昵称：<input  v-model="seach_info.nicheng"   type="text" class="form-control" placeholder="昵称：">
        </label>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th  style="text-align:center;">用户名</th>
                <th style="text-align:center;">昵称</th>
                <th style="text-align:center;">操作</th>
            </tr>
            </thead>
            <tfoot>
            <tr v-for="(user,index) in searched_data" :key="index">
                <td>{{user.username}}</td>
                <td>{{user.nicheng}}</td>
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
    name: 'Guardsmen',
    data:function(){
        return {
            seach_info:{
                nicheng:''
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
                url:'http://111.230.155.152:3000/api/user/getAllList',
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
                url:'http://111.230.155.152:3000/api/user/FriendRequest?to_id='+user_id+'&from_user='+that.userInfo._id,
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
                url:'http://111.230.155.152:3000/api/user/getAllHailsInfo?_id='+that.userInfo._id,
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
                if (list[i].nicheng.search(me.seach_info.nicheng) != -1) {
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
</script>
<style scope>
#men{
    height: 600px;
    width: 100%;
    top: 60px;
    overflow-y:scroll;
}
#men .table{
    color: black;
}
#men .table th{
    color: rgb(179, 8, 107);
    font-size: 20px;
}

#men::-webkit-scrollbar {display:none}
</style>