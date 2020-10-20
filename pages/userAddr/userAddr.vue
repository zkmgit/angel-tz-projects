<template>
	<view class="userAddr-container">
		<view class="addr-container">
			<view class="addr-item">
				<view class="addr-info">
					<view class="name">
						杀猪饲料
					</view>
					<view class="street">
						沙陇
					</view>
				</view>
				<view class="img" @click="goEditAddr">
					<image src="../../static/images/userAddr/edit.png" mode=""></image>
				</view>
			</view>
			
			<view class="addr-item">
				<view class="addr-info">
					<view class="name">
						杀猪饲料
					</view>
					<view class="street">
						沙陇
					</view>
				</view>
				<view class="img" @click="goEditAddr">
					<image src="../../static/images/userAddr/edit.png" mode=""></image>
				</view>
			</view>
			
			<view class="addr-item">
				<view class="addr-info">
					<view class="name">
						杀猪饲料
					</view>
					<view class="street">
						沙陇
					</view>
				</view>
				<view class="img" @click="goEditAddr">
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
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goEditAddr(){
				// 回显，编辑地址
				uni.navigateTo({
					url:'../editAddr/editAddr'
				})
			},
			goAddAddr(){
				// 新增地址
				uni.navigateTo({
					url:'../editAddr/editAddr'
				})
			}
		}
	}
</script>

<style lang="scss">
	.userAddr-container {
		background-color: #F4F5F9;
		height: 100vh;
		font-size: 28rpx;
		padding-top: 20rpx;
		
		.addr-container {
			padding-left: 30rpx;
			background-color: #FFFFFF;
			
			.addr-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #ccc;
				padding: 30rpx 0;
				
				.addr-info {
					.street {
						margin-top: 30rpx;
						font-size: 24rpx;
						color: #ccc;
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
				border-top: 1rpx solid #CCCCCC;
			
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
