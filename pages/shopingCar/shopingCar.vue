<template>
	<view class="car-container">
		<view class="manager" @click="switchBtn">
			管理
		</view>
		<view class="carList">
			
			<van-checkbox-group :value="result" @change="onChange">
				<view class="car-item">
					<view class="radio">
						<van-checkbox name="a"></van-checkbox>
					</view>
					<view class="img">
						<image src="/static/images/nav/微信图片_202007111331035.png" mode=""></image>
					</view>
					<view class="info">
						<view class="title">
							工装裤男士秋季款韩版潮流11111111
						</view>
						<view class="price">
							￥78
						</view>
					</view>
					<view class="stepper">
						<van-stepper value="5" min="1" max="10" disable-input />
					</view>
				</view>
				<view class="car-item">
					<view class="radio">
						<van-checkbox name="b"></van-checkbox>
					</view>
					<view class="img">
						<image src="/static/images/nav/微信图片_202007111331035.png" mode=""></image>
					</view>
					<view class="info">
						<view class="title">
							工装裤男士秋季款韩版潮流
						</view>
						<view class="price">
							￥78
						</view>
					</view>
					<view class="stepper">
						<van-stepper value="5" min="1" max="10" disable-input />
					</view>
				</view>
		
			</van-checkbox-group>
	
		</view>
		<view class="bottomFiexd">
			
			<view class="footer">
				<van-checkbox :value="checked" @change="setCheck">全选</van-checkbox>
				<view class="right" v-if="isShow">
					<view class="price">
						<text class="fs">合计</text>:￥1111
					</view>
					<view class="btn" @click="settlementCar">
						结算
					</view>
				</view>
				<view class="delBtn" v-else @click="delCar">
					删除
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import isUserInfo from '../../util/isarzt.js';
	export default {
		data() {
			return {
				result: [],
				isShow: true,
				checked:false,
				first:true
			};
		},
		onLoad() {
			let pages = getCurrentPages();
			let route = pages[pages.length - 1].route;
			if(isUserInfo() == false) {
				uni.redirectTo({					
					url: `../authorization/authorization?route=${route}`
				})
			}
		},
		methods:{
			onChange(event) {
			    this.result = event.detail;
				
				if(this.first){ 
					this.checked = !this.checked;
					this.first = !this.first;
				}
				
				if(this.result.length == 0){
					this.checked = !this.checked;
					this.first = !this.first;
				}
				
				
			},
			switchBtn(){
				// 切换按钮
				this.isShow = !this.isShow;
			},
			setCheck(){
				this.checked = !this.checked;
				this.first = !this.first;
				if(this.checked){
					this.result.push('a');
					this.result.push('b');
				}else {
					this.result.length = 0;
				}
			},
			settlementCar(){
				// 结算购物车
				if(this.result.length == 0){
					uni.showToast({
					    title: '请选中购物车的商品',
					    duration: 2000
					});
				}else {
					uni.navigateTo({
						url:'../confirmOrder/confirmOrder'
					})
				}
				console.log("结算",this.result);
			},
			delCar(){
				// 删除购物车
				if(this.result.length == 0){
					uni.showToast({
					    title: '请选中购物车的商品',
					    duration: 2000
					});
				}
				console.log('删除',this.result);
			}
		}
	}
</script>

<style lang="scss">
	.car-container {
		background-color: #F2F2F2;
		height: 100vh;
		font-size: 26rpx;
		
		.manager {
			margin-left: 85vw;
			padding: 15rpx 0;
			font-size: 32rpx;
			color: #6E6E6E;
		}
		
		.carList {
			padding: 0 20rpx;
			background-color: #FFFFFF;
			
			.car-item {
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #EEEEEE;
				background-color: #FFFFFF;
				padding: 20rpx 0;
				
				.radio {
					display: flex;
					align-items: center;
					margin-right: 20rpx;
				}
				
				.img {
					width: 120rpx;
					height: 120rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.info {
					flex: 1;
					margin-left: 20rpx;
					
					.title {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					
					.price {
						margin-top: 20rpx;
						color: red;
						font-size: 24rpx;
					}
				}
				
				.stepper {
					margin-top: 10%;
				}
			}
		}
		
		.bottomFiexd {
			position: fixed;
			bottom: 0;
			width: 100vw;
		}
		
		.footer {
			display: flex;
			// position: fixed;
			// bottom: 0rpx;
			// width: 100vw;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			background-color: #FFFFFF;
			
			.right {
				display: flex;
				align-items: center;
				
				.price {
					margin-right: 15rpx;
					color: #FF7900;
					.fs {
						color: #6E6E6E;
						font-size: 32rpx;
					}
				}
				
				.btn {
					background-color: #FF0000;
					color: #FFFFFF;
					width: 200rpx;
					height: 80rpx;
					border-radius: 50rpx 50rpx 50rpx 50rpx;
					text-align: center;
					line-height: 80rpx;
				}
			}
			
			.delBtn {
				background-color: #FF0000;
				color: #FFFFFF;
				// border: 2rpx solid #FF0000;
				width: 200rpx;
				height: 80rpx;
				border-radius: 50rpx 50rpx 50rpx 50rpx;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>
