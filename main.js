import Vue from 'vue'
import App from './App'

import divider from	'components/common/divider.vue'
import blank from	'components/common/blank'
import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue'
Vue.component('Divider',divider)
Vue.component('Blank',blank)
Vue.component('uniNavBar',uniNavBar)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
