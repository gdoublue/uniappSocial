<template>
	<view>

		<input v-if="user.password" class="uni-input my-1" type="text" password value="" placeholder="输入旧密码" v-model="oldpassword" />
		<input class="uni-input my-1" type="text" password value="" placeholder="输入新密码" v-model="newpassword" />
		<input class="uni-input my-1" type="password" value="" placeholder="输入确认密码" v-model="renewpassword" />

		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" :disabled="disabled"
			 :class="disabled ? 'bg-main-disabled' : 'bg-main'" @click="submit">设置</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				oldpassword: "",
				newpassword: "",
				renewpassword: ""
			}
		},
		methods: {
			check() {
				if (this.newpassword !== this.renewpassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					});
					return false
				}
				return true
			},
			submit() {
				if (this.check())
					this.$H.post('/repassword', {
						oldpassword: this.user.password?this.oldpassword: ' ',
						newpassword: this.newpassword,
						renewpassword: this.renewpassword,
					}, {
						token: true
					}).then(res => {
						console.log(res);
						this.$store.commit('editUserInfo', {
							key: 'password',
							value: true
						})
						uni.navigateBack({
							delta: 1
						});
						uni.showToast({
							title: '修改密码成功',
							icon: 'none'
						});
					}).catch(res=>{
						uni.showToast({
							icon:"none",
							title:res
						})
					})
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			}),
			disabled() {
				if (this.user.password) {
					return this.oldpassword == '' || this.newpassword == '' || this.renewpassword == ''
				}
				return this.newpassword == '' || this.renewpassword == ''
			}
		}
	}
</script>

<style>

</style>
