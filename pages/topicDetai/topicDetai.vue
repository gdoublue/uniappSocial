<template>
	<view>
		<topic-info :detail="detail"></topic-info>
		<Divider></Divider>
		<view class="p-2 flex align-center border-bottom">
			<text class="iconfont icon-ccdbaa text-primary font-md p-1"></text>
			<text class="font-md text-dark text-ellipsis">[本话必读]欢迎新人,点关注不迷路,参与话题讨论应该注意文明用语,查看详细规则</text>
		</view>
		<view class="p-2 flex align-center border-bottom">
			<text class="iconfont icon-ccdbaa text-primary font-md p-1"></text>
			<text class="font-md text-dark text-ellipsis">[置顶]跨年活动通知,辞旧迎新,具体安排如下</text>
		</view>
		<Divider></Divider>
		<view class="flex align-center">
			<view class="flex-1 px-3 py-2 font-md text-center" :class="tabIndex === 0 ? 'text-main font-lg font-weight-bold' : ''"
			 @click="changeTab(0)">默认
			</view>
			<view class="flex-1 px-3 py-2 font-md text-center" :class="tabIndex === 1 ? 'text-main font-lg font-weight-bold' : ''"
			 @click="changeTab(1)">最新
			</view>
		</view>
		<template v-if="listData.list.length > 0">
			<backTop :scrollTop="scrollTop"></backTop>
			<template v-for="(item2, index2) in listData.list">
				<List :key="index2" :item="item2" :index="index2"></List>
				<Divider></Divider>

			</template>
			
			<uni-load-more :status="listData.loadmore"></uni-load-more>
		</template>
		<template v-else>
			<Blank></Blank>
		</template>

	</view>
</template>
<!-- 	cover: ",
		title: "话题名称",
		desc: "话题描述",
		today_count: 0,
		news_count: 10 -->
<script>
	import topicInfo from '@/components/topic-info.vue'
	import List from "@/components/common/list.vue";
	import backTop from "@/components/common/back-top.vue"
	export default {
		components: {
			topicInfo,
			List,
			backTop
		},
		data() {
			return {
				detail: [],
				scrollTop:0,
				tabIndex: 0,
				hotList: [{
					title: "【新人必读】uni-app实战第二季商城类项目开发"
				}, {
					title: "【新人必读】uni-app实战第三季仿微信项目开发"
				}],
				newsList: [{
					loadmore: "more",
					list: [],
					page: 1,
					firstLoad: false
				}, {
					loadmore: "more",
					list: [],
					page: 1,
					firstLoad: false
				}]
			}
		},
		onPageScroll(e) {
					this.scrollTop = e.scrollTop;
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index
				if (!this.newsList[index].firstLoad) {
					this.getList()
				}
			},
			loadmore() {
				let index = this.tabIndex
				// 拿到当前列表
				let item = this.newsList[index]

				// 判断是否处于可加载状态（上拉加载更多）
				if (item.loadmore !== 'more') return;
				// 修改当前列表加载状态
				item.loadmore = 'loading'

				// 请求数据
				item.page++;
				this.getList()

			},
			getList() {
				let index = this.tabIndex
				let page = this.newsList[index].page

				let isrefresh = page === 1
				this.$H.get('/topic/' + this.detail.id + '/post/' + page)
					.then(res => {
						let list = res.list.map(v => {
							return this.$U.formatCommonList(v)
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
			}
		},
		computed: {
			listData() {
				return this.newsList[this.tabIndex]
			}
		},
		onLoad(e) {
			this.detail = JSON.parse(e.detail)
			
			this.getList()
			uni.setNavigationBarTitle({
				title:"[话题]"+this.detail.title
			})
		},
		onReachBottom() {
			this.loadmore()
		}
	}
</script>

<style scoped>

</style>
