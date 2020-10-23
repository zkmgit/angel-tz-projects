<template>
	<view>
		<!-- 搜索栏 -->
		<view class="header">
			<view class="search">
				<input type="text" placeholder="输入搜索关键词" @confirm="search" v-model="value"></input>
				<view @click="search">
					<image class="search-icon" src="/static/images/icon/search.svg"></image>
				</view>
			</view>
			<view>
				<!-- 切换 图标 -->
				<image class="show-type" src="/static/images/icon/list1.svg" v-if="show" @click="changeShowType"></image>
				<image class="show-type" src="/static/images/icon/list2.svg" v-if="!show" @click="changeShowType"></image>
			</view>
		</view>

		<!-- 分隔线 -->
		<view class="line"></view>

		<!-- 导航栏 -->
		<view class="tab">
			<view :class="['option', action==index?'action':'']" v-for="(item, index) in tab" :key="index" @click="selected(index)"
			 v-model="value">{{ item }}
			</view>
		</view>
		<!-- 切换成显示一张图片页面 -->
		<view class="list" v-if="show">
			<view v-for="item in data" :key="item.id">
				<view class="goods">
					<view class="image">
						<image :src="item.show_img" class="img" />
					</view>
					<view class="info">
						<!-- 标题 -->
						<view class="title">{{item.name}}</view>
						<!-- 价格 -->
						<view class="price">
							<view class="price-icon">&yen;{{item.original_price}}</view>
						</view>
						<!-- 已出售件数 -->
						<view class="sales">
							<view class="sales-icon">已售出{{item.sales}}件</view>
						</view>
						<!-- 购物车图标 -->
						<navigator class="cart" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
							<image class="cart-icon" src="../../static/images/goodslist/car.svg" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id"></image>
						</navigator>

					</view>
				</view>
			</view>
			<!-- 没有更多搜索 -->
			<view class="empty" v-show="data.length === 0">
				<image src="../../static/images/goodslist/nomore.png" mode="widthFix" class="empty-img"></image>
				<view class="info-text">
					<view class="text">亲，没有找到您想要的商品</view>
					<view class="text">请换个相关的搜索词试试</view>
				</view>
			</view>
			<view class="no-more" v-show="!isMore">没有更多了</view>
		</view>

		<!-- 切换成显示两张张图片页面 -->
		<view class="goods-container" v-if="!show">
			<view class="goods-box" v-for="item in data" :key="item.id">
			
				<view class="img-box">
					<image :src="item.show_img" class="image" />
				</view>
					
				<view class="detailsbox">
					<!-- 标题 -->
					<view class="goods-title">{{item.name}}</view>
					<!-- 价格 -->
					<view class="price2">
						<view class="price2-icon">&yen;{{item.original_price}}</view>
					</view>
					<!-- 已经出售件数 -->
					<view class="sales2">
						<view class="sales2-icon">已售出{{item.sales}}件</view>
					
					<!-- 购物车图标 -->
						<navigator class="cart2" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
							<image class="cart2-icon" src="../../static/images/goodslist/car.svg" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		getGoodsByGoodsName,
		getGoodsList
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
				goodsList: [],
				data: [],
				tempData: [],
				tab: ["综合", "新品", "销量", "价格"],
				show: true
			};
		},
		methods: {
			changeShowType() {
				this.show = !this.show
			},
			/* 切换数据 */
			async selected(index) {
				switch (index) {
					case 0:
						/* 综合 */
						this.data = JSON.parse(JSON.stringify(this.tempData));
						console.log(this.tempData);
						break;
					case 1:
						/* 新品上市时间排序 */
						this.data = this.data.sort(function(v1, v2) {
							return new Date(v1.add_time).getTime() - new Date(v2.add_time).getTime()
						})
						break;
					case 2:
						/* 已出售排序 */
						this.data = this.data.sort(function(v1, v2) {
							return Number(v2.sales) - Number(v1.sales)
						})
						break;
					default:
						/* 价格排序 */
						this.data = this.data.sort(function(v1, v2) {
							return Number(v1.original_price) - Number(v2.original_price)
						})
						console.log(this.data);
						break;
				}
				/* 导航栏切换 */
				this.action = index;
			},

			// 按下事件
			async search() {
				if (!this.value.trim()) {
					this.data = await getGoodsList();
					return;
				}
				this.data = await getGoodsByGoodsName(this.value);
				this.tempData = this.data;
				console.log(this.data);
			},

			// 初始化页面
			async onLoad() {
				this.data = await getGoodsList();
				this.tempData = JSON.parse(JSON.stringify(this.data));
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
	}

	page,
	view,
	image,
	input {
		display: block;
		box-sizing: border-box;
	}

	.header {
		padding: 32rpx;
		background: #fff;
		display: flex;
		align-items: center;

		.search {
			position: sticky;
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
		position: sticky;
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

				/* 标题 */ 
				.title {
					margin: 24rpx 0 8rpx;
					color: #323233;

				}
				
				/* 价格 */ 
				.price {
					display: flex;
					color: #f44;
					font-size: 30rpx;
					align-items: center;

					.price-icon {
						margin-right: 4rpx;
						
					}
				}

				/* 已经出售 */ 
				.sales {
					display: flex;
					font-size: 30rpx;

					.sales-icon {
						color: gray;
					}
				}

				/* 购物车*/
				.cart {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					padding-bottom: 20px;

					.cart-icon {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
		}

		/* 没有搜索更多 */
		.empty {
			position: relative;

			.empty-img {
				margin: auto;
				width: 400rpx;
				height: 400rpx;
			}

			.info-text {
				/* 文字居中 */
				text-align: center;
				margin-top: -50rpx;

				.text {
					color: #969799;
					font-size: 32rpx;

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

	.goods-container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		box-sizing: content-box;
		padding: 24rpx;
		background-color: #F2f2f2;

		.goods-box {
			width: 339rpx;
			height: 472rpx;
			background-color: #fff;
			overflow: hidden;
			margin-bottom: 24rpx;
			border-radius: 5px;

			.img-box {
				width: 300rpx;
				height: 300rpx;
				overflow: hidden;

				image {
				width: 300rpx;
				height: 300rpx;
				}
			}
			
			.detailsbox{
				width: 300rpx;
				height: 180rpx;
				/* 标题 */ 
				.goods-title{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					font-size: 26rpx;
				}
				
				.price2{
					.price2-icon{
						font-size: 26rpx;
						color: #f44;
					}
				}
				
				
				/* 已出售 */
				.sales2{
					position: relative;
					.sales2-icon{
						font-size: 26rpx;
						color: gray;
					}
					
					/* 购物车 */
					.cart2{
						position: absolute;
						right: 0rpx;
						.cart2-icon{
							width: 36rpx;	
							height: 36rpx;
						}
					}
				}
			
			}
	}
}
</style>
