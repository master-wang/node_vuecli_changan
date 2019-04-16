<template>
    <div class="AdminList" style="text-align:center;color:black;margin-top:60px;">
        <h1>朝代列表</h1>
        <label for="">
            朝代：<input  v-model="searchname"   type="text" class="form-control" placeholder="朝代：">
        </label>
        <div class="row">
            <div class="col-xs-6 col-md-3" v-for="(dynaty,index) in dy" :key="index">
                <a href="#" class="thumbnail">
                    朝代：{{dynaty.name}}
                <img :src="dynaty._img" alt="...">
                    <button class="btn btn-danger" @click="deletedynaty(dynaty._id)">删除</button>
                </a>
            </div>
            <input type="hidden" :value="newdata">
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'AdministrationList',
    data(){
        return {
            name :'',
            searchname:'',
            DynatiesList:[],
            seachListL:[]
        }
    },
    methods:{
        webAnimate(){
            $('.AdminList .row .col-xs-6').each( function( index, val ) {
                console.log($(this));
                $(this).animate({opacity:1},(index+2)*600);
                var el = $(this)
                setTimeout(function(){
                    el.css("position","static");
                },(index)*200)
            });
        },
        deletedynaty(dynaty_id){
            var that = this;
            axios.get('http://localhost:3000/api/dynary/delete?dynaty_id='+dynaty_id).then(function(res){  // axios 的请求方式
                console.log(res);
                alert("删除成功！");
                axios.get('http://localhost:3000/api/dynary/getAllDynatiesList').then(function(res){  // axios 的请求方式
                    that.$store.dispatch('changedy',res.data.DynatiesList);
                })
            })
        }
    },
    computed:{
        newdata:function(){
            var me = this;
            var arr = [];
            let list = this.DynatiesList;
            for (let i = 0;i < list.length;i++){
                if (list[i].name.search(me.searchname) != -1) {
                    arr.push(list[i]);
                }
            }
            me.seachListL = arr;
            setTimeout(function(){
                me.webAnimate();
            },10);
            return arr;
        },
        dy:function(){
            return this.$store.getters.Dynaties;
        }
    },
    mounted(){
        var that = this;
        axios.get('http://localhost:3000/api/dynary/getAllDynatiesList').then(function(res){  // axios 的请求方式
            that.seachListL = res.data.DynatiesList;
            that.DynatiesList = res.data.DynatiesList;
        })
        // setTimeout(function(){
        //     that.webAnimate();
        // },100);
  }
}
</script>
<style scope>
.AdminList .row {
    position: absolute;
    width: 100%;
    height: 600px;
    overflow-y: scroll;
}
.AdminList .row .col-xs-6{
    opacity: 0;
    position: absolute;
    transition: all 2s ease-in-out;
    width: 24%;
    height: 300px;
}
.AdminList .row::-webkit-scrollbar {display:none}
</style>
