<template>
	<view class="flex  p-2 mx-2 border-bottom border-light-secondary align-center  " hover-class="bg-hover-light">
		<image :src="item.avatar" style="width: 100rpx; height: 100rpx;" class="rounded-circle mr-1"></image>
		<view class="flex flex-1 flex-column ml-2">
			<text class="font-md">{{item.name}}</text>
			<uni-badge :text="item.age" v-if="item.sex===2" type="warning">
				<text id="slot" class=" font-sm iconfont icon-yiwen pr-1"></text>
				
			</uni-badge>
			<uni-badge v-else :text="item.age" :type="item.sex===0?'pink':'primary'" >
				<text class="iconfont  font-sm  pr-1" :class="item.sex=== 0 ? 'icon-nv':'icon-nan'" id='slot'></text>
			</uni-badge>
		</view>
		<view class="  uni-icon uni-icon-checkbox-filled font-lg " :class="(item.isFollow > 0) ? 'text-main':'text-light-muted'">
			
		</view>
	</view>
</template>
<script>
/* *
* @description 好友用户列表
* @property {Object} item
* @property {Number} index 
* */
import uniBadge from '@/components/uni-badge/uni-badge.vue'
	export default {
		components:{uniBadge},
		props:{
			item:Object,
			index:Number
		}
	}
</script>

<style>

</style>
