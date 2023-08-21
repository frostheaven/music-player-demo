import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import sidebarRoute from '../router/sidebar-router'
import searchRoute from '../router/search-router'

// 根据路由，改变侧边栏高亮
const getSidebarActiveIndex = {
    namespaced: true, //开启命名空间
    state: {
        index: 0,
        to: '/',
    },
    mutations: {
        changeActiveIndex(state){
            let count = 0, pathGroup = []
            sidebarRoute.forEach(obj => {
                pathGroup.push('/home/'+obj.path) //pathGroup存储所有二级路由
            });
            try{
                pathGroup.forEach(path => {
                    if(path === state.to){
                        state.index = count
                        throw new Error //通过抛出异常，结束forEach循环
                    }
                    count++
                });
            }catch(e){}
        }
    },
    actions: {},
    getters: {}
}
//根据路由，改变展示菜单栏高亮
const getDisplayActiveIndex = {
    namespaced: true, //开启命名空间
    state: {
        index: 0,
        to: '/',
    },
    mutations: {
        changeActiveIndex(state, parentRoute){
            let count = 0, pathGroup = []
            if(parentRoute === '/home/search-detail'){
                try{
                    searchRoute.forEach(child => {
                        if('/home/search-detail/' + child.path === state.to){
                            state.index = count
                            throw new Error
                        }
                        count++
                    })
                    // console.log('##############',state.to)
                }catch(e){}
            }else {
                sidebarRoute.forEach(obj => {
                    //找到二级路由对应的三级路由
                    if('/home/' + obj.path === parentRoute){
                        obj.children.forEach(child => {
                            pathGroup.push('/home/'+obj.path+'/'+child.path)
                        });
                    }
                });
                try{
                    pathGroup.forEach(path => {
                        if(path === state.to){
                            state.index = count
                            throw new Error
                        }
                        count++
                    });
                }catch(e){}
            }
        }
    },
    actions: {},
    getters: {}
}
//根据选择的展示菜单项，改变路由
const changeRouteBySelect = {
    namespaced: true, //开启命名空间
    state: {
        index: 0,
        result: '/'
    },
    mutations: {
        changeRoute(state, parentRoute){
            try{
                if(parentRoute === '/home/search-detail'){
                    state.result = searchRoute[state.index].path
                }else {
                    sidebarRoute.forEach(obj => {
                        //找到需要的展示栏三级路由
                        if('/home/' + obj.path === parentRoute){
                            state.result = obj.children[state.index].path
                            throw new Error
                        }
                    })
                }
            }catch(e){}
        }
    },
    actions: {},
    getters: {}
}

export default new Vuex.Store({
    //注册模块
    modules: {
        getSidebarActiveIndex,
        getDisplayActiveIndex,
        changeRouteBySelect
    }
})