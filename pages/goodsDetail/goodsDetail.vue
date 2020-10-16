<template>
	<view class="goodsDetail_container">
		<imgsBanner :imgList='imgList' :currentImg='currentImg'></imgsBanner>
		<view class="title-price-sales">
			<view class="title">
				{{currentGoods.goods_name}}
			</view>
			<view class="price-sales">
				<text class="price">{{currentGoods.nowPrice}}</text>
				<text class="sales">{{currentGoods.sales}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import imgsBanner from '../../components/imgsBanner-tag/imgsBanner-tag.vue';
	import {getGoodsDetailByGoodsId,getGoodsByGoodsId} from "../../api/goodsDetailApi.js";
	export default {
		components:{imgsBanner},
		data() {
			return {
				imgList:[],
				currentImg:0,  //当前默认选中
				currentGoods:{}
			};
		},
		async onLoad() {
			let res = await getGoodsDetailByGoodsId(1);
			let res2 = await getGoodsByGoodsId(1);
			let imgArr = res.show__img.split(",");
			this.imgList = imgArr;
			res.sales = res2.sales;
			res.nowPrice = res2.now_price;
			this.currentGoods = res;
		}
	}
</script>

<style lang="scss" scoped>
	.goodsDetail_container{
		.title-price-sales{
			display: flex;
			flex-direction: column;
		}
	}
</style>
