<template>
	<view>
		<scroll-view scroll-x :scroll-into-view="scrollInto" scroll-with-animation class="scroll-row" style="height: 100rpx">
			<view v-for="(item, index) in tabBars" :key="index" class="scroll-row-item px-3 py-2 font-md" :id="'tab' + index"
			 :class="tabIndex === index ? 'text-main font-lg font-weight-bold' : ''" @click="changeTab(index)">{{ item.classname }}</view>
		</scroll-view>

		<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:' + scrollH + 'px;'">
			<swiper-item v-for="(item, index) in newsList" :key="index">
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length > 0">
					  <template v-for="(item2, index2) in item.list">
							<topicList :item='item2' :key="index2"></topicList>
				
					  </template>
									<uni-load-more :status="item.loadmore"></uni-load-more>
					</template>
					<template v-else>
								  	<template v-if="!item.firstLoad">
								  						<view class="text-light-muted flex align-center justify-center font-md" style="height: 200rpx;">加载中...</view>
								  					</template>
					  <Blank v-else></Blank>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import topicList from '@/components/topicList/topicList.vue'
	import navScrollSwiper from '@/components/navScrollSwiper/navScrollSwiper.vue'
	export default {
		components: {
			navScrollSwiper
		},
		data() {
			return {
				scrollH: 800,
				tabIndex: 0,
				scrollInto: "",
				tabBars: [],
				newsList: []
			}
		},
		methods: {

			onChangeTab(e) {
				this.changeTab(e.detail.current);
			},
			changeTab(index) {
				this.scrollInto = "tab" + index;
				this.tabIndex = index;
				if (!this.newsList[this.tabIndex].firstLoad) {
					this.getList()
				}
			},
			getData() {
				// 获取分类
				this.$H.get('/topicclass').then(res => {

					this.tabBars = res.list
					// 根据分类生成列表
					var arr = []
					for (let i = 0; i < this.tabBars.length; i++) {
						// 生成列表模板
						arr.push({
							// 1.more  2.loading... 3.noMore
							loadmore: "more",
							list: [],
							page: 1,
							firstLoad: false
						})
					}
					this.newsList = arr
					// 获取第一个分类的数据
					if (this.tabBars.length) {
						this.getList()
					}
				})
			},
			getList() {
				let index = this.tabIndex
				let id = this.tabBars[index].id
				let page = this.newsList[index].page
				let isrefresh = page === 1
				this.$H.get('/topicclass/' + id + '/topic/' + page)
					.then(res => {
						let list = res.list.map(v => {
							return {
								id: v.id,
								cover: v.titlepic,
								title: v.title,
								desc: v.desc,
								today_count: v.todaypost_count,
								news_count: v.post_count
							}
						})
						this.newsList[index].loadmore = list.length < 10 ? 'noMore' : 'more';
						this.newsList[index].list = isrefresh ? list : [...this.newsList[index].list, ...list];



						if (isrefresh) {
							this.newsList[index].firstLoad = true
						}
					}).catch(err => {
						if (!isrefresh) {
							this.newsList[index].page--
						}
					})
			},
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - uni.upx2px(101);
				},
			})
			this.getData()
		}
	}
</script>

<style>

</style>
