<template>
	<view>
		<template v-if="searchList.length === 0">
			<view class="py-2 font-md px-2 flex">
				<view class="flex-1">
					搜索历史
				</view><view class="text-muted" @click="cleanHistory">清空搜索历史</view>
			</view>
			
			<view class="flex flex-wrap ">
				<view class="border rounded font-sm p-1 m-1 " v-for="(item,index) in searchHistory" hover-class="bg-hover-light"
				 @click="clickHistory(item)">{{item}}</view>

			</view>
		</template>

		<view v-else>
			<template v-for='(item,index) in searchList'>
				<List :key='index' :item='item' :index='index' @doSupport="doSupport"></List>
				<divider></divider>
				
			</template>
			<uni-load-more :status="loadmore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import List from "../../components/common/list.vue"
	import {
		list
	} from '../../static/index_list.js'
	export default {
		components: {
			List
		},
		data() {
			return {
				searchText: '',
				searchList: [],
				searchHistory: [],
				page: 1,
				loadmore: "more"
			}
		},
		/* 导航输入事件 */
		onNavigationBarSearchInputChanged(e) {
			this.searchText = e.text.trim()
		},
		/* 导航点击按钮 */
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.searchEvent()
			}
		},
		  onPullDownRefresh() {
		        console.log('refresh');
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		    },
		onNavigationBarSearchInputConfirmed(e) {
			this.searchEvent()
		},
		onLoad() {
			let list = uni.getStorageSync('historySeachText')
			if (list) {
				this.searchHistory = JSON.parse(list)
			}
		},
			onReachBottom() {
					if(this.loadmore !== 'more'){
						return;
					}
					this.loadmore = "loading"
					this.getData(false)
				},
		methods: {
			cleanHistory(){
				uni.showModal({
				    title: '警告',
				    content: '确定清空搜索历史吗?',
				    success:  (res) =>{
				        if (res.confirm) {
				            try {
				                uni.removeStorageSync('historySeachText');
								this.searchHistory =[]
				            } catch (e) {
				                
				            }
				        }
				    }
				});
			},
			clickHistory(text) {
				this.searchText = text;
				this.searchEvent()
			},
			searchEvent() {
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
				uni.setStorageSync('historySeachText', JSON.stringify(this.searchHistory))
				// 显示loading状态
				uni.showLoading({
					title: '搜索中...',
					mask: false
				})
				this.getData(true,()=>{
					//隐藏loading
					uni.hideLoading()
				})
				

			},
			// 获取数据
			getData(isrefresh = true,callback = false){
		
				// 请求搜索
				this.page = isrefresh ? 1 : (this.page + 1)
				this.$H.post('/search/post',{
					keyword:this.searchText,
					page:this.page
				}).then(res=>{
					// 整理格式
					console.log(res);
					let list = res.list.map(v=>{
						return this.$U.formatCommonList(v)
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
			},
			doSupport({
				type,
				index
			}) {
				if (this.searchList[index].support.type === "") {
					this.searchList[index].support[type + "_count"]++;
					this.searchList[index].support.type = type;
					return;
				}
				if (type === this.searchList[index].support.type) {
					this.searchList[index].support[type + "_count"]--;
					this.searchList[index].support.type = "";
				} else {
					const retype = type === "support" ? "unsupport" : "support";

					this.searchList[index].support.type = type;
					this.searchList[index].support[retype + "_count"] -= 1;
					this.searchList[index].support[type + "_count"]++;
				}
			}
		}
	}
</script>

<style>

</style>
