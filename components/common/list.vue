<template>
	<view class="p-2" @click="openDetail">
		<!-- 头像 昵称 关注 row -->
			<view class="flex  align-center justify-between">
				<view class="flex" @click.stop="goUserspace">
					<image :src="item.userpic" mode="aspectFit"
					 style="width: 65rpx; height: 65rpx;" class="rounded-circle mr-2" >
					 </image>
					 <view class="flex-column ">
						 <view style=" line-height: 1.5;" class="font ">{{item.username}}</view>
						 <view style=" line-height: 1.5;"
						  class="font-sm text-light-muted">{{item.newstime|formatTime}}</view>
					 </view>
				</view>
				
					<view style="width: 90rpx; height: 50rpx; "  v-if="!item.isFollow"
					 @click.stop="clickFollow"
					 class="flex align-center justify-center rounded bg-main text-white animate__animated" 
					 hover-class="animate__tada">关注</view>
					 <view style="width: 90rpx; height: 50rpx; background-color: rgba(5,5,5,0.2); "  v-else
					 class="flex align-center justify-center rounded text-white animate__animated " 
					 @click.stop="clickFollow(false)"
					 hover-class="animate__tada">已关注</view>
					
				
			</view>
			<view class="font-md my-2" >{{item.title}}</view>
			<image v-if="item.titlepic" :src="item.titlepic" class="rounded w-100" style="height: 500rpx;" lazy-load=true
			@tap.stop="previewImage" mode="aspectFill"></image>
			
			<!-- 点赞 评论 ... -->
			<view class="flex align-center ">
				<view class="flex-1 flex align-center justify-center">
					<view class="iconfont mr-2  icon-dianzan2 animate__animated" hover-class="animate__jello"
					 @click.stop="doSupport('support')" :class="item.support.type === 'support' ? 'support-active' : ''"></view>
					<text>{{item.support.support_count}}</text>
				</view>
				<view class="flex-1 flex align-center justify-center">
					<view class="iconfont mr-2 icon-cai animate__animated" hover-class="animate__tada"  @click.stop="doSupport('unsupport')"
					:class="item.support.type === 'unsupport' ? 'support-active' : ''"></view>
					<text>{{item.support.unsupport_count}}</text>
				</view>
				<view class="flex-1 flex align-center justify-center">
					<view class="iconfont mr-2 icon-pinglun2 animate__animated animate__fast" hover-class="animate__tada"></view>
					<text>{{item.comment_count}}</text>
				</view>
				<view class="flex-1 flex align-center justify-center">
					<view class="iconfont mr-2 icon-fenxiang animate__animated animate__fast" hover-class="animate__tada" ></view>
					<text>{{item.share_num}}</text>
				</view>
			</view>
	</view>
</template>

<script>
	import $T from '@/common/time.js';
	export default {
		props: {
			item: Object,
			index:Number
		},
		data() {
			return {
				
			};
		},
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			}
		},
		methods:{	
			goUserspace(){
				uni.navigateTo({
					url:"../../pages/user-space/user-space"
				})
			},
			openDetail(){
				uni.navigateTo({
					url:'../../pages/detail/detail?info='+JSON.stringify({item:this.item})
				})
			},
			doSupport(type){
				this.$emit('doSupport',{
					type:type,
					index:this.index
				})
			},
			clickFollow(e = true){
				if(e){
					this.checkAuth(()=>{
									this.$H.post('/follow',{
										follow_id:this.item.user_id
									},{
										token:true
									}).then(res=>{
										// 通知更新
										uni.$emit('updateFollowOrSupport',{
											type:"follow",
											data:{
												user_id:this.item.user_id
											}
										})
									})
								})
				}
							
			},
			previewImage(e){
				
				uni.previewImage({
					current: 0,
					urls: [this.item.titlepic]
				})
			}
		}
	}
</script>

<style>
	.support-active{
		color: #FF4A6A;
	}
</style>
