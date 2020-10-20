<template>
	<view class="coupon-container">
		<view class="tag">
			<view v-for="item in tagList" :class="item.selected == 'true' ? 'selected tag-item' : 'tag-item' " :key="item.index" @click="setSelected(item.index)">
				{{ item.title }}
			</view>
		</view>
		
		<view class="coupon-list" v-if="isShow">
			<view class="coupon-item" v-for="item in couponData">
				<view class="img">
					<image src="../../static/images/nav/微信图片_202007111331035.png" mode=""></image>
				</view>
				
				<view class="info">
					<view class="top">
						<van-tag color="#FFD121">代金券</van-tag>
						<text class="text">{{ item.title }}</text>
					</view>
					<view class="center">
						<text class="small">{{ item.condition }}</text><text class="color">￥<text class="size">{{ item.money }}</text></text>
					</view>
					<view class="footer">
						立即领取
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import { getPreferentialDatas } from '../../api/coupon.js';
	export default {
		data() {
			return {
				isShow:true,
				 tagList:[
					 {
						 "index": 0,
						 "title": "可领卷",
						 "selected": "true"
					 },
					 {
						"index": 1,
					 	"title": "已领卷",
					 	"selected": "false"
					 },
					 {
						 "index": 2,
					 	"title": "已失效",
					 	"selected": "false"
					 }
				 ],
				 couponData:[]
			};
		},
		methods: {
			setSelected(key){
				if(key == 0) {
					this.isShow = true;
				}else {
					this.isShow = false;
				}
				this.tagList.map(v=>{
					v.selected = "false"
				})
				this.tagList[key].selected = "true";
			},
			// 获取优惠卷
			async getCouponData(){
				let res = await getPreferentialDatas();
				console.log(res);
				this.couponData = res;
			}
		},
		created(){
			this.getCouponData();
		}
	}
</script>

<style lang="scss">
	.coupon-container {
		background-color: #F4F5F9;
		height: 100vh;
		font-size: 28rpx;
		
		.tag {
			display: flex;
			justify-content: space-around;
			background-color: #EEEEEE;
			
			.tag-item {
				background-color: #EDEAE9;
				width: 33%;
				text-align: center;
				padding: 30rpx 0;
			}
			
			.selected {
				color: #FFD121;
				background-color: #FFFFFF;
			}
		}
	
		.coupon-list {
			background-color: #F4F5F9;
			padding: 20rpx 20rpx 0;
			
			.coupon-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #FFFFFF;
				padding: 30rpx 0;
				box-shadow: 5px 5px #EEEEEE;
				margin-top: 20rpx;
				
				.img {
					width: 150rpx;
					height: 150rpx;
					margin-left: 40rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.info {
					.top {
						.text {
							margin-right: 20rpx;
							margin-left: 10rpx;
						}
					}
					
					.center {
						margin-top: 20rpx;
						margin-bottom: 20rpx;
						margin-left: 115rpx;
						.small {
							font-size: 18rpx;
							margin-right: 20rpx;
						}
						.color {
							color: #FFD121;
							.size {
								font-size: 40rpx;
							}
						}
					}
					
					.footer {
						border: 1rpx solid #ccc;
						border-right: 0rpx;
						text-align: center;
						border-radius: 30rpx 0 0 30rpx;
						color: #CCCCCC;
						padding: 10rpx 0;
						margin-left: 20rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
