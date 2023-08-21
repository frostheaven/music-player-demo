import Vue from 'vue'
import App from './App.vue'

//引入element-ui
import './common/element-ui'

//引入vue-router@3.6.2，注意版本
import router from './router'

//引入vuex@3.6.2，注意版本
import store from './store'

//引入&挂载axios
import http from './common/axios'
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate(){
		Vue.prototype.$bus = this //安装全局事件总线
	},
  render: h => h(App)
}).$mount('#app')
