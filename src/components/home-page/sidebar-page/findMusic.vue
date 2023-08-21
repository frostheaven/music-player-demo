<template>
    <div id="find-music">
        <div class="main-display-title">
            <el-menu :default-active="this.$store.state.getDisplayActiveIndex.index.toString()" 
                    class="el-menu-demo" 
                    mode="horizontal" 
                    @select="handleSelect">
                <el-menu-item index="0">个性推荐</el-menu-item>
                <el-menu-item index="1">歌单</el-menu-item>
                <el-menu-item index="2">排行榜</el-menu-item>
                <el-menu-item index="3">歌手</el-menu-item>
                <el-menu-item index="4">最新音乐</el-menu-item>
            </el-menu>

            <!-- 参见element-ui官方文档，input属性的回调参数为radio的label值 -->
            <!-- <el-radio-group v-model="radio" @input="input($event)" ref="findMusicGroup">
                <el-radio :label="0">个性推荐</el-radio>
                <el-radio :label="1">歌单</el-radio>
                <el-radio :label="2">排行榜</el-radio>
                <el-radio :label="3">歌手</el-radio>
                <el-radio :label="4">最新音乐</el-radio>
            </el-radio-group> -->
            
        </div>
        
        <div class="main-display-content">
            <router-view />
        </div>
   
    </div>
</template>

<script>
export default {
    name: 'findMusic',
    data(){
        return  {
            // radio: 0,
            // path: [
            //     '/home/find-music/music-recommend',
            //     '/home/find-music/music-menu',
            //     '/home/find-music/rank-list',
            //     '/home/find-music/singer',
            //     '/home/find-music/latest-music',
            // ],
            // pathNum: 0
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            //console.log(key, keyPath);
            let parentRoute = this.$route.matched[1].path
            this.$store.state.changeRouteBySelect.index = key
            this.$store.commit('changeRouteBySelect/changeRoute', parentRoute)
            this.$router.push(this.$store.state.changeRouteBySelect.result)
        },
        //#region 
        // input(value){
        //     // 在下次DOM更新时触发，否则拿不到$children
        //     this.$nextTick(() => {
        //         let arr = this.$refs.findMusicGroup.$children
        //         // 利用try,catch终止forEach循环
        //         try{
        //                 arr.forEach(e => {
        //                 if(e.label === value){
        //                     this.pathNum = value
        //                     //console.log(this.path[count])
        //                     throw new Error
        //                 }
        //             })
        //         }catch(e){}
        //         this.$router.push(this.path[this.pathNum])
        //     })
        // },
        //#endregion

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