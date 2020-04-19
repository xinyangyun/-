<template>
	<view>
		<view>
			<swiper-image :resdata="swiperImages" height="320"></swiper-image>
		</view>
		<divider></divider>
		<view class="" @click="getShop">
			<block v-for="(vlist,listindex) in businessList2" :key="listindex">
				<businessList :item="vlist" :index="listindex" />
			</block>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
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
		//监听输入框的类荣
		onNavigationBarSearchInputChanged (e) {
		        console.log(e)
		},
		//监听导航栏的点击事件
		onNavigationBarButtonTap(e) {
			console.log(e);
		},
		computed:{
			...mapState({
				serverUrl:state=>state.common.serverUrl,
			})
		},
		onLoad() {
			this.getShop()
		},
		methods: {
			getShop() {
				uni.request({
					// url: 'http://localhost:8080/shop/findShopsByType/3', 
					url: this.serverUrl+'/shop/findShopsByType/3', 
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
