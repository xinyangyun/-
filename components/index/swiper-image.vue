<template>
	<view>
		<swiper indicator-dots autoplay :interval="3000" :duration="1000" circular :style="getStyle">
			<block v-for="(item,index) in resdata" :key="index">
				<swiper-item>
					<view class="swiper-item" @tap="event(item,index)">
						<image :src="item.src" 
						lazy-load
						:style="getStyle"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			resdata:Array,
			height:{
				type:String,
				default:"350"
			},
			//是否预览图片，默认false
			preview:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			getStyle() {
				return `height:${this.height}rpx`
			},
			getUrls() {
				return this.resdata.map((v)=> v.src)
			}
		},
		methods:{
			event(item,index){
				console.log('点击了轮播图')
				if (this.preview) {
					//预览图片的效果
					return uni.previewImage({
						current:index,
						urls:this.getUrls,
						//样式指示器
						indicator:"default"
					})
				}
			}
		}
	}
</script>

<style>
</style>
