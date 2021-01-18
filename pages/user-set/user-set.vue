<template>
	<view>
				<uni-list-item title="账号与安全" link="navigateTo" to="../user-pwd/user-pwd"></uni-list-item>
				<uni-list-item title="资料编辑" link="navigateTo" to="../user-info/user-info"></uni-list-item>
				<uni-list-item title="清除缓存" showArrow  @click="clear" clickable>
					<text class="text-light-muted font-sm" slot="footer">{{currentSize | format}}</text>
				</uni-list-item>
				<uni-list-item title="意见反馈" link="navigateTo" to="../user-feedback/user-feedback"></uni-list-item>
				<uni-list-item title="关于社区" link="navigateTo" to="../about/about"></uni-list-item>
				
				<view class="py-2 px-3">
					<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" @click="logout">退出登录</button>
				</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentSize:0
			}
		},
		filters:{
			format(value){
				return value > 1024 ?(value/1024).toFixed(2) + "Mb" : value.toFixed(2) + "Kb"
			}
		},	
		methods: {
			logout(){
				uni.navigateTo({
					url:"../login/login"
				})
				console.log('打开登录页');
			},
			clear(){
				uni.showModal({
					title:"提示",
					content:"是否清楚所有缓存",
					cancelText:"返回",
					confirmText:"清除",
					cancelColor:"#E80080",
					confirmColor:"#CBD3DA",
					success:res=>{
						if(res.confirm){
							uni.clearStorageSync()
							this.currentSize  = uni.getStorageInfoSync().currentSize
							uni.showToast({
								title:"清除成功"
							})
						}
					}
				})
				
			}
		},
		onLoad() {
			this.currentSize  = uni.getStorageInfoSync().currentSize
			
		}
	}
</script>

<style>

</style>
