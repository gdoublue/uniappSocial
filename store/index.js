import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 登录
		loginStatus: false
	},
	mutations: {
		// 登录
		login(state, user) {
			state.loginStatus = true
			state.user = user
			uni.setStorageSync('user', JSON.stringify(user));
		},
		// 初始化登录状态
		initUser(state) {
			let user = uni.getStorageSync('user');
			if (user) {
				state.user = JSON.parse(user)
				state.loginStatus = true
			}
		},
		// 退出登录
		logout(state) {
			state.user = {}
			state.loginStatus = false

			uni.removeStorageSync('user');
		},
		// 修改用户信息(手机号,邮箱,密码)
		editUserInfo(state, {
			key,
			value
		}) {
			state.user[key] = value
		}

	}
})
