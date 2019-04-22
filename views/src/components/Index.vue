<template>
  <div id="theme-content" >
    <!-- 文章右侧的简介 -->
    <div class="sider">
      <p>{{pointArical}}</p>
    </div>
    <div class="content" >
      <div class="container">
        <div class="title">
          <button class="btn linghtRed" ><router-link to='/xiandesc'>{{app_box.name}} </router-link> </button>
        </div>
        <h1>{{pointH1}}</h1>
      </div>
    </div>

    <!-- 时间轴 -->
    <div class="box">
        <ul class="box2-1" >
          <li class="box2-1-1 boxh"><img src="../assets/cicle.png" />
            <span><router-link to="/dytang">唐朝</router-link></span>
            <p class="boxp">在西周时称为“丰镐”。“丰镐”，是周文王和周武王分别修建的丰京和镐京的合称。后者为政治中心，前者为宗教、文化中心，合称“宗周”，为西安建城之始。
              武王灭商建立周王朝后，以丰镐为都，为西安作为都城之始。</p>		  
          </li>
          <li class="box2-1-2  boxh"><img src="../assets/cicle.png" />
            <span>西安</span>
            <p class="boxp">秦朝时都城为“咸阳”，阿房宫大部分面积在今西安市境内，兵马俑和秦陵在今西安市境内（位于西安市临潼区）</p>	
          </li>
          <li class="box2-1-3  boxh"><img src="../assets/cicle.png" />
            <span><router-link to="/dyxihan">西汉</router-link></span>
            <p class="boxp">西汉时，刘邦在长安（今西安城西北郊汉城）建立西汉王朝，定都关中，取当地长安乡之含意，立名“长安”，意即“长治久安”。
              丝绸之路开通后，长安成为东方文明的中心，史称“西有罗马，东有长安”。</p>	
          </li>
          <li class="box2-1-4  boxh"><img src="../assets/cicle.png" />
            <span>隋开皇二年</span>
            <p class="boxp">隋开皇二年（582年），隋文帝颁令在汉长安城东南的今西安城址营建新都大兴城。
              唐朝定都长安后，改隋大兴城为长安城，并进行了增修和扩建。</p>	
          </li>
          <li class="box2-1-5  boxh"><img src="../assets/cicle.png" />
            <span>元初</span>
            <p class="boxp">元初，长安城的范围依然沿用五代初期唐长安城被毁后节度使韩建所重建的“新城”，并使用京兆府的名称。
              至元十六年（1279年）遂该京兆府为安西路。皇庆元年（1312年），又改安西路为奉元路。</p>	
          </li>
        </ul>
        <div class="box2">

        </div>
      
    </div>
    <!-- 屏幕的黑屏 -->
    
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome tovddd Vue.js App',
      app_box:{
          name:'古城 西安',
          jianjie:'长安自古帝王都，文物古迹遍布地上地下，系统而完整，丰富而多彩，被誉为“天然历史博物馆”。西安是世界著名古都，历史上先后有西周、秦、西汉、新莽、东汉、西晋、前赵、前秦、后秦、西魏、北周、隋、唐等13个王朝在西安建都。',
          desc:"西安，古称长安，京兆等，在《史记》被誉为“金城千里，天府之国”，中国文明与东亚文明的中心，享有“中华民族摇篮”之美誉。不仅是中华民族的发祥地，也是整个亚洲重要的人类起源地和史前文化中心之一。由周文王建立，大约建于公元前12世纪，距今已有3100多年未间断的城市发展史，先后有周、秦、汉、唐等21个王朝和政权在这里建都，是13朝古都(一说17朝)，是中国的政治、经济、文化中心和最早对外开放的城市，闻名遐尔的“丝绸之路”就是以西安为起点的。1981年，联合国教科文组织把西安确定为“世界历史名城”。",
          note:{
            backgroundImage: "url(" + require("../assets/xian.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "5px",
            width:"100%",
            height: "85%",
            backgroundPosition: "100%",
            color: "#fff",
          }
      },
      pointH1:'',
      Hpop:1,
      pointArical:'',
      Apop:1
    }
  },
  methods:{
    
    PointH1(){
      var that = this;
      this.pointH1 = this.app_box.jianjie.substring(0,this.Hpop)+' |';
      if(this.Hpop++ > this.app_box.jianjie.length){
        this.Hpop = 0;
        setTimeout(function(){
          that.PointH1()
        },4000)
      }
      else{
        setTimeout(function(){
          that.PointH1()
        },100)
      }
    },
    PointArical(){
      var that = this;
      this.pointArical = this.app_box.desc.substring(0,this.Apop)+' |';
      if(this.Apop++ > this.app_box.desc.length){
        this.Apop = 0;
        setTimeout(function(){
          that.PointArical()
        },2000)
      }
      else{
        setTimeout(function(){
          that.PointArical()
        },50)
      }
    }
  },
  created(){
    this.PointH1();
    this.PointArical()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#theme-content {
  position: relative;
}
#theme-content .sider p{
  width: 400px;
  height: 910px;
  position: absolute;
  top: 0;
  bottom: 10px;
  right:300px;
  background: rgba(0, 0, 0, 0.4);
  padding-top: 100px;
  text-indent:2em;
  font-size: 16px;
  padding: 15px;
  border-left: 5px solid #d3354c;
}
.screenblac{
  opacity: 0.8;
  background-color: #292929;
  width:100%;
  height: 1000px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display:block;
}
.screenblac .text{
  position: absolute;
  left:40%;
  top:30%;
  z-index: 2000;
}
.screenblac h1,h2{
  padding: 10px;
  border-left: 5px solid #d3354c;
}
#theme-content .content {
    position: absolute;
    top:400px;
    left: 0;
    right: 0;
    color: #fff;
    width: 800px;
    padding-left: 100px;
}
#theme-content .btn {
    font-size: 80%;
    padding: 10px 25px;
    border-radius: 0px;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 1px;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    background: #d3354c;
    border: none;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top:-40px;
    z-index: 1;
}
#theme-content .btn:hover {
    background: #d15b6c;
}
.container {
    
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    width: 800px;
    padding-left: 10px;
    padding-right: 200px;
}
.container .title {
    text-transform: uppercase;
    font-weight: 900;
    margin-bottom: 0;
    letter-spacing: 2px;
    border-left: 5px solid #d3354c;
    padding: 8px 10px;
    font-size: 25px;
}
.container h1{
  text-indent:2em;
  border-left: 5px solid #d3354c;
}
/* shijianzhou */
.box{
	width: 100%;
	height: 1000px;
	display: block;
	background: url(../assets/line_bg.png) 0px 0px no-repeat ;
  margin: auto;
  background-repeat: "no-repeat";
  background-size: "100% 20%";
  background-attachment:fixed;
  background-position: top center;
  border: none;
  position: relative;
}
.box2{
	width: 100%;
  height: 1000px;
  display: block;
  position: absolute;
  background: url(../assets/line_all.png) 0px 0px no-repeat;
  animation: aa 5s linear;
  animation-fill-mode: forwards;
  background-repeat: "no-repeat";
  background-size: "100% 20%";
  background-attachment:fixed;
  background-position: top center;
  top: 0;
}
.box2-1{
	width: 100%;
	height: 1000px;
	position: absolute;	
}
.box2-1 span{
	font-size: 16px;
	color: red;
	font-weight: 600;
}
.box2-1 p{
	opacity: 0;
	/*color: #FF0000;*/
	color: #333333;
  width: 500px;
  word-break: break-all;
  font-size: 20px;
	transition: all .5s linear;
}
.boxh img{
	width: 17px;
	height: 17px;
	animation:img1 .8s infinite;
}
.box2-1-1,.box2-1-2,.box2-1-3,.box2-1-4,.box2-1-5{
	position:absolute ;
	z-index: 999;
	opacity: 0;
	cursor: pointer;
	
}
.boxh img:hover{
	width: 20px;
	height: 20px;
}
.boxh:hover .boxp{
  opacity: 1;
  color: white;
}
.box2-1-1{
	top: 5%;
	left: 26%;
	animation: bb1 3s ease-in-out;
	animation-fill-mode: forwards;
}
.box2-1-2{
	top: 18%;
	left: 32%;
	animation: bb2 5s ease-in-out;
	animation-fill-mode: forwards;
	
}
.box2-1-3{
	top: 30%;
	left: 36%;
    animation: bb3 5s ease-in-out;
    animation-fill-mode: forwards;
	
}
.box2-1-4{
	top: 45%;
	left: 43%;
	animation: bb4 5s ease-in-out;
	animation-fill-mode: forwards;
	
}
.box2-1-5{
	top: 73%;
	left: 40%;
	animation: bb5 5s ease-in-out;
	animation-fill-mode: forwards;
	
}
@keyframes img1{
	from{width: 15px; height: 15px;}
	to{width: 20px; height: 20px;}
}
@keyframes bb1{
	from{ opacity: 0;}
	to{opacity: 1;}
}
@keyframes bb2{
	from{ opacity: 0;}
	to{opacity: 1;}
}
@keyframes bb3{
	from{ opacity: 0;}
	to{opacity: 1;}
}
@keyframes bb4{
	from{ opacity: 0;}
	to{opacity: 1;}
}
@keyframes bb5{
	from{ opacity: 0;}
	to{opacity: 1;}
}
@keyframes aa
{
   0%{
   	  height: 0;
   }
   20%{
   	height: 413px;
   	
   }
   40%{
   	height: 826px;
   }
    60%{
   	height: 1239px;
   }
    80%{
   	height: 1653px;
   }
    100%{
   	height: 2068px;
   }
}
/* 图片 */
.denglong{
  display: block;
  transform-origin: top;
  position: absolute;
  top:0;
  animation: denglong 5s linear 2s infinite alternate;
}
@keyframes denglong{
	0%{
    opacity:  0;
    transform:rotate(-10deg)
  }
  10%{
    opacity:  0.2;
    transform:rotate(-5deg)
  }
  20%{
    opacity:  0.5;
    transform:rotate(0deg)
  }
  30%{
    opacity:  0.8;
    transform:rotate(5deg)
  }
  40%{
    opacity:  1;
    transform:rotate(10deg)
  }

  50%{
    opacity:  0.8;
    transform:rotate(5deg)
  }
  60%{
    opacity:  0.5;
    transform:rotate(0deg)
  }
  80%{
    opacity:  0.3;
    transform:rotate(-5deg)
  }
  100%{
    opacity:  0;
    transform:rotate(-10deg)
  }
}
</style>
