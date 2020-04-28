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
						<text class="pl-1 font">{{item.orderStatus = '已下单' ? '已接单' :'未接单'}}</text>
					</view>
				</view>
				<view class="d-flex a-center border-bottom">
					<text class="text-light-muted font-sm">{{item.createTime}}</text>
				</view>
				<view class="d-flex a-center" style="height: 70upx;font-size: 25rpx;">
					<text class="text-dark">送单地址：{{item.buyerAddress}}</text>
					<el-button class="text-danger ml-auto" @click="delOrder(item)">完成送达</el-button>
				</view>
			</view>
		</view>
	</card>
</template>

<script>
	import card from "../uni-ui/uni-card/uni-card.vue"
	
	export default {
		components:{
			card
		},
		props:{
			item:Object,
			index:Number,
		},
		methods:{
			delOrder(item) {
				this.$emit('serviceOrder',item)
			}
		}
	}
</script>

<style>
</style>
