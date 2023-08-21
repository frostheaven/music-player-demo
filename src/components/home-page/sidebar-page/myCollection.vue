<template>
    <div id="my-collection">
        <div class="main-display-content">
            <div class="img-box">
                <img src="../../../assets/404-page.png" alt="">
            </div>
            <div class="tip-wrapper">
                Ouch! My-collection does not exist...
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myCollection'
}
</script>

<style lang="css" scoped>
    .tip-wrapper {
        text-align: center;
        font-size: 25px;
    }
    .img-box {
        text-align: center;
    }
    .img-box img {
        width:60%;
    }
</style>