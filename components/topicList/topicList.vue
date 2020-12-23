<template>
	<view class="flex px-2 align-center" @click="openDetail">

		<image :src="item.cover" style="width: 150rpx; height: 150rpx;" class="rounded mr-2"></image>
		<view class="flex flex-column">
			<text class="font-md ">#{{item.title}}#</text>
			<text class="font text-light-muted">{{item.desc}}</text>
			<view class="font text-light-muted">
				动态<text class="px-1">{{item.news_count}}</text>
				今日 <text class="px-1"> {{item.today_count}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	/**
		 *
		 * @description 话题列表
		 * @property {Object} item  话题对象
		 * @property {Number} index  话题index
		 
		 */
	export default {
		props: {
			item: Object,
			index: Number
		},
		methods:{
			openDetail(){
				uni.navigateTo({
					url:`../../pages/topicDetai/topicDetai?detail=${JSON.stringify(this.item)}`
				})
			}
		}
	}
</script>

<style>

</style>
