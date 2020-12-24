<template>
	<view>
	
		<template v-if="list.length > 0">
			
				<msg-list v-for="(item,index) in list" :item="item" :index="index"  ></msg-list>
		
		</template>
			<Blank v-else></Blank>
		<uni-popup ref="popup" type="top"  >
				<view class="text-center font-md border-bottom py-2 bg-light " hover-class="bg-hover-light" @click="popupEvent('friend')">
							<text class="iconfont icon-sousuo mr-2"></text> 添加好友
						</view>
						<view class="text-center font-md py-2 bg-light" hover-class="bg-hover-light"  @click="popupEvent('clear')">
							<text class="iconfont icon-shanchu mr-2"></text> 清除列表
						</view>
		</uni-popup>
	</view>
</template>

<script>
	import msgList from '@/components/msg/msg-list.vue';
	import Blank from "@/components/common/blank.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			msgList,
			Blank,
			uniPopup
		},
		data() {
			return {
				list:[],
				showPopup:false,
			}
		},
		onPullDownRefresh() {
			this.refresh()
		},
		onLoad() {
			
			this.getData()
			
		},
		// 监听原生导航栏按钮事件
				onNavigationBarButtonTap(e) {
					switch (e.index){
						case 0: // 左边
						// 关闭弹出层
						uni.navigateTo({
							url:'../friendsList/friendsList'
						})
						this.$refs.popup.close()
							break;
						case 1: // 右边
						if(this.$refs.popup.showPopup){
							this.$refs.popup.close()
						}else{
							this.$refs.popup.open()
						}
						
							break;
					}
				},
		methods: {
			refresh() {
				uni.stopPullDownRefresh()
			},
			popupEvent(ev){
				console.log(ev);
				this.$refs.popup.close()
			},
			getData(){
				setTimeout(()=>{
					this.list= [{
							avatar: "/static/demo/userpic/4.jpg",
							username: "邬大光",
							update_time: 1608627075,
							data: "阿诗丹顿覅及,马丁冬奥会直接噢二姐夫公司京东方大手术的方式",
							noread: 20
						}, {
							avatar: "/static/demo/userpic/5.jpg",
							username: "ooO0O",
							update_time: 1590718427,
							data: "今晚去吗",
							noread: 0
						}, {
							avatar: "/static/demo/userpic/6.jpg",
							username: "失散多年的父亲",
							update_time: 1608627075,
							data: "好哈哈哈哈哈",
							noread: 1
						}, {
							avatar: "/static/demo/userpic/7.jpg",
							username: "ID茉莉",
							update_time: 1610718427,
							data: "嗯嗯",
							noread: 20
						},
						{
							avatar: "/static/demo/userpic/17.jpg",
							username: "lakers",
							update_time: 1520718427,
							data: "嗯嗯",
							noread: 99
						},
						{
							avatar: "/static/demo/userpic/11.jpg",
							username: "兑积分",
							update_time: 1610718427,
							data: "嗯嗯",
							noread: 200
						}]
				},0)
				
			}
		}
	}
</script>

<style lang="scss">

</style>
