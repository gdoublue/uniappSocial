<template>
	<view>
		<uni-nav-bar statusBar="false" :border="false" @clickLeft="back">	
				<text class="iconfont icon-guanbi p-1" slot="left" style="font-size: 80rpx; line-height: 80rpx;"></text>
		</uni-nav-bar>
		
		<view class="text-center" style="padding-top: 130rpx;padding-bottom: 70rpx;font-size: 55rpx;">{{status ? '手机验证码登录':'账号密码登录'}}</view>
				
				<view class="px-2">
					<template v-if="!status">
						<view class="mb-2">
							<input type="text" placeholder="昵称/手机号/邮箱" v-model="username" class="border-bottom p-2"/>
						</view>
						<view class="mb-2 flex align-stretch">
							<input type="text" placeholder="请输入密码" v-model="password" class="border-bottom p-2 flex-1"/>
							<view class="border-bottom flex align-center justify-center font text-muted" style="width: 150rpx;">忘记密码？</view>
						</view>
					</template>
					
					<template v-else>
						<view class="mb-2 flex align-stretch">
							<view class="border-bottom flex align-center justify-center font px-2">+86</view>
							<input type="text" placeholder="手机号" v-model="phone" class="border-bottom p-2 flex-1"/>
						</view>
						<view class="mb-2 flex align-stretch">
							<input type="text" placeholder="请输入验证码" v-model="code" class="border-bottom p-2 flex-1"/>
							<view class="border-bottom flex align-center justify-center font-sm text-white" style="width: 180rpx;" 
							:class="countdown>0?'bg-main-disabled':'bg-main'" @click="getCode">{{countdown > 0 ? countdown + ' s' : '获取验证码'}}</view>
						</view>
					</template>
					
					
				</view>
				
				<view class="py-2 px-3">
					<button class="text-white" style="border-radius: 50rpx;border: 0;"
					 :class="disabled?'bg-main-disabled':'bg-main'"
					 type="primary" :disabled="disabled" @click="submit">{{loading ? '登录中...' : '登录'}}</button>
				</view>
				
				<view class="flex align-center justify-center pt-2 pb-4">
					<view class="text-primary font-sm" @click="changeStatus">
						{{status?'账号密码登录':'验证码登陆'}}
					</view>
					<text class="text-muted mx-2">|</text>
					<view class="text-primary font-sm">登录遇到问题</view>
				</view>
				
		
				
				<otherLogin></otherLogin>
				<view class="flex align-center justify-center text-muted">
					注册即代表同意<text class="text-primary">《xxx社区协议》</text>
				</view>
			
	</view>
</template>

<script>
	import otherLogin from '@/components/common/other-login.vue';
	export default {
		components:{otherLogin},
		data() {
			return {
				status:false,
				username:'',
				password:'',
				code:'',
				phone:'',
				countdown:0,
				loading:false
			}
		},
		methods: {
			submit(){
				if(this.disabled) return;
				this.loading = !this.loading
								let url = ""
								let data = ""
					if(this.status){
									// 手机验证码登录
									url = '/user/phonelogin'
									data = {
										phone:this.phone,
										code:this.code
									}
								} else {
									// 账号密码登录
									url = '/user/login'
									data = {
										username:this.username,
										password:this.password
									}
								}	
									
						this.$H.post(url,data).then(res=>{
								this.loading = false
								// 修改vuex的state,持久化存储
								this.$store.commit('login',res)
								// 提示和跳转
								uni.redirectTo({
									url:"../user/user"
								}); 
								uni.showToast({
									title: '登录成功',
									icon: 'none'
								});
							}).catch(err=>{
								// 登录失败
								this.loading = false
							})		
			},
			back(){
				uni.navigateBack()
			},
			// 切换登录方式
			changeStatus(){
				this.status = !this.status
				if(this.verifyMobilePhone(this.username))
				this.phone = this.username
			},
			verifyMobilePhone(e){
				
				const pattern = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
				return pattern.test(e)
			},
			//获取验证码
			getCode(){
				if(this.countdown > 0 ) return
				if(!this.verifyMobilePhone(this.phone)){
					uni.showToast({
						title:"请输入正确地手机号!",
						icon:"none"
					})
					return
				}
					this.$H.post('/user/sendcode',{
									phone:this.phone
								}).then(res=>{
										console.log(res);
										uni.showToast({
															title: res.msg,
															icon: 'none'
														});
									this.countdown = 30
									let  count =  setInterval(()=>{
														if(this.countdown>=1){
															this.countdown --
														}else{
															clearInterval(count)
														}
													},1000)
								})
			
			}
		},
		computed:{
			disabled(){
				if(this.status){
					if(this.verifyMobilePhone(this.phone) && this.code !== '')
					return false
				}else{
					if(this.username.trim()!=='' && this.password.trim() !=="" )
					return false
				}
				
				return true
			}
		
		}
	}
</script>

<style>

</style>
