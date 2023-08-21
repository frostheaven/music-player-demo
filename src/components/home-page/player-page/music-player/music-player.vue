<template>
    <div id="music-player">
        <div class="background-image-design" :style="`background-image:url(${this.currentMusic.picUrl})`"></div>
        <div class="title">
            <div class="arrow-down-box" @click="changeStatus">
                <i class="el-icon-arrow-down"></i>
            </div>
        </div>
        <div class="main-detail clearfix">
            <div class="main-display-box">
                <div class="left-display-part">
                    <!-- 歌曲背景图 -->
                    <div class="img-box">
                        <img :src="currentMusic.picUrl" alt="">
                    </div>
                </div>
                <div class="right-display-part">
                    <!-- 歌曲名 -->
                    <div class="music-name-box">
                        {{currentMusic.name || "暂无歌名"}}
                    </div>
                    <!-- 歌手信息 -->
                    <div class="singer-name-box">
                        {{currentMusic.singer || "暂无歌手"}}
                    </div>
                    <!-- 歌词展示 -->
                    <div class="lyric-box">
                        <div class="lyric-wrapper" ref="lyricDiv" @scroll="getUserScroll">
                            <ul class="lyric-items" v-for="(sentence,index) in lyrics" :key="index" ref="lyricList">
                                <li style="list-style-type: none; margin-bottom: 25px"
                                    :class="{ currentLyric: currentLyricIndex === index}">
                                    {{sentence.lyric || ""}}
                                </li>
                            </ul>
                        </div> 
                    </div>
                </div>
            </div>
            <!-- 歌曲评论【暂定】 -->
            <div class="comment clearfix">
               <el-form 
                ref="form" 
                :model="form" 
                size="small"
                label-width="70px" 
                label-position="right">
                    <el-form-item label="评论：" id="comment-wrapper">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item id="subBtn">
                        <el-button type="primary">立即发表</el-button>
                    </el-form-item>
               </el-form>
            </div>
        </div>
        
        
    </div>
</template>

<script>

export default {
    name: 'musicPlayer',
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            currentMusic: {//当前音乐信息
                name:'',singer:'',id:'',url:'',picUrl:''
            },
            ifGetLyrics: 0, //判断是否拿到了歌词
            lyrics: [], //格式化的歌词，存储对象格式：{time:'min:sec.xxx',lyric:''}
            currentLyricIndex: -1, //当前歌词序列号
            userScroll: false, //判断用户当前是否滚动
            timer: null
        }
    },
    methods: {
        //初始化
        getInitialMusic(){
            if(localStorage.getItem('currentMusic')!==null){
                this.currentMusic = JSON.parse(localStorage.getItem('currentMusic'))
                this.getLyrics(this.currentMusic.id)
            }else{
                this.currentMusic.picUrl = require('../../../../assets/image_not_found.png') //require方式解决图片找不到的问题
            }
        },
        //音乐播放页下滑
        changeStatus(){
            this.$bus.$emit('showMusicDetail')
        },
        //获取歌词（参数：音乐的id）
        getLyrics(id){
            this.$http({
                method: 'get',
                url: '/lyric',
                params: {id: id}
            }).then((res) => {
                this.ifGetLyrics = 1
                let originalLyrics = res.data.lrc.lyric//存储未格式化的歌词
                this.formatLyrics(originalLyrics) //格式化歌词
            }).catch(() => {
                this.ifGetLyrics = 0
            })
        },
        // 时间转化ms
        formatTime(string){
            let min = parseInt(string.slice(0,2))
            let sec = parseInt(string.slice(3,5))
            let ms = parseInt(string.slice(6))
            let result = min*60*1000 + sec*1000 + ms
            return result
        },
        // 歌词格式化存储
        formatLyrics(string){
            this.lyrics = []
            let sentence = string.split('\n')
            sentence.forEach((item) => {
                let time = item.match('\\[([0-9]+:[0-9]+.[0-9]+)\\]')
                let lyric = item.replace(time[0], '')
                this.lyrics.push({time: this.formatTime(time[1]), lyric: lyric.trim()})
            })
        },
        //得到时间相对应的歌词，注意：currentTime是s为单位，this.lyrics.time是ms为单位
        getPropLyric(currentTime){
            this.currentLyricIndex = -1
            if(this.lyrics.length!==0){
                let i = 0
                if(currentTime*1000 >= this.lyrics[this.lyrics.length-1].time)this.currentLyricIndex = this.lyrics.length-1
                else{
                    for(i = 0; i < this.lyrics.length-1; i++){
                        if(currentTime*1000 >= this.lyrics[i].time && currentTime*1000 < this.lyrics[i+1].time){
                            this.currentLyricIndex = i
                        }
                    }
                }
            }
        },
        //用户滚动歌词，将userScroll置为true，阻止歌词自动滚动，3s后恢复
        getUserScroll(){
            if(this.userScroll)clearTimeout(this.timer)
            this.userScroll = true
            this.timer = setTimeout(() => {
                this.userScroll = false
            }, 3000);
        },
    },
    watch: {
        currentLyricIndex(newVal, oldVal){
            if(newVal <= 3 && !this.userScroll)this.$refs.lyricDiv.scrollTop = 0 //当新歌开始播放时，滚动条回到开头
            if(newVal > 3 && !this.userScroll){
                let scrollChildren = []
                for(let i = 3; i < newVal; i++){
                    let height = this.$refs.lyricList[i].children[0].offsetHeight
                    if(height !== 0) scrollChildren.push(height)
                }
                let scrollHeight = scrollChildren.reduce((pre, cur) => {
                    return pre + cur
                })
                // 需要上升的高度为从第3条开始至上一个歌词的所有元素的offsetHeight加上其margin值
                this.$refs.lyricDiv.scrollTop = scrollHeight + 25*(scrollChildren.length - 2) //25为margin-bottom的值
            }
        }
    },
    mounted() {
        this.getInitialMusic()
        this.$bus.$on('displayCurrentMusic',(newMusic)=>{
            this.currentMusic = newMusic
            this.getLyrics(this.currentMusic.id)
        })
        this.$bus.$on('getLyricHighlight', (currentTime) => {
            this.getPropLyric(currentTime)
        })
    },
}
</script>

<style lang="css" scoped>
    #music-player{
        width: 100%;
        height: 100%;
        /* background-image: linear-gradient(rgb(210, 238, 255),aliceblue); */
    }
    .background-image-design{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;

        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(60px);
        z-index: -1;
    }
    .title {
        width: 100%;
        /* 高度同首页header */
        height: 60px; 
        display: flex;
        align-items: center;
    }
    .title .arrow-down-box{
        height: 100%;
        width: 60px;
        display: flex;
        justify-content: center;
        margin-left: 10px;
        padding-top: 5px;
    }
    .title i{
        color: rgb(145, 145, 145);
        font-size: 35px;
    }
    .title i:hover{
        color: aqua;
        font-size: 35px;
    }
    .main-detail {
        width: 100%;
        height: calc(100vh - 60px - 65px);
    }
    .main-display-box {
        width: 100%;
        height: 80%;
    }
    .left-display-part, .right-display-part {
        float: left;
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .img-box{
        height: 50%;
        display: flex;
        align-items: center;
        justify-self: center;

        padding: 5% 5% 5% 5%;
        border-radius: 9999px;
        background-image: radial-gradient(5em 30em ellipse, #fff, #000);
        border: 2px solid #131313;
        box-shadow: 0 0 0 10px #343935;
        opacity: 0.7;

        /* 旋转动画 */
        animation: rotate 20s linear infinite;
    }
    @keyframes rotate{
        from{transform: rotate(0deg);}
        to{transform: rotate(359deg);}
    }
    .img-box img {
        height: 100%;
        border-radius: 9999px;
    }
    .right-display-part {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        justify-content: flex-start;
        padding-top: 20px;
        padding-bottom: 20px;
        color: rgb(241, 234, 128);
    }
    .el-textarea {
        position: relative;
        display: inline-block;
        width: 100%;
        vertical-align: bottom;
        font-size: 14px;
    }
    .music-name-box, .singer-name-box{
        height: 12%;
    }
    .music-name-box {
        font-size: 25px;
        color: rgb(0, 183, 255);
    }
    .singer-name-box {
        font-size: 18px;
        color: aqua;
    }
    .lyric-box {
        height: 72%;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
    }
    .lyric-wrapper {
        /* 17px为滚动条宽度，父元素设置overflow:hidden来隐藏滚动条 */
        width: calc(100% + 17px);
        height: 100%;
        overflow-y: auto;
    }
    .currentLyric {
        font-size: 25px;
        color: rgb(243, 169, 79);
    }
    .comment >>> .el-form-item{
        width: 60%;
        line-height: 32px;
    }
    #subBtn >>> .el-form-item__content{
        margin-left: 0;
        background-color: rgb(150, 238, 238);
    }
    .comment >>> #comment-wrapper {
        float: left;
        height: 58px;
    }
    .comment >>> #subBtn{
        float: left;
        width: 30%;
        display: flex;
        align-items: center;
        margin-bottom: 0;
        height: 58px;
        justify-content: flex-start;
    }
    .comment{
        padding-top: 20px;
        padding-left: 100px;
        min-height: 20%;
    }

</style>