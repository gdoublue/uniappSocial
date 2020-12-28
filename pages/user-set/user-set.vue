<template>
	<view>
				<uni-list-item title="账号与安全" link="navigateTo" to="../user-pwd/user-pwd"></uni-list-item>
				<uni-list-item title="资料编辑" link="navigateTo" to="../user-info/user-info"></uni-list-item>
				<uni-list-item title="清除缓存"></uni-list-item>
				<uni-list-item title="意见反馈"></uni-list-item>
				<uni-list-item title="关于社区"></uni-list-item>
				
				<view class="py-2 px-3">
					<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary">退出登录</button>
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
			open(){
				uni.navigateTo({
					url:"@/pages/chat/chat"
				})
				console.log('打开登录页');
			}
		}
	}
</script>

<style>

</style>
