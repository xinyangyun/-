import Vue from "vue"
import Vuex from "vuex"
import order from "@/store/modules/order.js"
import common from "@/store/modules/common.js"
Vue.use(Vuex)
export default new Vuex.Store({
	modules:{
		order:order,
		common:common,
	}
})
