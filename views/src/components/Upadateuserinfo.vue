<template>
    <div style="text-align:center">
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
            <br />
            <label for="">
                描述：<textarea v-model="update_userInfo.disc" name="" id="" cols="30" rows="5" placeholder="描述" style="color:black"></textarea>
                
            </label>
            <br />
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
</template>
<script>
export default {
    name: 'Upadateuserinfo',
    data(){
        return {
            update_userInfo:{
                "nicheng":'',
                "sex":'男',
                "disc":'',
                "_id":'',
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
                let params = new FormData() ; //创建一个form对象
                params.append('photo',x,x.name);  //append 向form表单添加数据
                params.append('nicheng', that.update_userInfo.nicheng);
                params.append('sex', that.update_userInfo.sex);
                params.append('disc', that.update_userInfo.disc);
                params.append('_id', that.update_userInfo._id);
                if(!x){
                    alert("未选择头像");
                }else{
                    $.ajax({
                        type:'post',
                        url:'http://localhost:3000/api/user/UpateInfo',
                        data:params,
                        dataType: 'JSON',  
                        cache: false,  
                        processData: false,  //不处理发送的数据，因为data值是FormData对象，不需要对数据做处理 
                        contentType: false,
                        success:function(result){
                            console.log(result);
                            localStorage.setItem('userInfo',JSON.stringify(result.userInfo));
                            that.$emit('show',result.userInfo)
                            that.$router.push({
                                path: '/Cheng/successInfo',
                                query: {
                                "msg":"更新个人资料成功！"
                                }
                            })
                            //that.post_updateUserInfo_img();
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
                    url:'http://localhost:3000/api/user/UpateInfoImg',
                    data:params,
                    dataType: 'JSON',  
                    cache: false,  
                    processData: false,  //不处理发送的数据，因为data值是FormData对象，不需要对数据做处理 
                    contentType: false,
                    success:function(result){
                        console.log(result);
                        localStorage.setItem('userInfo',JSON.stringify(result.userInfo));
                        that.$router.push({
                            path: '/Cheng/successInfo',
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
</script>
<style scope>

</style>
