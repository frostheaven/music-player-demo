<template>
    <div id="sidebar-menu">
       <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="this.$store.state.getSidebarActiveIndex.index.toString()">
                <router-link to='/home/find-music'>
                    <el-menu-item index="0"><i class="el-icon-search"></i>发现音乐</el-menu-item>
                </router-link>
                <router-link to='/home/video-recommend'>
                    <el-menu-item index="1"><i class="el-icon-video-camera-solid"></i>推荐视频</el-menu-item>
                </router-link>
                <router-link to='/home/video-player'>
                    <el-menu-item index="2"><i class="el-icon-film"></i>正在放映</el-menu-item>
                </router-link>
                <router-link to='/home/daily-recommend'>
                    <el-menu-item index="3"><i class="el-icon-headset"></i>每日推荐</el-menu-item>
                </router-link>
                <router-link to='/home/my-collection'>
                    <el-menu-item index="4"><i class="el-icon-collection-tag"></i>我的收藏</el-menu-item>
                </router-link>
            </el-menu>
        </el-aside> 
       </el-container>
    </div>
</template>

<script>
export default {
    name: 'sidebar'
}
</script>

<style lang="css" scoped>
  #sidebar-menu {
    height: 100%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .el-container{
    width: max-content;
    margin-right: 0%;
  }
</style>

