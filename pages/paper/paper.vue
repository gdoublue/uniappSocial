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
					<hotTopicsClass></hotTopicsClass>
					<!-- 搜索框 -->
					<view class="p-2" @click="tosearchTopic">
						<view class="bg-light rounded flex align-center justify-center py-2 text-secondary">
							<text class="iconfont icon-sousuo mr-2"></text>
							搜索话题
						</view>
					</view>
				
					<!-- 轮播图 -->
					<swiper class="px-2 pb-2" :indicator-dots="true" :autoplay="true" circular=true :interval="3000" :duration="1000">
						<swiper-item>
							<image src="/static/demo/datapic/27.jpg" style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
						<swiper-item>
							<image src="/static/demo/datapic/18.jpg" style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
						<swiper-item>
							<image src="/static/demo/datapic/33.jpg" style="height: 300rpx;" class="w-100 rounded"></image>
						</swiper-item>
					</swiper>
					<Divider></Divider>
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
				topicList: 	[
						{
						cover: "/static/demo/topicpic/2.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 12,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/1.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/3.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/4.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/5.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/6.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					},{
						cover: "/static/demo/topicpic/7.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/8.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/9.jpeg",
						title: "话题名称",
						desc: "电视接收机",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/10.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 0,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/11.jpeg",
						title: "话题名称",
						desc: "话题描述",
						today_count: 4,
						news_count: 10
					}, {
						cover: "/static/demo/topicpic/12.jpeg",
						title: "话题名称",
						desc: "收水电费水电费",
						today_count: 3,
						news_count: 999
					}
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 44
				},
			});
			this.getData();
		},
		methods: {
			tosearchTopic(){
				console.log('totopic');
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
			getData() {
				this.follwNewsList = list
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
