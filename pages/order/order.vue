<template>
	<div>
		<view class="d-flex pb-1 a-center">
			<text class="font-lg pl-2" @click="getOrders">我的订单</text>
			<text class="font-md ml-auto pr-4 text-light-muted"
			@click="goRun">我是跑手</text>
		</view>
		<view>
			<block v-for="(item,listIndex) in orders" :key="listIndex">
				<order-list :item="item" :index="listIndex"></order-list>
			</block>
		</view>
		<view style="height: 100upx;"></view>
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
				userId:"",
			}
		},
		onLoad() {
			this.getOrders()
		},
		computed: {
			...mapState({
				serverUrl:state=>state.common.serverUrl,
			}),
			...mapGetters([
			])
		},
		onShow() {
			this.getOrders()
		},
		methods: {
			getOrders() {
				// var user = localStorage.getItem("user")
				var test = this
				uni.getStorage({
					key:'user',
					success:function(res){
						if(res.data) {
							var u = JSON.parse(res.data)
							test.userId= u.userId;
						}
					}
				})
				// if (user) {
				// 	var u = JSON.parse(user)
				// 	this.userId = u.userId
				// }
				uni.request({
					// url: 'http://localhost:8080/orders/findOrdersByUid/'+this.userId, 
					url: this.serverUrl+'/orders/findOrdersByUid/'+this.userId, 
					// url: this.serverUrl+'/orders/findOrdersByStatus/1', 
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
			},
			goRun() {
				uni.navigateTo({
					url:"/pages/orderun/orderun"
				})
			}
		}
	}
</script>

<style>

</style>
