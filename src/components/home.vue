<template>
    <div id="home">
        <!-- 顶部菜单栏 -->
        <div class="header">
           <Header></Header>
        </div>

        <transition name="musicDetail">
            <div class="music-player-content" v-if="ifShowMusicDetail">
                <MusicPlayer></MusicPlayer>
            </div>
        </transition>
       

        <div class="main-body clearfix">
            <!-- 侧边导航栏 -->
            <div class="sidebar">
                <Sidebar></Sidebar>
            </div>
            <!-- 主要展示 -->
            <div class="main-display clearfix">
                <!-- 根据选定元素展示相应内容，并缓存视频 -->
                <keep-alive include="videoPlayer">
                    <router-view />
                </keep-alive>
            </div>
        </div>

        <!-- 底部播放条 -->
        <div class="footer">
            <Footer></Footer>
        </div>
    </div>
</template>

<script>

import Header from './home-page/page-elements/header'
import Footer from './home-page/page-elements/footer'
import Sidebar from './home-page/page-elements/sidebar'
// 引入音乐播放器
import MusicPlayer from './home-page/player-page/music-player/music-player'

export default {
    name: 'home',
    components: {
        Header,
        Sidebar,
        Footer,
        MusicPlayer
    },
    data() {
        return {
            ifShowMusicDetail: 0
        }
    },
    methods: {
        //改变侧边栏与展示菜单高亮的部分（在路由更新时[特别，步进/撤销]、页面刷新时）
        changeHighlight(to){
            if(to.matched && to.matched[1].path === '/home/search-detail'){
                this.$store.state.getSidebarActiveIndex.index = -1 //如果进入搜索页面，则侧边栏不高亮
            }else if(to.matched && to.matched[1].path){
                this.$store.state.getSidebarActiveIndex.to = to.matched[1].path //获取第二级路由
                this.$store.commit('getSidebarActiveIndex/changeActiveIndex')
            }
            if(to.matched && to.matched[2]){
                this.$store.state.getDisplayActiveIndex.to = to.matched[2].path //获取第三级路由
                this.$store.commit('getDisplayActiveIndex/changeActiveIndex', to.matched[1].path)
            }
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.changeHighlight(to)
        next()
    },
    mounted(){
        this.changeHighlight(this.$route),
        this.$bus.$on('showMusicDetail',()=>{
            this.ifShowMusicDetail = !this.ifShowMusicDetail
        })
    }
}
</script>

<style lang="css">
    .header{
        position: fixed;
        background-color: #f9bdbd;
        width: 100%;
        height: 60px;
        z-index: 10;
    }
    a{
        text-decoration: none;
        color: #303133;
    }
    .sidebar{
        width: 200px;
        height: calc(100vh - 60px - 65px);
        /* padding-bottom: 165px; */
        position: fixed;
        z-index: 10;
    }
    .main-body {
        padding-top: 60px;
        height: calc(100vh - 65px);
    }
    .main-display {
        padding-left: 200px;
        width: 100%;
        height: 100%;
        float: left;
        overflow: auto ;
    }
    /* 这将更改子组件中的main-display-title */
    .main-display-title {
        display: flex;
        justify-content: center;
        height: 45px;
        overflow: hidden;
    }
    .main-display-content {
        float: left;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
    } 
    .footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 66px;
        z-index: 999;
        background: #fff8f8;
        border-top: 1px solid #ddd;
    }
    /* 伪元素清除浮动 */
    .clearfix ::after{
        display: block;
        content: '';
        clear: both;
    }
    /* 音乐播放器样式 */
    .music-player-content {
        z-index: 999;
        position: fixed;
        width: 100%;
        height: calc(100vh - 65px);
        background-color: #f9f9f9;
    }
    /* 动画设置 */
    .musicDetail-enter-active {
        animation: slide-colum 0.3s linear;
    }
    .musicDetail-leave-active{
        animation: slide-colum 0.3s linear reverse;
    }
    @keyframes slide-colum {
        from{
            transform: translateY(100%);
        }
        to{
            transform: translateY(0%);
        }
    }
</style>