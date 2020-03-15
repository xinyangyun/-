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
		<view class="row j-sb" @click="getShop">
			<block v-for="(vlist,listindex) in businessList" :key="listindex">
				<businessList :item="vlist" :index="listindex" />
			</block>
		</view>
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
						src: "/static/images/indexnav/1.png",
						text: "新品发布",
						url:"/pages/fastrun/fastrun"
					},
					{
						src: "/static/images/indexnav/2.gif",
						text: "小米众筹",
						url:"/pages/book/book"
					},
					{
						src: "/static/images/indexnav/3.gif",
						text: "以旧换新",
						url:"/pages/express/express"
					},
					{
						src: "/static/images/indexnav/4.gif",
						text: "一分换团",
						url:"/pages/fastrun/fastrun"
					},
					{
						src: "/static/images/indexnav/5.gif",
						text: "超值特卖",
						url:"/pages/fastrun/fastrun"
					},
				],
				businessList: [{
						cover: "/static/images/index/4.jpg",
						title: "百泉文彩",
						desc: "之江饭店矗立于杭城中轴线上",
					},
					{
						cover: "/static/images/index/4.jpg",
						title: "北京饭店-谭家菜",
						desc: "之江饭店矗立于杭城中轴线上",
					},
					{
						cover: "/static/images/index/4.jpg",
						title: "阿拉木汗宫",
						desc: "之江饭店矗立于杭城中轴线上",
					},
					{
						cover: "/static/images/index/4.jpg",
						title: "新红资俱乐部餐厅",
						desc: "之江饭店矗立于杭城中轴线上",
					},
					{
						cover: "/static/images/index/4.jpg",
						title: "百泉文彩",
						desc: "之江饭店矗立于杭城中轴线上",
					},
					{
						cover: "/static/images/index/4.jpg",
						title: "北京饭店-谭家菜",
						desc: "之江饭店矗立于杭城中轴线上",
					},
				],
				businessList2:[],
			}
		},
		onLoad() {
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
							this.businessList2 = res.data
						}
					}
				});
			}
		}
	}
</script>

<style>
</style>
