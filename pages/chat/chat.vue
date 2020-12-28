<template>
	<view>
		<!-- 背景图片 -->
		<view  class="bgImg" style="750rpx"
		:style="'height:' + staticH + 'px !important;'">
			<image src="@/static/chat/chat4.jpg" style="width: 750rpx;height: 100%;"></image>
		</view>
		<!-- 聊天消息视图 -->

		<scroll-view scroll-y="true" :style="'height:' + staticH + 'px'" :scroll-into-view="scrollInto"
	
		 class="scrollup pb-0" >
			
				<view 	:class="mountedover?'ready':'noready'" style="opacity: 0;">
						<template v-for="(item,index) in list">
						<chatList :item="item" :index="index" :pretime="index > 0 ? list[index-1].create_time : 0" > </chatList>
					</template>
				
					
					<view id="tobt">
					
					</view>
					<view  id='bbttmm'>
					<!-- 上移占位,不然看不到最后-条消息 -->
					<view :style="'height:'+ transHeight+ 'px;'"  class="transtime" >
					</view>
					</view>
				
				</view>
			
		</scroll-view>



		<!-- 底部操作条 -->

		<view style="height: 100rpx; left: 0; right: 0; position: fixed;" :style="'bottom:'+ transHeight + 'px;'" class=" flex align-center border-top bg-white transtime">

			<input type="text" v-model="inputText" class="flex-1 rounded bg-light ml-2  " style="padding: 10rpx; " placeholder="文明发言"
					confirm-type="send"  @confirm="submit"
					 :adjust-position="false" />

					<view class="iconfont icon-fabu flex align-center justify-center font-lg animate__animated animate__jello"
					 hover-class="animate__jello text-main" style="width: 100rpx;" @click="submit"></view>
					<view class="iconfont icon-tupian flex align-center justify-center font-lg animate__animated animate__jello"
					 hover-class="animate__jello text-main" style="width: 80rpx;" @click="chooseImage"></view>

				</view>
		<view class="bg-light position-fixed fixed-bottom transtime" :style="'height:' + transHeight + 'px;'">
			
		</view>

		

	</view>
</template>

<script>
	import {demoChartList} from '../../static/chartlist.js'
	import chatList from '@/components/chatList/chatList.vue'
	import uniTransition from '@/components/uni-transition/uni-transition.vue'
	export default {
		components: {
			chatList,
			uniTransition
		},
		data() {
			return {
				scrollH: 600,
				staticH: 600,
				inputBottom: 0,
				scrollInto: '',
				modeclass: [],
				transHeight: 0,
				inputText: '',
				mountedover:false,
				list: [{
					user_id: 2,
					avatar: "/static/demo/userpic/6.jpg",
					username: "昵称",
					data: "你好啊",
					type: "text",
					create_time: 1570783530
				}
				]
			}
		},
		computed: {
			translateClass() {
				return `transform: translateY(-${this.transHeight}px); height:${this.scrollH}px;`
			}
		},
		methods: {

			submit() {
				if (!this.inputText.trim()) {				
					this.pageToBottom()
					return
				} else {
					const text = {
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "我的昵称",
						data: this.inputText,
						type: "text",
						create_time: (new Date()).getTime()
					}
					this.list.push(text)
					this.$nextTick(() => {
						this.inputText = ''
						this.pageToBottom()
					})
				}
			},

			pageToBottom() {
				this.scrollInto = "bbttmm"

				this.$nextTick(() => {
					this.scrollInto = "tobt"
				})
			},
			chooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: res => {
						const photo = {
							user_id: 1,
							avatar: "/static/default.jpg",
							username: "我的昵称",
							data: res.tempFilePaths[0],
							type: "img",
							create_time: (new Date()).getTime()
						}
						this.list.push(photo)
						this.$nextTick(() => {
							this.pageToBottom()
						})
					}
				});
			},
		},
		mounted() {

		
			this.pageToBottom()
			this.mountedover = true
		},
		watch: {
		
		},
		onReady() {

			this.pageToBottom()
			
		},
		onLoad(e) {
			
			uni.setNavigationBarTitle({
					title: e.info
				})
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = this.staticH = res.windowHeight - uni.upx2px(100);
				}
			});
			
			uni.onKeyboardHeightChange(({
				height
			}) => {
				this.transHeight = height
				this.$nextTick(() => {
					if(height> 0){
						setTimeout(()=>{
							this.pageToBottom()
						},150)  /* 等待动画完成再滚到底部*/
					}
					
				})
				
			})
		
				
		}
		
	}
</script>

<style scoped>
	.noready{
		opacity: 0;
		transform: translateX(100%);
	}
	.ready{
		opacity: 1 !important;
		transition: all 0.1s;
	}
	.scrollup {
		transition: transform .15s;
		
		
	}

	.transtime {
		transition: all .15s;
	}

	.bgImg {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
