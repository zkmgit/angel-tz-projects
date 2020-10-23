<template>
	<view class="container">
		<!-- 直播特卖 页面 -->
		<block>
			<view class="miaosha-container">
				<view class="miaosha-goods-list" v-for="item in RoomsData" :key="item.id">
					<image :src="item.share_img" class="image" />
					<view class="right">
						<!-- 直播类型 -->
						<view class="goods-title">{{item.name}}</view>
						<view class="label">
							<!-- 主播名 -->
							<van-icon size="30rpx" name="user-o" /><text>{{item.anchor_name}}</text></view>
						<view class="label">
							<!-- 直播时间 -->
							<van-icon size="30rpx" name="underway" /><text>{{item.end_time}}</text>
						</view>
						<view class="miaosha-price-btn">
							<van-button type="default" size="small" block round plain>已过期</van-button>
<!-- 							<van-button type="danger" size="small" block round>即将开播</van-button>
							<van-button type="warning" size="small" block round>直播结束</van-button>
							<van-button type="primary" size="small" block round>正在直播</van-button> -->
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		getRooms
	} from "../../api/homeApi.js"
	export default {

		data() {
			return {
				RoomsData: []
			}
		},
		methods: {
			// 直播特卖
			async getRoomsData() {
				var res = await getRooms();
				var x = Math.round(new Date() / 1000)
				 function getLocalTime(nS) { 
				       return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
				    } 
				var time = getLocalTime(res[0].end_time)
				res.map(v=>{
					v.end_time = time
				})
				console.log(res)
				this.RoomsData = res
			},
		},
		created() {
			this.getRoomsData();
		},
	}
</script>

<style scoped lang="scss">
	.miaosha-container {
		padding: 0;

		.miaosha-goods-list {
			margin: 20rpx;
			background: #f6f6f6;
			border-radius: 16rpx;
			display: flex;
			padding: 20rpx;

			.image {
				width: 260rpx;
				height: 260rpx;
				flex-shrink: 0;
				border-radius: 16rpx;
			}

			.right {
				margin-left: 32rpx;

				.goods-title {
					color: #333;
					font-size: 28rpx;
				}

				.label {
					color: #e64340;
					font-size: 24rpx;
					display: flex;
					align-items: flex-start;
					margin-top: 8rpx;

					text {
						margin-left: 8rpx;
					}
				}

				.miaosha-price-btn {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 32rpx;

					.price {
						color: #e64340;
						font-size: 40rpx;
						margin-top: 12rpx;

						text {
							color: #666666;
							font-size: 26rpx;
							text-decoration: line-through;
						}
					}
				}
			}
		}
	}
</style>
