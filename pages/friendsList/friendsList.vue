<template>
	<view>
		<view class="flex align-center justify-center"  style="height: 100rpx">
			<view
			
			  v-for="(item, index) in tabBars"
			  :key="index"
			  class="scroll-row-item px-3 py-2 font-md flex-1 text-center"
			  :id="'tab' + index"
			  :class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
			  @click="changeTab(index)"
			  >{{ item}}</view
			>
		</view>
		<swiper
		  :duration="150"
		  :current="tabIndex"
		  @change="onChangeTab"
		  :style="'height:' + scrollH + 'px;'">
		  <swiper-item v-for="(item1, index1) in tabBars" :key="index1">
		    <scroll-view
		      scroll-y="true"
		      :style="'height:' + scrollH + 'px;'"
		      @scrolltolower="scrolltolower"
		    >
		   <template v-for="(item,index) in users[index1]">
		   <usersList :item="item" :index="index"></usersList>
		   </template>
		    </scroll-view>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script>
	import{ users as demoUsers} from '../../static/userlist.js'
	import usersList from '@/components/usersList.vue'
	export default {
		components:{usersList},
		data() {
			return {
				tabBars:['粉丝','关注','互关'],
				tabIndex:0,
				scrollH:600,
				users:[],
			}
		},
		methods: {
			changeTab(index) {
			  this.tabIndex = index;
			},
			onChangeTab(e) {
			  this.changeTab(e.detail.current);
			},
			scrolltolower(){
				console.log('到底了');
			},
			getData(){
				for (let i = 0 ; i < 3 ; i ++){
					// this.users[i] = demoUsers.filter(item => item.isFollow === i)
					this.users[i] = demoUsers
				}
			}
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:'../userSearch/userSearch'
			})
		},
		onNavigationBarButtonTap(){
			uni.navigateBack({
				
			})
		},
		onLoad() {
			uni.getSystemInfo({
			  success: (res) => {
			    this.scrollH = res.windowHeight - uni.upx2px(100);
			  },
			}),
			this.getData()
		}
	}
</script>

<style>

</style>
