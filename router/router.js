import Vue from 'vue'
import Router from 'vue-router'
import Home from '../compnonts/home/index.vue'
import Mine from '../compnonts/mine/index.vue'
Vue.use(Router);
export default new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/mine',
            name:'mine',
            component:Mine
        }
    ]
})
