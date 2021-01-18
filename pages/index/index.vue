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
        >{{ item.classname }}</view
      >
    </scroll-view>

    <swiper
      :duration="150"
      :current="tabIndex"
      @change="onChangeTab"
      :style="'height:' + scrollH + 'px;'">
      <swiper-item v-for="(item, index) in newsList" :key="index">
        <scroll-view
          scroll-y="true"
          :style="'height:' + scrollH + 'px;'"
          @scrolltolower="loadmore(index)"
        >
          <template v-if="item.list.length > 0">
            <template v-for="(item2, index2) in item.list">
              <List
                :key="index2"
                :item="item2"
                :index="index2"
                @doSupport="doSupport"
				@clickFollow="clickFollow"
              ></List>
              <Divider></Divider>
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
import List from "../../components/common/list.vue";
import { list } from "@/static/index_list.js";
export default {
  components: {
    List,
  },
  data() {
    return {
      scrollH: 600,
      tabIndex: 0,
      scrollInto: "",
      newsList: [],
      tabBars: []
    };
  },
  onNavigationBarSearchInputClicked() {
  	uni.navigateTo({
  		url:'../search/search'
  	})
  },
  onNavigationBarButtonTap() {
  	uni.navigateTo({
  		url:"../addInput/addInput"
  	})
  },
  onLoad() {
    uni.getSystemInfo({
      success: (res) => {
        this.scrollH = res.windowHeight - uni.upx2px(101);
      },
    });
    this.getData(); 	
  },
  methods: {
	// 获取数据
			getData(){
				// 获取分类
				this.$H.get('/postclass').then(res=>{
					
					this.tabBars = res.list
					// 根据分类生成列表
					var arr = []
					for (let i = 0; i < this.tabBars.length; i++) {
						// 生成列表模板
						arr.push({ 	
							// 1.more  2.loading... 3.noMore
							loadmore:"more",
							list:[],
							page:1,
							firstLoad:false
						})
					}
					this.newsList = arr
					// 获取第一个分类的数据
					if (this.tabBars.length) {
						this.getList()
					}
				})
	},
    loadmore(index) {
	
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
	getList(){
						let index = this.tabIndex
						let id = this.tabBars[index].id
						let page = this.newsList[index].page
						let isrefresh = page === 1
						this.$H.get('/postclass/'+id+'/post/'+page)
						.then(res=>{
							let list = res.list.map(v=>{
								return this.$U.formatCommonList(v)
							})
							this.newsList[index].loadmore  = list.length < 10 ? 'noMore' : 'more';
							this.newsList[index].list = isrefresh ? list : [...this.newsList[index].list,...list];
							
							
							
							if (isrefresh) {
								this.newsList[index].firstLoad = true
							}
						}).catch(err=>{
							if(!isrefresh){
								this.newsList[index].page --
							}
						})
	},
    // 监听滑动
    onChangeTab(e) {
      this.changeTab(e.detail.current);
    },
    changeTab(index) {
			if (this.tabIndex === index) {
							return;
						}
      this.scrollInto = "tab" + index;
      this.tabIndex = index;
	  	if (!this.newsList[this.tabIndex].firstLoad) {
	  					this.getList()
	  				}
    },
    doSupport({type,index}) {
	   const list = this.newsList[this.tabIndex]
      if (list[index].support.type === "") {
        list[index].support[type + "_count"]++;
        list[index].support.type = type;
        return;
      }
      if (type === list[index].support.type) {
       list[index].support[type + "_count"]--;
       list[index].support.type = "";
      } else {
        const retype = type === "support" ? "unsupport" : "support";

       list[index].support.type = type;
        list[index].support[retype + "_count"] -= 1;
        list[index].support[type + "_count"]++;
      }
    },
	clickFollow({index}){
		 const list = this.newsList[this.tabIndex]
		list[index].isFollow = !list[index].isFollow
	}
  }
};
</script>

<style></style>
