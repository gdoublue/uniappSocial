<template>
	<view>
			<!-- 底部操作条 -->
				<view style="height: 100rpx;"
				class="fixed-bottom flex align-center border-top bg-white">
				
					<input type="text" value="" class="flex-1 rounded bg-light ml-2  " style="padding: 10rpx;" placeholder="文明发言" />
					
					<view class="iconfont icon-fabu flex align-center justify-center font-lg animate__animated animate__jello" hover-class="animate__jello text-main" style="width: 100rpx;"></view>
					
				</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad(e) {
			console.log(e.info);
			uni.setNavigationBarTitle({
				title:e.info
			})
		}
	}
</script>

<style>

</style>
