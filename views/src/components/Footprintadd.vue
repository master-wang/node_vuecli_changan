<template>
    <div style="text-align:center;position:absolute;top:50px">
        <h1>留下我的足迹</h1>
        <div>
            <label for="" v-if="userInfo.isAdmin">
                足迹类别：<select name="" v-model="boardInfo.item"  class="form-control">
                        <option value="管理员公告">管理员公告</option>
                        <option value="相约西安之旅">相约西安之旅</option>
                        <option value="话长安">话长安</option>
                        <option value="分享长安小吃">分享长安小吃</option>
                        <option value="长安推荐">长安推荐</option>
                    </select>
            </label>
            <label for="" v-if="!userInfo.isAdmin">
                足迹类别：<select name="" v-model="boardInfo.item"  class="form-control">
                        <option value="相约西安之旅">相约西安之旅</option>
                        <option value="话长安">话长安</option>
                        <option value="分享长安小吃">分享长安小吃</option>
                        <option value="长安推荐">长安推荐</option>
                    </select>
            </label>
            <br />
            <label for="">
                主题：<input  v-model="boardInfo.b_theme"  type="text" class="form-control" placeholder="主题">
            </label>
            <br />
            <label for="">
                描述：<textarea v-model="boardInfo.b_disc" name="" id="" cols="30" rows="5" placeholder="描述" style="color:black"></textarea>
                
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
</template>
<script>
export default {
    name: 'Footprintadd',
    data:function(){
        return {
            boardInfo:{
                item:'话长安',
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
                        url:'http://111.230.155.152:3000/api/boards/addInfo',
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
                            formData.append('br_id', that.userInfo._id);
                            console.log(formData);
                            $.ajax({
                                type:'post',
                                url:'http://111.230.155.152:3000/api/boards/addInfoImg',
                                data:formData,
                                dataType: 'JSON',  
                                cache: false,  
                                processData: false,  //不处理发送的数据，因为data值是FormData对象，不需要对数据做处理 
                                contentType: false,
                                success:function(result){
                                    console.log(result);
                                    // that.post_boardInfo();
                                    that.$router.push({
                                        path: '/Cheng/footprint/successInfo',
                                        query: {
                                        "msg":"足迹上传成功！"
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
</script>
<style scope>

</style>