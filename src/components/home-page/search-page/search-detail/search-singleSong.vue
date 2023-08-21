<template>
    <div id="search-singleSong">
        <div id="header1">
            <p class="header1">搜索"{{this.$route.query.searchInfo? this.$route.query.searchInfo:'None'}}"
                ,已为您找到 {{number}} 首单曲</p>
            <p class="header2">最佳匹配</p>
        </div>
        <div>
            <ul class="item1">
                <li class="item1-0">序号</li>
                <li class="item1-1">歌曲</li>
                <li class="item1-2">专辑</li>
                <li class="item1-3">歌手</li>
                <li class="item1-4">时长</li>
            </ul>
        </div>
        <div class="item2" 
            v-for="(item, index) in songLists.slice(20*(this.currentPage-1),20*this.currentPage)" 
            :key=item.id>
            <div class="nav1">
                <li class="item2-1">{{ 20*(currentPage - 1) + index + 1}}</li>
            </div>
            <!-- 小图标 -->
            <div class="nav2">
                <li class="item2-2"><a><i class="el-icon-folder-add"></i></a></li>
                <li class="item2-3"><a><i class="el-icon-download"></i></a></li>
                <li class="item2-4"><a><i class="el-icon-plus"></i></a></li>
            </div>
            <!-- 歌曲 -->
            <div class="nav3">
                <li class="item2-5" @click="addNewMusic(item)">{{item.name}}</li>
                <li class="item2-6">vip</li>
                <li class="item2-7">mv</li>
            </div>
            <!-- 专辑 -->
            <div class="nav4">
                <li class="item2-8"><a>{{item.album.name}}</a></li>
            </div>
            <!-- 歌手 -->
            <div class="nav5">
                <li class="item2-9"><a>{{item.artists[0].name}}</a></li>
            </div>
            <!-- 时长 -->
            <div class="nav6">
                <li class="item2-0">{{time}}</li>
            </div>
        </div>
        <!-- <div class="item3">
            <div class="nav1">
                <li class="item2-1">{{id}}</li>
            </div>
            <div class="nav2">
                <li class="item2-2"><a href=""><i class="el-icon-folder-add"></i></a></li>
                <li class="item2-3"><a href=""><i class="el-icon-download"></i></a></li>
                <li class="item2-4"><a href=""><i class="el-icon-plus"></i></a></li>
            </div>
            <div class="nav3">
                <li class="item2-5">{{name}}</li>
                <li class="item2-6">vip</li>
                <li class="item2-7">mv</li>
            </div>
            <div class="nav4">
                <li class="item2-8"><a href="">{{zhuanji}}</a></li>
            </div>
            <div class="nav5">
                <li class="item2-9"><a href="">{{singer}}</a></li>
            </div>
            <div class="nav6">
                <li class="item2-0">{{time}}</li>
            </div>
        </div> -->
        <div class="block">
            <el-pagination
            background
            layout="prev, pager, next"
            :page-count="Math.floor((this.songLists.length-1)/20)+1 || 1"
            @current-change="handleCurrentPage">
            </el-pagination>
        </div>
        <!-- <div>
            searchInfo: {{this.$route.query.searchInfo? this.$route.query.searchInfo:'None'}}
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'search-singleSong',
    data(){
        return{
            number:'1',
            id:'1',
            // name:'',
            // zhuanji:'',
            // singer:'',
            time:'1:00',
            songLists: [],
            currentPage: 1, //当前页
        }
    },
    methods: {
        handleCurrentPage(currentPage){
            this.currentPage = currentPage
        },
        async requestData(){
            this.songLists = []
            await this.$http({
                methods:'get',
                url:"/search?limit=100",
                params:{keywords:this.$route.query.searchInfo}
            }).then((res)=>{
                let items = res.data.result.songs
                this.number = items.length
                // this.name = res.data.result.songs[0].name
                // this.zhuanji = res.data.result.songs[0].album.name
                // this.singer = res.data.result.songs[0].artists[0].name
                // console.log(res)
                // console.log(items)
                items.forEach((item) => {
                    this.songLists.push(item);
                });
            }).catch(()=>{
                this.number = '0'
            })
        },
        async addNewMusic(item){
            let musicObj = {
                name: '', //音乐名称
                singer: '', //歌手名字
                id: '', //音乐id
                url: '', //音乐地址
                picUrl: '' //图片地址
            }

            await this.$http({
                method: 'get',
                url: '/song/url',
                params:{id: item.id}
            }).then((res) => {
                if(res.data.data[0].url!==null)musicObj.url = res.data.data[0].url
            }).catch(() => {
                console.log('Could not find url, music name: ',item.name)
            })

            musicObj.name = item.name
            musicObj.singer = item.artists[0].name
            musicObj.id = item.id
            musicObj.picUrl = item.artists[0].img1v1Url
            this.$bus.$emit('addNewMusic',musicObj) //全局事件总线，事件响应于footer.vue
        }
        
    },
    watch: {
        '$route':{
            handler(newVal, oldVal){
                if(newVal.query.searchInfo !== oldVal.query.searchInfo){
                    this.requestData()
                }
            }
        }
    },
    async mounted() {
        await this.requestData()
    },
}

</script>

<style lang="css" scoped>
    #search-singleSong {
        width: 90%;
        margin-left: 5%;
    }
    .header1{
        font-weight: 700;
        margin-top: 20px;
        font-size: large;
    }
    .header2{
        font-weight: 700;
        margin-top: 10px;
        font-size: large;
    }
    .item1{
        width:100%;
    }
    .item1 li{
        height: 100%;
        list-style: none;
        float: left;
        font-weight: 700;
        color:rgb(144, 147, 153) ;
        line-height: 30px;
        padding-top: 20px;
    }
    /* 序号 */
    .item1-0 {
        width: 20%;
    }
    /* 歌曲 */
    .item1-1{
        width: 30%;
    }
    /* 专辑 */
    .item1-2{
        width: 25%;
    }
    /* 歌手 */
    .item1-3{
        width: 15%;     
    }
    /* 时长 */
    .item1-4{
        width: 10%;    
    }
    .item2 {
        height: calc(10vh);
        background-color:rgb(255, 255, 255);
        list-style: none;
        overflow: hidden;
    }
    .item2 > * {
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .item2:hover{
        background-color: rgb(238, 238, 238);
    }
    .item2 a:hover, .item2-5:hover{
        color: #f56c6c;
    }
    .item3{
        height: 65px;
        background-color:rgb(249, 249, 249);
        list-style: none;
    }
    .item3:hover{
        background-color: rgb(238, 238, 238);
    }
    .item3 a:hover{
        color: #f56c6c;
    }
    .nav1{
        width: 5%;
    }
    .item2-1{
        padding-top: 30%;

    }
    .nav2{
        width: 15%;
        display: flex;
        justify-content: center;
    }
    .nav2 li{
       padding-top: 10%;
    }
    .item2-3, .item2-4{
        padding-left: 10%;
    }
    .nav3{
        width: 30%;
    }
    .nav3 li{
        float: left;
    }
    .nav3 .item2-7,.nav3 .item2-6 {
        margin-left: 8%;
        border: 2px solid rgb(247, 154, 154);
        background-color: rgb(249, 189, 189);
        border-radius: 25%;
        padding: 1px;
        color: rgb(255, 251, 0);
    }
    .nav4{
        width: 25%;
    }
    .nav5{
        width: 15%;
    }
    .nav1, .nav2, .nav3, .nav4, .nav5, .nav6 {
        float: left;
        height: 100%;
    }
    .item2 li {
        padding-top: 0%;
    }
    .item1 {
        margin-bottom: 1%;
    }
    .block {
        margin-top: 2%;
        margin-bottom: 5%;
        display: flex;
        justify-content: center;
    }
</style>