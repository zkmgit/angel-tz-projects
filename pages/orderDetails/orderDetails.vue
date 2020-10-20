<template>
	<view class="orderDetails-container">
		<view class="order-details">
			<!-- top -->
			<view class="order-emit">
				<view class="img-emit">
					<image src="../../static/images/orderDetails/order-exit.png" mode=""></image>
				</view>
				<view class="emit">
					订单关闭
				</view>
			</view>
			<view class="line"></view>
			<!-- center -->
			<view class="logistics-Info">
				<view class="car">
					<image src="../../static/images/orderDetails/transport.png" mode=""></image>
				</view>
				<view class="info">
					<view class="tracking-num">
						快递单号：23454235346234636
					</view>
					<view class="tackinfo">
						暂无物流信息
					</view>
				</view>
			</view>
			<view class="line"></view>
			<!-- footer -->
			<view class="positioning-info">
				<view class="positioning-img">
					<image src="../../static/images/orderDetails/positioning.png" mode=""></image>
				</view>
				<view class="addr-info">
					<view class="recipient">
						杀猪饲料
					</view>
					<view class="addr">
						广东省 汕头市 潮南区 沙陇
					</view>
				</view>
			</view>
		</view>
	
		<!-- shopInfo -->
		<view class="shop-list">
			<view class="title">
				商品信息
			</view>
			
			<view class="shop-item" v-for="item in list">
				<view class="shop-img">
					<image src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
				</view>
				
				<view class="shop-name">
					幼儿园园服韩版男女童装春幼儿园园服韩版男女童装春
				</view>
				<view class="total">
					<text class="price">￥1652</text>
					<text class="count">X 7</text>
				</view>
			</view>
		</view>
		
		<view class="shop-info">
			<view class="cell">
				<view class="">
					商品金额
				</view>
				<view class="">
					￥2892
				</view>
			</view>
			<view class="cell">
				<view class="">
					运费
				</view>
				<view class="">
					+ ￥0
				</view>
			</view>
			<view class="cell">
				<view class="">
					应付总额
				</view>
				<view class="">
					￥2892
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[1,2,3]
			};
		}
	}
</script>

<style lang="scss">
	.orderDetails-container {
		background-color: #F4F5F9;
		height: 100vh;
		font-size: 26rpx;
		padding-top: 20rpx;
		padding-bottom: 100rpx;
		
		.order-details {
			padding-left: 20rpx;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			
			.line {
				border-top: 2rpx solid #CCCCCC;
			}
			
			.order-emit {
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				
				.img-emit {
					width: 70rpx;
					height: 70rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.emit {
					margin-left: 20rpx;
					color: #FF0000;
				}
			}
			
			.logistics-Info {
				display: flex;
				padding: 20rpx 0;
				
				.car {
					margin-right: 30rpx;
					image {
						width: 40rpx;
						height: 40rpx;
					}
					
				}
				.info {
					display: flex;
					flex-direction: column;
					
					.tracking-num {
						margin-bottom: 15rpx;
					}
					
					.tackinfo {
						color: #CBC4C4;
					}
				}
			}
			
			.positioning-info {
				display: flex;
				padding: 30rpx 0 40rpx;
				
				.positioning-img {
					margin-right: 30rpx;
					image {
						width: 40rpx;
						height: 40rpx;
					}
					
				}
				.addr-info {
					display: flex;
					flex-direction: column;
					
					.recipient {
						margin-bottom: 15rpx;
					}
					
					.addr {
						color: #CBC4C4;
					}
				}
			}
		}
	
		.shop-list {
			padding-left: 20rpx;
			background-color: #FFFFFF;
			
			.title {
				padding: 20rpx 0;
			}
			
			.shop-item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-top: 2rpx solid #ccc;
				
				.shop-img {
					width: 130rpx;
					height: 130rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.shop-name {
					flex: 1;
					margin-left: 20rpx;
				}
				
				.total {
					display: flex;
					flex-direction: column;
					margin-right: 20rpx;
					
					.price {
						margin-bottom: 50rpx;
					}
					
					.count {
						margin-left: 40rpx;
						color: #CCCCCC;
					}
				}
			}
		}
		
		.shop-info {
			background-color: #FFFFFF;
			padding: 0 20rpx;
			margin-top: 20rpx;
			
			.cell {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
			}
		}
	}
</style>
