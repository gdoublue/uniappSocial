<template>
	<view v-if="show" class="p-2">
		<view class="flex  align-center justify-between">
			<view class="flex">
				<image :src="item.userpic" mode="aspectFit"
				 style="width: 65rpx; height: 65rpx;" class="rounded-circle mr-2" >
				 </image>
				 <view class="flex-column ">
					 <view style=" line-height: 1.5;" class="font ">{{item.username}}</view>
					 <view style=" line-height: 1.5;"
					  class="font-sm text-light-muted">{{item.newstime}}</view>
				 </view>
			</view>
			
				<view style="width: 90rpx; height: 50rpx; "  v-if="!item.isFollow"
				 @click.stop="clickFollow"
				 class="flex align-center justify-center rounded bg-main text-white animate__animated" 
				 hover-class="animate__tada">关注</view>
				 <view style="width: 90rpx; height: 50rpx; background-color: rgba(5,5,5,0.2); "  v-else
				 class="flex align-center justify-center rounded text-white animate__animated " 
				 @click.stop="clickFollow"
				 hover-class="animate__tada">已关注</view>
				
			
		</view>
		<view class="font-md my-2 " >{{item.title}}</view>
		<image v-if="item.titlepic" :src="item.titlepic" class="rounded w-100" style="height: 350rpx;" lazy-load=true
		@tap.stop="previewImage" mode="aspectFill"></image>
		
		<!-- 点赞 评论 ... -->
		<view class="flex align-center ">
			<view class="flex-1 flex align-center justify-center"  @click.stop="doSupport('support')">
				<view class="iconfont mr-2  icon-dianzan2 animate__animated" hover-class="animate__jello"
				 :class="item.support.type === 'support' ? 'support-active' : ''"></view>
				<text>{{item.support.support_count}}</text>
			</view>
			<view class="flex-1 flex align-center justify-center"  @click.stop="doSupport('unsupport')">
				<view class="iconfont mr-2 icon-cai animate__animated" hover-class="animate__tada" 
				:class="item.support.type === 'unsupport' ? 'support-active' : ''"></view>
				<text>{{item.support.unsupport_count}}</text>
			</view>
			<view class="flex-1 flex align-center justify-center">
				<view class="iconfont mr-2 icon-pinglun2 animate__animated animate__fast" hover-class="animate__tada"></view>
				<text>{{item.comment_count}}</text>
			</view>
			<view class="flex-1 flex align-center justify-center"  @click.stop="doShare">
				<view class="iconfont mr-2 icon-fenxiang animate__animated animate__fast" hover-class="animate__tada" ></view>
				<text>{{item.share_num}}</text>
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
	export default {
		components:{bottomInput,uniPopupShare,uniPopup},
		data() {
			return {
				item:[],
				show:false
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
				this.getInfo().then((res)=>{
					console.log(res);
					this.item = res
					this.show = true
					uni.hideLoading()
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
			previewImage(e){
				
				uni.previewImage({
					current: 0,
					urls: [this.item.titlepic]
				})
			},
			getInfo(){
				return new Promise((resolve,reject)=>{
					setTimeout(()=>{
					  const	item = {
									username: "用户昵称",
									userpic: "/static/demo/userpic/6.jpg",
									newstime: "2019-10-20 下午04:30",
									isFollow: false,
									title: "我是标题++++++++df6sd4f,胜多负少的佛挡杀佛海慧寺的还没收到发送到faaowjfojg,收到f,水电费欧舒丹粉丝打飞机",
									titlepic: "/static/demo/banner1.jpg",
									support: {
									type: "", // 未操作
									support_count: 1,
									unsupport_count: 2,
									},
									comment_count: 2,
									share_num: 2,
								}
								resolve(item)
							},100)
				})
	
			}
		},
		onLoad(e) {
			uni.showLoading({
			
			})
			const {titlepic,title,username} = JSON.parse(e.info)
			uni.setNavigationBarTitle({
				title:title
			})
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
