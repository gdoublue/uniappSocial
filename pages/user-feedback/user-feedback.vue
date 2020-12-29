<template>
	<view>
		<uni-collapse >
			<uni-collapse-item title="意见反馈" thumb="/static/default.jpg" :showAnimation="true">
				<view class="font-lg text-danger text-center p-2" style="height: 200rpx;">
					天地人和
				</view>
			</uni-collapse-item>
			
		</uni-collapse>
		<uni-collapse :accordion="true">
			<uni-collapse-item title="用户反馈">
				折叠内容
			</uni-collapse-item>
		</uni-collapse>
		<uni-collapse>用户反馈</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from "@/components/uni-collapse/uni-collapse.vue"
	import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue"
	
	export default {
		components:{uniCollapse,uniCollapseItem},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
