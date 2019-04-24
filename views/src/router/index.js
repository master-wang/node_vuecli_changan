import Vue from 'vue'
import Router from 'vue-router'
import resour from 'vue-resource'
// 主页与右侧导航
import Dynaty from '@/components/Dynaty'
import Index from '@/components/Index'
// 城参与的路由
import Cheng from '@/components/Cheng'

import Footprint from '@/components/Footprint'
import Footprintadd from '@/components/Footprintadd'
import Footprintlist from '@/components/Footprintlist'
import Footprintflistviw from '@/components/Footprintflistviw'

import Guards from '@/components/Guards'
import Guardsmen from '@/components/Guardsmen'
import Guardszhiji from '@/components/Guardszhiji'
import Guardszhijireq from '@/components/Guardszhijireq'
import Guardszhijichat from '@/components/Guardszhijichat'

import Administration from '@/components/Administration'
import AdministrationAdd from '@/components/AdministrationAdd'
import AdministrationList from '@/components/AdministrationList'

import Upadateuserinfo from '@/components/Upadateuserinfo'
import successInfo from '@/components/successInfo'

import xiandesc from '@/components/xiandesc'
import changan3D from '@/components/changan3D'
import xianjianjie from '@/components/xianjianjie'
import xianquanjing from '@/components/xianquanjing'

import dytang from '@/components/dytang'
import dyxihan from '@/components/dyxihan'
import indexshouye from '@/components/indexshouye'
Vue.use(Router)
Vue.use(resour)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexshouye',
      component: indexshouye
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/dytang',
      name: 'dytang',
      component: dytang
    },
    {
      path: '/dyxihan',
      name: 'dyxihan',
      component: dyxihan
    },
    {
      path: '/xiandesc',
      name: 'xiandesc',
      component: xiandesc
    },
    {
      path: '/changan3D',
      name: 'changan3D',
      component: changan3D
    },
    {
      path: '/xianjianjie',
      name: 'xianjianjie',
      component: xianjianjie
    },
    {
      path: '/xianquanjing',
      name: 'xianquanjing',
      component: xianquanjing
    },
    {
      path: '/Dynasty',
      name: 'Dynaty',
      component: Dynaty
    },
    {
      path: '/Cheng',
      name: 'Cheng',
      component: Cheng,
      children: [
        {
          path: '/Cheng/footprint',
          name: 'Footprint',
          component: Footprint,
          children: [
            {
              path: '/Cheng/footprint/Footprintadd',
              component: Footprintadd
            },
            {
              path: '/Cheng/footprint/Footprintlist',
              component: Footprintlist
            },
            {
              path: '/Cheng/footprint/Footprintflistviw',
              component: Footprintflistviw
            },
            {
              path: '/Cheng/footprint/successInfo',
              component: successInfo
            }
          ]
        },
        {
          path: '/Cheng/Guards',
          name: 'Guards',
          component: Guards,
          children: [
            {
              path: '/Cheng/Guards/Guardsmen',
              component: Guardsmen
            },
            {
              path: '/Cheng/Guards/Guardszhiji',
              component: Guardszhiji,
              children: [
                {
                  path: '/Cheng/Guards/Guardszhiji/Guardszhijireq',
                  component: Guardszhijireq
                },
                {
                  path: '/Cheng/Guards/Guardszhiji/Guardszhijichat',
                  component: Guardszhijichat
                }
              ]
            }
          ]
        },
        {
          path: '/Cheng/Administration',
          name: 'Administration',
          component: Administration,
          children: [
            {
              path: '/Cheng/Administration/Add',
              component: AdministrationAdd
            },
            {
              path: '/Cheng/Administration/List',
              component: AdministrationList
            },
            {
              path: '/Cheng/Administration/successInfo',
              component: successInfo
            }
          ]
        },
        {
          path: '/Cheng/Upadateuserinfo',
          name: 'Upadateuserinfo',
          component: Upadateuserinfo
        },
        {
          path: '/Cheng/successInfo',
          component: successInfo
        }
      ]
    }
    // {
    //   path: '/chengcanyu',
    //   name: 'sss',
    //   components: {
    //     default: HelloWorld,
    //     helper: HelloWorld
    //   }
    // }
  ]
})
