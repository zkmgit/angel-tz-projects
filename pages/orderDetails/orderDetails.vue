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
						快递单号：
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
						{{ orderDetail.recipient }}
					</view>
					<view class="addr">
						{{ orderDetail.area }} {{ orderDetail.addr }}
					</view>
				</view>
			</view>
		</view>
	
		<!-- shopInfo -->
		<view class="shop-list">
			<view class="title">
				商品信息
			</view>
			
			<view class="shop-item" v-for="item in carList" :key='item.id'>
				<view class="shop-img">
					<image :src="item.showImg" mode=""></image>
				</view>
				
				<view class="shop-name">
					{{ item.goods_name }}
				</view>
				<view class="total">
					<text class="price">￥{{ item.goods_price }}</text>
					<text class="count">X {{ item.num }}</text>
				</view>
			</view>
		</view>
		
		<view class="shop-info">
			<view class="cell">
				<view class="">
					商品金额
				</view>
				<view class="">
					￥{{ orderDetail.goods_total }}
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
					￥{{ orderDetail.total_price }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { allCarByOrderId } from '../../api/order.js';
	export default {
		data() {
			return {
				orderDetail: {},
				carList: []
			};
		},
		methods:{
			async getAllCar(){
				console.log('id',this.orderDetail)
				let { token } = uni.getStorageSync('token');
				let res = await allCarByOrderId(token,this.orderDetail.id);
				this.carList = res.message;
				console.log(this.carList);
			}
		},
		onLoad(e) {
			let order = JSON.parse(e.order);
			console.log(order);
			this.orderDetail = order;
			this.orderDetail.area = order.area.split(",").join(" ");
		},
		onShow() {
			this.getAllCar();
		},
		created() {
			
		}
	}
</script>

<style lang="scss">
	.orderDetails-container {
		background-color: #F2F2F2;
		height: 100vh;
		font-size: 26rpx;
		padding-top: 20rpx;
		padding-bottom: 100rpx;
		
		.order-details {
			padding-left: 20rpx;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			
			.line {
				border-top: 2rpx solid #F6F6F6;
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
						color: #919191;
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
						color: #919191;
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
				border-top: 2rpx solid #F6F6F6;
				
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
