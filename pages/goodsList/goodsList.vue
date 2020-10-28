<template>
	<view>
		<!-- 搜索栏 -->
		<view class="ceiling">
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
			<!-- <view class="line"></view> -->

			<!-- 导航栏 -->
			<view class="tab">
				<view :class="['option', action==index?'action':'']" v-for="(item, index) in tab" :key="index" @click="selected(index)"
						v-model="value">{{ item }}
					<!-- 用于切换显示  两个切换小图标 -->
					<view class="filter" v-if="index == 3">
						<!-- 上升  升序 --><!-- 下降  降序 -->
						<view :class="['rank', 'ascend', sel=='asc' ?'sel':'']"></view>
						<view :class="['rank', 'descend', sel=='desc' ?'sel':'']"></view>
					</view>	
				</view>
			</view>
		</view>
		<!--1 切换成显示一张图片页面 -->
		<view class="list" v-if="show">
			<view v-for="item in data" :key="item.id">
				<view class="info">
					<view class="img-box">
						<!-- 图片 -->
						<navigator :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
							<image :src="item.show_img" class="img"></image>
						</navigator>
					</view>
					<view class="directioc">
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
							<image class="cart-icon" src="../../static/images/goodslist/car.svg" />
						</navigator>

						<!-- 购物车图标 -->
						<!-- <van-goods-action>
							<van-goods-action-button text="加入购物车" type="warning" @click="addCar" />
						</van-goods-action> -->
					</view>
				</view>
			</view>
			<!-- 没有更多搜索 -->
			<!-- <view class="empty" v-show="data.length === 0">
				<image src="../../static/images/goodslist/nomore.png" mode="widthFix" class="empty-img"></image>
				<view class="info-text">
					<view class="text">亲，没有找到您想要的商品</view>
					<view class="text">请换个相关的搜索词试试</view>
				</view>
			</view>
			<view class="no-more" v-show="!isMore">没有更多了</view> -->
		</view>

		<!-- 2 切换成显示两张张图片页面 -->
		<view class="goods-container" v-if="!show">
			<view class="goods-box" v-for="item in data" :key="item.id">
				<view class="goods-boxs">
					<!-- 图片 -->
					<navigator class="img2-box" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
						<image :src="item.show_img" class="image" />
					</navigator>

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
						</view>

						<!-- 购物车图标 -->
						<navigator class="cart2" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
							<image class="cart2-icon" src="../../static/images/goodslist/car.svg"></image>
						</navigator>
						
						
					</view>
				</view>
			</view>

			<!-- 没有更多搜索 -->
		<!-- 	<view class="emptys" v-show="data.length === 0">
				<image src="../../static/images/goodslist/nomore.png" mode="widthFix" class="empty-imgs"></image>
				<view class="info-texts">
					<view class="texts">亲，没有找到您想要的商品</view>
					<view class="texts">请换个相关的搜索词试试</view>
				</view> -->
			</view>
			<!-- <view class="no-mores" v-show="!isMore">没有更多了</view> -->
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
			async selected(index , isSearch) {
				/* 点亮价格排序小图标 */
				this.page = 3;
					this.isMore = true;
					if( !isSearch && (this.action === index && index !== 3) ) return;
					if( !isSearch && index === 3 ){
						this.sel === 'asc' ?this.sel='desc' :this.sel='asc';
					}else {
						this.sel = "";
					};
				
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
						if(this.isAscend == false){
							this.data = this.data.sort(function(v1, v2) {
								return Number(v1.original_price) - Number(v2.original_price)
							});
							this.isAscend = !this.isAscend;
								
						}else{
							this.data = this.data.sort(function(v1, v2) {
								return Number(v2.original_price) - Number(v1.original_price)
							});
							this.isAscend = !this.isAscend;
						}
						
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
			// 获取所有商品数据
			async getGoodsListData(){
				this.data = await getGoodsList();
				this.tempData = JSON.parse(JSON.stringify(this.data));
			},

			// 初始化页面
			async init() {
				this.getGoodsListData();
				this.search();
			}
		},
		 onLoad(option){
			 this.value = option.keyword;
			 // console.log(this.value,"333");
			 this.init();
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

	.ceiling {
		position: sticky;
		z-index: 999;
		top: 0;

		// 头部
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
		// .line {
		// 	width: 100vw;
		// 	height: 2rpx;
		// 	color: pink;
		// }


		/* 导航栏 */
		.tab {
			width: 100vw;
			height: 88rpx;
			background: #fff;
			display: flex;
			justify-content: space-around;

			.option {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				color: #717171;
				text-align: center;
				font-size: 28rpx;

				.filter {
					position: relative;
					display: inline-block;
					
					.rank {
						position: absolute;
						left: 20rpx;
						width: 12rpx;
						height: 12rpx;
						transform: rotate(45deg);
					}

					.ascend {
						top: -20rpx;
						border-left: 3rpx solid #bbb;
						border-top: 3rpx solid #bbb;
					}

					.descend {
						bottom: -5rpx;
						border-right: 3rpx solid #bbb;
						border-bottom: 3rpx solid #bbb;
					}
					.sel {
						border-color: #f44;
					}
				}
			}

			.action {
				color: #f44;
			}
		}
	}

	/* 第一张图片页面样式 */
	.list {
		width: 750rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		.info {
			width: 720rpx;
			height: 220rpx;
			display: flex;
			margin: 16rpx;
			background: #fff;
			border-radius: 35rpx;

			.img-box {
				width: 220rpx;
				height: 220rpx;

				.img {
					width: 220rpx;
					height: 220rpx;
				}
			}

			/* 所有信心样式一 */
			.directioc {
				display: flex;
				flex-direction: column; //水平布局
				// flex-direction: row;		//垂直布局
				width: 500rpx;
				height: 220rpx;
				margin-top: 20rpx;
				margin-left: 30rpx;

				/* 标题 */
				.title {
					display: flex;
					color: #333;
					font-size: 26rpx;
					padding-bottom: 10rpx;
				}

				/* 价格 */
				.price {
					display: flex;
					color: #f44;
					font-size: 30rpx;
					padding-bottom: 10rpx;

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
					justify-content: flex-end;
					padding-right: 50rpx;

					.cart-icon {
						width: 50rpx;
						height: 50rpx;
						//margin-left: 400rpx;
					}
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



	/* 第二张图片样式 */
	.goods-container {
		width: 720rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: 16rpx;

		.goods-box {
			width: 350rpx;
			height: 570rpx;
			background-color: #fff;
			overflow: hidden;
			border-radius: 20rpx;
			margin-top: 20rpx;

			.goods-boxs {

				/* 图片 */
				.img2-box {
					width: 350rpx;
					height: 350rpx;
					border-radius: 20rpx;

					.image {
						width: 350rpx;
						height: 350rpx;
					}
				}

				/* 所有信心样式二 */
				.detailsbox {
					display: flex;
					width: 350rpx;
					height: 220rpx;
					margin-left: 10rpx;
					flex-direction: column; //水平布局
					justify-content: space-between;

					/* 标题 */
					.goods-title {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						color: #333;
						font-size: 26rpx;
					}

					.price2 {
						display: flex;

						.price2-icon {
							font-size: 30rpx;
							color: #f44;
						}
					}

					/* 已出售 */
					.sales2 {
						display: flex;

						.sales2-icon {
							font-size: 30rpx;
							color: gray;
						}
					}

					/* 购物车 */
					.cart2 {
						display: flex;
						justify-content: flex-end;
						padding-right: 50rpx;

						.cart2-icon {
							width: 50rpx;
							height: 50rpx;
						}
					}
				}
			}
		}

		/* 没有搜索更多 */
		.emptys {
			position: relative;

			.empty-imgs {
				margin-left: 80px;
				width: 400rpx;
				height: 400rpx;
			}

			.info-texts {
				/* 文字居中 */
				text-align: center;
				margin-top: -50rpx;
				margin-right: -100px;

				.texts {
					color: #969799;
					font-size: 32rpx;
				}
			}
		}

		.no-mores {
			margin-right: 150px;
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			color: #999;
			font-size: 26rpx;
		}
	}
</style>
