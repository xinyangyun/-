<template>
	<card>
		<view class="p-2 d-flex a-start border-light-secondary">
			<image src="../../static/images/order/toux.jpg" mode="widthFix"
			style="width: 90rpx;height: 90rpx;" class="rounded flex-shrink"></image> 
			<view class="pl-2 flex-1">
				<view class="d-flex a-center">
					<text class="font-md text-dark" style="padding-right: 100rpx;">{{item.sellerName}}</text>
					<text class="font-sm text-dark">共计{{item.orderAmount}}￥</text>
					<view class="text-light-muted ml-auto">
						<text class="pl-1 font">{{item.orderStatus = 1 ? '已下单' :'已送达'}}</text>
					</view>
				</view>
				<view class="d-flex a-center border-bottom">
					<text class="text-light-muted font-sm">{{item.createTime}}</text>
				</view>
				<view class="d-flex a-center" style="height: 70upx;font-size: 25rpx;">
					<text class="text-dark">{{item.orderProducts[0].product.name}}&nbsp等{{item.orderProducts[0].pnum}}件商品</text>
					<el-button class="text-danger ml-auto" @click="delOrder">删除订单</el-button>
				</view>
			</view>
		</view>
	</card>
</template>

<script>
	import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
	import card from "../uni-ui/uni-card/uni-card.vue"
	
	export default {
		components:{
			card
		},
		props:{
			item:Object,
			index:Number
		},
		computed: {
			...mapState({
				serverUrl:state=>state.common.serverUrl,
			}),
		},
		methods:{
			delOrder() {
				this.$emit("test",this.item.id);
			}
		}
	}
</script>

<style>
</style>
