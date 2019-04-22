<template>
    <div style="text-align:center;margin-top:100px;">
        <h1>添加朝代信息</h1>
        <div>
            
            <br />
            <label for="">
                朝代：<input v-model="dynaty.name" type="text" class="form-control" placeholder="朝代：">
            </label>
            <br />
            <label for="">
                时间：<input v-model="dynaty.set_time" type="text" class="form-control" placeholder="时间：">
            </label> 
            <br />
            <label for="">
                人物：<input v-model="dynaty.build_it" type="text" class="form-control" placeholder="人物：">
            </label> 
            <br />
            <label for="">
                标题：<input v-model="dynaty.jianjie" type="text" class="form-control" placeholder="标题：">
            </label> 
            <br />
            <label for="">
                简介：<textarea v-model="dynaty.desc" name="" id="" cols="30" rows="5" placeholder="简介：" style="color:black"></textarea>
                
            </label>
            <br />
            <br />
            <label for="exampleInputFile">照片
                    <input @change="obvies_touxiang" type="file" name="photo" id="updateUser_touxiang" accept="image/gif, image/jpeg,image/png,image/jpg" >
                    <img src="" height="100px;width:100px">
                <p class="help-block">需要上传图片才能添加</p>
            </label>
        </div>
        <div>
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="go_back_router()">Close</button>
            <button type="button" class="btn btn-primary" @click="post_dynatyinfo()">添加</button>
        </div>
        <img class="Adddynatyimg" src="../assets/wang.png" alt="">
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Upadateuserinfo',
    data(){
        return {
            dynaty:{
                "name":'',
                "set_time":'公元200年',
                "build_it":'',
                "jianjie":'',
                "desc":'',
            }
        }
    },
    methods:{
        //返回上一层
        go_back_router(){
            this.$router.go(-1);
        },
        // 添加朝代
        post_dynatyinfo(){
            this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
            var that=this;
            let x = document.getElementById('updateUser_touxiang').files[0];
            console.log(x);
            let params = new FormData() ; //创建一个form对象
            params.append('photo',x,x.name);  //append 向form表单添加数据
            params.append('name', that.dynaty.name);
            params.append('set_time', that.dynaty.set_time);
            params.append('build_it', that.dynaty.build_it);
            params.append('jianjie', that.dynaty.jianjie);
            params.append('desc', that.dynaty.desc);
            if(!x){
                alert("未选择图片");
            }else{
                $.ajax({
                    type:'post',
                    url:'http://111.230.155.152:3000/api/dynary/add',
                    data:params,
                    dataType: 'JSON',  
                    cache: false,  
                    processData: false,  //不处理发送的数据，因为data值是FormData对象，不需要对数据做处理 
                    contentType: false,
                    success:function(result){
                        console.log(result);
                        axios.get('http://111.230.155.152:3000/api/dynary/getAllDynatiesList').then(function(res){  // axios 的请求方式
                            that.$store.dispatch('changedy',res.data.DynatiesList);
                        })
                        that.$router.push({
                            path: '/Cheng/Administration/successInfo',
                            query: {
                            "msg":"添加朝代成功！"
                            }
                        })
                    }
                });
            }
            
        },
        obvies_touxiang(i){
                $("[name='photo']").siblings('img').attr('src',URL.createObjectURL($("#updateUser_touxiang")[0].files[0])); 
        }
    },
    created(){
        
    }
}
</script>
<style scope>
.Adddynatyimg{
    position: absolute;
    top: 60px;
    left: -20px;
    z-index: -1;
}
</style>
