<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-inverse ">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#" style="font-size:30px" ><h1><router-link to='/' class="linghtBlue"> 长安</router-link></h1> </a>
          <a class="navbar-brand" href="#" style="font-size:30px:margin-left:100px;" ><h1><router-link to='/changan3D' class="linghtBlue"> 3D长安</router-link></h1> </a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><h2><router-link to='/Cheng/footprint/Footprintlist' class="linghtBlue"> 城参与</router-link></h2> </a></li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 右部图片展示历史遗迹 -->
    <div class="row">
      <div id="boards-imgs">
        <div v-for="(item,index) in dy" :key="index"  @click="select(index,item._id)" >
          <router-link to='/Dynasty' href="#" class="thumbnail" >
            <div class="boards-img"  >
              <img :src="item._img" alt="" style="position:absolute;width:240px;height: 170px;">
            </div>
            <div class="boards-img-tint"></div>
            <div class="boards-img-content linghtRed" >
              {{item.name}}
            </div>
          </router-link>
          
        </div>

      </div>

    </div>

    <!-- 主题内容 -->
    <div class="boards-artica"  :style="app_box.note">
      <transition :name="transitionName"> 
        <router-view class="Router" />
      </transition>
    </div>
    
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome tovddd Vue.js App',
      transitionName: 'slide-right',
      src:'',
      xian:[
        {
          name:'唐朝',
          note:{
            backgroundImage: "url(" + require("./assets/xian1.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "5px",
            width:"100%",
            height: "85%",
            backgroundPosition: "50%",
            color: "#fff",
            backgroundSize: '100%',
           
          }
        },
        {
          name:'西汉',
          note:{
            backgroundImage: "url(" + require("./assets/xian2.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "5px",
            width:"100%",
             height: "85%",
            backgroundPosition: "50%",
            color: "#fff",
            backgroundSize: '100%',
           
          }
        },
        {
          name:'3朝',
          note:{
            backgroundImage: "url(" + require("./assets/xian3.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "5px",
            width:"100%",
           height: "85%",
            backgroundPosition: "50%",
            color: "#fff",
            backgroundSize: '100%',
           
          }
        },
        {
          name:'4朝',
          note:{
            backgroundImage: "url(" + require("./assets/xian4.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "5px",
            width:"100%",
           height: "85%",
            backgroundPosition: "50%",
            color: "#fff",
            backgroundSize: '100%',
            
          }
        },
        {
          name:'5朝',
          note:{
            backgroundImage: "url(" + require("./assets/xian5.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "5px",
            width:"100%",
            height: "85%",
            backgroundPosition: "50%",
            color: "#fff",
            backgroundSize: '100%',
            
          }
        }
      ],
      dynaties:this.$store.getters.Dynaties,
      a_view_sight:'',
      app_box:{
          name:'唐朝',
          note:{
            backgroundImage: "url(" + require("./assets/xian.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "5px",
            width:"100%",
            height: "85%",
            backgroundPosition: "100%",
            color: "#fff",
          }
      },
      userInfo:{},
    }
  },
  methods:{
    hidetint(e){
      var el = e.target
      $(el).find('.boards-img-tint').eq(0).animate({backgroundColor: 'white',opacity:'0.3'},"slow");
      $(el).find('.boards-img').eq(0).animate({backgroundSize: '120%'},"slow");
    },
    showtint(e){
      var el = e.target
      $(el).find('.boards-img-tint').eq(0).animate({backgroundColor: 'black',opacity:'0.9'},"slow");
      $(el).find('.boards-img').eq(0).animate({backgroundSize: '100%',},"slow");
    },
    select(i,_id){
      // var app_box_se = this.xian[i];
      // app_box_se.note.height = "85%";
      // $('.boards-artica').eq(0).css(app_box_se.note);
      console.log(_id)
      this.$router.push({
        path: '/Dynasty',
        query: {
          "_id": _id
        }
      })
      // location.reload();
    },
    webAnimate(){
      $('#app .row .thumbnail').each( function( index, val ) {
        $(this).animate({right: '10px',opacity:1},(index+2)*700);
      });
      $('#app .navbar .jian-top').animate({left:"500px",opacity:1},4000);
      $('#app .navbar .jian-top').css("transform","rotate(-140deg)");
      $('#app .navbar .jian-top2').animate({left:"500px",opacity:1},4000);
      $('#app .navbar .jian-top2').css("transform","rotate(20deg)")
    },
    getAllDynaties(){
      var that = this;
      axios.get('http://111.230.155.152:3000/api/dynary/getAllDynatiesList').then(function(res){  // axios 的请求方式
        that.dynaties = res.data.DynatiesList;
        // that.dynaties.forEach(function(item){
        //   var imgurl =  item._img;
        //   var jso = that.app_box.note;
        //   jso.backgroundImage = "url(" + imgurl + ")";
        //   item.note = jso;
        // })
        setTimeout(function(){
          that.webAnimate();
        },1000)
      })
    }
  },
  watch: {
　　　'$route' (to, from) {
　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退 对应相应的动画
　　　　　　if(isBack) {
　　　　　　　　this.transitionName = 'slide-right'
　　　　　　} else {
　　　　　　   this.transitionName = 'slide-left'
　　　　　}
　　  this.$router.isBack = false;
　　}
　},
  computed: {
    dy:function(){
      return this.$store.getters.Dynaties;
    }
  },
  mounted(){
    this.getAllDynaties();
    this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
    var that = this;
    axios.get('http://111.230.155.152:3000/api/dynary/getAllDynatiesList').then(function(res){  // axios 的请求方式
      console.log (that.$store);
      that.$store.commit('changeDynaty',res.data.DynatiesList);
      that.seachListL = res.data.DynatiesList;
      that.DynatiesList = res.data.DynatiesList;
    })
  }
}

</script>
<style>
a{
  text-decoration: none;
}
#app{
  width: 1920ox;
  height: 1080px;
}
body{
  background-color: #292929;
  overflow: hidden;
}

#boards-imgs{
  position: absolute;
  top:100px;
  right: 20px;
  padding-left: 10px;
  width: 250px;
  height: 750px;
  overflow: scroll;
  z-index: 3000;
}
#boards-imgs::-webkit-scrollbar {display:none}
#boards-imgs .thumbnail{
  position: relative;
  width:240px;
  height: 170px;
  right:-230px;
  margin-left: 10px;
  color:#d3354c;
  font-size: 25px;
  opacity: 0;
}
.boards-img-content {
  width:240px;
  height: 170px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  line-height: 170px;
  overflow: hidden;
}
.boards-img-tint {
  -webkit-transition: background-color .7s cubic-bezier(.215,.61,.355,1);
  transition: background-color .7s cubic-bezier(.215,.61,.355,1);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  opacity: 0.8;
  background-color: #292929;
  width:240px;
  height: 170px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.navbar-inverse .navbar-brand {
    color:#d3354c;
}
.navbar-inverse .navbar-nav>li>a {
    color: #ffa500;
}
.navbar {
    position: relative;
    min-height: 84px;
    margin-bottom: 20px;
}
.add_transform1{
   transform:rotate(130deg);
   -ms-transform:rotate(-130deg); 
   -moz-transform:rotate(130deg); 
   -webkit-transform:rotate(130deg); 
    -o-transform:rotate(130deg); 	
    transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -webkit-transition: all 0.5s ease-in-out; 
    -o-transition: all 0.5s ease-in-out; 
}
.add_transform2{
   transform:rotate(10deg);
   -ms-transform:rotate(10deg); 
   -moz-transform:rotate(10deg);
   -webkit-transform:rotate(10deg); 
    -o-transform:rotate(10deg);
    transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out; 
    -webkit-transition: all 0.5s ease-in-out; 
    -o-transition: all 0.5s ease-in-out;
}
.linghtBlue{
  font-size:1em;
  color:#228DFF;
  font-family:Iceland;
  text-shadow: 0 0 20px #fdec84,
            10px -10px 30px #ffae35,
            20px -20px 40px #ec760c,
            -20px -60px 50px #cd4607,
            0px -80px 60px #973717,
            10px -40px 70px #451b0e;
}
.linghtBlue:hover {
  -webkit-animation: neon2 1.5s ease-in-out infinite alternate;
  -moz-animation: neon2 1.5s ease-in-out infinite alternate;
  animation: neon2 1.5s ease-in-out infinite alternate;
}
.linghtRed{
  font-size:1em;
  color:#FF1177;
  font-family:Iceland;
  text-shadow: 2px 2px 2px whitesmoke；
}
.linghtRed:hover {
  -webkit-animation: neon2 1.5s ease-in-out infinite alternate;
  -moz-animation: neon2 1.5s ease-in-out infinite alternate;
  animation: neomred 1.5s ease-in-out infinite alternate;
}
@keyframes neon2 {
  from {
    text-shadow: 0 0 10px #fff,
               0 0 20px  #fff,
               0 0 30px  #fff,
               0 0 40px  #228DFF,
               0 0 70px  #228DFF,
               0 0 80px  #228DFF,
               0 0 100px #228DFF,
               0 0 150px #228DFF;
  }
  to {
    text-shadow: 0 0 5px #fff,
               0 0 10px #fff,
               0 0 15px #fff,
               0 0 20px #228DFF,
               0 0 35px #228DFF,
               0 0 40px #228DFF,
               0 0 50px #228DFF,
               0 0 75px #228DFF;
  }
}
@keyframes neomred {
  from {
    text-shadow:  0 0 10px #fff,
               0 0 20px  #fff,
               0 0 30px  #fff,
               0 0 40px  #FF1177,
               0 0 70px  #FF1177,
               0 0 80px  #FF1177,
               0 0 100px #FF1177,
               0 0 150px #FF1177;
  }
  to {
    text-shadow: 0 0 5px #fff,
               0 0 10px #fff,
               0 0 15px #fff,
               0 0 20px #FF1177,
               0 0 35px #FF1177,
               0 0 40px #FF1177,
               0 0 50px #FF1177,
               0 0 75px #FF1177;
  }
}
/* 定义路由动画 */
.Router {
    position: absolute;
    width: 100%;
    transition: all 3s ease;
    top: 0px;
}

.slide-left-enter{
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
.slide-left-leave-active{
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(100% 0);
}
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
.slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}
</style>
