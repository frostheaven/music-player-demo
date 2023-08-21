import Vue from 'vue'
import VueRouter from 'vue-router'

//避免重复点击同一路由时的报错
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

//引入侧边栏
import sidebar from './sidebar-router';
//引入播放器路由
import playerRouter from './player-router'
//引入搜索栏路由
import searchDetail from './search-router'

export default new VueRouter({
    mode: 'hash',
    routes:[
        {
            path:'/',
            redirect:'/home', //重定向，首次打开时跳转到home
        },
        {
            name: 'home',
            path: '/home',
            redirect:'/home/find-music',
            component: () => import('../components/home.vue'),
            children:[
                {
                    name: 'search-detail',
                    path: 'search-detail',
                    redirect: '/home/search-detail/search-single-song',
                    component: () => import('../components/home-page/search-page/search.vue'),
                    children:[...searchDetail]
                },
                ...sidebar
            ]
        },

         ...playerRouter
        
    ]
})