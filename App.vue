<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
				// 网络监听
		this.$U.onNetWork()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	@import "./common/iconfont.css";
	@import "./common/animate.css";
	@import "./common/free.css";
	@import "./common/common.css";
	
</style>
