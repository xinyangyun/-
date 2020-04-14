<template>
	<div>
		<div style="width: 745upx;" class="d-flex flex-row pt-1" @click="openDetail">
			<image :src="item.image" style="width: 325upx;" mode="widthFix" lazy-load></image>
			<div class="p-3 pt-5">
				<div class="font-md">{{item.name}}</div>
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
