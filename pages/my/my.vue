<template>
	<view>
		<!-- 头部 -->
		<view class="position-relative d-flex a-center" style="height: 320rpx;">
			<view class="iconfont icon-xiaoxi position-absolute text-white"
			style="font-size: 50rpx;top: 75rpx;right: 20rpx;z-index: 100;"></view>
			<image src="../../static/images/my/bg.jpg" style="height: 320rpx;width: 100%;"></image>
			<view class="d-flex j-sb a-center position-absolute left-0 right-0" style="bottom: 50rpx;">
				<image :src="user.userImage" style="height: 145rpx;width: 145rpx;border: 5rpx solid;"
				class="rounded-circle border-light ml-4"></image>
				<view class="ml-2 text-white font-md">{{user.nameZh}}</view>
				<view class="d-flex a-center j-center a-self-end ml-auto px-2" style="height: 70rpx;background: #FFD43F;
				color: #CC4A00;border-top-left-radius: 40rpx;border-bottom-left-radius: 40rpx;">
					<view class="line-h iconfont icon-huangguan mr-1"></view>
					会员积分1.99
				</view>
			</view>
		</view>

		<divider></divider>

		<uni-list-item title="快跑会员" :showExtraIcon="true" @click="_initUser()"
		leftIcon="icon-huiyuantequan" leftIconStyle="color:#FDBF2E;"></uni-list-item>
		<uni-list-item title="会员中心" :showExtraIcon="true"
		leftIcon="icon-huangguan" leftIconStyle="color:#FCBE2D;"></uni-list-item>
		<uni-list-item title="服务中心" :showExtraIcon="true"
		leftIcon="icon-fuwuzhongxin" leftIconStyle="color:#FA6C5E;"></uni-list-item>
		<uni-list-item title="快跑交友" :showExtraIcon="true"
		leftIcon="icon-shequ" leftIconStyle="color:#FE8B42;"></uni-list-item>
		<uni-list-item title="更多功能" :showExtraIcon="true"
		leftIcon="icon-gengduo" leftIconStyle="color:#9ED45A;" @click="navigate('user-userinfo')"></uni-list-item>
		
		<divider></divider>
		<uni-list-item title="更多设置" :showExtraIcon="true"
		leftIcon="icon-gengduoshezhi" leftIconStyle="color:#808C98;" @click="navigate('user-set')"></uni-list-item>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"

	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				user:{},
			}
		},
		onLoad() {
			this._initUser()
		},
		onShow() {
			this._initUser()
		},
		methods: {
			navigate(path){
				if (!path) return;
				uni.navigateTo({
					url: `/pages/${path}/${path}`,
  				});
			},
			_initUser(){
			    // var	user = localStorage.getItem("user");
				var test = this
				uni.getStorage({
					key:'user',
					success:function(res){
						if(res.data) {
							var u = JSON.parse(res.data)
							test.user = u
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
