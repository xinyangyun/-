<template>
	<view>
		<view>
			<swiper-image :resdata="swiperImages" height="320"></swiper-image>
		</view>
		<divider></divider>
		<view class="row j-sb" @click="getShop">
			<block v-for="(vlist,listindex) in businessList" :key="listindex">
				<businessList :item="vlist" :index="listindex" />
			</block>
		</view>
	</view>
</template>

<script>
	import swiperImage from "@/components/index/swiper-image.vue";
	import businessList from "@/components/common/business-list2.vue";
	
	export default {
		components:{
			swiperImage,
			businessList
		},
		data() {
			return {
				swiperImages: [{
						src: "../../static/images/index/4.jpg"
					},
					{
						src: "../../static/images/index/5.jpg"
					},
					{
						src: "../../static/images/index/6.jpg"
					},
					{
						src: "../../static/images/index/7.jpg"
					}
				],
				businessList:[],
			}
		},
		//监听输入框的类荣
		onNavigationBarSearchInputChanged (e) {
		        console.log(e)
		},
		//监听导航栏的点击事件
		onNavigationBarButtonTap(e) {
			console.log(e);
		},
		onLoad() {
			this.getShop()
		},
		methods: {
			getShop() {
				uni.request({
					url: 'http://localhost:8080/shop/findShopsByType/1', 
					method: 'GET',
					header: {
						'custom-header': 'hello' 
					},
					success: (res) => {
						if (res.statusCode) {
							console.log(res.data);
							this.businessList = res.data
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
