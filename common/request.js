import $C from '@/common/config.js';
import $store from '@/store/index.js';
export default {
	common:{
		method: 'GET',
		header:{
			"content-type":"application/json"
		},
		data:{}
	},
	request(options = {}){
		
		options.url = $C.webUrl + options.url
		options.method = options.method || this.common.method
		options.header = options.header || this.common.header
		// 验证权限token
				if(options.token){
					options.header.token = $store.state.user.token
					if(!options.noCheck && !options.header.token){
						return Promise.reject('请重新登陆再试!')
						
					}
				}
		return new Promise((res,rej)=>{
			uni.request({
				...options,
				success: (result) => {
					// 请求服务端失败
					if (result.statusCode !== 200) {
						uni.showToast({
							title:result.data.msg || '请求失败',
							icon: 'none'
						});
						return rej(result.data)
					}
					// 成功
					if(result.data.data){
						res(result.data.data)
					}else{
						res(result.data)
					}
					
				},
				fail:(error)=>{
					console.log(error);
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej()
				}
			});
		})
	},
	get(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	upload(url,options = {}){
			options.url = $C.webUrl + url
			options.header = options.header || {}
			// 验证权限token
			if(options.token){
				options.header.token = $store.state.user.token
				if(!options.header.token){
					return Promise.reject("非法token") 
				}
			}
			
			return new Promise((res,rej)=>{

				uni.uploadFile({
					...options,
					success: (uploadFileRes) => {
						if(uploadFileRes.statusCode !== 200){
							return uni.showToast({
								title: '上传图片失败',
								icon: 'none'
							});
						}
						let data = JSON.parse(uploadFileRes.data)
						res(data)
					},
					fail:(err)=>{
						rej(err)
					}
				});
			})
			
		}
}