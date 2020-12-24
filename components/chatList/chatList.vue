<template>
	<view>
		<!-- 时间 -->
		<view v-if="shortTime" class="py-2 flex align-center justify-center font-sm text-light-muted">
			{{shortTime}}
		</view>
		<view class="flex align-start px-2 my-2 message-item" :class="isSelf ? 'right' : 'left'">
			<!-- 用户头像 -->
			<image :src="item.avatar" style="width: 100rpx;height: 100rpx;" class="rounded-circle"></image>
			<!-- 消息泡 -->
			<view v-if="item.type === 'text'" class="bg-light p-2 rounded mx-4 content position-relative" style="max-width: 400rpx;">
				{{item.data}}
			</view>
			<view v-if="item.type==='img'" class="bg-light p-2 rounded mx-4 content position-relative">
				<image :src="item.data" class="img" mode="widthFix"> </image>
			</view>
		</view>
	</view>
</template>
/**
* chatList 聊天列表
* @description 聊天列表组建
* @property {Object} item 消息对象
* @property {Number} index 索引数字
* @example <chatList :item="item" :index="index"></chatList>
*/
<script>
	import $T from '@/common/time.js';
	const uid = 1;
	export default {
		props: {
			item: Object,
			index: Number,
			pretime: {
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			// 是否是登录用户本人
			isSelf() {
				return uid === this.item.user_id
			},
			// 转化时间
			shortTime() {
				return $T.getChatTime(this.item.create_time, this.pretime)
			}
		},
	}
</script>

<style scoped>
	.left>.content::after {
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-top: 20rpx solid transparent;
		border-bottom: 20rpx solid transparent;
		border-right: 30rpx solid #f8f9fa;
		position: absolute;
		left: -30rpx;
		top: 30rpx;
	}
	.right > .content::after{
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-top: 20rpx solid transparent;
		border-bottom: 20rpx solid transparent;
		border-left: 30rpx solid #f8f9fa;
		position: absolute;
		right: -30rpx;
		top: 30rpx;
	}
	.message-item.right {
		flex-direction: row-reverse;
	}
	.content >image{
		width: 300rpx;
		height: auto;max-width: 350rpx;max-height: 400rpx;
	}
</style>
