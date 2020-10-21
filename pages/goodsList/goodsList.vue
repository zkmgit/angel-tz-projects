<template>
	<view>
		<!-- 搜索栏 -->
		<view class="header">
			<view class="search">
				<input type="text" placeholder="输入搜索关键词" @confirm="search" v-model="value" bgColor="#fff"></input>
				<image class="search-icon" src="/static/images/icon/search.svg"></image>
			</view>

			<view>
				<!-- 切换图标 -->
				<image class="show-type" src="/static/images/icon/list1.svg"></image>
			</view>
		</view>

		<!-- 分隔线 -->
		<view class="line"></view>

		<!-- 导航栏 -->
		<view class="tab">
			<view :class="['option', action==index?'action':'']" v-for="(item, index) in tab" :key="index" @click="selected(index)"
			 v-model="value">
				{{ item }}
			</view>
		</view>
		<!-- 切换成显示一张图片页面 -->
		<view class="list">
			<view v-for="item in data" :key="item.id">
				<!-- 跳入商品详情 -->
				<navigator class="goods" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
					{{ item.id }}
					<!-- 切换一张图片 -->
					<view class="image">
						<!-- 第一张图片页面图片地址 -->
						<image :src="item.show_img" class="img" />
					</view>

					<view class="info">
						<view class="title">
							{{item.name}}
						</view>
						<!-- 价格 -->
						<view class="price">
							<view class="price-icon">&yen;{{item.original_price}}</view>
						</view>
						<view class="add_time">
							<view class="add_time-icon">{{item.add_time}}</view>
						</view>
						
						<view class="title">
							{{item.name}}
						</view>
						<!-- 购物车图标 -->
						<view class="cart">
							<image class="cart-icon" src="../../static/images/goodlist/car.svg"></image>
						</view>

					</view>
				</navigator>
			</view>

			<!-- 搜索 -->
			<view class="empty" v-show="data.length === 0">
				<!-- <image src="../../static/images/goodlist/5.png" mode="widthFix" class="empty-img"></image> -->
				<view class="info-">
					<view class="text">没有找到你想要的商品</view>
					<view class="text">请换个相关的搜索词试试</view>
				</view>
			</view>
			<view class="no-more" v-show="!isMore">
				没有更多了
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getGoodsByGoodsName
	} from '../../api/getGoodsByGoodsName.js';
	export default {
		data() {
			return {
				page: 1,
				value: "",
				action: 0,
				sel: "",
				isAscend: false,
				isMore: true,
				data: [],
				tab: ["综合", "新品", "销量", "价格"]
			};
		},
		methods: {

			/* 切换数据 */
			async selected(index) {
	
				switch (index) {
					case 0:
						this.data = await getGoodsByGoodsName(this.value);
						console.log(this.data);
						break;
					case 1:
						this.data = await getGoodsByGoodsName(this.value);
						break;
					case 2:
						this.data = this.data.sort(function(v1,v2){
							return Number(v1.sales) - Number(v2.sales)
						})
						break;
					default:
						this.data = this.data.sort(function(v1, v2) {
							return Number(v1.original_price) - Number(v2.original_price)
						})
						console.log(this.data);
						break;
				}
				/* 导航栏切换 */
				this.action = index;
			},

			async search() {
				this.data = await getGoodsByGoodsName(this.value)
				console.log(this.data);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		padding: 32rpx;
		background: #fff;
		display: flex;
		align-items: center;



		.search {
			position: relative;
			width: 650rpx;
			height: 66rpx;

			input {
				border: 1rpx solid #e3e3e3;
				width: 100%;
				height: 100%;
				border-radius: 30rpx;
				padding-left: 60rpx;
			}

			.search-icon {
				width: 35rpx;
				height: 35rpx;
				position: absolute;
				top: 16rpx;
				right: 40rpx;
			}
		}

		.show-type {
			width: 40rpx;
			height: 40rpx;
			margin-left: 20rpx;
		}
	}

	/* 分栏线 */
	.line {
		width: 100vw;
		height: 2rpx;
		background: #dfdfdf;
	}


	/* 商品搜索列表 */
	.tab {
		width: 100vw;
		height: 88rpx;
		background: #fff;
		display: flex;
		justify-content: space-around;

		.option {
			line-height: 88rpx;

			.filter {
				color: #fa1e26;

				.rank {
					margin: 16rpx;
					width: 718rpx;
					height: 220rpx;
					display: flex;
					background: #fff;
					border-radius: 30rpx;
					overflow: hidden;
					position: relative;
				}

				.ascend {
					width: 220rpx;
					height: 220rpx;
					flex-shrink: 0;
				}

				.descend {
					padding: 16rpx 32rpx 0 24rpx;
					width: 100%;
				}
			}
		}

		.action {
			color: #f44;
		}
	}

	.list {
		padding: 0 30rpx;

		.goods {
			display: flex;
			justify-content: space-between;
			margin: 20rpx 0;
			background-color: #fff;

			.image {
				width: 290rpx;
				height: 290rpx;
				margin-right: 20rpx;

				.img {
					width: 220rpx;
					height: 220rpx;
					flex-shrink: 0;
				}
			}

			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-right: 24rpx;
				font-size: 30rpx;

				.title {
					margin: 24rpx 0 8rpx;
					color: #323233;

				}


				.price {
					display: flex;
					color: #f44;
					font-size: 30rpx;
					align-items: center;

					.price-icon {
						margin-right: 4rpx;

					}
				}

				.sales {
					display: flex;
					font-size: 30rpx;

					.sales-icon {

						color: gray;
					}
				}

				.cart {

					display: flex;
					align-items: center;
					justify-content: flex-end;

					.cart-icon {
						width: 46rpx;
						height: 46rpx;
					}
				}
			}
		}

		.empty {
			padding: 64rpx;
			text-align: center;

			.empty-img {
				width: 320rpx;
			}

			.info {
				margin-top: 32rpx;

				.text {
					color: #969799;
					font-size: 28rpx;
				}
			}
		}

		.no-more {
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			color: #999;
			font-size: 26rpx;
		}
	}
</style>
