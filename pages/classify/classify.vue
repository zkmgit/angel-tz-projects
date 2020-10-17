<template>
	<view class="category-wrap">
		<category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick"
		 @categorySubClick="categorySubClick"></category>
	</view>
</template>

<script>
	import category from "../../components/qiyue-category/qiyue-category.vue";
	import { getClassifiedGoods } from "../../api/goodsDetailApi.js";
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
				this.subCategoryList = category.subCategoryList;
			},
			categorySubClick(category) {
				console.log(category);
			}
		},
		mounted() {
			for (var i = 0; i < 20; i++) {
				var subList = [];
				for (var j = 0; j < 30; j++) {
					subList.push({
						"name": "儿童睡衣男童短袖" + i + "0 " + j,
						"logo": "http://placehold.it/50x50"
					})
				}
				this.categoryList.push({
					"name": "分类" + i,
					"subCategoryList": subList
				})
			}
			this.subCategoryList = this.categoryList[0].subCategoryList;
		}
	}
</script>

<style lang="scss">

</style>