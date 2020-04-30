<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
			 :id="tab.id" :data-current="index" @click="tapTab(index)" style="width: 230upx;">
				<view class="tabitems">{{tab.name}}</view>
			 </view>
		</scroll-view>
		<!-- 列表 -->
		<swiper :current="tabIndex" :style="'height:'+scrollH+'px;'" 
		class="swiper-box" :duration="300" @change="changeTab">
			<swiper-item v-for="(item,index) in tabBars" :key="index">
				<scroll-view class="list" scroll-y :style="'height:'+scrollH+'px;'">
					<view v-if="tabBars[index].id == 'qiangdan'" class="">
						<block v-for="(item,listIndex) in ordersList" :key="listIndex">
							<order-run-list :item="item" :index="listIndex" @getOrder="getOrder"></order-run-list>
						</block>
					</view>
					<view v-if="tabBars[index].id == 'jiedan'" class="">
						<block v-for="(item,listIndex) in ordersListGet" :key="listIndex">
							<order-run-list-isget :item="item" :index="listIndex" @serviceOrder="serviceOrder"></order-run-list-isget>
						</block>
					</view>
					<view v-if="tabBars[index].id == 'songda'" class="">
						<block v-for="(item,listIndex) in ordersListSong" :key="listIndex">
							<order-run-list-song :item="item" :index="listIndex" @serviceOrder="serviceOrder"></order-run-list-song>
						</block>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	import orderRunList from "../../components/order/order-run-list.vue"
	import orderRunListIsget from "../../components/order/order-run-list-isget.vue"
	import orderRunListSong from "../../components/order/order-run-list-song.vue"
	
	export default {
		components: {
			orderRunList,
			orderRunListIsget,
			orderRunListSong,
		},
		data() {
			return {
				scrollH:500,
				scrollLeft: 0,
				tabIndex: 0,
				isClickChange: false,
				tabBars: [{
					name: '立即抢单',
					id: 'qiangdan',
					template: "index"
				}, {
					name: '已接单',
					id: 'jiedan',
					template: "special"
				}, {
					name: '已送达',
					id: 'songda',
					template: "special"
				}],
				ordersList:[],
				ordersListGet:[],
				ordersListSong:[],
			}
		},
		computed: {
			...mapState({
				serverUrl:state=>state.common.serverUrl,
			}),
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - uni.upx2px(82)
				}
			});
			// this.getOrdersOne()
		},
		onShow() {
			this.getOrdersOne()
			this.getOrdersGetList()
			this.getOrdersSongList()
		},
		methods: {
			changeTab(e) {
				let index = e.target.current;
				this.tapTab(index)
			},
			tapTab(e) {
				this.tabIndex = e
			},
			//可接单列表
			getOrdersOne() {
				uni.request({
					url: this.serverUrl+'/orders/findAllOrdersWithCan', 
					method: 'GET',
					header: {
						'custom-header': 'hello' 
					},
					success: (res) => {
						if (res.statusCode) {
							// console.log(res.data);
							this.ordersList = res.data
							console.log(this.ordersList);
						}
					}
				});
			},
			//已接单列表
			getOrdersGetList() {
				uni.request({
					url: this.serverUrl+'/orders/findRunnerOrdersByStatus/2', 
					method: 'GET',
					header: {
						'custom-header': 'hello' 
					},
					success: (res) => {
						if (res.statusCode) {
							// console.log(res.data);
							this.ordersListGet = res.data
							console.log(this.ordersListGet);
						}
					}
				});
			},
			//已送达
			getOrdersSongList() {
				uni.request({
					url: this.serverUrl+'/orders/findRunnerOrdersByStatus/3', 
					method: 'GET',
					header: {
						'custom-header': 'hello' 
					},
					success: (res) => {
						if (res.statusCode) {
							// console.log(res.data);
							this.ordersListSong = res.data
							console.log(this.ordersListSong);
						}
					}
				});
			},
			//抢单
			getOrder(data) {
				var orderId = data.id
				uni.request({
					url: this.serverUrl+'/orders/updateOrdersStatus/'+orderId+'/2', 
					method:'POST',
				    header: {
				        'content-type': 'application/x-www-form-urlencoded', 
				    },
				    success: (res) => {
						if (res.data.status == 200) {
							// console.log(res);
							this.getOrdersOne()
							this.getOrdersGetList()
							uni.showToast({
							    title: '抢单成功！',
							    duration: 2000
							});
						}
				    }
				});
			},
			//完成送达
			serviceOrder(data) {
				var orderId = data.id
				uni.request({
					url: this.serverUrl+'/orders/updateOrdersStatus/'+orderId+'/3', 
					method:'POST',
				    header: {
				        'content-type': 'application/x-www-form-urlencoded', 
				    },
				    success: (res) => {
						if (res.data.status == 200) {
							// console.log(res);
							this.getOrdersGetList()
							this.getOrdersSongList()
							uni.showToast({
							    title: '完成送达！',
							    duration: 2000
							});
						}
				    }
				});
			}
		}
	}
</script>

<style>
	.tabitems {
		display: inline-block;
		width: 105upx;
		border-bottom: 5upx solid #FFFFFF;
	}

	.active .tabitems {
		color:  #FD6801;
		border-bottom-color: #FD6801;
	}

	.uni-tab-bar-loading {
		text-align: center;
		font-size: 28upx;
		color: #999;
	}
</style>
