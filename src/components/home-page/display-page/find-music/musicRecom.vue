<template>
  <div id="music-recommend">
    <el-carousel class="swiper" :interval="4000" type="card" height="200px" v-if="this.banner!==[]">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <div class="inner-content">
          <img style="width:100%" class="img21" :src="item.imageUrl" alt="">
          <div class="tip">{{ item.typeTitle || "" }}</div>
        </div>


      </el-carousel-item>
    </el-carousel>
    <main class="main">
      <div class="item" v-for="el in imgList" :key="el.title">
        <div class="top-right">
          <img class="video" src="../../../../assets/corner-labels/music.png" alt="播放量" title="播放量"> 250万
        </div>
        <img class="item-img" :src="el.img" alt="">
        <div class="left-bottom">
          4:00
        </div>
        <span class="size">{{ el.title }}</span>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'musicRecom',
  data() {
    return {
      headerTabs: ['个性推荐', '歌单', '排行榜', '歌手', '最新音乐'],
      oneTitle: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      active: 0,
      activeTitle: 0,
      banner: [],
      imgList: [
        { img: 'https://p2.music.126.net/TacJxbYVjD0vc7Nrn5FzUQ==/109951163557993210.jpg', title: '「看书学习」在安静的位置看热闹的世界' },
        { img: 'https://p2.music.126.net/TacJxbYVjD0vc7Nrn5FzUQ==/109951163557993210.jpg', title: '【R&B】慵懒的感觉非常舒服' },
        { img: 'https://p2.music.126.net/JKiCDG-xfj203gcui2z6aA==/109951163139073602.jpg', title: '别整太大鸭力，要多鸡立自己' },
        { img: 'https://p2.music.126.net/BYUIoXcdJEEBkwQwUl43-Q==/109951164137325416.jpg', title: '「纯音乐」你偶尔需要安静的发泄' },
        { img: 'https://p2.music.126.net/QCtK5ro1zrnXFmjLUIW4qg==/109951167308852599.jpg', title: '当欧美万评歌曲遇上清新电音 ❀' },
        { img: 'https://p2.music.126.net/Dca_3SYxotjzldx9lDV4Bg==/109951165528707090.jpg', title: '助眠辑 | 自然音，伴灵动乐符萦绕耳畔' },
        { img: 'https://p2.music.126.net/8g2Pn9Xw1m7cFhxOlc3BMg==/109951167875709379.jpg', title: '华语经典丨不容错过的神级Live现场' },
        { img: 'https://p2.music.126.net/BLMmLfUNu0zdprDISL_hTw==/109951165764406932.jpg', title: '失恋日记 | 换不同的场景 但哪里都是你' },
        { img: 'https://p2.music.126.net/uFWcdYyjcqvM5JFZ5nsPGw==/1365593453032084.jpg', title: '不让你通宵循环的电音不是好电音' },
        { img: 'https://p2.music.126.net/SATl5PH1NpEPHsYaB24t5A==/109951166269856073.jpg', title: '一个双子座的听歌列表' },
        { img: 'https://p2.music.126.net/HTiXYFaa_L6k_-c7T0ZJWw==/109951164425574633.jpg', title: '戳爷/美渣/断眉/萌德/灰森/比伯/六公主' },
        { img: 'https://p2.music.126.net/qO5IXdtPmWIMTNbmXgxK8Q==/109951163058256684.jpg', title: '终于听懂每首情歌，却再也没有可以联系的人' },
        { img: 'https://p2.music.126.net/kZb9DO4vykqiYEx0HHx86w==/109951163065542645.jpg', title: '假如能回到过去，你想做什么' },
        { img: 'https://p2.music.126.net/omxC-mmwgGHbacIVBZYNkA==/109951163028873411.jpg', title: '你总要一个人，经历些难捱的日子。' },
        { img: 'https://p2.music.126.net/4uiy7t752A4HHF2bwqVj1A==/109951164812388197.jpg', title: '夜晚温柔粤语女声 唱出谁的不眠心事' },
        { img: 'https://p2.music.126.net/RZWN1SbPoDqhwhpmsjxPZg==/109951168112033444.jpg', title: '国语说唱也很抒情，副歌也美' },
        { img: 'https://p2.music.126.net/pAidnPdX-0fhVakVXiHMzg==/18575149441852040.jpg', title: '一百首‖让你瞬间勾起回忆的老歌' },
        { img: 'https://p2.music.126.net/hLv4YJOiLTE16LlRpdxZgQ==/109951164152314267.jpg', title: '用音乐保持你每天的嘴角上扬' }
      ]
    }
  },

  methods: {
    onActived(index) {
      this.active = index
      this.$router.push('/sort')
    },

    onActived2(index) {
      this.activeTitle = index
    },
    async requestData(){
      await this.$http.get('/banner')
      .then(val => {
        this.banner = val.data.banners
        // console.log(this.banner)
      })
    }
  },
  async mounted() {
    await this.requestData()
  },

}
</script>

<style scoped>

#music-recommend {
    padding-left: 5%;
    padding-right: 5%;
    width: 100%;
}

.inner-content {
  position: relative;
  width: 100%;
}

.el-carousel-item {
  position: relative;
  /* height: 200px; */
}

.size {
  font-size: 12px;
}

.tip {
  position: absolute;
  bottom: 5px;
  right: -5px;
  width: 48px;
  height: 16px;
  background-color: #5292fe;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  color: white;
  padding: 0 4px;
  border-radius: 2px;
  transform: scale(.8);
}

.swiper {
  margin-top: 20px;
}

.header {
  height: 60px;
  background-color: #2B8BF2;
}

.header-tabs {
  line-height: 30px;
  display: flex;
  justify-content: center;
}

.active {
  border-bottom: 4px solid #2B8BF2;
}

.active-title {
  background-color: #2B8BF2;
  border-radius: 4px;
  padding: 0px 4px;
  color: white;
}

.title {
  width: 300px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 10px;
}

.main {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}

.item {
  width: 178px;
  height: 228px;
  /* margin-right: 10px; */
  /* background-color: #ccc;
   */
  /* background-image: url("https://p2.music.126.net/TacJxbYVjD0vc7Nrn5FzUQ==/109951163557993210.jpg"); */
  background-size: 100% 100%;
  margin-top: 10px;
  position: relative;
  padding: 0;
}

.item-img {
  width: 100%;
}


.inner {
  width: 70%;
  margin: 10px auto;
}

.top-right {
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  align-items: center;
}

.left-bottom {
  position: absolute;
  bottom: 50px;
  left: 0px;
}

.left-bottom,
.top-right {
  background-color: rgba(0, 0, 0, .3);
  font-size: 12px;
  transform: scale(.8);
  color: white;
}

.video {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
</style>