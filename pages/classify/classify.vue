<template>
	<view class="category-wrap">
		<!-- <van-search value="" placeholder="请输入搜索关键词" @click="change" :use-right-icon-slot="true"/> -->
		<!-- van-search shape="round" background="rgba($color: #000000, $alpha: 0);" placeholder="输入搜索关键词" @click="change" />
		-->
		<view class="search" @click="change">
			<input type="text" placeholder="输入搜索关键词" value="" />
			<image src="/static/images/category/search.svg"></image>
		</view>
		<category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick"
		 @categorySubClick="categorySubClick" :defaultActive="activeIndex" ></category>
	</view>
</template>

<script>
	import category from "../../components/qiyue-category/qiyue-category.vue"
	import {
		getClassifiedGoods,
		getMenuDatasByHome
	} from "../../api/classifiedGoodsApi.js";
	export default {
		components: {
			category,
		},
		data() {
			return {
				categoryList: [],
				subCategoryList: [],
				activeIndex:0
			};
		},
		onLoad(options){
			var res = uni.getStorageSync('sell')
			this.activeIndex = res
			console.log("接收index:" + this.activeIndex)
			// this.getAnnouncementDetailsByIdData(classificationId);
		},
		onShow(){
		},
		methods: {
			categoryMainClick(category) {
				this.subCategoryList = this.getClassifiedGoodsData(category.id) ;
				console.log("接收id:"+category.id)
				// this.subCategoryList = this.getClassifiedGoodsData(category.id);
			},
			categorySubClick(category) {
				
				console.log(category);
				uni.navigateTo({
					url: `/pages/goodsDetail/goodsDetail?goodsId=`+category.id
				})
			},
			async getClassifiedGoodsData(classificationId) {
				var data = await getClassifiedGoods(classificationId);
				this.subCategoryList = data;
			},
			async getMenuDatasByHomeData() {
				var data = await getMenuDatasByHome();
				this.categoryList = data;
			},
			change() {
				// 跳转到的地址
				console.log(123)
				uni.navigateTo({
					url: `../goodsList/goodsList`
				})
			}
		},
		mounted() {
			this.getClassifiedGoodsData(1)
			this.getMenuDatasByHomeData();
		}
	}
</script>

<style lang="scss">
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
</style>
