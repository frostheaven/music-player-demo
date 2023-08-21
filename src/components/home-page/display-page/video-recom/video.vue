<template>
    <div id="music-video">
        <div style="float:left;width:150px">
            Video
        </div>
        <!-- 外部用v-for来遍历每一个视频盒子，并把相应的参数传到router-link中 -->
        <router-link :to="`/home/video-player/detail/${videoId}`">
            <div style="width:150px;height:150px;background-color:green;float:left;margin-top:25px;">
            
                This is a video-box
           
            </div>
         </router-link>
    </div>
</template>

<script>
export default {
    name: 'musicVideo', //Vue命名规则，不要使用video来命名
    data() {
        return {
            // 传入对应的视频id以播放相应视频
            videoId: '222'
        }
    },
}
</script>

<style lang="css" scoped>
    a {
        float: left;
    }
</style>