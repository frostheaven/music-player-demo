<template>
  <div id="video-detail" class="video-detail">
    <!-- 这里是播放的视频 -->

    <div class="left-detail">
      <h2 style="padding-bottom: 15px">MV详情</h2>
      <div class="video-play">
        <video
          :src="videoUrl"
          controls="controls"
          autoplay="autoplay"
          loop="loop"
        ></video>
      </div>
      <div class="video-info">
        <div class="auther">
          <div class="block">
            <img :src="imgUrl" />
          </div>
          <span>{{ creatorName }}</span
          ><!---->
        </div>
        <div class="title">
          <span>{{ description.desc }}</span>
        </div>
        <!---->
        <div class="time">
          <span>发布：{{description.publishTime}}</span>
          <span>播放：{{description.playCount}}</span>
        </div>
        <div class="opreation">
          <button
            type="button"
            class="el-button iconfont icon-dianzan el-button--default"
          >
            <!----><i class="el-icon-thumb"></i><span>点赞</span></button
          ><button type="button" class="el-button el-button--default">
            <!----><i class="el-icon-star-off"></i><span>收藏</span></button
          ><button type="button" class="el-button el-button--default">
            <!----><i class="el-icon-share"></i><span>分享</span>
          </button>
        </div>
      </div>
      <div class="video-comment">
        <h3 style="padding-bottom: 5px">评论</h3>
        <div class="comment">
          <div class="textinput">
            <div class="el-textarea">
              <textarea
                autocomplete="off"
                rows="3"
                maxlength="100"
                placeholder="请输入内容"
                class="el-textarea__inner"
                style="min-height: 33px"
              ></textarea
              ><span class="el-input__count">0/100</span>
            </div>
            <button
              type="button"
              class="
                el-button el-btn
                el-button--primary el-button--small
                is-round
              "
            >
              <!----><i class="el-icon-position"></i><span>发送评论</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="right-recvideo">
      <div class="similar-video">
        <h2>相关推荐</h2>

        <div class="simiitem" v-for="item in recommendItems" :key="item.id">
          <div class="item-img">
            <img :src="item.coverUrl" alt="" />
            <div class="play-icon">
              <span class="iconfont icon-play-square"></span>
              <i class="el-icon-video-play"></i>&nbsp;{{ toDecimal(item.playTime / 10000) }}万
            </div>
            <div class="playduration">
              <span>&nbsp;{{getTime(item.durationms)}}&nbsp;</span>
            </div>
          </div>
          <div class="item-text">
            <div class="tname">{{item.title}}</div>
            <p class="by">by {{item.creator[0].userName}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>{{$route.params.videoId}}</div> -->
    <!-- <div class="current-video-play" style="width: max-content">
      <div
        class="demo-box"
        style="background-color:gray; width:300px; height: 220px; z-index=9999"
      ></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "videoDetail",
  data() {
    return {
      videoUrl: "",
      imgUrl: "",
      creatorName: "",
      description: {
        desc: "",
        publishTime: "",
        playCount: "",
      },
      recommendItems: [],
    };
  },
  methods: {
    toDecimal(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return;
      }
      f = Math.round(x * 100) / 100;
      return f;
    },
    getTime(time) {
            let m = parseInt(time / 60 % 60)
             m = m < 10 ? '0' + m : m
            let s = parseInt(time % 60)
             s = s < 10 ? '0' + s : s
            return m+':'+s
        }
  },
  beforeRouteEnter(to, from , next){
    // console.log('to from',to, from)
    next(vm => {
        let data = vm.$data
        vm.$http({
            method: "get",
            url: "/mv/url",
            params: { id: to.params.videoId }
        }).then((res) => {
            // console.log(res)
            data.videoUrl = res.data.data.url
        }).catch(() => {
            vm.$bus.$emit('videoNotFound')
        })

        vm.$http({
            method: "get",
            url: "/mv/detail",
            params: {mvid: to.params.videoId},
            //   params: { id: "89ADDE33C0AAE8EC14B99F6750DB954D" },
        }).then((res) => {
            // console.log('##',res)
            vm.$bus.$emit('deliverVideoName',res.data.data.name)
            data.imgUrl = res.data.data.cover
            data.creatorName = res.data.data.artistName
            data.description = {
                desc: res.data.data.desc,
                publishTime: res.data.data.publishTime,
                playCount: res.data.data.playCount
            }
        })
        .catch((e) => {
            console.log(e);
        })

        vm.$http({
            method: "get",
            url: "/related/allvideo",
            params: { id: to.params.videoId },
        })
        .then((res) => {
            // console.log(res);
            let items = res.data.data;
            items.sort(function () {
                return Math.random() - 0.5;
            });
            items = items.slice(0, 5);
            items.forEach((item) => {
                data.recommendItems.push(item);
            })
        })
        .catch((e) => {
            console.log(e)
        });
    })
  },
};
</script>

<style lang="css" scoped>
.video-detail {
  width: 1200px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}

.left-detail {
  position: relative;
  width: 60%;
}

.right-recvideo {
  width: 35%;
}

.video-detail .video-play video {
  width: 100%;
  height: 100%;
}

.block {
  width: 50px;
  height: 50px;
}

.block img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.auther {
  display: flex;
  align-items: center;
  padding-top: 15px;
  color: hotpink;
}

.auther span {
  padding-left: 10px;
  cursor: pointer;
}

.title {
  padding-top: 25px;
}

.time {
  padding-top: 10px;
  color: #909399;
}

.time span {
  float: left;
  padding-right: 15px;
}

.opreation {
  padding-top: 15px;
}

.video-comment {
  padding-top: 20px;
}

.textinput {
  text-align: right;
}

.textinput .el-btn {
  margin-top: 10px;
}

.simiitem {
  display: flex;
  align-items: center;
  padding: 10px 5px;
  cursor: pointer;
}

.item-img {
  position: relative;
  flex: 4;
}

.item-img img {
  vertical-align: middle;
  width: 100%;
}

.item-img .play-icon {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  background: hsla(0, 0%, 39.2%, 0.5);
  padding: 0 5px;
}

.item-img .playduration {
  position: absolute;
  bottom: 0;
  left: 0;
  background: hsla(0, 0%, 39.2%, 0.5);
  color: #fff;
}

.item-text {
  flex: 2;
  padding-left: 30px;
}

.tname{
  padding-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.by{
  color: hsla(0, 0%, 39.2%, 0.5);
  font-size: 12px;
}
</style>