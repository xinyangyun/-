<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
			 :id="tab.id" :data-current="index" @click="tapTab(index)" style="width: 370upx;">
				<view class="tabitems">{{tab.name}}</view>
			 </view>
		</scroll-view>
		<!-- 列表 -->
		<swiper :current="tabIndex" :style="'height:'+scrollH+'px;'" 
		class="swiper-box" :duration="300" @change="changeTab">
			<swiper-item v-for="(item,index) in tabBars" :key="index">
				<scroll-view class="list" scroll-y :style="'height:'+scrollH+'px;'">
					<view v-if="tabBars[index].id == 'qiangdan'" class="">
						<view class="uni-padding-wrap uni-common-mt">
							<text class="font-lg pl-2 text-light-muted">我要下单</text>
							<form @submit="formSubmit" @reset="formReset">
								<view class="uni-form-item uni-column">
									<input class="uni-input" name="name" v-model="express.name" placeholder="请输入姓名" />
								</view>
								<view class="uni-form-item uni-column">
									<input class="uni-input" name="phone" v-model="express.phone" placeholder="请输入电话" />
								</view>
								<view class="uni-form-item uni-column">
									<input class="uni-input" name="type" v-model="express.type" placeholder="请输入快递的类型" />
								</view>
								<view class="uni-form-item uni-column">
									<input class="uni-input" name="number" v-model="express.number" placeholder="请输入快递的取件码" />
								</view>
								<view class="uni-form-item uni-column">
									<input class="uni-input" name="paddress" v-model="express.paddress" placeholder="请输入快递地址" />
								</view>
								<view class="uni-form-item uni-column">
									<input class="uni-input" name="raddress" v-model="express.raddress" placeholder="请输入送达地址" />
								</view>
								<view class="uni-form-item uni-column">
									<input class="uni-input" name="rprice" v-model="express.rprice" placeholder="请输入这单的费用,建议一单为2元" />
								</view>
								<view class="uni-btn-v">
									<button class="main-bg-color text-white font-md py-1"
									 form-type="submit" hover-class="main-bg-hover-color">立即下单</button>
									<button class="main-bg-color text-white font-md py-1"
									 form-type="reset" hover-class="main-bg-hover-color">重置</button>
								</view>
							</form>
						</view>
					</view>
					<view v-if="tabBars[index].id == 'jiedan'" class="">
						<block v-for="(item,listIndex) in expressOrders" :key="listIndex">
							<order-run-list-express :item="item" :index="listIndex"></order-run-list-express>
						</block>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	import orderRunListExpress from "../../components/order/order-run-list-express.vue"
	
	export default {
		components: {
			orderRunListExpress,
		},
		data() {
			return {
				scrollH:500,
				scrollLeft: 0,
				tabIndex: 0,
				isClickChange: false,
				tabBars: [{
					name: '快递下单',
					id: 'qiangdan',
					template: "index"
				}, {
					name: '我的快递',
					id: 'jiedan',
					template: "special"
				}],
				user: {
					uid:"",
				    paddress: "",
				    name: "",
				    phone: "",
				},
				express:{
					name:"",
					phone:"",
					type:"",
					number:"",
					paddress:"",
					raddress:"",
					rprice:"",
				},
				expressOrders:[],
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
		},
		onShow() {
			this.getExpressOrder()
		},
		methods: {
			changeTab(e) {
				let index = e.target.current;
				this.tapTab(index)
			},
			tapTab(e) {
				this.tabIndex = e
			},
			formSubmit: function(e) {
				var from = e.detail.value
				var test = this
				uni.getStorage({
					key:'user',
					success:function(res){
						if(res.data) {
							var u = JSON.parse(res.data)
							test.user.uid = u.userId
							test.user.phone = u.userPhone
							test.user.name = u.userName
							test.user.paddress = u.userAddress
						}
					}
				})
				// this.orderProductsFresh()
				uni.request({
					url: this.serverUrl+'/express/insertExpress', 
					data:{
						type:from.type,
						number:from.number,
						phone:from.phone,
						raddress:from.raddress,
						paddress:from.paddress,
						orderStatus:1,
						name:from.name,
						rprice:from.rprice,
					},
					method:'POST',
				    header: {
						'content-type': 'application/json; charset=UTF-8', 
				    },
				    success: (res) => {
						console.log(res);
						if(res.data.msg == "添加成功！"){
							uni.showToast({
							    title: '下单成功！',
							    duration: 2000
							});
							this.clear()
							this.getExpressOrder()
						}
				    }
				});
			},
			formReset: function(e) {
				console.log('清空数据')
				console.log(e);
			},
			clear() {
				this.express = {
					name:"",
					phone:"",
					type:"",
					number:"",
					paddress:"",
					raddress:"",
					rprice:"",
				}
			},
			//获取快递订单
			getExpressOrder() {
				uni.request({
					url: this.serverUrl+'/express/getAllExpress', 
					method: 'GET',
					header: {
						'custom-header': 'hello' 
					},
					success: (res) => {
						if (res.statusCode) {
							// console.log(res.data);
							this.expressOrders = res.data
							console.log(this.expressOrders);
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
		width: 120upx;
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
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
