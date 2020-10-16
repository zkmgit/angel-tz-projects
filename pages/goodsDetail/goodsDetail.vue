<template>
	<view class="goodsDetail_container">
		<imgsBanner :imgList='imgList' :currentImg='currentImg'></imgsBanner>
		<view class="goods-info">
			<view class="title-price-sales">
				<view class="title">
					{{currentGoods.goods_name}}
				</view>
				<view class="price-sales">
					<text class="price">￥{{currentGoods.nowPrice}}</text>
					<text class="sales">已有{{currentGoods.sales}}人购买</text>
				</view>
			</view>
			<view class="bink"></view>
			<view class="content">
				<image v-for="(item,index) in content" :src="item" mode="" @tap="previewOpen" :key="index"></image>
			</view>
			<previewImage ref="previewImage" :opacity="0.8" :imgs="imgs" :descs="descs"></previewImage>
			<view class="goods-info-fx">
				<view class="item">
					<image src="../../static/images/share/share1.png" mode=""></image>
					<button open-type="share" role="button" aria-disabled="false"></button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import imgsBanner from '../../components/imgsBanner-tag/imgsBanner-tag.vue';
	import {
		getGoodsDetailByGoodsId,
		getGoodsByGoodsId
	} from "../../api/goodsDetailApi.js";
	import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	export default {
		components: {
			imgsBanner,
			previewImage
		},
		data() {
			return {
				imgList: [], //当前展示图数据
				currentImg: 0, //当前默认选中
				currentGoods: {}, //当前商品数据信息
				content: [], //当前商品图片
				imgs: [] //当前商品图片
			};
		},
		async created() {
			//根据商品id获取对应的商品数详情信息
			let res = await getGoodsDetailByGoodsId(1);
			//根据商品id获取对应的商品数据信息
			let res2 = await getGoodsByGoodsId(1);
			//将获取出来的图片转换成数组的形式，以便循环展示
			let imgArr = res.show__img.split(",");
			this.imgList = imgArr;
			res.sales = res2.sales;
			res.nowPrice = res2.now_price;
			this.currentGoods = res;
			this.content = res.goods_content.split(",");
			this.imgs = res.goods_content.split(",");
		},
		methods: {
			//打开预览e
			previewOpen(e) {
				var param = e.currentTarget.dataset.src;
				var _this = this;
				uni.previewImage({
					current: param,
					urls: _this.imgs
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsDetail_container {
		font-size: 32rpx;

		.bink {
			width: 100vw;
			height: 60rpx;
			background-color: #F2F2F2;
		}
		.goods-info{
			border-top: 1rpx solid #ccc;
			border-bottom: 1rpx solid #ccc;
		}
		.goods-info-fx {
			position: absolute;
			right: 35rpx;
			bottom: 150rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 130rpx;

			.item {
				width: 50rpx;
				height: 50rpx;
				right: 130rpx;
				top: 70rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				background: #fff;
				z-index: 20;

				button {
					position: absolute;
					height: 100%;
					width: 100%;
					opacity: 0;
					z-index: 99;
				}

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}

		.title-price-sales {
			display: flex;
			flex-direction: column;
			margin: 30rpx;

			.title {
				box-sizing: border-box;
				padding: 0 35rpx;
				font-size: 32rpx;
				line-height: 1.4;
				color: #000;
				margin-bottom: 28rpx;
			}

			.price-sales {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.price {
					color: #e64340;
					font-size: 20pt;
					margin-left: 30rpx;
				}

				.sales {
					color: #ccc;
					font-size: 10pt;
					margin-left: 30rpx;
				}
			}
		}

		.content {
			image {
				width: 100vw;
				height: 818rpx;
				margin: 0rpx auto;
				margin-top: -12rpx;
			}
		}
	}
</style>
