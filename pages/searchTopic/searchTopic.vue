<template>
	<view>
		<template v-if="searchList.length === 0">
			<view class="py-2 font-md px-2 flex">
				<view class="flex-1">
					搜索历史
				</view><view class="text-muted" @click="cleanHistory">清空搜索历史</view>
			</view>
			
			<view class="flex flex-wrap ">
				<view class="border rounded font-sm p-1 m-1 " v-for="(item,index) in searchHistory"
				hover-class="bg-hover-light"
				@click="clickHistory(item)"
				>{{item}}</view>
			
			</view>
		</template>
		
		<view v-else>
			<template v-for="(item,index) in searchList">
				<topicList :item='item' :key="index"></topicList>
			</template>
			<uni-load-more :status="loadmore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import topicList from "@/components/topicList/topicList.vue"
	export default {
		components:{topicList},
		data() {
			return {
				searchText:'',
				searchList:[],
				searchHistory:[],
				page: 1,
				loadmore: "more"
			}
		},
		/* 导航输入事件 */
		onNavigationBarSearchInputChanged(e) {
		
			this.searchText =e.text.trim()
		},
		/* 导航点击按钮 */
		onNavigationBarButtonTap(e) {
			
			if(e.index === 0){
				this.searchEvent()
			}
		},
		onReachBottom() {
				if(this.loadmore !== 'more'){
					return;
				}
				this.loadmore = "loading"
				this.getSearch(false)
			},
		onNavigationBarSearchInputConfirmed(e) {
			this.searchEvent()
		},
		onLoad() {
			let list = uni.getStorageSync('SeachTopicHistory')
			if (list) {
				this.searchHistory = JSON.parse(list)
			}
		},
		
		methods: {
			cleanHistory(){
				uni.showModal({
				    title: '警告',
				    content: '确定清空搜索历史吗?',
				    success:  (res) =>{
				        if (res.confirm) {
				            try {
				                uni.removeStorageSync('SeachTopicHistory');
								this.searchHistory =[]
				            } catch (e) {
				                
				            }
				        }
				    }
				});
			},
			
			clickHistory(text){
				this.searchText = text;
				this.searchEvent()
			},
			searchEvent(){
				console.log(this.searchText);
			if (this.searchText == '') {
				this.searchList = []
				return
			}
			uni.hideKeyboard()
			let index = this.searchHistory.findIndex(v => v === this.searchText)
			if (index !== -1) {
				this.$U.__toFirst(this.searchHistory, index)
			} else {
				this.searchHistory.unshift(this.searchText)
			}
			uni.setStorageSync('SeachTopicHistory', JSON.stringify(this.searchHistory))
			// 显示loading状态
			uni.showLoading({
				title: '搜索中...',
				mask: false
			})
			this.getSearch(true,()=>{
				//隐藏loading
				uni.hideLoading()
			})
			
			},
			getSearch(isrefresh = true,callback = false){
			// 请求搜索
			this.page = isrefresh ? 1 : (this.page + 1)
			this.$H.post('/search/topic',{
				keyword:this.searchText,
				page:this.page
			}).then(res=>{
				// 整理格式
				let list = res.list.map(item=>{
						return {
							id:item.id,
							cover:item.titlepic,
							title:item.title,
							desc:item.desc,
							today_count:item.todaypost_count,
							news_count:item.post_count
						}
					})
				// 渲染页面
				this.searchList = isrefresh ? [...list] : [...this.searchList,...list]
				// 加载情况
				this.loadmore = list.length < 10 ? 'noMore' : 'more'
				if(this.searchList.length ===0){
					uni.showToast({
						title:"没有相关数据",
						image:"/static/common/getNone.png"
					})
				}
				if(typeof callback === 'function'){
					callback()
				}
			}).catch(err=>{
				this.page--
						
				if(typeof callback === 'function'){
					callback()
				}
			})
				
			}
		}
	}
</script>

<style>

</style>
