<template>
    <div id="video-recommend">
        <div class="main-display-title">
            <el-menu :default-active="this.$store.state.getDisplayActiveIndex.index.toString()" 
                    class="el-menu-demo" 
                    mode="horizontal" 
                    @select="handleSelect">
                <el-menu-item index="0">MV</el-menu-item>
                <el-menu-item index="1">视频</el-menu-item>
            </el-menu>
            
        </div>
        
        <div class="main-display-content">
            <router-view />
        </div>
   
    </div>
</template>

<script>
export default {
    name: 'findMusic',
    methods: {
        handleSelect(key, keyPath) {
            //console.log(key, keyPath);
            let parentRoute = this.$route.matched[1].path
            this.$store.state.changeRouteBySelect.index = key
            this.$store.commit('changeRouteBySelect/changeRoute', parentRoute)
            this.$router.push(this.$store.state.changeRouteBySelect.result)
        },

    },
}
</script>

<style lang="css" scoped>
    .el-menu-item {
        height: 45px;
        line-height: 45px;
        font-size: 13px;
    }
</style>