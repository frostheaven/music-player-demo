<template>
  <div id="rank-list">

    <main>
      <div class="item">
        <div class="all">查看全部></div>
        <div class="left">
          <h1 class="til">飙升榜</h1>
          <span>2022-12-07更新</span>
        </div>
        <div class="right">
          <div class="tip" v-for="(el, index) in content" :key="index">

            <div class="one">
              <span style="margin:0 10px">{{ (index + 1) }}</span>
              <span>{{ el.one }}</span>
            </div>
            <div class="two">
              {{ el.two }}
            </div>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="all">查看全部></div>
        <div class="left0">
          <h1 class="til">原创榜</h1>
          <span>2022-12-07更新</span>
        </div>
        <div class="right">
          <div class="tip" v-for="(el, index) in content" :key="index">

            <div class="one">
              <span style="margin:0 10px">{{ (index + 1) }}</span>
              <span>{{ el.one }}</span>
            </div>
            <div class="two">
              {{ el.two }}
            </div>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="all">查看全部></div>
        <div class="left1">
          <h1 class="til">热歌榜</h1>
          <span>2022-12-07更新</span>
        </div>
        <div class="right">
          <div class="tip" v-for="(el, index) in content" :key="index">

            <div class="one">
              <span style="margin:0 10px">{{ (index + 1) }}</span>
              <span>{{ el.one }}</span>
            </div>
            <div class="two">
              {{ el.two }}
            </div>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="all">查看全部></div>
        <div class="left2">
          <h1 class="til">新歌榜</h1>
          <span>2022-12-07更新</span>
        </div>
        <div class="right">
          <div class="tip" v-for="(el, index) in content" :key="index">

            <div class="one">
              <span style="margin:0 10px">{{ (index + 1) }}</span>
              <span>{{ el.one }}</span>
            </div>
            <div class="two">
              {{ el.two }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'rankList',
  data() {
    return {
      headerTabs: ['个性推荐', '歌单', '排行榜', '歌手', '最新音乐'],
      oneTitle: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      active: 0,
      activeTitle: 0,
      content: [{ one: 'Beside Me', two: 'Spylent' }, { one: '朋友身份', two: '江皓南' }, { one: '我愿', two: '阿虾' }, { one: '巡光', two: '就是南方凯（项学凯）' }, { one: '他在乎', two: 'Spylent' }],

    }
  },

  mounted() {
    this.$http.get('http://124.221.63.19:3000/banner').then(val => {
      this.banner = val.data.banners
    //   console.log(val);
    })
  },

  methods: {
    onActived(index) {
      this.active = index
    },

    onActived2(index) {
      this.activeTitle = index
    }
  }
}
</script>

<style scoped>
#rank-list {
    padding-left: 5%;
    padding-right: 5%;
    width: 100%;
}
.el-carousel-item {
  position: relative;
}


.swiper {
  margin-top: 20px;
}

.til {
  margin-bottom: 10px;
}


.left,
.left0,
.left1,
.left2 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
}



.item {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  position: relative;
}

.all {
  position: absolute;
  bottom: -9px;
  left: 210px;
  color: #909399;
  font-size: 12px;
}




.right {
  display: flex;
  flex-direction: column;
  width: calc(100% - 200px);
  font-size: 12px;
}

.left {
  width: 200px;
  height: 200px;
  /* background-color: brown; */
  background: linear-gradient(to left bottom, #c8839d, #BA4480);
}

.left0 {
  width: 200px;
  height: 200px;
  /* background-color: brown; */
  background: linear-gradient(to left bottom, #80d7c6, #3CACB0);
}

.left1 {
  width: 200px;
  height: 200px;
  /* background-color: brown; */
  background: linear-gradient(to left bottom, #79C9ED, #5C8CC5);
}

.left2 {
  width: 200px;
  height: 200px;
  /* background-color: brown; */
  background: linear-gradient(to left bottom, #F19B88, #C75851);
}

.tip {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}

.right>.tip:nth-child(even) {
  background-color: rgba(144, 147, 143, .1);
}
</style>