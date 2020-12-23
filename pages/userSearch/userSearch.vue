<template>
	
	    <view>
	        <view class="uni-padding-wrap uni-common-mt">
	            <view>
	                <video id="myVideo" src="https://tcdn.itouchtv.cn/live/gdws.m3u8?t_token=c2826385e0bdb96870786fbe94b148eb-XmGfHkdX37RJMfQYMXNCyM0J%2BuRvchSSJ0hqRaUAForGqYbvL4wE6gB5HH7V8dq%2FNuMKxRtVV8Xjt5DG9VlUbj25%2BPLTdzDfjG0%2BNK0xNdbI4SgdVP5xPHsvTsSNak9r1yBD%2BE3xfYMnTybQPwj3cKydywb9tF4T8QyJm3695KdDNzesLWCkRaSkC5GCmuGK"
	                    @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
	            </view>
	            <!-- #ifndef MP-ALIPAY -->
	            <view class="uni-list uni-common-mt">
	                <view class="uni-list-cell">
	                    <view>
	                        <view class="uni-label">弹幕内容</view>
	                    </view>
	                    <view class="uni-list-cell-db">
	                        <input v-model="danmuValue" class="uni-input" type="text" placeholder="在此处输入弹幕内容" />
	                    </view>
	                </view>
	            </view>
	            <view class="uni-btn-v">
	                <button @click="sendDanmu" class="page-body-button">发送弹幕</button>
	            </view>
	            <!-- #endif -->
	        </view>
	    </view>
	
</template>

<script>
	export default {
		  data() {
		        return {
		            src: '',
		            danmuList: [{
		                    text: '第 1s 出现的弹幕',
		                    color: '#ff0000',
		                    time: 1
		                },
		                {
		                    text: '第 3s 出现的弹幕',
		                    color: '#ff00ff',
		                    time: 3
		                }
		            ],
		            danmuValue: ''
		        }
		    },
		    onReady: function(res) {
		        // #ifndef MP-ALIPAY
		        this.videoContext = uni.createVideoContext('myVideo')
		        // #endif
		    },
		    methods: {
		        sendDanmu: function() {
		            this.videoContext.sendDanmu({
		                text: this.danmuValue,
		                color: this.getRandomColor()
		            });
		            this.danmuValue = '';
		        },
		        videoErrorCallback: function(e) {
		            uni.showModal({
		                content: e.target.errMsg,
		                showCancel: false
		            })
		        },
		        getRandomColor: function() {
		            const rgb = []
		            for (let i = 0; i < 3; ++i) {
		                let color = Math.floor(Math.random() * 256).toString(16)
		                color = color.length == 1 ? '0' + color : color
		                rgb.push(color)
		            }
		            return '#' + rgb.join('')
		        }
		    }
	}
</script>

<style>

</style>
