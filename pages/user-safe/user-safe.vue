<template>
	<view>
			<uni-list-item 	v-for="(item,index) in list"
				:key="index" 
				:title="item.name" link="navigateTo" :rightText="item.data" :to="item.url"></uni-list-item>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				list:[	{ 
						name:"微信账号",
						data:"未绑定",
					},
					{
						name:"微博账号",
						data:"未绑定",
					},
					{
						name:"QQ账号",
						data:"未绑定",
					}]
			}
		},computed: {
			...mapState({
				user:state=>state.user
			})
		},
		methods: {
			
		},
				onShow() {
					let list = [{ 
						name:"手机号",
						data:this.user.phone ? this.user.phone : "未绑定",
						type:"navigateTo",
						url:"../user-phone/user-phone"
					},{ 
						name:"登录密码",
						data:this.user.password ? "修改密码" : "未设置",
						type:"navigateTo",
						url:"../user-pwd/user-pwd"
					},{ 
						name:"邮箱绑定",
						data:this.user.email ? this.user.email : "未绑定",
						url:"/pages/user-email/user-email"
					}]
					this.list = [...list]
				},
	}
</script>

<style>

</style>
