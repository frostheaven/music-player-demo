<template>
  <div class="main">
    <div class="topsongLists">
      <div class="image">
        <img :src="imgUrl" alt="" />
      </div>
      <div class="info">
        <div class="el-divider el-divider--horizontal">
          <div class="el-divider__text is-left">
            <h2>精品歌单</h2>
          </div>
        </div>
        <div class="title">{{ name }}</div>
        <div class="desc">{{ description }}</div>
      </div>
    </div>

    <div class="tags-nav">
      <div class="tags">
        <div class="all">
          <span>华语 <i class="el-icon-arrow-down"></i></span>
        </div>
        <div class="all-tag-list" style="display: none">
          <div class="all-tag">
            <div class="all-tag-item"><span class="">综艺</span></div>
            <div class="all-tag-item"><span class="">流行</span></div>
            <div class="all-tag-item"><span class="">影视原声</span></div>
            <div class="all-tag-item"><span class="activeAll">华语</span></div>
            <div class="all-tag-item"><span class="">清晨</span></div>
            <div class="all-tag-item"><span class="">怀旧</span></div>
            <div class="all-tag-item"><span class="">摇滚</span></div>
            <div class="all-tag-item"><span class="">ACG</span></div>
            <div class="all-tag-item"><span class="">欧美</span></div>
            <div class="all-tag-item"><span class="">清新</span></div>
            <div class="all-tag-item"><span class="">夜晚</span></div>
            <div class="all-tag-item"><span class="">儿童</span></div>
            <div class="all-tag-item"><span class="">民谣</span></div>
            <div class="all-tag-item"><span class="">日语</span></div>
            <div class="all-tag-item"><span class="">浪漫</span></div>
            <div class="all-tag-item"><span class="">学习</span></div>
            <div class="all-tag-item"><span class="">校园</span></div>
            <div class="all-tag-item"><span class="">韩语</span></div>
            <div class="all-tag-item"><span class="">工作</span></div>
            <div class="all-tag-item"><span class="">电子</span></div>
            <div class="all-tag-item"><span class="">粤语</span></div>
            <div class="all-tag-item"><span class="">舞曲</span></div>
            <div class="all-tag-item"><span class="">伤感</span></div>
            <div class="all-tag-item"><span class="">午休</span></div>
            <div class="all-tag-item"><span class="">游戏</span></div>
            <div class="all-tag-item"><span class="">下午茶</span></div>
            <div class="all-tag-item"><span class="">70后</span></div>
            <div class="all-tag-item"><span class="">治愈</span></div>
            <div class="all-tag-item"><span class="">说唱</span></div>
            <div class="all-tag-item"><span class="">轻音乐</span></div>
            <div class="all-tag-item"><span class="">80后</span></div>
            <div class="all-tag-item"><span class="">地铁</span></div>
            <div class="all-tag-item"><span class="">放松</span></div>
            <div class="all-tag-item"><span class="">90后</span></div>
            <div class="all-tag-item"><span class="">爵士</span></div>
            <div class="all-tag-item"><span class="">驾车</span></div>
            <div class="all-tag-item"><span class="">孤独</span></div>
            <div class="all-tag-item"><span class="">乡村</span></div>
            <div class="all-tag-item"><span class="">运动</span></div>
            <div class="all-tag-item"><span class="">感动</span></div>
            <div class="all-tag-item"><span class="">网络歌曲</span></div>
            <div class="all-tag-item"><span class="">兴奋</span></div>
            <div class="all-tag-item"><span class="">R&amp;B/Soul</span></div>
            <div class="all-tag-item"><span class="">旅行</span></div>
            <div class="all-tag-item"><span class="">KTV</span></div>
            <div class="all-tag-item"><span class="">经典</span></div>
            <div class="all-tag-item"><span class="">快乐</span></div>
            <div class="all-tag-item"><span class="">散步</span></div>
            <div class="all-tag-item"><span class="">古典</span></div>
            <div class="all-tag-item"><span class="">安静</span></div>
            <div class="all-tag-item"><span class="">酒吧</span></div>
            <div class="all-tag-item"><span class="">翻唱</span></div>
            <div class="all-tag-item"><span class="">民族</span></div>
            <div class="all-tag-item"><span class="">吉他</span></div>
            <div class="all-tag-item"><span class="">思念</span></div>
            <div class="all-tag-item"><span class="">英伦</span></div>
            <div class="all-tag-item"><span class="">钢琴</span></div>
            <div class="all-tag-item"><span class="">金属</span></div>
            <div class="all-tag-item"><span class="">朋克</span></div>
            <div class="all-tag-item"><span class="">器乐</span></div>
            <div class="all-tag-item"><span class="">蓝调</span></div>
            <div class="all-tag-item"><span class="">榜单</span></div>
            <div class="all-tag-item"><span class="">雷鬼</span></div>
            <div class="all-tag-item"><span class="">00后</span></div>
            <div class="all-tag-item"><span class="">世界音乐</span></div>
            <div class="all-tag-item"><span class="">拉丁</span></div>
            <div class="all-tag-item"><span class="">New Age</span></div>
            <div class="all-tag-item"><span class="">古风</span></div>
            <div class="all-tag-item"><span class="">后摇</span></div>
            <div class="all-tag-item"><span class="">Bossa Nova</span></div>
          </div>
        </div>
        <div class="hot-tag">
          <div class="hot-tag-item activeHot">华语</div>
          <div class="hot-tag-item">流行</div>
          <div class="hot-tag-item">摇滚</div>
          <div class="hot-tag-item">民谣</div>
          <div class="hot-tag-item">电子</div>
          <div class="hot-tag-item">另类/独立</div>
          <div class="hot-tag-item">轻音乐</div>
          <div class="hot-tag-item">综艺</div>
          <div class="hot-tag-item">影视原声</div>
          <div class="hot-tag-item">ACG</div>
        </div>
      </div>
    </div>

    <div class="songLists">
      <div class="songLists">
        <div class="song-list">

          <div class="item" v-for="item in songLists" :key=item.id>
            <div class="item-img">
              <div class="mask-playicon" style="display: none">
                <span class="iconfont icon-play"></span>
              </div>
              <!-- <div class="mask">
                <span class="iconfont icon-yinle"></span><span>播放量</span>
              </div> -->
              <img
                alt=""
                :src="item.coverImgUrl"
              />
            </div>
            <div class="item-text">
              <div>{{item.name}}</div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="page">
      <div class="el-pagination is-background" style="">
        <span class="el-pagination__total">共 1675 条</span
        ><button type="button" disabled="disabled" class="btn-prev">
          <i class="el-icon el-icon-arrow-left"></i>
        </button>
        <ul class="el-pager">
          <li class="number active">1</li>
          <!---->
          <li class="number">2</li>
          <li class="number">3</li>
          <li class="number">4</li>
          <li class="number">5</li>
          <li class="number">6</li>
          <li class="el-icon more btn-quicknext el-icon-more"></li>
          <li class="number">32</li>
        </ul>
        <button type="button" class="btn-next">
          <i class="el-icon el-icon-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "musicMenu",
  data() {
    return {
      imgUrl: "",
      name: "",
      description: "",
      songLists: []
    };
  },
  methods: {
    async requestData(){
      await this.$http({
        method: "get",
        url: "/top/playlist/highquality?limit=1",
        // params: {id: this.$route.params.videoId}
        // params:{id:'89ADDE33C0AAE8EC14B99F6750DB954D'}
      })
        .then((res) => {
          // console.log(res);
          this.imgUrl = res.data.playlists[0].coverImgUrl;
          this.name = res.data.playlists[0].name;
          this.description = res.data.playlists[0].description;
        })
        .catch((e) => {
          console.log(e);
        });

      await this.$http({
        method: "get",
        url:"/top/playlist?limit=60",
        // params: {},
        })
        .then((res) => {
          // console.log(res)
          let items = res.data.playlists;
          items.sort(function () {
            return Math.random() - 0.5;
          });
          items = items.slice(0, 60);
          items.forEach((item) => {
            this.songLists.push(item);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  async mounted() {
    await this.requestData()
  },
};
// this.$route.query.id
</script>

<style lang="css" scoped>
.main {
  width: 1200px;
  margin: 20px auto 20px auto;
}
.topsongLists {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.image {
  position: relative;
  width: 17%;
  cursor: pointer;
}

.image img {
  width: 100%;
}

.info {
  margin: 12px 0;
  width: 70%;
}
.title {
  font-size: 16px;
  padding-bottom: 5px;
}

.desc {
  font-size: 12px;
  color: #909399;
}

.tags-nav {
  margin-top: 30px;
  margin-left: 30px;
}
.tags {
  position: relative;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.hot-tag {
  width: 70%;
  display: flex;
  justify-content: space-between;
}

.songLists {
  margin-top: 20px;
}

.song-list {
  display: grid;
  justify-content: space-between;
  align-content: space-between;
  grid-template-rows: repeat(8, auto-fill);
  grid-template-columns: repeat(6, 15%);
}

.item-img {
  position: relative;
}

.item-img img {
  width: 100%;
}

.item {
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-bottom: 15px;
}

.page {
  display: flex;
  width: 100%;
  padding-top: 20px;
  justify-content: center;
}
</style>