<template>
	<div>
		<view class="pb-1">
			<text class="font-lg pl-2" @click="getOrders">我的订单</text>
		</view>
		<view>
			<block v-for="(item,listIndex) in orders" :key="listIndex">
				<order-list :item="item" :index="listIndex"></order-list>
			</block>
		</view>
		
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
	import orderList from "../../components/order/order-list.vue"
	
	export default {
		components:{
			orderList
		},
		data() {
			return {
				orders:[],
			}
		},
		onLoad() {
			this.getOrders()
		},
		computed: {
			...mapState({
				test:state=>state.order.test,
			}),
			...mapGetters([
				
			])
		},
		created() {
			this.getOrders()
		},
		methods: {
			getOrders() {
				uni.request({
					url: 'http://localhost:8080/orders/findOrdersByUid/1', 
					method: 'GET',
					header: {
						'custom-header': 'hello' 
					},
					success: (res) => {
						if (res.statusCode) {
							console.log(res.data);
							this.orders = res.data
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
