<template>
  <div id="mv">

      <div class="title">地区：
        <span :class="[index == activeTitle1 ? 'active-title1' : '']" :key="index" v-for="(item, index) in oneTitle"
          @click="onActived1(index)"> {{ item }}</span>
      </div>

      <div class="title">类型：
        <span :class="[index == activeTitle2 ? 'active-title2' : '']" :key="index" v-for="(item, index) in twoTitle"
          @click="onActived2(index)"> {{ item }}</span>
      </div>

      <div class="title">排序：
        <span :class="[index == activeTitle3 ? 'active-title3' : '']" :key="index" v-for="(item, index) in threeTitle"
          @click="onActived3(index)"> {{ item }}</span>
      </div>

      <main class="main" v-if="videoList!==[]">
        <div class="item" v-for="el in videoList" :key="el.id">
          <router-link :to="`/home/video-player/detail/${el.id}`">
            <div class="top-right">
              <img class="video" src="../../../../assets/corner-labels/video.png" alt="播放量" title="播放量"> {{el.playCount}}
            </div>
            <img class="item-img" :src="el.cover" alt="">
            <span>{{ el.name }}</span><br>
          </router-link>
        </div>
      </main>
      
  </div>
</template>

<script>
export default {
  name:'musicMv',
  data() {
    return {
      oneTitle: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      twoTitle: ['全部', '官方版', '原生', '现场版', '网易出品'],
      threeTitle: ['上升最快', '最热', '最新'],
      videoList: [],
      active: 0,
      activeTitle1: 0,
      activeTitle2: 0,
      activeTitle3: 0

    }
  },
  methods: {
    onActived1(index) {
      this.activeTitle1 = index
    },

    onActived2(index) {
      this.activeTitle2 = index
    },
    onActived3(index) {
        this.activeTitle3 = index
    }
  },
  created() {
    this.$http.get('/mv/first?limit=50').then((res) => {
      let data = res.data.data
      this.videoList.push(...data.slice(0,16)) //{id:xxx,cover:'url',name:'xxx',playCount:xxx}
      // console.log(res)
    }).catch((e) => {
      console.log(e)
    })
  }
}
</script>

<style scoped>
#mv {
    padding-left: 5%;
    padding-right: 5%;
    width: 100%;
}
.header {
  height: 60px;
  background-color: #f56c6c;
}

.header-tabs {
  line-height: 30px;
  display: flex;
  justify-content: center;
}

.active {
  border-bottom: 4px solid #f56c6c;
}

.active-title1,.active-title2, .active-title3 {
  background-color: #f56c6c;
  border-radius: 4px;
  padding: 0px 4px;
  color: white;
}

.title {
  /* width: 300px; */
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  margin-top: 10px;
}

.title>span {
  margin-right: 20px;
}

.main {
  margin-top: 10px;
}

.item {
  float: left;
  width: 220px;
  height: 165px;
  margin-top: 10px;
  margin-left: 30px;
  position: relative;
  padding: 0;
}

.item .item-img {
  width: 100%;
  height: 80%;
}
.item span {
  height: 20%;
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


.top-right {
  background-color: rgba(0, 0, 0, .3);
  font-size: 12px;
  transform: scale(.8);
  color: white;
}

.span2 {
  color: #ccc;
  font-size: 12px;
}

.video {
  width: 20px;
  height: 20px;
}
</style>