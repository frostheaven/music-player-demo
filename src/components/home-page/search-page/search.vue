<template>
    <div id="search-menu">
        <div class="main-display-title">
            <div class="icon">
                搜索详情
                <i class="el-icon-s-promotion"></i>
            </div>
            <el-menu :default-active="this.$store.state.getDisplayActiveIndex.index.toString()" 
                    class="el-menu-demo" 
                    mode="horizontal" 
                    @select="handleSelect">
                <el-menu-item index="0">单曲</el-menu-item>
                <el-menu-item index="1">专辑</el-menu-item>
                <el-menu-item index="2">歌手</el-menu-item>
                <el-menu-item index="3">歌单</el-menu-item>
                <el-menu-item index="4">MV</el-menu-item>
                <el-menu-item index="5">视频</el-menu-item>
            </el-menu>
            
        </div>
        <div class="main-display-content">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: 'search',
    methods: {
        handleSelect(key, keyPath) {
            //console.log(key, keyPath);
            let parentRoute = this.$route.matched[1].path
            this.$store.state.changeRouteBySelect.index = key
            this.$store.commit('changeRouteBySelect/changeRoute', parentRoute)
            this.$router.push(this.$store.state.changeRouteBySelect.result)
        },

    },
     // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    beforeRouteEnter (to, from, next) {
        if(to.query.searchInfo){
            next(true)
        }else{
            alert('亲，您还没有输入任何内容哟~')
            next(false)
        }
    },
    beforeRouteUpdate(to, from ,next){
        if(to.query.searchInfo){
            next()
        }
        else {
            to.query.searchInfo = from.query.searchInfo
            next()
        }
        next()
    },
}
</script>

<style lang="css" scoped>
    .main-display-title {
        float: left;
        margin-left: 3%;
    }
    .icon {
        display: flex;
        align-items: center;
        margin-right: 5px;
        margin-top: 2px;
        height: 41px;
        padding-left: 15px;
        padding-right: 15px;
        border: solid #f7c0c0;
        border-radius: 20px;
    }
    .el-menu-item {
        height: 45px;
        line-height: 45px;
        font-size: 13px;
    }
</style>