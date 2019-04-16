<template>
    <div>
        <div>
            <div class="list1">
                <div class="list_mid">
                    <ul class="nav nav-tabs">
                        <li role="presentation" @click="isActive='1'" :class="{active:isActive=='1'}"><a href="#"><router-link to="/Cheng/Guards/Guardsmen"> 城 </router-link></a></li>
                        <li role="presentation" @click="isActive='2'" :class="{active:isActive=='2'}"><a href="#"><router-link to="/Cheng/Guards/Guardszhiji"> 我的知己 </router-link></a></li>
                    </ul>
                </div>
            </div>
            <div class="article_main">
                <transition :name="transitionName"> 
                    <router-view class="Router"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Guards',
    data(){
        return {
            transitionName: 'slide-right',
            isActive: '1'
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
　　  this.$router.isBack = false
　　  }
　  },
}
</script>
<style scope>
/* 定义路由动画 */
.Router {
    transition: all 2s ease;
    
}

.slide-left-enter{
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(100% 0);
}
.slide-left-leave-active{
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(100% 0);
}
.slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(-100%, 0);
}
.article_main{
    width: 100%;
    height: 750px;
    overflow-x: hidden;
    overflow-y: scroll;
}
.article_main::-webkit-scrollbar {display:none}
</style>