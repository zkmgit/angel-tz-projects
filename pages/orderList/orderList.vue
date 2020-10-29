<template>
	<view class="order-container">
		
		<van-tabs :active="active" @change="onChange">
		  <van-tab v-for="item in tabsList" :title="item.title" :key="item.status">
			<view class="empty" v-if="getOrdersByStatus(item.status).length == 0">
				<van-empty description="暂无订单" />
			</view>
			<view class="order-item" v-for="(items,index) in getOrdersByStatus(item.status)">
				  
			  	<view class="order-num" @click="goOrderDetail(item.status,index)">
			  		<view class="num">
			  			{{ items.order_number }}
			  		</view>
					<view class="emit">
						<view class="text">
							订单关闭 
						</view>
						<view class="img">
							<image src="../../static/images/userAddr/right.png" mode=""></image>
						</view>
					</view>
			  	</view>
				<view class="line"></view>
				
				<view class="goodInfo">
					<view class="imgs">
						<scroll-view scroll-x="true">
							
							<block v-for="img in items.imgs">
								<image class="img" :src="img" mode=""></image>
							</block>
						</scroll-view>
						
					</view>
					<view class="total">
						<view class="">
							
						</view>
						<view class="right">
							共{{ items.total_count }}件商品 合计：<text class="color">￥{{ items.total_price }}</text>
						</view>
					</view>
				</view>
				<view class="line"></view>
				
				<view class="time">
					{{ items.add_time }}
				</view>
			  </view>
		  </van-tab>
			
		</van-tabs>
	</view>
</template>

<script>
	import { allOrder,allCarByOrderId } from '../../api/order.js';
	export default {
		data() {
			return {
				isShow: false,
				orderData: [],
				active: 0,
				tabsList: [
				  {"title": "全部",'status': "all"},
				  {"title": "待付款",'status': "0"},
				  {"title": "待发货",'status': "1"},
				  {"title": "待收货",'status': "2"},
				  {"title": "待评价",'status': "3"}
			  ]
			};
		},
		methods:{
			getOrdersByStatus(status){
				if(status == 'all') return this.orderData;
				let arr = [];
				this.orderData.map(v=>{
					if(v.status == status) arr.push(v)
				})
				return arr;
			},
			async getAllOrder(){
				// 获取所有的订单
				let { token } = uni.getStorageSync('token');
				let res = await allOrder(token);
				if(res.status == 200){
					this.orderData = res.message;
				}
			},
			 onChange(event) {
			    // wx.showToast({
			    //   title: `切换到标签 ${event.detail.name}`,
			    // });
			  },
			  goOrderDetail(status,index){
				  let order = JSON.stringify(this.getOrdersByStatus(status)[index]);
				  uni.navigateTo({
				  	url:`../orderDetails/orderDetails?order=${order}`
				  })
			  }
		},
		created() {
			this.getAllOrder();
		},
		onLoad(e){
			if(e.status != 'all'){
				this.active = parseInt(e.status);
			}
			
		}
	}
</script>

<style lang="scss">
	.order-container {
		background-color: #F4F5F9;
		font-size: 26rpx;
		
		.order-item {
			// width: 100vw;
			padding-left: 20rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;
			
			.line {
				border-top: 3rpx solid #F5F5F5;
			}
			
			.order-num {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 0;
				
				.num {
					font-size: 32rpx;
				}
				
				.emit {
					display: flex;
					align-items: center;
					.text {
						color: #747474;
						margin-right: 15rpx;
						font-size: 28rpx;
					}
					
					.img {
						width: 30rpx;
						height: 30rpx;
						// ;
						margin-right: 30rpx;
						
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
			
			.goodInfo {
				display: flex;
				flex-direction: column;
				padding: 20rpx 0;
				
				.imgs {
					white-space: nowrap;
					// width: 100vw;
					.img {
						width: 100rpx;
						height: 100rpx;
						margin-right: 20rpx;
						margin-bottom: 30rpx;
					}
					
				}
				.total {
					display: flex;
					justify-content: space-between;
					padding: 0 30rpx;
					
					.right {
						.color {
							font-size: 34rpx;
							color: red;
						}
					}
					
				}
			}
			
			.time {
				padding: 30rpx 0rpx 40rpx;
			}
		}
	}
</style>
