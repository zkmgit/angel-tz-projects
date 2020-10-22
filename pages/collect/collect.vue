<template>
	<view class="collect-container">
		<view class="collect-list" v-if="isShow">
			<view class="good-item" v-for="item in collectData" :key="item.id">
				<view class="img">
					<image :src="item.goods_showImg" mode=""></image>
				</view>
				
				<view class="title">
					<view class="text">
						{{ item.goods_name }}
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
	import { getCollectionByOpenid } from '../../api/collect.js';
	export default {
		data() {
			return {
				isShow:true,
				collectData: []
			};
		},
		methods:{
			async getCollectData(){
				let { token } = uni.getStorageSync('token');
				let res = await getCollectionByOpenid(token);
				this.collectData = res;
				if(this.collectData.length == 0){
					console.log('123');
					this.isShow = false;
				}
			}
		},
		created() {
			this.getCollectData();
		}
		
	}
</script>

<style lang="scss">
	.collect-container {
		background-color: #F4F5F9;
		height: 100vh;
		padding-top: 20rpx;
		
		.collect-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 20rpx;
			
			.good-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 48%;
				background-color: #FFFFFF;
				border-radius: 20rpx;
				overflow: hidden;
				margin-bottom: 20rpx;
				
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
