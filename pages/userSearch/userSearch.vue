<template>
    <view class="grace-margin">
		<image src="/static/female.jpg" mode="" style="height: 100rpx; width: 100rpx;" class="fixed-top"></image>
        <view class="grace-bg" :style="'height:'+screenHeight+'px !important;'"></view>
        <input type="text" value="" placeholder="请输入!!!" style="margin-top: 300upx;border-bottom: 1upx solid #000; bottom: 0; left: 0;" class="position-absolute"/>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                screenHeight: ''
            }
        },
        onLoad() {
            this.screenHeight = uni.getSystemInfoSync().windowHeight;
            console.log(uni.getSystemInfoSync());
        },
        methods: {}
    }
</script>
<style scoped>
    .grace-bg {
        position: absolute;
        filter: blur(5px);
        z-index: -1;
        background-image: url(../../static/chart/chart3.jpeg);
        top: 0;
        left: 0;
        right: 0;
        background-size: cover;
    }
</style>