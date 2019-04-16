// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery'
Vue.config.productionTip = false
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    aa: '111',
    dynatys: []
  },
  getters: {
    Dynaties: (state) => {
      return state.dynatys
    }
  },
  mutations: {
    changeDynaty (state, arr) {
      state.dynatys = arr
    }
  },
  actions: {
    changedy (context, payload) {
      setTimeout(() => {
        context.commit('changeDynaty', payload)
      }, 2000)
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
