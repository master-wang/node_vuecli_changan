<template>
    <div id="theme-content">
        <div class="bbbb">

        
        <div id="wrap3">
            <div class="sence">
                <ul>
                    <li>
                        <img src="../assets/guchangan.jpg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/gulue.jpeg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/jianzhu.jpg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/meinv.jpeg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/xian.jpg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/xian1.jpg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/xian3.jpg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/xian4.jpg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/xian5.jpg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/xianFight.jpg" ondragstart="return false">
                    </li>
                    <li>
                        <img src="../assets/chuanshuo.jpg" ondragstart="return false">
                    </li>
                </ul>
            </div>
            
        </div>
        </div>
       
    </div>
</template>
<script>
export default {
    name: 'changan3D',

    mounted(){
        //图片自动旋转
        var qq=document.body;
		var oSen=$('.sence')[0];
		var aLi=$('#wrap3 .sence li');

		var aLiLen=aLi.length;
		var Deg=360/aLiLen;

		var lastX,lastY,nowX,nowY,minusX,minusY;
        var isDown=false;
        setTimeout(function(){
            for(let i=0;i<aLiLen;i++){
                console.log(aLi[i])
				aLi[i].style.transform='rotateY('+(i*Deg)+'deg) translateZ(300px)';
                aLi[i].style.transition='transform 3s '+(aLiLen-i-1)*0.3+'s';
                //aLi[i].css({'transform':'rotateY('+(i*Deg)+'deg) translateZ(350px)','transition':'transform 2s '+(aLiLen-i-1)*0.1+'s'});
			}
        },2000)
        //鼠标让图片旋转
        var roY=0,roX=-10;
		 var xN=0,yN=0;
		 var play=null;
		$(document).mousedown(function(ev){
			var x_=ev.clientX;
			var y_=ev.clientY;
			clearInterval(play);
			$(this).bind('mousemove',function(ev){
				
				var x=ev.clientX;
				var y=ev.clientY;
				  xN=x-x_;
				  yN=y-y_;

				 roY+=xN*0.2;
                roX-=yN*0.1;
                
				$('.sence').css({
					 transform:' rotateX('+roX+'deg) rotateY('+roY+'deg)'
				});
			 x_=ev.clientX;
			 y_=ev.clientY;

			});
		}).mouseup(function(){
			  $(this).unbind('mousemove');
			  var play=setInterval(function(){
			   
				   xN*=0.95;
				   yN*=0.95
				   if(Math.abs(xN)<1 && Math.abs(yN)<1){
					  clearInterval(play);
				   }
					roY+=xN*0.2;
					roX-=yN*0.1;
					$('.sence').css({
						 transform:' rotateX('+roX+'deg) rotateY('+roY+'deg)'
					});

			  },30);

		});
    }
}
</script>
<style scope>
#theme-content {
    position: relative;
    padding-left: 50px;
    z-index: 100;
}
.xianquanjing{
    position: absolute;
    top: 5px;
    left: 20px;
}
.bbbb{
    position: absolute;
    top:0;
    width: 100%;
    height: 930px;
    background: rgba(0,0,0,0.5);
}
#wrap3 ul{
    list-style-type: none;
} 
#wrap3 img{
    width: 120px;
    height: 180px;
    vertical-align: middle;
}
#wrap3{
    position: absolute;
    perspective: 800px;
    top:20%;
    left:40%;
}
#wrap3 .sence{
    width:120px;
    height: 180px;
    margin: 250px auto;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(-15deg) rotateY(0deg);
}
#wrap3 .sence ul li{
    position: absolute;
    box-shadow: 0 0 8px #f9f;
    border-radius: 5px;
    transform: rotateY(0deg) translateZ(0px);
}
#wrap3 .sence ul li img{
    -webkit-box-reflect: below 10px -webkit-linear-gradient(top,rgba(0,0,0,0) 30%,rgba(0,0,0,0.5) 100%);
}
#wrap3 .sence p{
    width: 700px;
    height: 700px;
    background: -webkit-radial-gradient(center,50% 50%,rgba(244,22,234,0.2),rgba(0,0,0,0));
    position: absolute;
    left: 50%;
    top: 112%;
    margin-left: -350px;
    margin-top: -350px;
    transform: rotateX(180deg);
}
</style>
