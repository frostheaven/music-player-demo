<template>
    <div id="music-header" class="clearfix">
        <!-- logo位置 -->
        <div id="img-box">
            <img alt="logo" src="../../../assets/logo.png">
        </div>
        <!-- 步进与回退按钮 -->
        <div class="step-and-rewind">
            <el-button @click="rewind" icon="el-icon-arrow-left" circle size="small"></el-button>
            <el-button @click="stepIn" icon="el-icon-arrow-right" circle size="small" style="margin-left:20px"></el-button>
        </div>
        <!-- 搜索栏 -->
        <div class="search-box" @keyup.enter="goSearching">
            <el-input
                id="input-box"
                placeholder="单击以键入搜索内容"
                suffix-icon="el-icon-cold-drink"
                v-model="searchInfo">
            </el-input>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'musicHeader', //Vue命名规则，不要使用header来命名
    data() {
        return {
            searchInfo: ''
        }
    },
    methods: {
        stepIn(){
            this.$router.forward()
        },
        rewind(){
            this.$router.back()
        },
        goSearching(){
            if(this.searchInfo){
                if(this.$route.matched[1].name === 'search-detail' && this.$route.matched[2]){
                    this.$router.push({
                        name: this.$route.name,
                        query: {
                            searchInfo: this.searchInfo
                        }
                    })
                }else{
                    this.$router.push({
                        name:'search-detail',
                        query:{
                            searchInfo: this.searchInfo
                        }
                    })
                }      
                this.searchInfo = ''
            }else {
                alert('亲，您还没有输入任何内容哟~')
            }
        }
    }
}
</script>

<style lang="css" scoped>
    #music-header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    #img-box {
        float: left;
        margin-left: 40px;
        padding-top: 10px;
        width: max-content;
        height: 100%;
        overflow: hidden;
        background-color: rgba(27, 23, 67, 0.03);
        border-radius: 10px;
    }
    #img-box img{
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
    }
    .step-and-rewind {
        float: left;
        margin-left: 80px;
        overflow: hidden;
    }
    .el-button {
        background-color: transparent;
        border: 0.5px solid grey;
    }
    .search-box {
        float: left;
        margin-left: 60px;
    }
    /* deep与>>>一样，用于改变scoped组件样式 */
    .search-box /deep/ #input-box {
        height: 30px;
        width: 200px;
        font-size: 10px; /*实际上浏览器有自己的最小字体值 */
    }
    .search-box >>> .el-icon-cold-drink {
        display: flex;
        align-items: center;
    }
</style>