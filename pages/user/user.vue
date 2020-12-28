<template>
	<view>
	 <!-- 头部栏 -->
		<view class="flex align-center p-2">
			<image src="/static/default.jpg" class="rounded mr-2" style="width: 100rpx;height: 100rpx;"></image>
			<view class="flex-1 flex-column flex">
				<text class="font-lg font-weight-bold text-dark">我的昵称</text>
				<text class="text-muted font" >总帖子 00 今日发帖 00</text>
			</view>
			<text class="iconfont icon-jinru font-lg"></text>
		</view>
		
		<!-- 状态数目 -->
		<view class="flex align-center px-3 py-2">
					<view class="flex-1 flex flex-column align-center justify-center"
					v-for="(item,index) in myData" :key="index">
						<text class="font-lg font-weight-bold">{{item.num}}</text>
						<text class="font text-muted">{{item.name}}</text>
					</view>
		</view>
		<!-- 广告图片 -->
		<view class="px-3 py-2">
					<image src="/static/demo/banner1.jpg" mode="aspectFill"
					style="height: 170rpx;width: 100%;" class="rounded"></image>
		</view>
		
		<uni-list-item title="浏览历史">
			<text class="iconfont icon-liulan mr-1" slot="header" ></text>
		</uni-list-item>
		<uni-list-item title="社区认证">
			<text class="iconfont icon-huiyuanvip mr-1 font" slot="header"></text>
		</uni-list-item>
		<uni-list-item title="审核帖子">
			<text class="iconfont icon-keyboard mr-1 font-md" slot="header"></text>
		</uni-list-item>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components:{uniListItem},
		data() {
			return {
					myData:[{
									name:"帖子",
									num:1
								},{
									name:"动态",
									num:1
								},{
									name:"评论",
									num:2
								},{
									name:"粉丝",
									num:0
								}]
			}
		},
		methods: {
			
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url:'../user-set/user-set'
			})
		}
	}
</script>

<style>

</style>
