<template>
	<view v-if="show" class="p-2" style="padding-bottom: 102rpx;">
		<view class="flex  align-center justify-between">
			<view class="flex">
				<image :src="info.userpic" mode="aspectFit"
				 style="width: 65rpx; height: 65rpx;" class="rounded-circle mr-2" >
				 </image>
				 <view class="flex-column ">
					 <view style=" line-height: 1.5;" class="font ">{{info.username}}</view>
					 <view style=" line-height: 1.5;"
					  class="font-sm text-light-muted">{{info.newstime|formatTime}}</view>
				 </view>
			</view>
			
				<view style="width: 90rpx; height: 50rpx; "  v-if="!info.isFollow"
				 @click.stop="clickFollow"
				 class="flex align-center justify-center rounded bg-main text-white animate__animated" 
				 hover-class="animate__tada">关注</view>
				 <view style="width: 90rpx; height: 50rpx; background-color: rgba(5,5,5,0.2); "  v-else
				 class="flex align-center justify-center rounded text-white animate__animated " 
				 @click.stop="clickFollow"
				 hover-class="animate__tada">已关注</view>
				
			
		</view>
		<view class="font-md text-center font-weight-bolder" >{{info.title}}</view>
		<view>{{info.content}}</view>
		<image v-for="(item,index) in images" :src="item.url" class="rounded w-100"
		@tap.stop="previewImage(index)" mode="aspectFill"></image>
		<!-- 点赞 评论 ... -->
		<view class="flex align-center ">
			<view class="flex-1 flex align-center justify-center"  @click.stop="doSupport('support')">
				<view class="iconfont mr-2  icon-dianzan2 animate__animated" hover-class="animate__jello"
				 :class="info.support.type === 'support' ? 'support-active' : ''"></view>
				<text>{{info.support.support_count}}</text>
			</view>
			<view class="flex-1 flex align-center justify-center"  @click.stop="doSupport('unsupport')">
				<view class="iconfont mr-2 icon-cai animate__animated" hover-class="animate__tada" 
				:class="info.support.type === 'unsupport' ? 'support-active' : ''"></view>
				<text>{{info.support.unsupport_count}}</text>
			</view>
			<view class="flex-1 flex align-center justify-center">
				<view class="iconfont mr-2 icon-pinglun2 animate__animated animate__fast" hover-class="animate__tada"></view>
				<text>{{info.comment_count}}</text>
			</view>
			<view class="flex-1 flex align-center justify-center"  @click.stop="doShare">
				<view class="iconfont mr-2 icon-fenxiang animate__animated animate__fast" hover-class="animate__tada" ></view>
				<text>{{info.share_num}}</text>
			</view>
		</view>
		
		
		<!-- 底部输入组件 -->
		<bottom-input @submit = "submit"></bottom-input>
		
		<!-- 分享弹框 -->
		<uni-popup id="popupShare" ref="popupShare" type="share">
			<uni-popup-share title="分享到" @select="shareTo" ></uni-popup-share>
		</uni-popup>
	</view>
</template>

<script>
	import bottomInput from '@/components/common/bottom-input.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupShare from '@/components/uni-popup-share/uni-popup-share.vue' 
	import $T from '@/common/time.js';
	export default {
		components:{bottomInput,uniPopupShare,uniPopup},
		data() {
			return {
								// 当前帖子信息
								info:{
									id:0,
									user_id:0,
									username:"loading",
									userpic:"",
									newstime:0,
									isFollow:false,
									title:"",
									titlepic:"",
									support:{
										type:"support", // 顶
										support_count:0,
										unsupport_count:0
									},
									comment_count:0,
									share_num:0,
									content:""
								},
								images:[],
								comments:[],
				show:false
			}
		},
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			}
		},
			computed: {
					imagesList() {
						return this.images.map(item=>item.url) 
					}
				},
		methods: {
			shareTo(e,done){
				uni.showToast({
									title: `您选择了第${e.index+1}项：${e.item.text}`,
									icon: 'none'
								})
				done()
			},
			// 提交评论
			submit(text){
				console.log(text);
			},
			
			init(){
		// 请求api
				this.$H.get('/post/'+this.info.id).then(({detail})=>{
					this.info.content = detail.content
					this.info.title = detail.title
					this.images = detail.images
					this.info.titlepic = detail.titlepic
					this.info.username = detail.user.username
					this.info.userpic = detail.user.userpic
					this.info.newstime = detail.create_time
					this.info.share_num = detail.sharenum
					this.show = true
					uni.hideLoading()
					console.log(detail);
				})

				
				
			},
			doShare(){
				this.$refs.popupShare.open()
			},
			doSupport(type){
			 if (this.item.support.type === "") {
			  this.item.support[type + "_count"]++;
			   this.item.support.type = type;
			   return;
			 }
			 if (type === this.item.support.type) {
			  this.item.support[type + "_count"]--;
			  this.item.support.type = "";
			 } else {
			   const retype = type === "support" ? "unsupport" : "support";
				this.item.support.type = type;
				this.item.support[retype + "_count"] -= 1;
				this.item.support[type + "_count"]++;
			 }
			},
			clickFollow(){
			
				this.item.isFollow = !this.item.isFollow
			},
			previewImage(index){
				
				uni.previewImage({
					current: index,
					urls: this.imagesList
				})
			}
		},
		onLoad(e) {
			if( !e.info) {
					uni.setNavigationBarTitle({
				title:"找不到了"
			})
			uni.showToast({
				title:"找不到该帖子...",
				icon:"none"
			})
			return
			}
		
			uni.showLoading({
				
			})
			const {id,title} = JSON.parse(e.info)
			uni.setNavigationBarTitle({
				title:title
			})
			this.info.id = id
			this.init()
		},
		onBackPress() {
			if(this.$refs.popupShare.showPopup){
				this.$refs.popupShare.close()
				return true
			}else{
				return false
			}
			
		}
	}
</script>

<style scoped>
.support-active{
		color: #FF4A6A;
	}
	/* 超过两行省略号 */
	.content-2{       
		 text-overflow: -o-ellipsis-lastline;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    -webkit-box-orient: vertical;
	}
</style>
