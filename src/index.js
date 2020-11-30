
import './lib/css/index.css'

// 全局的css样式
import './lib/css/animate.css'

import './lib/css/icon.css'
// 字体图标base64

import axios from 'axios'
// axios 模块

Vue.prototype.$axios = axios;
// 向vue中添加axios方法

import Vue from 'vue'
// 导入vue

import vuex from 'vuex'


import vueRouter from 'vue-router'

// 导入vue-router

import VueTouch from 'vue-touch'

import app from './App.vue'
// 导入vue的根组件

import router from './router.js'
// 导入路由模块
import Mynavbar from './components/nav_bar/nav_bar.vue'
// 自定义导航栏组件

import { Swipe, SwipeItem } from 'mint-ui';
// mint-ui

Vue.component('Mynavbar',Mynavbar);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(VueTouch,{name:'v-touch'})
Vue.use(vuex)
Vue.use(vueRouter)

let state = {
    flog: true
}
let mutations = {
    changeUrl(){

    }
}
const store = new vuex.Store({
    state,
    mutations:mutations
})
let vm = new Vue({
    el:'#app',
    data:{

    },
    methods:{},
    render:c=>c(app),
    router,
    store
})
