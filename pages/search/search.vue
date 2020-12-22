<template>
	<view>
		<template v-if="searchList.length === 0">
			<view class="py-2 font-md px-2">
				搜索历史
			</view>
			<view class="flex flex-wrap ">
				<view class="border rounded font-sm p-1 m-1 " v-for="(item,index) in searchhistory"
				hover-class="bg-hover-light"
				@click="clickHistory(item)"
				>{{item}}</view>
			
			</view>
		</template>
		
		<view v-else>
			<template v-for='(item,index) in searchList' >
					<List :key='index' :item='item' :index='index' @doSupport="doSupport"></List>
					<divider></divider>
				</template>
		</view>
	</view>
</template>

<script>
	import List from "../../components/common/list.vue"
	import {list} from '../../static/index_list.js'
	export default {
		components:{List},
		data() {
			return {
				searchText:'',
				searchList:[],
				searchhistory:[
					"酸豆角","哦啥都覅就","骥哦第四佛积极","罗想说新方法","赛博朋克2077最低配推荐","神奇公司在哪里"
				]
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
		onNavigationBarSearchInputConfirmed(e) {
			this.searchEvent()
		},
		methods: {
			clickHistory(text){
				this.searchText = text;
				this.searchEvent()
			},
			searchEvent(){
				if(this.searchText=='') {
					this.searchList = []
					return
				}
				uni.hideKeyboard()
				uni.showLoading({
					title:"加载中...",
					mask:true
				})
				setTimeout(()=>{this.getSearch()},2000)
			},
			getSearch(){
				uni.hideLoading()
				
				if(this.searchText ==='2020'){
					this.searchList = list
				}
				
				else{
					uni.showToast({
						title:"找不到哦~",
						duration:1500,
						icon:'none'
					})
					this.searchList = []
				}
				if(this.searchhistory.indexOf(this.searchText) ===-1)
				this.searchhistory.push(this.searchText)
				
				
			},
			doSupport({ type, index }) {
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
