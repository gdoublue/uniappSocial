<template>
	<view class="flex-column border-bottom pb-2" >
		<view class="flex align-center px-2 justify-between mb-2">
			<view class="font-md">热门分类</view>
			<view class=" font text-light-muted ml-2 animate__animated "
			hover-class="animate__jello" @click="toTOpicIndex">
				更多
				<text class="iconfont icon-jinru"></text>
			</view>
		</view>
		<view class="flex ">
			<text class="border rounded font bg-light mx-1 px-1 flex-nowrap font text-dark" v-for="item in hotTopics">
				{{item}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hotTopics:['体育','财经','学习','节日']
			};
		},
		methods:{
			toTOpicIndex(){
				uni.navigateTo({
					url:'../../pages/topicIndex/topicIndex'
				})
			}
		}
	}
</script>

<style>

</style>
