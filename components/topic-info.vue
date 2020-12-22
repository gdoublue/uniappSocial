<template>
	<view>
		<image :src="detail.cover" mode="aspectFill" class="filter mx-0"
		style="width: 100%; height: 300rpx;"></image>
		<view class="bg-white px-2 pb-1" style="z-index: 10; position: relative;">
			<view class="flex">
				<image :src="detail.cover" style="height: 150rpx; width: 150rpx; margin-top: -75rpx;" class="rounded"></image>
				<text class="font-lg ml-2" >#{{detail.title}}#</text>
			</view>
			<view class="flex align-center text-light-muted my-1">
				<text class="px-1">动态: {{detail.news_count}}</text>
				 <text class="px-1">今日: {{detail.today_count}}</text>
			</view>
			<view class="font-md text-secondary">{{detail.desc}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			detail:Object
		}
	}
</script>

<style>
.filter{
		filter: blur(8px);
	}
</style>
