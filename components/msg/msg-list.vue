<template>
	<view  class="flex align-center p-2 border-bottom border-light-secondary" hover-class="bg-light" @click="openMsg">
		<image :src="item.avatar"
		style="height: 80rpx;width: 80rpx;"
		class="rounded-circle mr-2"></image>
		
		<view class="flex flex-column flex-1">
			<view class="flex align-center justify-between">
				<text class="font-md">{{item.username}}</text>
				<text class="font-sm text-secondary">
				{{item.update_time | formatTime}}</text>
			</view>
			<view class="flex align-center justify-between">
				<text class="text-secondary text-ellipsis" 
				style="max-width: 500rpx;">{{item.data}}</text>
				<uni-badge v-if="item.noread" :text="item.noread" type="pink"></uni-badge>
			</view>
		</view>
		
		 
		 
	</view>
</template>

<script>
	import $T from '@/common/time.js';
	import uniBadge from '@/components/uni-badge/uni-badge.vue'
	export default {
		components: {
			uniBadge
		},
		props:{
			item:Object,
			index:Number
		},
		// 过滤器
		filters: {
			formatTime(value) {
				return $T.gettime(value);
			}
		},
		methods:{
			openMsg(){
				uni.navigateTo({
					url:'../../pages/chart/chart?info='+this.item.username
				})
			}
		}
	}
</script>

<style>
</style>
