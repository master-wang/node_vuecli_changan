<template>
  <div id="theme-content">
    <!-- 文章右侧的简介 -->
    <div class="sider">
      <p>{{pointArical}}</p>
    </div>
    <div class="content" >
      <div class="container">
        <div class="title">
          <button class="btn linghtRed" @click="showComments()"> {{getDynatyInfo.name}} </button> <span style="display:inline-block;margin-left:150px;"></span>| {{getDynatyInfo.set_time}} | {{getDynatyInfo.build_it}}
        </div>
        <h1>{{pointH1}}</h1>

        <div class="comment">
          <div class="chatList">
            <ul class="list-group">
              <li class="list-group-item" v-for="(comment,index) in commentsAll" :key="index"><span style="color:blue;margin-right:30px;">{{comment.username}}</span><span>{{comment.content}}</span></li>
            </ul>
          </div>
          <div class="sendchat">
            <textarea name="" v-model="msg" class="ChatSend-txt" id="" cols="30" rows="10"></textarea>
              
            <div class="ChatSend-button" @click="sendComment()">发送</div>
            <button class="btn btn-default closecoment" @click="closeChatBox()" >关闭</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="screenblac" @mouseover="hideblack()" @mouseleave="showblack()">
      <div class="text">
          <h1>揭开面纱</h1>
          <h2><span>古朝代</span><span>____________{{getDynatyInfo.name}}</span></h2>
      </div>
    </div>
    <input type="hidden" :value="newDynaty">
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Dynaty',
  data () {
    return {
      msg: '',
      app_box:{
          name:'唐朝',
          build_it:'唐太宗',
          set_time:'公元626年',
          jianjie:'李渊于618年建立了唐朝，后来儿子李世民宣武门之变杀了李建成和李元吉，当了皇帝，就是唐太宗，他是历史上有名的明君',
          desc:"唐朝历史从618年唐高祖李渊称帝建立唐朝开始，到907年后梁太祖朱温篡唐为止，共289年。可以概略分成数期，大致上以安史之乱为界。初唐时国力强盛，唐太宗时期国力逐渐复苏，击败强敌东突厥，唐太宗受尊“天可汗”，成就贞观之治。唐高宗时期击败西突厥、高句丽等强敌，建立永徽之治。唐高宗去世后，武则天于690年建国周，即武周，女主政治达到高峰。直到705年唐中宗因神龙革命而复辟。武周直到唐玄宗继位后才完全结束。唐玄宗时进入盛唐时期，是唐朝的第二高峰与转折，开元时期唐玄宗革除前朝弊端，政治开明，威服四周国家，史称开元盛世唐太宗李世民曾三次来洛阳处理政务及外事，在洛阳宫居住二年之久。唐贞观二十三年(公元649年)，高宗李治即位。永徽六年(公元657年)一同来到洛阳，在此处理国家大事，以洛阳为东都。实际上唐朝的都城已从长安徙至洛阳了。唐玄宗在位44年，都洛阳10年。公元904年，宣武节度使朱温，发兵长安，挟持唐帝(昭宗)迁都洛阳。公元907年，朱温废掉唐帝(哀宗)，唐亡。唐朝时期，洛阳与长安都是世界上的名都。唐朝都洛阳的有唐高宗、中宗、睿宗、玄宗、昭宗、哀宗6帝，前后30余年。755年，安禄山发动叛乱，史称安史之乱。在晚唐时因为政治腐败，爆发了唐末民变，其中黄巢之乱破坏江南经济，使唐朝经济完全瓦解，导致全国性的藩镇割据，唐室最后被藩镇朱全忠控制。他迫使唐昭宗迁都洛阳，并于907年逼唐哀帝禅位，唐亡。朱全忠建国梁，史称后梁，进入五代十国时期。",
          note:{
            backgroundImage: "url(" + require("../assets/xian1.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            marginTop: "5px",
            width:"100%",
            height: "85%",
            backgroundPosition: "100%",
            color: "#fff",
          }
      },
      note: {
        backgroundImage: "url(" + require("../assets/xian1.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: "5px",
        width:"100%",
        height: "85%",
        backgroundPosition: "100%",
        color: "#fff",
      },
      userInfo:{},
      getDynatyInfo: {},
      commentsAll:[],
      pointH1:'',
      Hpop:2,
      pointArical:'',
      Apop:2
    }
  },
  methods:{
    hideblack(){
      $('.screenblac').eq(0).animate({opacity:'0.2'},"slow");
    },
    showblack(){
      $('.screenblac').eq(0).animate({opacity:'0.8'},"slow");
    },
    PointH1(){
      var that = this;
      this.pointH1 = this.getDynatyInfo.jianjie.substring(0,this.Hpop)+' |';
      if(this.Hpop++ > this.getDynatyInfo.jianjie.length){
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
      this.pointArical = this.getDynatyInfo.desc.substring(0,this.Apop)+' |';
      if(this.Apop++ > this.getDynatyInfo.desc.length){
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
    },
    showComments(){
      $("#theme-content .comment").eq(0).animate({top:'-400px',opacity: 1},2000)
      $('.screenblac').eq(0).animate({opacity:'0.2'},"slow");
      var that = this;
      axios.get('http://111.230.155.152:3000/api/dynary/getoneDynaty?_id='+that.$route.query._id).then(function(res){
        that.commentsAll = res.data.dynaty.comments
      })
    },
    closeChatBox(){
        $("#theme-content .comment").eq(0).animate({top:'-930px',opacity: 1},2000)
    },
    sendComment(){
      if(!this.userInfo){
        alert("你还没有登录！请先到城参与里登录！")
      }
      else{
        var that = this;
        var ms = this.msg
        var _id = this.$route.query._id;
        var username = this.userInfo.username;
        let postdata = qs.stringify({
          ms,
          _id,
          username
        })
        axios.post('http://111.230.155.152:3000/api/dynary/postcomments',postdata).then(function(res){
          console.log(res)
          that.commentsAll = res.data.newContent.comments;
          that.msg = '';
        })
      }
    }
  },
  computed:{
    newDynaty:function(){
      var that = this;
      this.app_box = this.getDynatyInfo
      var info = this.getDynatyInfo;

      // setTimeout(function(){
      //   that.PointH1();
      //   that.PointArical();
      // },1000)
      return info;
    }
  },
  watch: {
　　　'$route' (to, from) {
        var that = this;
        console.log(this.$route.query._id)
        axios.get('http://111.230.155.152:3000/api/dynary/getoneDynaty?_id='+that.$route.query._id).then(function(res){
          console.log(res.data.dynaty)
          that.getDynatyInfo = res.data.dynaty;
          that.note.backgroundImage = 'url('+ res.data.dynaty._img +')';
          that.getDynatyInfo.note = that.note;
          // that.app_box = that.getDynatyInfo;
          setTimeout(function(){
            that.PointH1();
            that.PointArical()
          },1000)
        });
        axios.get('http://111.230.155.152:3000/api/dynary/getoneDynaty?_id='+that.$route.query._id).then(function(res){
          that.commentsAll = res.data.dynaty.comments
        })
　　}
　},
  created(){
    this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
    var that = this;
    console.log(this.$route.query._id)
    axios.get('http://111.230.155.152:3000/api/dynary/getoneDynaty?_id='+that.$route.query._id).then(function(res){
      console.log(res.data.dynaty)
      that.getDynatyInfo = res.data.dynaty;
      that.note.backgroundImage = 'url('+ res.data.dynaty._img +')';
      that.getDynatyInfo.note = that.note;
      // that.app_box = that.getDynatyInfo;
      setTimeout(function(){
        that.PointH1();
        that.PointArical()
      },1000)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#theme-content {
  position: relative;
}
#theme-content .sider p{
  width: 500px;
  height: 910px;
  position: absolute;
  top: 0;
  bottom: 10px;
  right:300px;
  /* background: rgba(0, 0, 0, 0.4); */
  padding-top: 100px;
  text-indent:2em;
  font-size: 25px;
  padding-left: 60px;
  padding-right: 60px;
  border-left: 5px solid #d3354c;
  background-image: url(../assets/zuzi.png);
  opacity: 0.5;
  background-repeat: no-repeat;
  color: black;
}
.comment .chatList .list-group-item {
  width: 599px;
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
.list-group-item {
    background: rgba(0, 0, 0, 0.3)
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
#theme-content .comment{
    position: absolute;
    top:-930px;
    width: 800px;
    height: 400px;
    opacity: 0;
    position: absolute;
    z-index: 1;
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
    top:0;
    z-index: 1;
}
#theme-content .btn:hover {
    background: #d15b6c;
}
.list-group-item {
    border: none;
}
.chatList {
  position: relative;
  width: 600px;
  height: 340px;
  border: blue;
  overflow-y: scroll;
}
.chatList::-webkit-scrollbar {display: none}
.sendchat{
  position: relative;
}
.ChatSend-txt {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    resize: none;
    float: left;
    width: 250px;
    height: 37px;
    padding: 5px 13px 5px 71px;
    line-height: 20px;
    font-size: 12px;
    background: #fff;
    border: 1px solid #ff921a;
    border-right: 0;
    -webkit-border-radius: 4px 0 0 4px;
    -moz-border-radius: 4px 0 0 4px;
    border-radius: 4px 0 0 4px;
    color: #444;
    outline: none;
    overflow: hidden;
}
.MuteStatus {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width:300px;
    height: 47px;
    line-height: 47px;
    padding-left: 100px;
    color: #919191;
    background: #fff;
    border: 1px solid #ff921a;
    border-right: 0;
    -webkit-border-radius: 3px 0 0 3px;
    -moz-border-radius: 3px 0 0 3px;
    border-radius: 3px 0 0 3px;
    text-align: center;
}
.ChatSend-button {
    display: block;
    width: 50px;
    height: 49px;
    line-height: 49px;
    -webkit-border-radius: 0 4px 4px 0;
    -moz-border-radius: 0 4px 4px 0;
    border-radius: 0 4px 4px 0;
    background: #f70;
    color: #fff;
    font-size: 14px;
    float: left;
    text-align: center;
    cursor: pointer;
}
.closecoment{
  display: block;
  width: 50px;
  height: 49px;
  float: right;
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
</style>
