<template>
	<view class="category-wrap">
		<category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick"
		 @categorySubClick="categorySubClick"></category>
	</view>
</template>

<script>
	import category from "../../components/qiyue-category/qiyue-category.vue"
	import { getClassifiedGoods, getMenuDatasByHome} from "../../api/classifiedGoodsApi.js";
	export default {
		components: { category },
		data() {
			return {
				categoryList: [],
				subCategoryList: []
			};
		},
		methods: {
			categoryMainClick(category) {
				this.subCategoryList = this.getClassifiedGoodsData(category.id) ;
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
			}
		},
		mounted() {
			// for (var i = 0; i < 20; i++) {
			// 	var subList = [];
			// 	// for (var j = 0; j < 30; j++) {
			// 	// 	subList.push({
			// 	// 		"name": "分类" + i + "0 " + j,
			// 	// 		"logo": "http://placehold.it/50x50"
			// 	// 	})
			// 	// }
			// 	this.categoryList.push({
			// 		"name": "分类" + i,
			// 		"subCategoryList": subList
			// 	})
			// }
			// this.subCategoryList = this.categoryList[0].subCategoryList;
			
			this.getClassifiedGoodsData(1) 
			this.getMenuDatasByHomeData();
		}
	}
</script>

<style>

</style>