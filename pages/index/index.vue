<template>
	<div>
		<view>
			<swiper-image :resdata="swiperImages" height="320"></swiper-image>
		</view>
		<divider></divider>
		<view>
			<indexNav :resdata="navImages"></indexNav>
		</view>
		<divider></divider>
		<view class="row j-sb">
			<block v-for="(vlist,listindex) in businessList" :key="listindex">
				<businessList :item="vlist" :index="listindex" />
			</block>
		</view>
		<view style="height: 100upx;"></view>
	</div>

</template>

<script>
	import swiperImage from "@/components/index/swiper-image.vue";
	import indexNav from "@/components/index/index-nav.vue";
	import businessList from "@/components/common/business-list.vue";

	export default {
		components: {
			swiperImage,
			indexNav,
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
				navImages: [{
						src: "/static/images/indexnav/shop.png",
						text: "快跑超市",
						url:"/pages/fastrun/fastrun"
					},
					{
						src: "/static/images/indexnav/shop2.png",
						text: "快跑商城",
						url:"/pages/book/book"
					},
					{
						src: "/static/images/indexnav/book.png",
						text: "快跑图书",
						url:"/pages/express/express"
					},
					{
						src: "/static/images/indexnav/food.png",
						text: "快跑饭店",
						url:"/pages/fastrun/fastrun"
					},
					{
						src: "/static/images/indexnav/friend.png",
						text: "快跑交友",
						url:"/pages/fastrun/fastrun"
					},
				],
				businessList:[],
			}
		},
		onLoad() {
			this.getShop();
		},
		methods: {
			getShop() {
				uni.request({
					url: 'http://localhost:8080/shop/findAll', 
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
