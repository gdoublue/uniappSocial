<template>
	<view>
		<uni-nav-bar statusBar="false" :border="false" @clickRight="openAddInput">
			<view class="w-100 text-center flex align-center justify-center">
				<view :class="tabIndex === index ? 'text-main font-lg ': 'font-md text-light-muted'" v-for="(item, index) in tabBars"
				 class="mx-1 font-weight-bolder" @click="changeTab(index)" :key="index">{{item}}</view>

			</view>
			<text slot='right' class="iconfont icon-fatie_icon font-lg"></text>
		</uni-nav-bar>

		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px;'">
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'">
					<template v-for="(item, index) in follwNewsList">
						<List :key="index" :item="item" :index="index" @doSupport="doSupport" @clickFollow="clickFollow"></List>
						<Divider></Divider>
					</template>
				</scroll-view>
			</swiper-item>
			<!-- 话题-->
			<swiper-item>
				<scroll-view scroll-y="true" 
				:style="'height:' + scrollH + 'px;'">
				<!-- 热门分类 -->
					<hotTopicsClass :hotTopics="hotCate"></hotTopicsClass>
					<!-- 搜索框 -->
					<view class="p-2" @click="tosearchTopic">
						<view class="bg-light rounded flex align-center justify-center py-2 text-secondary">
							<text class="iconfont icon-sousuo mr-2"></text>
							搜索话题
						</view>
					</view>
				
					<!-- 广告轮播图 -->
					<swiper v-if="swiperList.length" class="px-2 pb-2" :indicator-dots="true" :autoplay="true" circular=true :interval="3000" :duration="1000">
						<swiper-item :key="index" v-for="(item,index) in swiperList">
							<image  :src="item.src" style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
					</swiper>
				
					<view class="font-md p-2">最近更新</view>
					<template v-for="(item,index) in topicList">
						<topicList :item='item' :key="index"></topicList>
					</template>

				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import List from "@/components/common/list.vue";
	import hotTopicsClass from '@/components/hotTopicsClass/hotTopicsClass.vue'
	import topicList from '@/components/topicList/topicList.vue'
	import {
		list
	} from "@/static/demolist.js";
	export default {
		components: {
			List,
			hotTopicsClass,
			topicList
		},
		data() {
			return {
				tabBars: ['关注', '话题'],
				tabIndex: 0,
				scrollH: 600,
				follwNewsList: [],
				swiperList:[],
				topicList: 	[],
				hotCate:[]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				},
			});
			this.getTopicNav()
			this.getHotTopic()
			this.getSwipers()
			
		},
		methods: {
					// 获取轮播图
						getSwipers(){
							this.$H.get('adsense/0').then(res=>{
								this.swiperList = res.list
							}).catch(
							
							)
						},
				// 获取热门话题
						getHotTopic(){
							this.$H.get('/hottopic').then(res=>{
								this.topicList = res.list.map(item=>{
									return {
										id:item.id,
										cover:item.titlepic,
										title:item.title,
										desc:item.desc,
										today_count:item.todaypost_count,
										news_count:item.post_count
									}
								})
							})
						},
						// 获取热门分类
									getTopicNav(){
										this.$H.get('/topicclass').then(res=>{
											this.hotCate = res.list.map(item=>{
												return {
													id:item.id,
													name:item.classname
												}
											})
										})
									},
			tosearchTopic(){
				uni.navigateTo({
					url:'../searchTopic/searchTopic'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			openAddInput() {
				uni.navigateTo({
					url: "../addInput/addInput"
				})
			},
			changeTab(index) {
				this.tabIndex = index;
			},
			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},

			doSupport({
				type,
				index
			}) {
				if (this.follwNewsList[index].support.type === "") {
					this.follwNewsList[index].support[type + "_count"]++;
					this.follwNewsList[index].support.type = type;
					return;
				}
				if (type === this.follwNewsList[index].support.type) {
					this.follwNewsList[index].support[type + "_count"]--;
					this.follwNewsList[index].support.type = "";
				} else {
					const retype = type === "support" ? "unsupport" : "support";

					this.follwNewsList[index].support.type = type;
					this.follwNewsList[index].support[retype + "_count"] -= 1;
					this.follwNewsList[index].support[type + "_count"]++;
				}
			},
			clickFollow({
				index
			}) {

				this.follwNewsList[index].isFollow = !this.newsList[index].isFollow
			}
		}
	}
</script>

<style>

</style>
