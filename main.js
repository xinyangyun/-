import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
// 引入全局组件
import divider from "@/components/common/divider.vue"
Vue.component('divider',divider)

const app = new Vue({
    ...App
})
app.$mount()
