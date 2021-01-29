<template>
	<view>
		<uni-list-item title="头像" showArrow clickable  @click="changeUserpic">
			<image :src="user.userpic ? user.userpic : '/static/default.jpg'" slot="footer" style="width: 100rpx;height: 100rpx;" class="rounded-circle"></image>
		</uni-list-item>
		<uni-list-item title="昵称">
			<view class="flex align-center" slot="footer">
				<input class="uni-input text-right" v-model="username" />
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="性别" @click="changeSex" clickable>
			<view class="flex align-center" slot="footer">
				<text>{{sexText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		
			<uni-list-item title="生日">
				<view class="flex align-center" slot="footer">
					<picker mode="date" :value="birthday" @change="onDateChange">
						<text>{{birthday}}</text>
						<text class="iconfont icon-bianji1 ml-2"></text>
					</picker>
				</view>
			</uni-list-item>
		
		<uni-list-item title="情感" @click="changeEmotion" clickable>
			<view class="flex align-center" slot="footer">
				<text>{{emotionText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="职业" @click="changeJob" clickable>
			<view class="flex align-center" slot="footer">
				<text>{{job}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
		<uni-list-item title="家乡" clickable  @click="showCityPicker">
			<view class="flex align-center" slot="footer">
				<text>{{cityText}}</text>
				<text class="iconfont icon-bianji1 ml-2"></text>
			</view>
		</uni-list-item>
			<view class="py-2 px-3">
					<button class="bg-main text-white" style="border-radius: 50rpx;border: 0;" type="primary" @click="submit">完成</button>
				</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" 
		:pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
	import { mapState } from 'vuex'
	const sexArray = ['保密', '男', '女']
	const emotionArray = ['保密', '未婚', '已婚']
	export default {
		components:{mpvueCityPicker},
		data() {
			return {
				themeColor: '#007AFF',
				username: "昵称",
				sex: 0,
				emotion: 0,
				job: "保密",
				cityText:'广东省-广州市-越秀区',
				cityPickerValueDefault: [18, 0, 1],
				birthday: "2020-12-21",
				
			}
		},
		computed: {
				...mapState({
							user:state=>state.user
						}),
			sexText() {
				return sexArray[this.sex]
			},
			emotionText() {
				return emotionArray[this.emotion]
			}
		},
		onLoad() {
					let userinfo = this.user.userinfo
					if(userinfo){
						this.cityText = userinfo.path
						this.username = this.user.username
						this.sex =  userinfo.sex
						this.emotion = userinfo.qg
						this.job  = userinfo.job
						this.birthday  = userinfo.birthday
					}
				},
		methods: {
			submit(){
				let obj = {
									name:this.username,
									sex:this.sex,
									qg:this.emotion,
									job:this.job,
									birthday:this.birthday,
									path:this.cityText
								}
		this.$H.post('/edituserinfo',obj,{
					token:true
				}).then(res=>{
					this.$store.commit('editUserInfo',{
						key:"username",
						value:this.username
					})
					this.$store.commit('editUserUserInfo',obj)
					uni.navigateBack({
						delta: 1
					});
					uni.showToast({
						title: '修改资料成功',
						icon: 'none'
					});
				})			
								
			},
	// 城市三级联动提交事件
			onConfirm(e) {
				this.cityText = e.label
			},
			showCityPicker(){
			this.$refs.mpvueCityPicker.show()
			},
			changeUserpic() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						this.userpic = res.tempFilePaths[0]
					}
				})
			},
			// 修改生日
			onDateChange(e) {
				this.birthday = e.detail.value
			},
			// 修改性别
			changeSex() {
				uni.showActionSheet({
					itemList: sexArray,
					success: (res) => {
						this.sex = res.tapIndex
					}
				});
			},
			// 修改头像
			changeUserpic() {
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: (res) => {
						let pic = res.tempFilePaths[0];
						this.$H.upload('/edituserpic',{
													filePath: res.tempFilePaths[0],
													name: 'userpic',
													token:true
												}).then(result=>{
													this.$store.commit('editUserInfo',{
														key:"userpic",
														value:result.data
													})
													uni.showToast({
														title: '修改头像成功',
														icon: 'none'
													});
												}).catch(err=>{
													uni.showToast({
														title: err,
														icon: 'none'
													});
												})
					}
				})
			},
			changeEmotion() {
				uni.showActionSheet({
					itemList: emotionArray,
					success: (res) => {
						this.emotion = res.tapIndex
					}
				});
			},
			// 修改职业
			changeJob() {
				let JobArray = ['餐饮', '工业', '教育','文化','互联网','销售','新媒体','医疗卫生','建筑','金融保险','农业','交通运输','邮电通信','其他']
				uni.showActionSheet({
					itemList: JobArray,
					success: (res) => {
						this.job = JobArray[res.tapIndex]
					}
				});
			}
		},
		onReady() {
		
		}
	}
</script>

<style>

</style>
