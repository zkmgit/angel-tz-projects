<template>
	<view class="order-container">
		
		<van-tabs :active="active" @change="onChange">
		  <van-tab v-for="item in tabsList" :title="item.title" :key="item.status">
			  <view class="order-item">
				  <!-- top -->
			  	<view class="order-num" @click="goOrderDetails">
			  		<view class="num">
			  			2010147285734828
			  		</view>
					<view class="emit">
						订单关闭 >
					</view>
			  	</view>
				<view class="line"></view>
				<!-- center -->
				<view class="goodInfo">
					<view class="imgs">
						<scroll-view scroll-x="true">
							<block>
							<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
							<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
							<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
							<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
							<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
							<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
							<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
							<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
							<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" mode=""></image>
							</block>
						</scroll-view>
						
					</view>
					<view class="total">
						共18件商品 合计：<text class="color">￥2892</text>
					</view>
				</view>
				<view class="line"></view>
				<!-- footer -->
				<view class="time">
					2020-10-14 14:26:05
				</view>
			  </view>
		  </van-tab>
		</van-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
			 onChange(event) {
			    wx.showToast({
			      title: `切换到标签 ${event.detail.name}`,
			    });
			  },
			  goOrderDetails(){
				  console.log('前往订单详情页面')
			  }
		}
	}
</script>

<style lang="scss">
	.order-container {
		background-color: #F4F5F9;
		height: 100vh;
		font-size: 26rpx;
		
		.order-item {
			padding-left: 20rpx;
			background-color: #FFFFFF;
			margin-top: 20rpx;
			
			.line {
				border-top: 2rpx solid #CCCCCC;
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
					
					color: #747474;
					margin-right: 30rpx;
				}
			}
			
			.goodInfo {
				display: flex;
				flex-direction: column;
				padding: 20rpx 0;
				
				.imgs {
					white-space: nowrap;
					width: 100vw;
					.img {
						width: 100rpx;
						height: 100rpx;
						margin-right: 20rpx;
						margin-bottom: 30rpx;
					}
					
				}
				.total {
					margin-left: 48%;
					.color {
						font-size: 34rpx;
						color: red;
					}
				}
			}
			
			.time {
				padding: 30rpx 0rpx 40rpx;
			}
		}
	}
</style>
