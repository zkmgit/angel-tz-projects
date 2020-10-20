【<template>
	<view class="container">
		<!-- 轮播图 已完成-->
		<view class="swiper-container">
			<swiper class="swiper1" indicator-dots="true" indicator-active-color="#fff" autoplay circular>
				<swiper-item v-for="item in LunboData" :key="item.id">
					<image :src="item.imgPath" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 搜索输入框 -->
		<view class="search">
			<input type="text" placeholder="输入搜索关键词" value="" />
			<image src="/static/images/home/search.svg"></image>
		</view>
		<!-- 公告 跳转页面-->
		<view class="notice-box">
			<view class="notice">
				<image class="notice_icon" src="/static/images/home/notice.png"></image>
				<swiper class="notice_swiper" vertical autoplay circular>
					<!-- <navigator v-for="item in Announcement" :key="item.id" url="/pages/announcementDetail/announcementDetail?title=">
						<swiper-item>
							<view class="notice_itemr">{{item.title}}</view>
						</swiper-item>
					</navigator> -->
					<view>
						<swiper-item>
							<view class="notice_itemr" @click="comment(Announcement[0].title)">{{Announcement[0].title}}</view>
						</swiper-item>
					</view>
				</swiper>
			</view>
			<view class="more">
				<navigator url="/pages/announcementDatas/announcementDatas">更多 ></navigator>
			</view>
		</view>
		<!-- 宫格分类 -->
		<view class="category-box">
			<view class="category-list" v-for="item in MenuDatasByHome" :key="item.id">
				<view class="category-column">
					<image class="category-imgbox" :src="item.img"></image>
					<view class="category-title">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!-- 好礼直播 -->
		<navigator url="/pages/liveStreaming/liveStreaming">
			<image class="live-banner" src="/static/images/home/live.jpg"></image>
		</navigator>
		<!-- 秒杀商品 -->
		<block>
			<van-divider contentPosition="center">限时秒杀</van-divider>
			<view class="miaosha-goods-list" v-for="item in SeckillGoods" :key="item.id">
				<image class="image" :src="item.show_img" />
				<view class="right">
					<view class="goods-title">{{item.name}}</view>
					<view class="count-down">
						<van-count-down millisecond :time="time" format="剩余: HH 时 mm 分 ss 秒" />
					</view>
					<view class="miaosha-price-btn">
						<view class="price">￥{{item.original_price}} <text>￥{{item.now_price}}</text></view>
						<navigator class="goods" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
							<van-button type="danger" size="small" round>立即抢购</van-button>
						</navigator>
					</view>
				</view>
			</view>
		</block>
		<!-- 爆品推荐 -->
		<block>
			<van-divider contentPosition="center">爆品推荐</van-divider>
			<view class="goods-container">
				<view class="goods-box" v-for="item in RecommendedGoods" :key="item.id">
					<navigator class="goods" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
						<view class="img-box">
							<image :src="item.show_img" class="image" />
						</view>
						<view class="goods-title">{{item.name}}</view>
						<view style='display:flex;'>
							<view class="goods-price">¥ {{item.now_price}}</view>
							<view class="goods-price" style='color:#aaa;text-decoration:line-through'>
								¥ {{item.original_price}}
							</view>
						</view>
					</navigator>
				</view>
			
			</view>
		</block>
		<!-- 拼团 -->
		<block>
			<van-divider contentPosition="center">全民拼团</van-divider>
			<view class='tuan'>
				<view class='tuan-item' v-for="item in SpellAGroupGoods" :key="item.id">
					<view class='tuan-goods-pic'>
						<image :src="item.show_img" />
					</view>
					<view class='tuan-title'>{{item.name}}</view>
					<view class='tuan-profile'>尼多熊袜子，适合秋冬天</view>
					<view class='tuan-price'>
						<text class='now'>￥ {{item.now_price}}</text>
						<text class='original'>￥ {{item.original_price}}</text>
					</view>
					<view class="tuan-btn">
						<navigator class="goods" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
							<button type="warn" size="mini">拼团</button>
						</navigator>
					</view>
				</view>
			</view>
		</block>
		<!-- 商品列表 -->
		<block>
			<van-divider contentPosition="center">商品列表</van-divider>
			<view class="goods-container">
				<view class="goods-box" v-for="item in GoodsList" :key="item.id">
					<navigator class="goods" :url="'/pages/goodsDetail/goodsDetail?goodsId='+item.id">
						<view class="img-box" @click="switchToCate(cateItem.id)">
							<image :src="item.show_img" class="image" />
						</view>
						<view class="goods-title">{{item.name}}</view>
						<view style='display:flex;'>
							<view class="goods-price">¥ {{item.now_price}}</view>
							<view class="goods-price" style='color:#aaa;text-decoration:line-through'>
								¥ {{item.original_price}}
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	import {
		getIndexLunbo,
		getAnnouncementDatas,
		getMenuDatasByHome,
		getSeckillGoods,
		getRecommendedGoods,
		getGoodsList,
		getSpellAGroupGoods
	} from "../../api/homeApi.js"
	export default {
		data() {
			return {
				LunboData: [], // 轮播图
				Announcement: [], // 公告
				MenuDatasByHome: [], // 宫格分类
				SeckillGoods: [], // 限时秒杀
				RecommendedGoods: [], // 爆品推荐
				time: 30 * 60 * 60 * 1000, // 倒计时
				GoodsList: [], // 商品列表
				SpellAGroupGoods: [], // 拼团
			}
		},
		methods: {
			// 轮播图
			async getLunboData() {
				var res = await getIndexLunbo();
				// console.log(res);
				this.LunboData = res;
			},
			// 公告
			async getAnnouncementData() {
				var res = await getAnnouncementDatas();
				// console.log(res);
				this.Announcement = res;
			},
			// 宫格分类
			async getMenuDatasByHomeData() {
				var res = await getMenuDatasByHome();
				// console.log(res);
				this.MenuDatasByHome = res;
			},
			// 限时秒杀
			async getSeckillGoodsData() {
				var res = await getSeckillGoods();
				// console.log(res);
				this.SeckillGoods = res;
			},
			// 爆品推荐
			async getRecommendedGoodsData() {
				var res = await getRecommendedGoods();
				// console.log(res);
				this.RecommendedGoods = res;
			},
			// 商品列表
			async getGoodsListData() {
				var res = await getGoodsList();
				// console.log(res);
				this.GoodsList = res;
			},
			// 拼团
			async getSpellAGroupGoodsData() {
				var res = await getSpellAGroupGoods();
				// console.log(res);
				this.SpellAGroupGoods = res;
			},
			// 公告详情
			comment:function(title){
				uni.navigateTo({
					url: `/pages/announcementDetail/announcementDetail?title=${title}`
				});
			},
		
		},
		// onLoad:function(option){				//opthin为object类型，会序列化上页面传递的参数
		// 	console.log(option.title);			//打印出上页面传递的参数
		// },
		created() {
			this.getLunboData();
			this.getAnnouncementData();
			this.getMenuDatasByHomeData();
			this.getSeckillGoodsData();
			this.getRecommendedGoodsData();
			this.getGoodsListData();
			this.getSpellAGroupGoodsData();
		},
	}
</script>

<style lang="scss">
	// 轮播图
	.swiper-container {
		width: 750rpx;
		height: 375rpx;
		position: relative;

		.swiper1 {
			width: 750rpx;
			height: 375rpx;

			image {
				width: 750rpx;
				height: 375rpx;
			}
		}
	}

	// 输入框
	.search {
		position: absolute;
		top: 32rpx;
		left: 25rpx;
		width: 700rpx;
		height: 66rpx;
		display: block;
		box-sizing: border-box;

		input {
			display: block;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 0.8);
			border: 1rpx solid #e3e3e3;
			width: 700rpx;
			height: 66rpx;
			border-radius: 30rpx;
			padding-left: 32rpx;
		}

		image {
			width: 35rpx;
			height: 35rpx;
			position: absolute;
			top: 16rpx;
			right: 32rpx;
			z-index: 99;
		}
	}

	// 公告
	.notice-box {
		display: flex;
		box-sizing: border-box;
		width: 100vw;
		height: 88rpx;
		line-height: 88rpx;
		justify-content: space-between;
		align-items: center;
		padding-right: 32rpx;
		border-bottom: 1rpx solid #efeff4;

		.notice {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 600rpx;

			.notice_icon {
				margin-left: 20rpx;
				width: 30rpx;
				height: 30rpx;
			}

			.notice_swiper {
				height: 88rpx;
				width: 600rpx;

				.notice_itemr {
					padding-left: 16rpx;
					font-size: 24rpx;
					overflow: hidden;
					color: #e64340;
				}
			}
		}

		// 更多公告
		.more {
			color: #666;
			font-size: 24rpx;
		}
	}

	// 宫格分类
	.category-box {
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;

		.category-list {
			width: 150rpx;
			margin-top: 20rpx;
			text-align: center;
			display: inline-block;
			overflow: hidden;

			.category-column {
				width: 100%;
				margin-top: 20rpx;
				overflow: hidden;

				.category-imgbox {
					width: 80rpx;
					height: 80rpx;
				}

				.category-title {
					font-size: 24rpx;
					text-align: center;
					margin-top: 10rpx;
				}
			}
		}
	}

	// 好礼直播
	.live-banner {
		width: 100vw;
		height: 300rpx;
		margin-top: 32rpx;
	}

	// 秒杀商品
	.miaosha-goods-list {
		margin: 20rpx;
		background: #f6f6f6;
		border-radius: 16rpx;
		display: flex;
		padding: 20rpx;
		// justify-content: space-between;
		// flex-wrap: wrap;
		// box-sizing: content-box;
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

			.count-down {
				background: #e64340;
				padding: 8rpx 16rpx;
				border-radius: 16rpx;
				margin-top: 12rpx;
				color: #f6f6f6;
				van-count-down {
					background-color: #f6f6f6;
					color: #f6f6f6;
				}
			}

			.miaosha-price-btn {
				display: flex;
				justify-content: space-between;
				align-items: center;

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

	// 爆品推荐		商品列表
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
				width: 339rpx;
				height: 339rpx;
				overflow: hidden;

				image {
					width: 339rpx;
					height: 339rpx;
				}
			}

			.goods-title {
				width: 280rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				font-size: 24rpx;
				padding: 24rpx 0 0rpx 0;
				color: #000;
				margin-left: 24rpx;
			}

			.goods-price {
				width: 280rpx;
				overflow: hidden;
				font-size: 24rpx;
				padding: 24rpx 0;
				color: #e64340;
				margin-left: 24rpx;
			}
		}
	}

	// 拼单
	.tuan {
		width: 750rpx;
		background-color: #F2f2f2;
		padding-top: 10rpx;

		.tuan-item {
			width: 720rpx;
			margin: auto;
			margin-top: 20rpx;
			background-color: #FFF;
			position: relative;

			.tuan-goods-pic {
				width: 720rpx;
				height: 250rpx;
				overflow: hidden;

				image {
					width: 720rpx;
				}
			}

			.tuan-title {
				margin-top: 20rpx;
				margin-left: 20rpx;
				font-size: 30rpx;
				font-weight: 400;
			}

			.tuan-profile {
				margin-left: 20rpx;
				font-size: 28rpx;
				color: #999;
			}

			.tuan-price {
				margin-left: 20rpx;

				.now {
					font-size: 36rpx;
					color: #e64340;
				}

				.original {
					margin-left: 20rpx;
					font-size: 26rpx;
					color: #999;
					text-decoration: line-through;
				}
			}

			.tuan-btn {
				position: absolute;
				right: 30rpx;
				bottom: 10rpx;
			}
		}
	}
</style>
