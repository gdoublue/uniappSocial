<template>
	<view>
		<!-- 聊天消息视图 -->

			<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" :scroll-into-view="scrollInto">
			<template v-for="(item,index) in list">
				<chatList :item="item" :index="index" :pretime="index > 0 ? list[index-1].create_time : 0"> </chatList>
			</template>
			<view id='tobb' class="mt-1  bg-white" :style="'height:'+ transHeight+ 'px;'" >
			</view>
		</scroll-view>

		

		<!-- 底部操作条 -->
		<view style="height: 100rpx; left: 0; right: 0; position: fixed;" :style="'bottom:'+ transHeight + 'px;'" class=" flex align-center border-top bg-white">

			<input type="text" v-model="inputText" class="flex-1 rounded bg-light ml-2  " 
			 style="padding: 10rpx; "
			 placeholder="文明发言" :adjust-position="false" />

			<view class="iconfont icon-fabu flex align-center justify-center font-lg animate__animated animate__jello"
			 hover-class="animate__jello text-main" style="width: 100rpx;" @click="submit"></view>
			 <view class="iconfont icon-tupian flex align-center justify-center font-lg animate__animated animate__jello"
			  hover-class="animate__jello text-main" style="width: 80rpx;" @click="chooseImage"></view>
		</view>
		<!-- 背景图片 -->
		<view id="bgImg" :style="'height:' + staticH + 'px !important;'"></view>


	</view>
</template>

<script>
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
				scrollInto: 'meiyou',
				modeclass:[],
				transHeight:0,
				inputText:'',
				list:
				 [
						{
						user_id: 2,
						avatar: "/static/demo/userpic/6.jpg",
						username: "昵称",
						data: "你好啊",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 2,
						avatar: "/static/demo/userpic/6.jpg",
						username: "昵称",
						data: "你好啊",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 2,
						avatar: "/static/demo/userpic/6.jpg",
						username: "昵称",
						data: "你好啊",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "收到",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 2,
						avatar: "/static/demo/userpic/6.jpg",
						username: "昵称",
						data: "你好啊",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "你好啊",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 2,
						avatar: "/static/demo/userpic/6.jpg",
						username: "昵称",
						data: "(⊙o⊙)…",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "节日快乐",
						type: "text",
						create_time: 1570783530
					}, {
						user_id: 2,
						avatar: "/static/demo/userpic/6.jpg",
						username: "昵称",
						data: "/static/1224.jpg",
						type: "img",
						create_time: (new Date()).getTime()
					},
					{
						user_id: 1,
						avatar: "/static/default.jpg",
						username: "昵称",
						data: "平安夜快乐",
						type: "text",
						create_time: (new Date()).getTime()
					}
				]
			}
		},
		methods: {
			submit(){
			if(!this.inputText.trim()){
				return
			}else{
				const text = {
					user_id: 1,
					avatar: "/static/default.jpg",
					username: "我的昵称",
					data: this.inputText,
					type: "text",
					create_time: (new Date()).getTime()
				}
				this.list.push(text)
				this.$nextTick(()=>{
					this.inputText = ''
					this.pageToBottom()
				})
			}
		},
						
			pageToBottom() {
				this.scrollInto = "tobb"
				setTimeout(() => this.scrollInto = "meiyou", 200)
			},
			chooseImage(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success:res=>{
				        const photo = {
							user_id: 1,
							avatar: "/static/default.jpg",
							username: "我的昵称",
							data: res.tempFilePaths[0],
							type: "img",
							create_time: (new Date()).getTime()
						}
						this.list.push(photo)
						this.$nextTick(()=>{
							this.pageToBottom()
						})
				    }
				});
			},
		},
		mounted() {
			
		},
		onReady() {
			this.pageToBottom()
		},
		onLoad(e) {
		// 	console.log(e.info);
			uni.onKeyboardHeightChange(res => {
		
				this.transHeight= res.height
				
				this.$nextTick(()=>{
					this.pageToBottom()
				})
			
			})
			uni.setNavigationBarTitle({
					title: e.info
				}),
				uni.getSystemInfo({
					success: (res) => {
						this.scrollH = this.staticH = res.windowHeight - uni.upx2px(101);

					},
				});

		}
	}
</script>

<style scoped>
	#bgImg {
		background-image: url(../../static/chart/chart3.jpeg);
		background-size: cover;
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
