<template>
	<view>
		<view>
			<swiper-image :resdata="swiperImages" height="320"></swiper-image>
		</view>
		<divider></divider>
		<view class="row j-sb" @click="getShop">
			<block v-for="(vlist,listindex) in businessList2" :key="listindex">
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
				businessList2:[]
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
					url: 'http://localhost:8080/shop/findShopsByType/2', 
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
