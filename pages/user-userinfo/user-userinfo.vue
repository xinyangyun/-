<template>
	<view>
		<divider></divider>
		<uni-list-item title="头像">
			<block slot="right">
				<image :src="user.userImage"
				style="height: 90rpx;width: 90rpx;"
				class="rounded-circle border border-light"></image>
			</block>
		</uni-list-item>
		<uni-list-item title="姓名">
			<block slot="right">
				<text>{{user.nameZh}}</text>
			</block>
		</uni-list-item>
		<uni-list-item title="性别"></uni-list-item>
		<uni-list-item title="生日"></uni-list-item>
		<divider></divider>
		<uni-list-item title="修改密码"></uni-list-item>
		<uni-list-item title="密保手机"></uni-list-item>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				user:{},
			}
		},
		onShow() {
			this._initUserInfo()
		},
		methods: {
			_initUserInfo(){
				var user = localStorage.getItem("user")
				if(user) {
					var u = JSON.parse(user)
					this.user = u
				}
				console.log(this.user);
			}
		}
	}
</script>

<style>

</style>
