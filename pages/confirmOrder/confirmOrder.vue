<template>
	<view class="confirm-order">
		<!-- 购物车 -->
		<view class="car-container">
			<view class="item">
				<view class="img">
					<image src="/static/images/nav/微信图片_202007111331035.png" mode=""></image>
				</view>
				<view class="info">
					<view class="title">
						幼儿园园服韩版男女童装春秋季班服英伦学院分白色衬衫小学生校服
					</view>
					<view class="price">
						<view class="totalPrice">
							￥236
						</view>
						<view class="count">
							* 1
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageURL: 'https://img.yzcdn.cn/vant/ipad.jpeg'
			};
		}
	}
</script>

<style lang="scss">
	.confirm-order {
		background-color: #F4F5F9;
		font-size: 26rpx;
		
		.item {
			display: flex;
			
			.img {
				width: 120rpx;
				height: 120rpx;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			.info {
				
			}
		}
	}
</style>
