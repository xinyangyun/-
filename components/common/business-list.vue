<template>
	<div>
		<div style="width: 372.5upx;" @click="openDetail">
			<image :src="item.image" mode="widthFix" lazy-load></image>
			<div class="p-2 pt-1">
				<div class="text-light-muted flex">
					<text class="font-md pr-5 text-dark">{{item.name}}</text>
					<span class="iconfont icon-huiyuantequan pr-2"></span>
					<text style="font-size: 25rpx;">{{item.open == true ? '营业中' : '休息中'}}</text>
				</div>
				<text class="d-block font text-light-muted">{{item.info}}</text>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components:{
		},
		props:{
			item:Object,
			index:Number
		},
		methods: {
			openDetail() {
				var shopId = this.item.id
				uni.navigateTo({
					url:'/pages/shop-detail/shop-detail?id='+shopId
				});
			}
		}
	}
</script>

<style>
</style>
