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
        >{{ item.name }}</view
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
          <template v-if="item.length > 0">
            <template v-for="(item2, index2) in item">
              <List
                :key="index2"
                :item="item2"
                :index="index2"
                @doSupport="doSupport"
				@clickFollow="clickFollow"
              ></List>
              <Divider></Divider>
            </template>
          </template>
          <template v-else>
            <Blank></Blank>
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
      tabBars: [
        {
          name: "关注",
        },
        {
          name: "推荐",
        },
        {
          name: "体育",
        },
        {
          name: "热点",
        },
        {
          name: "财经",
        },
        {
          name: "娱乐",
        },
      ],
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
    getData() {
      for (let i = 0; i < this.tabBars.length; i++) {
        if (i < 3) {
          this.newsList.push(list);
        } else {
          this.newsList.push([]);
        }
      }
    },
    loadmore(index) {
      if (this.newsList[index].length < 15) {
        setTimeout(() => {
          this.newsList[index].push(...list);
        }, 2000);
      }
    },
    // 监听滑动
    onChangeTab(e) {
      this.changeTab(e.detail.current);
    },
    changeTab(index) {
      this.scrollInto = "tab" + index;
      this.tabIndex = index;
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
