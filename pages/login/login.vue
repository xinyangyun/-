<template>
	<view>
		<uni-status-bar />
		<view class="d-flex a-center j-sb  py-2 px-3 text-light-muted">
			<view class="iconfont icon-error" @click="goBack"></view>
			<view class="font-md" @click="forget">忘记密码</view>
		</view>
		
		<view class="p-5">
			<view class="font-big mb-5">欢迎登陆For School</view>
			<input type="text" class="border-bottom mb-4 uni-input px-0"
			placeholder="请输入手机号/邮箱/账号" v-model="username"
			placeholder-class="text-light-muted"
			@focus="focus('username')" @blur="blur('username')" 
			:class="focusClass.username ? 'input-border-color':''"/>
			<input type="text" class="border-bottom mb-4 uni-input px-0"
			password="true"
			placeholder="请输入密码" v-model="password"
			placeholder-class="text-light-muted"
			@focus="focus('password')" @blur="blur('password')" 
			:class="focusClass.password ? 'input-border-color':''"/>
			<view class="py-2 w-100 d-flex a-center j-center main-bg-color
			text-white rounded font-md mb-4" hover-class="main-bg-hover-color"
			@click="submit">
				登录
			</view>
			<label class="checkbox d-flex a-center" @click="check = !check">
				<checkbox :checked="check" />
				<text class="text-light-muted font">已阅读并同意For School协议</text>
			</label>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	import uniStatusBar from "@/components/uni-ui/uni-status-bar/uni-status-bar.vue"
	
	export default {
		components:{
			uniStatusBar
		},
		data() {
			return {
				username:"",
				password:"",
				check:true,
				
				//验证规则
				rules:{
					username:[
						{
							rule:/^[a-zA-Z]\w{5,17}$/,
							msg:"账号必须字母开头，长度在6~18之间，只能包含字母、数字和下划线"
						}
					],
					password:[
						{
							rule:/^.{5,20}$/,
							msg:"密码长度必须为5-20个字符"
						}
					]
				},
				focusClass:{
					username:false,
					password:false
				},
			}
		},  
		computed:{
			...mapState({
				serverUrl:state=>state.common.serverUrl,
			})
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			//表单验证
			validate(key) {
				var check = true
				this.rules[key].forEach((v)=>{
					//验证失败
					if (!(v.rule).test(this[key])) {
						uni.showToast({title:v.msg,icon:'none'})
						check = false
						return false
					}
				})
				return check
			},
			//提交表单
			submit(){
				if (!this.check) {
					return uni.showToast({
						title:'请先同意校园快购协议'
					})
				}
				//验证用户名
				// if (!this.validate('username')) return;
				//验证密码
				// if (!this.validate('password')) return;
				console.log('提交成功');
				uni.request({
				    // url: 'http://localhost:8080/login', 
					url: this.serverUrl+'/login', 
					data:{
						username:this.username,
						password:this.password
					},
					method:'POST',
				    header: {
				        'content-type': 'application/x-www-form-urlencoded', 
				    },
				    success: (res) => {
						if (res.data.status == 200) {
							// localStorage.setItem("user",JSON.stringify({
							// 	 userId:res.data.obj.id,
							// 	 userPhone:res.data.obj.phone,
							// 	 userName:res.data.obj.username,
							// 	 userAddress:res.data.obj.address,
							// 	 userImage:res.data.obj.image,
							// 	 nameZh:res.data.obj.nameZh,
							// }))
							uni.setStorage({
								key:'user',
								data: JSON.stringify({
									 userId:res.data.obj.id,
									 userPhone:res.data.obj.phone,
									 userName:res.data.obj.username,
									 userAddress:res.data.obj.address,
									 userImage:res.data.obj.image,
									 nameZh:res.data.obj.nameZh,
								}),
								success:function(){
									console.log("存储成功");
								}
							})
							console.log(res);
							uni.showLoading({
								title: '登录中...',
								mask: true
							});
							setTimeout(()=>{
								uni.hideLoading()
								// uni.navigateBack({
								// 	delta:1
								// })
								uni.switchTab({
									url: '/pages/index/index',
								});
							},1500)
						}
				    }
				});
			},
			forget(){
				
			},
			focus(key){
				this.focusClass[key] = true
			},
			blur(key){
				this.focusClass[key] = false
			}
		}
	}
</script>

<style>

</style>
