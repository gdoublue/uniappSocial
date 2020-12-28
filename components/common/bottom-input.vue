<template>
	<view>
		<!-- 底部操作条 -->
		
		<view style="height: 100rpx; left: 0; right: 0; position: fixed;" :style="'bottom:'+ transHeight + 'px;'" class=" flex align-center border-top bg-white transtime">
		
			<input type="text" v-model="inputText" class="flex-1 rounded bg-light ml-2  " style="padding: 10rpx; " placeholder="文明发言"
					confirm-type="send"  @confirm="submit"
					 :adjust-position="false" />
		
					<view class="iconfont icon-fabu flex align-center justify-center font-lg animate__animated animate__jello"
					 hover-class="animate__jello text-main" style="width: 100rpx;" @click="submit"></view>
				
		
				</view>
		<view class="bg-light position-fixed fixed-bottom transtime" :style="'height:' + transHeight + 'px;'">
			
		</view>
	</view>
	
</template>

<script>
	export default {
		data(){
			return{
					inputText: '',
					transHeight:0
			}
		},
		methods:{
			submit() {
				if (!this.inputText.trim()) {	
					return
				}
				this.$emit('submit',this.inputText)
				this.inputText = ''
			}
		},
		created() {
			uni.onKeyboardHeightChange(({
				height
			}) => {
				this.transHeight = height
	
				
			})
		}
	}
</script>

<style scoped>
	.transtime {
		transition: all .15s;
	}
</style>
