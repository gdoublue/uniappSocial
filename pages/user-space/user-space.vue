<template>
	<view>
			<!-- 头部 -->
				<view class="flex align-center p-3 border-bottom border-light-secondary">
					<image src="/static/default.jpg" 
					style="width: 180rpx;height: 180rpx;"
					class="rounded-circle"></image>
					<view class="pl-3 flex flex-column flex-1">
						<view class="flex align-center">
							<view class="flex-1 flex flex-column align-center justify-center">
								<text class="font-lg font-weight-bold">1</text>
								<text class="font text-muted">粉丝</text>
							</view>
							<view class="flex-1 flex flex-column align-center justify-center">
								<text class="font-lg font-weight-bold">1</text>
								<text class="font text-muted">粉丝</text>
							</view>
							<view class="flex-1 flex flex-column align-center justify-center">
								<text class="font-lg font-weight-bold">1</text>
								<text class="font text-muted">粉丝</text>
							</view>
						</view>
						<view class="flex justify-center align-center">
							<button type="primary" size="mini" class="bg-main"
							style="width: 400rpx;">关注</button>
						</view>
					</view>
				</view>
		
		

				<view class="text-center flex align-center justify-between px-5 bg-light" style="position: sticky; top: 0px; z-index: 200;">
					<view :class="tabIndex === index ? 'text-main font-lg ': 'font-md text-light-muted'" v-for="(item, index) in tabBars"
					 class="mx-1 font-weight-bolder" @click="changeTab(index)" :key="index">{{item.name}}</view>
		
				</view>
				
		
		
			<template v-if="tabIndex === 0">
					<view class="animated fast fadeIn">
						<view class="p-3 border-bottom">
							<view class="font-md">账号信息</view>
							<view class="font">账号年龄：12个月</view>
							<view class="font">账号id：1</view>
						</view>
						<view class="p-3 border-bottom">
							<view class="font-md">个人信息</view>
							<view class="font">星座：12个月</view>
							<view class="font">职业：1</view>
							<view class="font">故乡：1</view>
							<view class="font">情感：1</view>
						</view>
					</view>
				</template>
				
				<template v-else>
							<view class="animated fast fadeIn">
								<List v-for="(item,index) in list" :key="index" :item="item" ></List>
								<Divider></Divider>
								<uni-load-more :status="loadmore"></uni-load-more>
							</view>
						</template>
		<!-- 弹出层 -->
			<uni-popup ref="popup" type="top">
				<view class="flex align-center justify-center font-md border-bottom py-2 bg-light" hover-class="bg-hover-light">
					<text class="iconfont icon-sousuo mr-2"></text> 加入黑名单
				</view>
				<view class="flex align-center justify-center font-md py-2 bg-light" hover-class="bg-hover-light">
					<text class="iconfont icon-shanchu mr-2"></text> 聊天
				</view>
			</uni-popup>
	</view>
	
</template>

<script>
	import {demolist as demo, list as demolist2} from "../../static/demolist.js";
	import loadMore from "../../components/uni-load-more/uni-load-more.vue"
	import List from '../../components/common/list.vue'
	export default {
		components:{List,loadMore},
		data() {
			return {
					tabIndex:0,
					tabBars:[{
						name:"主页",
					},{
						name:"帖子",
						list:demo,
						// 1.上拉加载更多  2.加载中... 3.没有更多了
						loadmore:"more",
					},{
						name:"动态",
						list:demolist2,
						// 1.上拉加载更多  2.加载中... 3.没有更多了
						loadmore:"more",
					}],
			}
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index;
			},
			getMoreList(){
				this.tabBars[this.tabIndex].loadmore= "loading"
				setTimeout(()=>{
					if(this.tabBars[this.tabIndex].list.length < 12 ){
						this.tabBars[this.tabIndex].list=this.tabBars[this.tabIndex].list.concat(demo)
					this.tabBars[this.tabIndex].loadmore = "more"
					}else{
							this.tabBars[this.tabIndex].loadmore = "nomore"
					}
					
				},2000)
				
			}
		},
		computed: {
			list() {
				return this.tabBars[this.tabIndex].list 
			},
			loadmore(){
						return this.tabBars[this.tabIndex].loadmore
			}
			
		},
		onNavigationBarButtonTap() {
			if(this.$refs.popup.showPopup){
				this.$refs.popup.close()
			}else{
				this.$refs.popup.open()
			}
		},
		onReachBottom() {
			if(this.loadmore ==="loading" || this.loadmore ==='nomore')
			return
			this.getMoreList()
			
		}
	}
</script>

<style>

</style>
