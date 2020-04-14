export default {
	state:{
		list:[],
		test:"tesdddt",
	},
	getters:{
		totalPrice:(state)=>{
			var total = 0;
			state.list.forEach(v=>{
				if(state.selectedList.indexOf(v.id) > -1) {
					total += v.pprice*v.num
				}
			})
			return total
		},
	},
	mutations:{
		addGoodsToCart(state,goods) {
			state.list.unshift(goods)
		}
	},
	actions:{
	}
}