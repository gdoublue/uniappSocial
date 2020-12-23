<template>
	<view>
		<scroll-view
		  scroll-x
		  :scroll-into-view="scrollInto"
		  scroll-with-animation
		  class="scroll-row"
		  style="height: 100rpx"
		>
		  <view
		    v-for="(item, index) in tabBars"
		    :key="index"
		    class="scroll-row-item px-3 py-2 font-md"
		    :id="'tab' + index"
		    :class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
		    @click="changeTab(index)"
		    >{{ item }}</view
		  >
		</scroll-view>
		
		<swiper
		  :duration="150"
		  :current="tabIndex"
		  @change="onChangeTab"
		  :style="'height:' + scrollH + 'px;'">
		  <swiper-item v-for="(item, index) in tabBars" :key="index">
		    <scroll-view
		      scroll-y="true"
		      :style="'height:' + scrollH + 'px;'"
		      @scrolltolower="scrolltolower"
		    >
			<topicList v-for="(item,index) in list" :item="item" :index="index"></topicList>
		   
		    </scroll-view>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script>
	import topicList from '@/components/topicList/topicList.vue'
	import navScrollSwiper from '@/components/navScrollSwiper/navScrollSwiper.vue'
	export default {
		components:{navScrollSwiper},
		data() {
			return {
				scrollH: 800,
				tabIndex: 0,
				scrollInto: "",
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
			scrolltolower(){
				this.$emit("scrolltolower")
			},
			onChangeTab(e) {
			  this.changeTab(e.detail.current);
			},
			changeTab(index) {
			  this.scrollInto = "tab" + index;
			  this.tabIndex = index;
			}
		},
		onLoad() {
			uni.getSystemInfo({
			  success: (res) => {
			    this.scrollH = res.windowHeight - uni.upx2px(101);
			  },
			})
		}
	}
</script>

<style>

</style>
