<template>
	<view>
		<uni-list-item v-for="(item,index) in list" :key="index" :title="item.name" link="navigateTo" :rightText="item.data"
		 :to="item.url"></uni-list-item>
		<uni-list-item v-for="(item,index) in otherbind" :key="index+5" :title="item.name" :rightText="item.data" @click="handleEvent(item)" clickable showArrow></uni-list-item>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				list: [],
				otherbind:[]
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		methods: {
			__init() {
				let list = [{
					name: "手机号",
					data: this.user.phone ? this.user.phone : "未绑定",
					type: "navigateTo",
					url: "../user-phone/user-phone"
				}, {
					name: "登录密码",
					data: this.user.password ? "修改密码" : "未设置",
					type: "navigateTo",
					url: "../user-pwd/user-pwd"
				}, {
					name: "邮箱绑定",
					data: this.user.email ? this.user.email : "未绑定",
					url: "/pages/user-email/user-email"
				}]
				this.list = [...list]
				this.$H.get('/user/getuserbind', {}, {
					token: true
				}).then(res => {
					this.$store.commit('editUserInfo', {
						key: "user_bind",
						value: res
					})
					let other = [{
						name: "微信账号",
						data: this.user.user_bind.weixin ? this.user.user_bind.weixin.nickname : "未绑定",
						type: "bind",
						provider: "weixin"
					}, {
						name: "微博账号",
						data: this.user.user_bind.sinaweibo ? this.user.user_bind.sinaweibo.nickname : "未绑定",
						type: "bind",
						provider: "sinaweibo"
					}, {
						name: "QQ账号",
						data: this.user.user_bind.qq ? this.user.user_bind.qq.nickname : "未绑定",
						type: "bind",
						provider: "qq"
					}]
					this.otherbind = [ ...other]
				})
			},
				handleEvent(item){
							if(item.type === '') return
								if(item.data !== '未绑定'){
									return uni.showToast({
										title: '你已经绑定过了',
										icon: 'none'
									});
								}
								this.bind(item.provider)
						
						},
			// 绑定第三方登录
			bind(provider) {
				uni.login({
					provider: provider,
					success: r => {
						uni.getUserInfo({
							provider: provider,
							success: (res) => {
								let obj = {
									provider: provider,
									openid: res.userInfo.openId,
									nickName: res.userInfo.nickName,
									avatarUrl: res.userInfo.avatarUrl,
								}
								this.$H.post('/user/bindother', obj, {
									token: true
								}).then(result => {
									if (result.errorCode) {
										return uni.showToast({
											title: result.msg,
											icon: 'none'
										});
									}
									this.__init()
									uni.showToast({
										title: '绑定成功',
										icon: 'none'
									});
								})
							}
						});
					},
				});

			}
		},
		onShow() {
			this.__init()
		}
	}
</script>

<style>

</style>
