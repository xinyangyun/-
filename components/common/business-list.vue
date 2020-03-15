<template>
	<view style="width: 372.5upx;">
		<image :src="item.cover" mode="widthFix" lazy-load></image>
		<view class="p-2 pt-1">
			<view class="font-md">{{item.title}}</view>
			<text class="d-block font text-light-muted">{{item.desc}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
		},
		props:{
			item:Object,
			index:Number
		}
	}
</script>

<style>
</style>
