<template>
	<view class="integral-container">
		<view class="top">
			<view class="">
				当前可用积分
			</view>
			<view class="integral">
				20
			</view>
		</view>
		<view class="exchange">
			 <van-field
				label="兑换积分"
			    value=""
			    placeholder="你希望用多少积分来兑换成长值"
			    border="false"
			    @change="onChange"
			  />
		</view>
		<!-- 立即兑换 -->
		<view class="btn" @click="exchange">
			立即兑换
		</view>
		
		<!-- 兑换规则 -->
		<view class="rule">
			<view class="title">
				兑换规则：
			</view>
			<view class="get">
				获得1成长值
			</view>
			<view class="condition">
				每满3积分即可兑换
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
			exchange(){
				console.log('请输入积分数量');
			}
		}
	}
</script>

<style lang="scss">
	.integral-container {
		background-color: #F4F5F9;
		height: 100vh;
		font-size: 28rpx;
		
		.top {
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: #E75653;
			color: #FFFFFF;
			padding: 40rpx 0;
			
			.integral {
				margin-top: 20rpx;
			}
		}
		
		.exchange {
			margin-top: 20rpx;
		}
		
		.btn {
			background-color: #E64240;
			color: #FFFFFF;
			width: 90%;
			height: 80rpx;
			margin: 0 auto;
			border-radius: 10rpx;
			text-align: center;
			line-height: 80rpx;
			margin-top: 30rpx;
			margin-bottom: 20rpx;
		}
		
		.rule {
			padding-left: 30rpx;
			border-top: 1rpx solid #CCCCCC;
			border-bottom: 1rpx solid #CCCCCC;
			background-color: #FFFFFF;
			
			.title {
				padding: 20rpx 0;
				font-weight: 700;
				border-bottom: 1rpx solid #CCCCCC;
			}
			
			.get {
				font-weight: 500;
				font-size: 30rpx;
				padding: 30rpx 0;
			}
			
			.condition {
				color: #CCCCCC;
				padding-bottom: 30rpx;
				font-size: 26rpx;
			}
		}
	}
</style>
