<template>
    <div id="singer">
        <div>
            <div class="nav1-1">
                <span>语种：</span>
            </div>
            <div class="nav1-2">
                <el-radio-group v-model="radio1" size="small">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="华语"></el-radio-button>
                    <el-radio-button label="欧美"></el-radio-button>
                    <el-radio-button label="日本"></el-radio-button>
                    <el-radio-button label="韩国"></el-radio-button>
                    <el-radio-button label="其他"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div>
            <div class="nav2-1">
                <span>分类：</span>
            </div>
            <div class="nav2-2">
                <el-radio-group v-model="radio2" size="small">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="男歌手"></el-radio-button>
                    <el-radio-button label="女歌手"></el-radio-button>
                    <el-radio-button label="乐队"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="main" clear-fix>
            <div 
            v-for="item in singerLists.slice(20*(this.currentPage-1),20*this.currentPage)"
            :key=item.id 
            class="content">
            <div>
                <a>
                    <div class="box1">
                        <img :src="item.img1v1Url || '../../../assets/image_not_found.png'" alt="" class="img">
                        <div class="more1">
                            <i class="el-icon-headset"></i>
                            <span> {{item.musicSize}}</span>
                        </div>
                        <div class="more2">
                            <p>查看详情></p>
                        </div>
                        <div class="more3">
                            <i class="el-icon-video-camera"></i>
                            <span> {{item.albumSize}}</span>
                        </div>
                    </div>
                </a>
            </div>
            <div class="box2">
                <i class="el-icon-user"></i><span>{{item.name}}</span>
            </div>
        </div>
        </div>
        <!-- 底部页签 -->
        <div class="block">
            <el-pagination
            background
            layout="prev, pager, next"
            :page-count="Math.floor((this.singerLists.length-1)/20)+1 || 1"
            @current-change="handleCurrentPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'singer',
    data () {
      return {
        radio1: '全部',
        radio2: '全部',
        radio3: '热门',
        // number1:'1',
        // number2:'2',
        // name:'xxx',
        singerLists:[],
        currentPage: 1,//当前页
      }
    },
    methods: {
        handleCurrentPage(currentPage){
            this.currentPage = currentPage
        },
        async requestData(){
            this.singerLists = []
            await this.$http({
                methods:'get',
                url:"/artist/list?limit=100",
                params:{cat:1001}
            }).then((res)=>{
                let items = res.data.artists
                // console.log(items)
                items.forEach((item) => {
                    this.singerLists.push(item);
                });
            }).catch((e) => {
                console.log(e)
            })
        }
    },
    async mounted() {
        await this.requestData()
    },
}
</script>

<style lang="css" scoped>
    .main {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 10px;
    }
    .content {
        float: left;
        margin-left: 20px;
    }
    .img{
        height: 225px;
        width: 225px;
        position: absolute;
        left: 0px;
    }
    #singer {
        padding-left: 5%;
        padding-right: 5%;
        width: 100%;
    }
    .nav1-1{
        float: left;
        margin-top: 25px;
    }
    .nav1-2{
        float: left;
        margin-top: 20px;
        margin-left: 20px;
    }
    .nav2-1{
        float: left;
        margin-top: 25px;
    }
    .nav2-2{
        float: left;
        margin-top: 20px;
        margin-left: 20px;

    }
    .nav3-1{
        float: left;
        margin-top: 25px;
    }
    .nav3-2{
        float: left;
        margin-top: 20px;
        margin-left: 20px;

    }
    .more1{
        float: left;
        margin-left: 15px;
        margin-top: 10px;
        height: 20px;
        width: 200px;
        opacity:1;
        position: relative;
        color: white;
    }
    .box1:hover .more1{
        opacity:0;
    }
    .more2{
        border: 1px solid white;
        float: left;
        height: 45px;
        width: 135px;
        margin-top: 55px;
        margin-left: 45px;
        opacity:0;
        position: relative;
    }
    .box1:hover .more2{
        opacity:1;
    }
    .more2 p{
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        color: white;
    }
    .more3{
        float: right;
        margin-right: 15px;
        margin-top: 65px;
        height: 20px;
        width: 200px;
        text-align: right;
        opacity:1;
        position: relative;
        color: white;
    }
    .box1:hover .more3{
        opacity:0;
    }
    .box1{
        height: 225px;
        width: 225px;
        margin-top: 30px;
        position: relative;
    }
    .box2 span{
        margin-left: 10px;
    }
    .block {
        margin-top: 2%;
        margin-bottom: 5%;
        display: flex;
        justify-content: center;
    }
</style>