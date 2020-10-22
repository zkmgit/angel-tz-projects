<template>
	<view class="category-wrap">
		<view class="search" @click="change">
			<input type="text" placeholder="输入搜索关键词" value="" />
			<image src="/static/images/category/search.svg"></image>
		</view>
		<category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick"
		 @categorySubClick="categorySubClick" :defaultActive="activeIndex"></category>
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
				activeIndex: 0
			};
		},
		onShow() {
			var id = uni.getStorageSync('sell')
			var index = uni.getStorageSync('index')
			console.log(index)
			this.activeIndex = index
			console.log("接收index:" + this.activeIndex)
			this.getClassifiedGoodsData(id)
		},
		onLoad(options){
			var id = uni.getStorageSync('sell')
			var index = uni.getStorageInfoSync('index')
			this.activeIndex = index;
			// console.log("接收index:" + this.activeIndex)
			// this.getAnnouncementDetailsByIdData(classificationId);
		},
		methods: {
			categoryMainClick(category) {
				this.subCategoryList = this.getClassifiedGoodsData(category.id);
				console.log("接收id:" + category.id)
				// this.subCategoryList = this.getClassifiedGoodsData(category.id) ;
			},
			categorySubClick(category) {
				
				console.log(category);
				uni.navigateTo({
					url: `/pages/goodsDetail/goodsDetail?goodsId=` + category.id
					// url: `../goodsDetail/goodsDetail?goodsId=`+category.id
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
				uni.navigateTo({
					url: `../goodsList/goodsList`
				})
			}
		},
		created() {
			var id = uni.getStorageSync('sell')
			this.getClassifiedGoodsData(id)
			
		},
		mounted() {
			// this.getClassifiedGoodsData(id)
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
