<template>
    <div id="music-player" class="clearfix">
         <div class="cover-content">
            <div class="img-box" @click="changeStatus">
                <img :src="currentMusic.picUrl" alt="">
            </div>
            <div class="right-cover">
                <div class="music-name">
                    {{currentMusic.name || "暂无歌名"}}
                </div>
                <div class="music-singer">
                    {{currentMusic.singer || "暂无歌手"}}
                </div>
            </div>
         </div>
         <div class="player-button">
            <el-button @click="goPreMusic" icon="el-icon-caret-left" circle size="small"></el-button>
            <el-button 
                @click="playAndPauseMusic" 
                :icon="elIconStyle" 
                circle size="big" 
                style="margin-left:10px">
            </el-button>
            <el-button @click="goNextMusic" icon="el-icon-caret-right" circle size="small" style="margin-left:10px"></el-button>
        </div>
        <!-- audio -->
        <audio :src="currentMusic.url" ref="audio" autoplay></audio>
        <div class="progress-box">
            <div class="current-time-box">
                {{progressTime.currentPlayTime}}
            </div>
            <div class="progress">
                <el-slider v-model="slideValue" :show-tooltip="false" @change="changeMusicProgress"></el-slider>
            </div>
            <div class="end-time-box">
                {{progressTime.totalPlayTime}}
            </div>
        </div>
        
    </div>
</template>

<script>

export default {
    name: 'musicFooter',
    data() {
        return {
            musicMenuId: 24381616, //歌单id
            music:{
                name: '', //音乐名称
                singer: '', //歌手名字
                id: '', //音乐id
                url: '', //音乐地址
                picUrl: '' //图片地址
            },
            musicArr: [], //存放处理后的音乐信息
            currentMusic: {//当前音乐信息
                name:'',singer:'',id:'',url:'',picUrl:''
            },
            musicImgUrl: '',
            elIconStyle: 'el-icon-video-play', //音频暂停状态,
            slideValue: 0, //进度条值
            timer: null,
            progressTime:{
                currentPlayTime: '00:00',
                totalPlayTime: '00:00'
            }
        }
    },
    methods: {
        changeStatus(){
            this.$bus.$emit('showMusicDetail')
        },
        // 定义一个可异步执行的forEach【根据forEach源码更改】
        async async_forEach(arr, callback){
            const length = arr.length;
            const O = Object(arr);
            let k = 0;
            while (k < length) {
                if (k in O) {
                    const kValue = O[k];
                    await callback(kValue, k, O);
                }
                k++;
            }
        },
        //获取歌单所有歌曲
        getAllMusicFromMenu(){
           return this.$http({
                method: 'get',
                url: '/playlist/track/all',
                params: {
                    id: this.musicMenuId, //要获取的歌单id
                    limit: 200, //获取数量限制
                    offset: 0 //开始获取的音乐位置
                }
           }).then((res) => {
                let musicMenu = [...res.data.songs]
                //console.log(musicMenu)
                this.async_forEach(musicMenu, async (item) => {
                    if(item.id) {
                        this.music.name = item.name
                        this.music.singer = item.ar[0].name
                        this.music.id = item.id
                        this.music.picUrl = item.al.picUrl
                        await this.getMusicUrl(item.id)

                        this.musicArr.push(this.music)
                        this.music = {name:'',singer:'',id:'',url:'',picUrl:''}
                    }
                })
                // console.log('musicArr',this.musicArr)
                // console.log('musicArrLength',this.musicArr.length)
                // console.log('finished')
            }).catch((e) => {
                console.log(e)
            })
        },
        //获取音乐url
        getMusicUrl(musicId){
            return this.$http({
                method: 'get',
                url: '/song/url',
                params:{id: musicId}
            }).then((res) => {
                if(res.data.data[0].url!==null)this.music.url = res.data.data[0].url
            }).catch(() => {
                console.log('Could not find url, music name: ',this.music.name)
            })
        },
        //获取信息异常处理
        checkCurrentMusic(){
            for(let key in this.currentMusic){
                if(key === 'picUrl' && this.currentMusic[key] === null){
                    this.currentMusic[key] = '../../../assets/image_not_found.png'
                }else if(this.currentMusic[key] === null){
                    this.currentMusic[key] = ''
                }
            }
        },
        //当前/上一次播放音乐获取【localStorage交互】
        getCurrentMusic(){
            if(localStorage.getItem('currentMusic')===null){
                if(this.musicArr.length!==0){
                    this.currentMusic = this.musicArr[0]
                    this.checkCurrentMusic()
                    localStorage.setItem('currentMusic',JSON.stringify(this.currentMusic))
                }else {
                    this.currentMusic.picUrl = require('../../../assets/image_not_found.png') //require方式 解决图片找不到的问题
                }
            }else{
                this.currentMusic = JSON.parse(localStorage.getItem('currentMusic'))
            }
        },
        //更换/更新当前播放音乐【上传至localStorage&全局事件总线】
        updateCurrentMusic(musicObj){
            this.currentMusic = musicObj
            this.checkCurrentMusic()
            localStorage.setItem('currentMusic', JSON.stringify(musicObj))
            this.$bus.$emit('displayCurrentMusic',this.currentMusic) //全局方法实现
        },
        //播放下一首
        goNextMusic(){
            let count = 0,flag = 0,index = -1
            if(this.musicArr.length!==0){
                this.musicArr.forEach((music)=>{
                    count++
                    if(this.currentMusic.id === music.id){
                        index = count-1
                        if(count === this.musicArr.length)flag = 1
                    }
                })
                if(index === -1)this.updateCurrentMusic(this.musicArr[0])//找不到，则放当前歌单第一首
                else if(flag)this.updateCurrentMusic(this.musicArr[0])
                else this.updateCurrentMusic(this.musicArr[index+1])
            }else alert('抱歉唔，获取音乐失败~')
        },
        //播放上一首
        goPreMusic(){
            let count = 0,flag = 0,index = -1
            if(this.musicArr.length!==0){
                this.musicArr.forEach((music)=>{
                    count++
                    if(this.currentMusic.id === music.id){
                        index = count-1
                        if(count === 1)flag = 1
                    }
                })
                if(index === -1)this.updateCurrentMusic(this.musicArr[0])//找不到，则放当前歌单第一首
                else if(flag)this.updateCurrentMusic(this.musicArr[this.musicArr.length-1])
                else this.updateCurrentMusic(this.musicArr[index-1])
            }else alert('抱歉唔，获取音乐失败~')
        },
        //播放&暂停音乐
        playAndPauseMusic(){
            if(this.$refs.audio.paused){
                this.$refs.audio.play()
                this.elIconStyle = 'el-icon-video-pause'
            }
            else{
                this.$refs.audio.pause()
                this.elIconStyle = 'el-icon-video-play'
            }
        },
        //检查播放状态
        checkStatus(){
            if(this.$refs.audio.paused)this.elIconStyle = 'el-icon-video-play'
            else this.elIconStyle = 'el-icon-video-pause'
        },
        //滑块移动，更改音乐播放进度
        changeMusicProgress(percent){
            this.$refs.audio.currentTime  = this.$refs.audio.duration*percent/100
        },
        //时间转换min:sec
        formatTime(oriTime){
            let min =[], sec = []
            let minTime = 0
            minTime = Math.floor(oriTime/60)
            min[0] = (Math.floor((Math.floor(oriTime/60))/10)).toString()
            min[1] = (Math.floor(oriTime/60)%10).toString()
            sec[0] = (Math.floor(Math.floor(oriTime - minTime*60)/10)).toString()
            sec[1] = (Math.floor(oriTime - minTime*60)%10).toString()
            return min[0]+min[1]+':'+sec[0]+sec[1]

        },
        //音乐播放读条
        checkProgress(){
            let ct = this.$refs.audio.currentTime
            let at = this.$refs.audio.duration
            this.slideValue = ct/at*100
        }
    },
    //在页面挂载/渲染前首先拿到数据
    async created() {
        await this.getAllMusicFromMenu()
        // console.log('length',this.musicArr.length)
        this.getCurrentMusic()
    },
    mounted() {
        this.$refs.audio.pause() //刚加载时暂停
        this.timer = setInterval(() => {
            this.checkStatus()
            this.checkProgress()
            this.progressTime.currentPlayTime = this.formatTime(this.$refs.audio.currentTime)
            this.progressTime.totalPlayTime = this.formatTime(this.$refs.audio.duration)

            this.$bus.$emit('getLyricHighlight',this.$refs.audio.currentTime)
        }, 100);
        // 播放搜索音乐，并加入播放歌单（触发函数再search-singleSong.vue中）
        this.$bus.$on('addNewMusic', (musicObj) => {
            this.musicArr.push(musicObj)
            this.updateCurrentMusic(musicObj)
        })
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}
</script>

<style lang="css" scoped>
    #music-player{
        display: flex;
        align-items: center;
        height: 100%;
        width: 98%;
        margin: 0 auto;
    }
    .cover-content {
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: center;
        width: 20%;
        overflow: hidden;
    }
    .cover-content .img-box {
        height: 90%;
        width: 58.4px;
    }
    .cover-content .img-box img{
        height: 100%;
        width: 100%;
    }
    .right-cover {
        margin-left: 25px;
        font-size: 12px;
    }
    .right-cover .music-name {
        margin-bottom: 10px;
    }
    .player-button {
        position: fixed;
        margin-left: 20%;
        overflow: hidden;
        height: 65px;
        display: flex;
        align-items: center;
    }
    .el-button {
        background-color: transparent;
        border: 0.5px solid grey;
    }
    .progress-box {
        position: fixed;
        margin-left: 35%;
        width: 45%;
        height: 65px;
        display: flex;
        align-items: center;
        overflow: hidden;
    }
    .current-time-box, .end-time-box {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .progress {
        width: 70%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .progress >>> .el-slider{
        width: 90%;
        padding-left: 5%;
        padding-right: 5%;
    }
    .el-slider >>> .el-slider__button-wrapper {
        display: flex;
        align-items: center;
    }
</style>