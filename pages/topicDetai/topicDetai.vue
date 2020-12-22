<template>
	<view>
		<topic-info :detail="detail"></topic-info>
		<Divider></Divider>
		<view class="p-2 flex align-center border-bottom">
			<text class="iconfont icon-ccdbaa text-primary font-md p-1"></text>
			<text class="font-md text-dark text-ellipsis">[本话必读]欢迎新人,点关注不迷路,参与话题讨论应该注意文明用语,查看详细规则</text>
		</view>
		<view class="p-2 flex align-center border-bottom">
			<text class="iconfont icon-ccdbaa text-primary font-md p-1"></text>
			<text class="font-md text-dark text-ellipsis">[置顶]跨年活动通知,辞旧迎新,具体安排如下</text>
		</view>
		<Divider></Divider>
		<view class="flex align-center">
			<view
			  class="flex-1 px-3 py-2 font-md text-center"
			  :class="tabIndex === 0 ? 'text-main font-lg font-weight-bold' : ''"
			  @click="changeTab(0)"
			  >默认
			 </view>
			 <view
			   class="flex-1 px-3 py-2 font-md text-center"
			   :class="tabIndex === 1 ? 'text-main font-lg font-weight-bold' : ''"
			   @click="changeTab(1)"
			   >最新
			  </view>
		</view>
		<template v-for="(item, index) in topicList">
		  <List
		    :key="index"
		    :item="item"
		    :index="index"
		  ></List>
		  <Divider></Divider>
		</template>
	</view>
</template>
<!-- 	cover: ",
		title: "话题名称",
		desc: "话题描述",
		today_count: 0,
		news_count: 10 -->
<script>
	import topicInfo from '@/components/topic-info.vue'
	import List from "../../components/common/list.vue";
	import { list,demolist } from "@/static/index_list.js";
	export default {
		components:{topicInfo,List},
		data() {
			return {
				detail:[],
				tabIndex:0
			}
		},
		methods: {
			changeTab(index){
				this.tabIndex = index
			}
		},
		computed:{
			topicList(){
				return this.tabIndex === 0 ? list:demolist
			}
		},
		onLoad(e) {
			this.detail = JSON.parse(e.detail)
		}
	}
</script>

<style scoped>
	
</style>
