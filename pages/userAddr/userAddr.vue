<template>
	<view class="userAddr-container">
		<view class="addr-container" v-if="isShow">
			<view class="addr-item" v-for="item in addrData" :key="item.id">
				<view class="addr-info">
					<view class="name">
						<view class="size">{{ item.receiver }}</view><view class="">{{ item.phone }}</view> 
					</view>
					<view class="street">
						{{ item.address }}
					</view>
				</view>
				<view class="img" @click="goEditAddr(item)">
					<image src="../../static/images/userAddr/edit.png" mode=""></image>
				</view>
			</view>
			
		</view>
	
		<view class="fiexd">
			<view class="footer" @click="goAddAddr">
				<image src="../../static/images/userAddr/add.png" mode=""></image>
				<view class="text">
					新增收货地址
				</view>
				<image src="../../static/images/userAddr/right.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { allAddr } from '../../api/addr.js';
	export default {
		data() {
			return {
				preRoute:'',
				isShow:false,
				// 获取用户所有的地址
				addrData: []
			};
		},
		onLoad(e) {
			// 假设上一页时确认订单页面和用户页面
			// console.log(e);
			// if(e.route) this.preRoute = '..' + e.route.substring(5);
			// if(e.route) this.$store.commit("increment",this.preRoute);
			// console.log('this.preRoute',this.preRoute);
		},
		onUnload: function () {
			// console.log(55555);
			// console.log(this.$store.state.PreRoute);
			// wx.reLaunch({
			//   url: this.$store.state.PreRoute
			// })
			
		},
		onShow() {
			console.log(5555)
			this.getAllAddr();
		},
		methods:{
			async getAllAddr(){
				// 获取所有的地址
				let { token } = uni.getStorageSync('token');
				let res = await allAddr(token);
				if(res.status == 200){
					this.addrData = res.message;
					this.isShow = true;
				}else {
					this.addrData = [];
				}
				
				console.log(res);
			},
			goEditAddr(item){
				// 回显，编辑地址
				let str = JSON.stringify(item);
				uni.navigateTo({
					url:`../editAddr/editAddr?item=${str}&switch=edit`
				})
			},
			goAddAddr(){
				// 新增地址
				uni.navigateTo({
					url:'../editAddr/editAddr?switch=add'
				})
			}
		}
	}
</script>

<style lang="scss">
	.userAddr-container {
		background-color: #F4F5F9;
		font-size: 28rpx;
		padding-top: 20rpx;
		
		.addr-container {
			padding-left: 30rpx;
			background-color: #FFFFFF;
			
			.addr-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #F0F0F0;
				padding: 30rpx 0;
				
				.addr-info {
					
					.name {
						display: flex;
						align-items: flex-end;
						
						
						.size {
							font-size: 24rpx;
							margin-right: 20rpx;
						}
					}
					
					.street {
						margin-top: 10rpx;
						font-size: 24rpx;
						color: #CBCBCB;
					}
				}
				
				.img {
					width: 35rpx;
					height: 35rpx;
					margin-right: 30rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	
		.fiexd {
			position: fixed;
			bottom: 0;
			width: 100vw;
			
			.footer {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 30rpx;
				border-top: 1rpx solid #F0F0F0;
			
				.text {
					flex: 1;
					margin-left: 10rpx;
				}
			
				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>
