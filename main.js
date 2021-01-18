import Vue from 'vue'
import App from './App'
import store from './store/index.js';
import divider from 'components/common/divider.vue'
import blank from 'components/common/blank'
import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue'
import $H from './common/request.js';
import $C from './common/config.js';
// 挂在助手函数库
import $U from './common/util.js';

Vue.prototype.$U = $U
// 引入配置文件

Vue.prototype.$C = $C
// 引入请求库



Vue.prototype.$store = store
Vue.prototype.$H = $H
Vue.prototype.checkAuth = (callback)=>{
	// 权限验证
	if (!store.state.loginStatus) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		});
	}
	callback()
}

Vue.component('Divider', divider)
Vue.component('Blank', blank)
Vue.component('uniNavBar', uniNavBar)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
