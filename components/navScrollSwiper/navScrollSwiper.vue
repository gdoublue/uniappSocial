<template>
	<view>
		<scroll-view
		  scroll-x
		  :scroll-into-view="scrollInto"
		  scroll-with-animation
		  class="scroll-row"
		  style="height: 100rpx"
		>
		  <view
		    v-for="(item, index) in tabBars"
		    :key="index"
		    class="scroll-row-item px-3 py-2 font-md"
		    :id="'tab' + index"
		    :class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''"
		    @click="changeTab(index)"
		    >{{ item }}</view
		  >
		</scroll-view>
		
		<swiper
		  :duration="150"
		  :current="tabIndex"
		  @change="onChangeTab"
		  :style="'height:' + scrollH + 'px;'">
		  <swiper-item v-for="(item, index) in tabBars" :key="index">
		    <scroll-view
		      scroll-y="true"
		      :style="'height:' + scrollH + 'px;'"
		      @scrolltolower="scrolltolower"
		    >
			<slot :name="item">{{item}}</slot>
		   
		    </scroll-view>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{tabBars:Array},
		data() {
			return {
				 scrollH: 600,
				 tabIndex: 0,
				 scrollInto: "",
			};
		},
		methods:{
			scrolltolower(){
				this.$emit("scrolltolower")
			},
			onChangeTab(e) {
			  this.changeTab(e.detail.current);
			},
			changeTab(index) {
			  this.scrollInto = "tab" + index;
			  this.tabIndex = index;
			}
		},
		created() {
		  uni.getSystemInfo({
		    success: (res) => {
		      this.scrollH = res.windowHeight - uni.upx2px(101);
		    },
		  })
		}
	}
</script>

<style>

</style>
