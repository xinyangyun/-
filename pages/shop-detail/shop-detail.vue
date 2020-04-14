<template>
	<view>
		<view class="pl-2">
			<view class="text-dark">{{shop.name}}</view>
			<view class="text-light-muted">{{shop.info}}</view>
		</view>
		<!-- 商品列表 -->
		<view class="bg-white px-2">
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary"
			v-for="(item,index) in goodsList" :key="index">
				<image :src="item.image" mode="widthFix"
				style="height: 150rpx;width: 150rpx;"
				class="border border-light-secondary rounded p-2 flex-shrink"></image>
				
				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35upx;">
							{{item.name}}
					</view>
					<!-- 属性规格 -->
					<view class="d-flex text-light-muted mb-1">
						<text class="mr-1">已卖：{{item.sellNum}}</text>
					</view>
					<view class="mt-auto d-flex j-sb">
						<price>{{item.price}}</price>
						<view class="a-self-end">
							<uni-number-box :min="item.min" 
							value="0" :max="item.max"
							@change="changeNum($event,item,index)"></uni-number-box> 
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 结算 -->
		<view class="d-flex a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary a-stretch"
		 style="height: 100upx;z-index: 1000;"> 
			<template>
				<view class="flex-1 d-flex a-center j-center font-md">
					合计 <price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md"
				 hover-class="main-bg-hover-color" @click="submitPrice">	
					结算
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
	import price from "@/components/common/price.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	
	export default {
		components:{
			price,
			uniNumberBox
		},
		data() {
			return {
				shopId:null,
				goodsList:[],
				totalPrice:0,
				shop:[],
				orderProducts:[],
				orders: {
				    buyerAddress: "",
				    buyerName: "",
				    buyerPhone: "",
				    createTime: "",
				    id: 0,
				    orderAmount: 0,
				    orderStatus: true,
				    sellerName: "",
				    sellerPhone: "",
				    sid: 0,
				    uid: 0
				}
			}
		},
		onLoad(options) {
			this.shopId = options.id
			this.getGoods()
			this.getShop()
		},
		computed: {
			...mapState({
				test:state=>state.order.test,
			}),
			...mapGetters([
				
			]),
		},
		methods: {
			getGoods(){
				uni.request({
					url: 'http://localhost:8080/shop/findProductsBySid/'+this.shopId, 
					method: 'GET',
					header: {
						'custom-header': 'hello' 
					},
					success: (res) => {
						if (res.statusCode) {
							this.goodsList = res.data
						}
					}
				});
			},
			getShop() {
				uni.request({
					url: 'http://localhost:8080/shop/findShopById/'+this.shopId, 
					method: 'GET',
					header: {
						'custom-header': 'hello' 
					},
					success: (res) => {
						if (res.statusCode) {
							this.shop = res.data
							console.log(this.shop);
						}
					}
				});
			},
			changeNum(e,item,index) {
				item.num = e;
				if (index == this.orderProducts.length){
					var order = {pid:0,pnum:0};
					order.pnum = item.num
					order.pid = item.id
					this.orderProducts.push(order)
				}else{
					this.orderProducts[index].pnum = item.num;
					this.orderProducts[index].pid = item.id;
				}
				var total = 0;
				this.goodsList.forEach(v=>{
					if (v.num > 0){
						total += v.price*v.num
					}
				})
				this.totalPrice = total
			},
			submitPrice(){
				console.log("结算价格");
				var user = localStorage.getItem("user");
				if(user) {
					user = JSON.parse(user)
					this.orders.uid = user.userId
					this.orders.buyerPhone = user.userPhone
					this.orders.buyerName = user.userName
					this.orders.buyerAddress = user.userAddress
				}
				uni.request({
				    url: 'http://localhost:8080/orders/order', //仅为示例，并非真实接口地址。
					data:{
						orderProducts:this.orderProducts,
						orders:{
							buyerAddress:this.orders.buyerAddress,
							buyerName:this.orders.buyerName,
							buyerPhone:this.orders.buyerPhone,
							orderAmount:this.totalPrice,
							orderStatus:1,
							sellerName:this.shop.name,
							sellerPhone:this.shop.phone,
							sid:this.shop.id,
							uid:this.orders.uid
						}
					},
					method:'POST',
				    header: {
						'content-type': 'application/json; charset=UTF-8', 
				    },
				    success: (res) => {
						if(res.data.msg == "订单生成成功！"){
							uni.showToast({
							    title: '订单生成成功！',
							    duration: 2000
							});
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/order/order'
								});
							},1000)
						}
				    }
				});
			},
		}
	}
</script>

<style>

</style>
