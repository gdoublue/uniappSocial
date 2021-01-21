<template>
	<view>

		<view class="mb-2 flex align-stretch">
			<view class="border-bottom flex align-center justify-center font px-2">+86</view>
			<input type="text" placeholder="手机号" v-model="phone" class="border-bottom p-2 flex-1" />
		</view>
		<view class="mb-2 flex align-stretch">
			<input type="text" placeholder="请输入验证码" v-model="code" class="border-bottom p-2 flex-1" />
			<view class="border-bottom flex align-center justify-center font-sm text-white" style="width: 180rpx;" :class="countdown>0?'bg-main-disabled':'bg-main'"
			 @click="getCode">{{countdown > 0 ? countdown + ' s' : '获取验证码'}}</view>
		</view>
		<view class="py-2 px-3">
			<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" :disabled="disabled"
			 :class="disabled ? 'bg-main-disabled' : ''" @click="submit">绑定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countdown: 0,
				code: '',
				phone: '',
			}
		},
		methods: {
			submit() {
				if (!this.verifyMobilePhone(this.phone)) {
					return;
				}
				this.$H.post('/user/bindphone', {
					phone: this.phone,
					code: this.code
				}, {
					token: true
				}).then(res => {
					console.log(res);
					this.$store.commit('editUserInfo', {
						key: 'phone',
						value: this.phone
					})
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '绑定成功',
						icon: 'none'
					});
				})
			},
			verifyMobilePhone(e) {

				const pattern =
					/^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
				return pattern.test(e)
			},
			//获取验证码
			getCode() {
				if (this.countdown > 0) return
				if (!this.verifyMobilePhone(this.phone)) {
					uni.showToast({
						title: "请输入正确地手机号!",
						icon: "none"
					})
					return
				}
				this.$H.post('/user/sendcode', {
					phone: this.phone
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					this.countdown = 30
					let count = setInterval(() => {
						if (this.countdown >= 1) {
							this.countdown--
						} else {
							clearInterval(count)
						}
					}, 1000)
				})

			}
		},
		computed: {
			disabled() {
				return this.code === '' || (!this.verifyMobilePhone(this.phone))
			}
		}
	}
</script>

<style>

</style>
