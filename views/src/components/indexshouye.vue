<template>
  <div id="theme-content" >
    <div id="indexmain">
        <div class="container" :style="bk">
            <div class="contentshouye">
                <h1>秋风吹渭水，落叶满长安</h1>
                <h6>———山水西安千幅画，文明古都万卷诗。带你领略古都西安之美</h6>
            </div>
        </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'Indexmain',
  data:function(){
      return {
          bk:{
            backgroundImage: "url(" + require("../assets/indexmainbk.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width:"2056px",
            height: "980px",
          }
      }
  }
}
</script>

<style scoped>
#theme-content {
  position: relative;
}
#indexmain{
    position: absolute;
    width:"100%";
    height: "83%",
}
/* #indexmain .container{
    background-image: url("indexmainbk.jpg");
    background-size: 100% 700px;
    width: 100%;
    height: 700px;
} */
#indexmain .header{
    width:100%;
    height:50px;
}
#indexmain ul{
    list-style-type: none;
    padding: 15px;
}

#indexmain li{
    display: inline;
    font-size:25px;
    font-family: 'Times New Roman', Times, serif;
    text-shadow: 2px 2px 2px black;
    margin: 10px 10px;
}
#indexmain a{
    text-decoration: none;
    color: darkgrey;
    font-size: 30px;
    text-align: center;
}
#indexmain a:active,a:hover{
    color: red;
}
#indexmain img{
    border-radius: 30px;
    height: 26px;
    float: right;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 1);
}
#indexmain input{
    height: 25px;
    width: 200px;
    border-radius: 30px;
    float: right;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 1)
}
#indexmain div .contentshouye{
     width: 370px;
     height: 100px;
     position: relative;
     animation: anim 7s initial alternate;
     -webkit-animation: anim 7s;
}
@keyframes anim{
    0%{
        left: 0px;
    }
    50%{
        left: 500px;
    }
    100%{
        left: 0px;
    }
}
@-webkit-kerframes anim{
    0%{
        left: 0px;
    }
    50%{
        left: 500px;
    }
    100%{
        left: 0px;
    }
}
#indexmain .contentshouye h1{
    font-family: fantasy;
    color: darkgrey;
    text-shadow: 2px 2px 2px whitesmoke;
    
}
#indexmain .contentshouye h6{
    font-family: fantasy;
    color: darkgrey;
    text-indent: 19em;
}

#indexmain .bottom{
    height:100px;
    width: 100%;
    font-size: 20px;
    text-align: center;
    color: darkgray;
}
</style>
