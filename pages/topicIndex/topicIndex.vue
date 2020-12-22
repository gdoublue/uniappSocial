<template>
	<view>
		<navScrollSwiper :tabBars="tabBars">
			<template v-for="(item , index) in tabBars" :slot="item">
				<topicList v-for="(item,index) in list" :item="item" :index="index" ></topicList>
				
			</template>
		</navScrollSwiper>
	</view>
</template>

<script>
	import topicList from '@/components/topicList/topicList.vue'
	import navScrollSwiper from '@/components/navScrollSwiper/navScrollSwiper.vue'
	export default {
		components:{navScrollSwiper},
		data() {
			return {
				tabBars:['新闻','体育','娱乐','科技','数码','财经','影视','动漫','手机','苹果','养殖','港澳台'],
				list:
				[
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
		methods: {
			
		},
		onLoad() {
			
		}
	}
</script>

<style>

</style>
