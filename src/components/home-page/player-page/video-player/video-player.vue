<template>
    <div id="video-player">
        <div class="main-display-content">
            <!-- 播放器标头 -->
            <div class="inner-title">
                <div class="inner-text">
                    {{this.lastParams.lastVideoName || 'Select video to play :)'}}
                </div>
            </div>

            <div>
                 <!-- if-video-keepAlive: {{$route.meta.keepAlive}} -->
                <!-- 视频位置，仅缓存当前播放的视频 -->
                <keep-alive include="videoDetail">
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'videoPlayer',
    data() {
        return {
            //最近一次传入的参数
            lastParams: {
                lastVideoName: '', //储存上一次播放的视频名称
                lastVideoId: ''//储存上一次播放的id，如果本次没有传新的参数，则用它来代替
            }
        }
    },
    methods: {
        // 组件外切换视频，即从外部访问组件时
        changeVideoOutside() {
            // 如果有传参，则跳转到对应视频，否则，放映上一次视频
            if(this.$route.params.videoId){
                this.lastParams.lastVideoId = this.$route.params.videoId
                //console.log('current',this.$route)
            }else if(this.lastParams.lastVideoId){
                this.$router.replace({
                    //这里会调用beforeRouteUpdate()，其中from="/home/video-player"
                    name: 'video-detail',
                    params: {
                        videoId: this.lastParams.lastVideoId
                    }
                })
                //console.log('lastVideoId',this.lastParams.lastVideoId)
            }
        },
        // 组件内切换视频，传入必要参数
        changeVideoInside(videoId){
            //如果播放视频的参数与当前不一致，则清除当前视频缓存，播放相应视频
           if(this.lastParams.lastVideoId !== videoId) {
                this.lastParams.lastVideoId = videoId
                //这里会调用beforeRouteUpdate()，并在该hook中清除上个视频缓存
                this.$router.replace({
                    name: 'video-detail',
                    params: { videoId }
                })
           }
        },
    },
    beforeRouteEnter(to, from, next){
        if(to.params.videoId){
            to.matched[2].meta.keepAlive = true
        }
        next()
    },
    //关于地址改变的几种情况，当前组件内地址修改，不会执行activated()；外部地址进入组件内地址时，不会执行beforeRouteUpdate()
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`

        // 防止在单击“正在放映”的一级菜单时跳转
        if(to.matched[1].path === to.path){
            next(false)
        }
        else if(from.matched[1].path !== from.path){
            //内部视频切换【排除由菜单进入的情况】
            // console.log('update',to, from)
            if(from.params.videoId)from.meta.keepAlive = false //清除当前视频缓存
            next()
        }else {
            next()
        }
    },
    activated(){
        this.changeVideoOutside()
    },
    mounted(){
        this.lastParams.lastVideoId = this.$route.params.videoId?this.$route.params.videoId:""
        this.$bus.$on('deliverVideoName',(name) => {
            this.lastParams.lastVideoName = name
        })
        this.$bus.$on('videoNotFound',() => {
            this.lastParams.lastVideoName = "Oh no, could not find video properly :("
        })
    }
}
</script>

<style lang="css" scoped>
    .inner-title {
        display: flex;
        justify-content: center;
        align-items: center;
        width:100%;
        overflow: hidden;
        height: 45px;

        word-break:keep-all;
        white-space:nowrap;
        text-overflow:ellipsis; 
    }
    .inner-text {
        color: rgb(121, 14, 242);
        text-align: center;
        font-size: 30px;
        border-right: 1px solid transparent;
        animation: typing 2s steps(42, end), blink-caret .75s step-end infinite;
        font-family: Consolas, Monaco;
        word-break: break-all;
        overflow: hidden;
        /* 文字渐变色 */
        background-image: -webkit-linear-gradient(left, #f56c6c, rgb(249, 189, 189));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

    }
    /* 打印效果 */
    @keyframes typing {
        from {
            width: 0;
        }

        to {
            width: 100%;
        }
    }
    /* 光标 */
    /* @keyframes blink-caret {
        from,
        to {
            border-color: transparent;
        }
        50% {
            border-color: currentColor;
        }
    } */
</style>