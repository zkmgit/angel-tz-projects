<template>
	<view class="category-wrap">
			<!-- <van-search value="" placeholder="请输入搜索关键词" @click="change" :use-right-icon-slot="true"/> -->
			
			<van-search
			  shape="round"
			  background="rgba($color: #000000, $alpha: 0);"
			  placeholder="输入搜索关键词"
			  @click="change"
			/>
		<category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick"
		 @categorySubClick="categorySubClick" :defaultActive="activeIndex" ></category>
	</view>
</template>

<script>
	import category from "../../components/qiyue-category/qiyue-category.vue"
	import { getClassifiedGoods, getMenuDatasByHome} from "../../api/classifiedGoodsApi.js";
	export default {
		components: { category, },
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
			},
			categorySubClick(category) {
				console.log(456)
				console.log(category);
			},
			async getClassifiedGoodsData(classificationId){
				var data = await getClassifiedGoods(classificationId);
				this.subCategoryList = data;
			},
			async getMenuDatasByHomeData(){
				var data = await getMenuDatasByHome();
				this.categoryList = data;
			},
			change(){
				// 跳转到的地址
				uni.navigateTo({
					url:"/"
				})
			}
		},
		mounted() {
			this.getClassifiedGoodsData(1) 
			this.getMenuDatasByHomeData();
		}
	}
</script>

<style>

</style>
