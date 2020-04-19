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
		<view style="height: 120upx;"></view>
	</div>

</template>

<script>
	import {mapState} from "vuex"
	import swiperImage from "@/components/index/swiper-image.vue";
	import indexNav from "@/components/index/index-nav.vue";
	// import businessList from "@/components/common/business-list.vue";
	import businessList from "@/components/common/business-list2.vue";

	export default {
		components: {
			swiperImage,
			indexNav,
			businessList
		},
		data() {
			return {
				swiperImages: [{
						src: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3292573559,3052664958&fm=26&gp=0.jpg"
					},
					{
						src: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3576385290,1014704502&fm=26&gp=0.jpg"
					},
					{
						src: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2185264930,753939341&fm=26&gp=0.jpg"
					},
					{
						src: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=819456544,630675573&fm=26&gp=0.jpg"
					}
				],
				navImages: [{
						src: "/static/images/indexnav/shop2.png",
						text: "快购超市",
						url:"/pages/express/express"
					},
					{
						src: "/static/images/indexnav/book.png",
						text: "图书文化",
						url:"/pages/book/book"
					},
					{
						src: "/static/images/indexnav/food.png",
						text: "天天美食",
						url:"/pages/fastrun/fastrun"
					},
					{
						src: "/static/images/indexnav/friend2.png",
						text: "校园交友",
						url:"/pages/fastrun/fastrun"
					},
					{
						src: "/static/images/indexnav/kuaidi.png",
						text: "快递代取",
						url:"/pages/fastrun/fastrun"
					},
					{
						src: "/static/images/indexnav/flower.png",
						text: "浪漫鲜花",
						url:"/pages/flower/flower"
					},
					{
						src: "/static/images/indexnav/drink.png",
						text: "甜点饮品",
						url:"/pages/fastrun/fastrun"
					},
					{
						src: "/static/images/indexnav/active.png",
						text: "精彩活动",
						url:"/pages/fastrun/fastrun"
					},
				],
				businessList:[],
			}
		},
		computed:{
			...mapState({
				serverUrl:state=>state.common.serverUrl,
			})
		},
		onLoad() {
			this.getShop();
		},
		methods: {
			getShop() {
				uni.request({
					// url: 'http://localhost:8080/shop/findAll', 
					url: this.serverUrl+'/shop/findAll', 
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
