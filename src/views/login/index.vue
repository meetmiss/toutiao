<template>
    <div class="container">
        login
        <el-card class="mycard">
            <img src="@/assets/images/logo_index.png" alt="">
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.container{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/login_bg.jpg') no-repeat center / cover;
}
.mycard{
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img {
        display: block;
        width: 200px;
        margin: 0 auto;
    }
}
</style>
