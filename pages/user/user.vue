<template>
	<view>
		<template v-if="loginStatus">
			<!-- 头部栏 -->
					<view class="flex align-center p-2">
						<image :src="avatar" class="rounded mr-2" style="width: 100rpx;height: 100rpx;"></image>
						<view class="flex-1 flex-column flex">
							<text class="font-lg font-weight-bold text-dark">{{user.username}}</text>
							<text class="text-muted font" >总帖子 00 今日发帖 00</text>
						</view>
						<text class="iconfont icon-jinru font-lg"></text>
					</view>
					
					<!-- 状态数目 -->
					<view class="flex align-center px-3 py-2">
								<view class="flex-1 flex flex-column align-center justify-center"
								v-for="(item,index) in myData" :key="index">
									<text class="font-lg font-weight-bold">{{item.num}}</text>
									<text class="font text-muted">{{item.name}}</text>
								</view>
					</view>
		</template>
		<template v-else>
					<view class="flex align-center justify-center py-2 font-md ">
						登录社区，体验更多功能
					</view>
					<otherLogin></otherLogin>
					<view class="flex align-center justify-center py-2 font text-main" @click="openLogin">
						账号/邮箱/手机登录 <text class="ml-1 iconfont icon-jinru"></text>
					</view>
				</template>
		<!-- 广告图片 -->
		<view class="px-3 py-2">
					<image src="/static/demo/banner1.jpg" mode="aspectFill"
					style="height: 170rpx;width: 100%;" class="rounded"></image>
		</view>
		
		<uni-list-item title="浏览历史">
			<text class="iconfont icon-liulan mr-1" slot="header" ></text>
		</uni-list-item>
		<uni-list-item title="社区认证">
			<text class="iconfont icon-huiyuanvip mr-1 font" slot="header"></text>
		</uni-list-item>
		<uni-list-item title="审核帖子">
			<text class="iconfont icon-keyboard mr-1 font-md" slot="header"></text>
		</uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import otherLogin from '@/components/common/other-login.vue';
	import  { mapState } from 'vuex'
	export default {
		components:{uniListItem,otherLogin},
		data() {
			return {
					myData:[{
									name:"帖子",
									num:1
								},{
									name:"动态",
									num:1
								},{
									name:"评论",
									num:2
								},{
									name:"粉丝",
									num:0
								}]
			}
		},
		methods: {
			openLogin(){
				uni.navigateTo({
									url: '../login/login',
								});
			}
		},
		computed:{
			...mapState({
							loginStatus:state=>state.loginStatus,
							user:state=>state.user
						}),
							// 用户头像
									avatar(){
										return this.user.userpic ? this.user.userpic : '/static/default.jpg'
									}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../user-set/user-set'
			})
		}
	}
</script>

<style>

</style>
