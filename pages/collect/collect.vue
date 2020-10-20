<template>
	<view class="collect-container">
		<view class="collect-list" v-if="isShow">
			<view class="good-item">
				<view class="img">
					<image src="../../static/images/nav/微信图片_202007111331035.png" mode=""></image>
				</view>
				
				<view class="title">
					<view class="text">
						幼儿园幼儿园韩版男女童装春秋季班服英伦学院风白色sadfasdfasfasdf
					</view>
				</view>
				
				<view class="del-img">
					<image src="../../static/images/collect/del.png" mode=""></image>
				</view>
			</view>
			
			<view class="good-item">
				<view class="img">
					<image src="../../static/images/nav/微信图片_202007111331035.png" mode=""></image>
				</view>
				
				<view class="title">
					<view class="text">
						幼儿园幼儿园韩版男女童装春秋季班服英伦学院风白色asdfsdfsdf
					</view>
				</view>
				
				<view class="del-img">
					<image src="../../static/images/collect/del.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="empty" v-else>
			<van-divider
			  contentPosition="center"
			  customStyle="color: #CCCCCC; border-color: #CCCCCC; font-size: 36rpx;"
			>
			  暂无收藏
			</van-divider>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				isShow:true
			};
		},
		methods:{
			
		},
		
	}
</script>

<style lang="scss">
	.collect-container {
		background-color: #F4F5F9;
		height: 100vh;
		padding-top: 20rpx;
		
		.collect-list {
			display: flex;
			justify-content: space-around;
			
			.good-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 46%;
				background-color: #FFFFFF;
				border-radius: 20rpx;
				overflow: hidden;
				
				.img {
					width: 100%;
					height: 300rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.title {
					font-size: 26rpx;
					padding: 30rpx 20rpx 0;
					
					.text {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					
					
				}
				
				.del-img {
					width: 50rpx;
					height: 50rpx;
					margin-bottom: 15rpx;
					margin-top: 30rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
			}
		}
	}
</style>
