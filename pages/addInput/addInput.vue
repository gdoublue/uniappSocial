<template>
	<view>
		<uni-nav-bar leftIcon="arrowleft" left-text="返回" @clickLeft="back" backgroundColor="#FF4A6A" color="#ffffff" statusBar="false">
			<view class="w-100 text-center font">
				所有人可见 <text class="iconfont icon-shezhi ml-1"></text>
			</view>
		</uni-nav-bar>
		<textarea v-model="content" placeholder="此时此刻想说什么呢~" class="px-2"  style="width: auto;"/>
		<view class="fixed-bottom bg-white flex align-center border-top " style="height: 86rpx;">
			<view class="iconfont icon-caidan footer-btn animate__animated ml-1" hover-class="animate__jello" @click="btnHandel('chooseMenu')"></view>
			<view class="iconfont icon-huati footer-btn animate__animated" hover-class="animate__jello"  @click="btnHandel('chooseTopic')"></view>
			<view class="iconfont icon-tupian footer-btn animate__animated" hover-class="animate__jello"  @click="btnHandel('chooseImg')"></view>
			<view class="bg-main text-white iconfont icon-fabu ml-auto rounded text-center mr-2 animate__animated"
			 hover-class="animate__heartBeat" style="width: 150rpx; height: 60rpx;">
				发布
			</view>
		</view>
		<uploadImage @imagesChange="imagesChange" :draftList="imageList" ref="uploadImages" :show='uploadImageShow'></uploadImage>
	</view>
</template>

<script>
	import uploadImage from '../../components/image/image.vue'
	export default {
		components:{uploadImage},
		data() {
			return {
				content:'',
				imageList:[],
				showBack:false,
			}
		},
		onBackPress() {
			if((this.content !=='' || this.imageList.length > 0) && !this.showBack){
				uni.showModal({
					content:"是否要保存为草稿?",
					showCancel:true,
					cancelText:"不保存",
					confirmText:"保存",
					confirmColor:"#FF4A6A",
					success: (res) => {
						if(res.confirm){
							this.draftUp()
						}
						if(res.cancel){
							this.cleanDraft()
						}
						
						this.back()
						
					}
				})
				this.showBack = true
				
				return true
			}
		},
		onLoad() {
			uni.getStorage({
				key:"addInput",
				success: (res) => {
					if(res.data){
					const{content,imageList}= JSON.parse(res.data)
					this.content = content
					this.imageList = imageList
					}
				}
			})
		
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			btnHandel(opt){
				switch(opt){
					case 'chooseImg':
					this.$refs.uploadImages.chooseImage()
					break;
				}
			},
			imagesChange(list){
				
				this.imageList = list
			},
			draftUp(){
				uni.setStorage({
					key:"addInput",
					data:JSON.stringify({
						content:this.content,
						imageList: this.imageList
					})
				})
			},
			cleanDraft(){
				uni.removeStorage({
				    key: 'addInput',
				    success: function (res) {
				        console.log('removeStorage-addInput');
				    }
				});
			}
		},
		computed:{
			uploadImageShow(){
				return this.imageList.length > 0
			}
		}
	}
</script>

<style>
.footer-btn{
	width:86rpx;
	height: 86rpx;
	line-height: 85rpx;
	font-size: 50rpx;
}
</style>
