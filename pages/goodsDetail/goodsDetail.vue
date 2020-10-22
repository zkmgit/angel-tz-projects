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
					<view class="goods-info-fx">
						<view class="item">
							<image src="../../static/images/share/share1.png"></image>
							<button class="weui-btn" type="primary" open-type="share"></button>
						</view>
					</view>
				</view>
			</view>
			<view class="bink"></view>
			<van-cell title="请选择" is-link @click="checkType" />
			<view class="goodsIntroduction">
				商品介绍
			</view>
			<view class="content">
				<image v-for="(item,index) in content" :src="item" mode="" @tap="previewOpen" :key="index"></image>
			</view>
			<previewImage ref="previewImage" :opacity="0.8" :imgs="imgs" :descs="descs"></previewImage>
		</view>
		<van-goods-action>
			<van-goods-action-icon icon="chat-o" text="客服" @click="clickCustomerService" />
			<van-goods-action-icon icon="cart-o" text="购物车" @click="clickShoppingCar" :info="shoppingCarNum" />
			<van-goods-action-icon icon="like" text="收藏" @click="clickCollection" v-if="isCollect" />
			<van-goods-action-icon icon="like-o" text="收藏" @click="clickCollection" v-else />
			<van-goods-action-button text="加入购物车" type="warning" @click="addCar" />
			<van-goods-action-button text="立即购买" @click="buyNow" />
		</van-goods-action>
		<echone-sku :show="popupShow" theme-color="#ff0000" :combinations="combinations" :specifications="specifications"
		 :default-select-index="selectedIndex" @close="handleClose" @confirm="handleConfirm"></echone-sku>
	</view>
</template>

<script>
	import imgsBanner from '../../components/imgsBanner-tag/imgsBanner-tag.vue';
	import echoneSku from '@/components/echone-sku/echone-sku.vue';
	import isUserInfo from '../../util/isarzt.js';
	import {
		getGoodsDetailByGoodsId,
		getGoodsByGoodsId,
		addToShoppingCar,
		getShoppingCarByCarContent,
		updateShoppingCarNumByCarId,
		addCollection,
		delCollection,
		getCollectionByOpenid
	} from "../../api/goodsDetailApi.js";
	import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue';
	export default {
		components: {
			imgsBanner,
			previewImage,
			echoneSku
		},
		data() {
			return {
				imgList: [], //当前展示图数据
				currentImg: 0, //当前默认选中
				currentGoods: {}, //当前商品数据信息
				content: [], //当前商品图片
				imgs: [], //当前商品图片
				shareText: "", //保存分享标题
				shareImgs: "", //保存分享图片
				shoppingCarNum: 0,
				currentGoodsId: "",
				isCollect: false, //是否收藏
				specifications: [],
				combinations: [],
				popupShow: false,
				selectedIndex: 0
			};
		},
		onShareAppMessage() { //分享触发事件
			this.shareText = this.currentGoods.goods_name;
			this.shareImgs = this.imgs[0]
			return {
				title: this.shareText,
				path: '/pages/tabBar/component/component',
				imageUrl: this.shareImgs,
				success: ret => {
					console.log("成功");
				},
				fail: err => {
					console.log("失败")
				}
			}
		},
		async onLoad(options) {
			let id = options.goodsId;
			this.currentGoodsId = id;
			if (!id) {
				id = 1;
			}
			//根据商品id获取对应的商品数详情信息
			let res = await getGoodsDetailByGoodsId(id);
			//根据商品id获取对应的商品数据信息
			let res2 = await getGoodsByGoodsId(id);
			//将获取出来的图片转换成数组的形式，以便循环展示
			let imgArr = res.show_img.split(",");
			this.imgList = imgArr;
			res.sales = res2.sales;
			res.nowPrice = res2.now_price;
			this.currentGoods = res;	
			let content = res.goods_content.split(",");
			this.content = res.goods_content.split(",");
			this.imgs = res.goods_content.split(",");
			//获取出所有的商品规格数据信息
			let specifications = JSON.parse(res.specifications);
			if (specifications.length == 0) {
				this.specifications = [{
					"name": "",
					"id": "1",
					"list": []
				}];
				this.combinations = [{
					"id": '1',
					"value": this.currentGoods.goods_name,
					"image": this.imgList[0],
					"price": this.currentGoods.nowPrice,
					"stock": this.currentGoods.stores
				}];
			} else if (specifications.length == 1) {
				this.specifications = [{
					"name": specifications[0].name,
					"id": "1",
					"list": specifications[0].content
				}];
				let tempArr = [];
				specifications[0].content.map((e, index) => {
					tempArr.push({
						"id": index + 1,
						"value": e,
						"image": this.imgList[0],
						"price": this.currentGoods.nowPrice,
						"stock": this.currentGoods.stores
					})
				});
				this.combinations = tempArr;
			} else {
				let tempArr = [];
				//拼接specifications数组所需数据信息
				specifications.map((e, index) => {
					tempArr.push({
						"name": e.name,
						"id": index + 1,
						"list": e.content
					});
				})
				this.specifications = tempArr;
				//拼接combinations数组所需的数据信息
				let tempArr2 = [];
				for(let i=0;i<tempArr[0].list.length;i++){
					for(let j=0;j<tempArr[1].list.length;j++){
						let tempStr = tempArr[0].list[i] + "," + tempArr[1].list[j];
						tempArr2.push({"id":j+1,"value":tempStr,"image":this.imgList[0],"price":this.currentGoods.nowPrice,"stock":this.currentGoods.stores});
					}
				}
				this.combinations = tempArr2;
			}
			
			
			//判断该商品是否已经有收藏了
			let token = uni.getStorageSync('token').token || "";
			let checkCollection = await getCollectionByOpenid(token);
			let _this = this;
			if(checkCollection.status == 200){
				let res = checkCollection.message;
				res.map(e => {
					if(e.goods_id == id){
						_this.isCollect = true;
					}
				});
			}
			let ress = await getShoppingCarByCarContent(token);
			if(ress.status == 201){
				this.shoppingCarNum = 0;
			}else{
				this.shoppingCarNum = ress.message.result2.length;
			}
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
			},
			//选择商品规格触发事件
			checkType() {
				this.popupShow = true;
			},
			//点击底部导航栏客服
			clickCustomerService() {
				uni.showToast({
					title: "不好意思哦，该功能尚未实现",
					icon: "none"
				})
			},
			//点击底部导航栏购物车
			clickShoppingCar() {
				uni.switchTab({
					url:"../shopingCar/shopingCar"
				})
			},
			//点击底部导航栏收藏
			async clickCollection() {
				let pages = getCurrentPages();
				let route = pages[pages.length - 1].route;
				let res = await isUserInfo();
				if(res == false){
					uni.redirectTo({
						url: `../authorization/authorization?route=${route}`
					})
				}else{
					this.isCollect = !this.isCollect;
					let token = uni.getStorageSync('token').token;
					if(this.isCollect){
						let goodsId = this.currentGoods.id;
						let goodsName = this.currentGoods.goods_name;
						let goodsShowImg = this.imgList[0];
						let tempObj = {token,goodsId,goodsName,goodsShowImg};
						console.log("tempObj tempObj ",tempObj );
						let res2 = await addCollection(tempObj);
						console.log("res2res2res2",res2);
						if(res2.status == 200){
							uni.showToast({
								title:"收藏成功"
							})
						}
					}else{
						let res2 = await delCollection(token);
						if(res2.status == 200){
							uni.showToast({
								title:"取消收藏"
							})
						}
					}
				}
			},
			//加入购物车
			async addCar() {
				let pages = getCurrentPages();
				let route = pages[pages.length - 1].route;
				let res = await isUserInfo();
				if(res == false){
					uni.redirectTo({
						url: `../authorization/authorization?route=${route}`
					})
				}else{
					this.popupShow = true;
				}
			},
			//立即购买
			async buyNow() {
				let pages = getCurrentPages();
				let route = pages[pages.length - 1].route;
				let res = await isUserInfo();
				if(res == false){
					uni.redirectTo({
						url: `../authorization/authorization?route=${route}`
					})
				}else{
					this.popupShow = true;
				}
			},
			//关闭商品规格选择框
			handleClose(e) {
				this.popupShow = false;
			},
			//选择商品规格框中的立即购买按钮
			async handleConfirm(e) {
				let token = uni.getStorageSync('token').token;
				let res = await getShoppingCarByCarContent(token);
				if(res.message.result2.length > 0){
					let tempObj = res.message.result2.find(r => r.content == e.value);
					if(tempObj){
						let num = Number(tempObj.num) + Number(e.count);
						let temp = await updateShoppingCarNumByCarId(tempObj.id,num);
						if(temp == "成功"){
							this.popupShow = false;
							uni.showToast({
								title:"购物车中已有该商品，已为您自动添加数量了",
								icon:"none"
							})
						}
					}else{
						let res2 = await addToShoppingCar({"goodsId":this.currentGoods.id,"goodsName":this.currentGoods.goods_name,"goodsPrice":e.price,"num":e.count,"showImg":this.imgList[0],"userId":res.message.id,"content":e.value});
						if(res2 == "成功"){
							this.popupShow = false;
							uni.showToast({
								title:"成功加入购物车",
								icon:"none"
							})
						}
					}
				}else{
					let res2 = await addToShoppingCar({"goodsId":this.currentGoods.id,"goodsName":this.currentGoods.goods_name,"goodsPrice":e.price,"num":e.count,"showImg":this.imgList[0],"userId":res.message.id,"content":e.value});
					if(res2 == "成功"){
						this.popupShow = false;
						uni.showToast({
							title:"成功加入购物车",
							icon:"none"
						})
					}
				}
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

		.goods-info {
			border-top: 1rpx solid #ccc;
			border-bottom: 1rpx solid #ccc;

			image {
				width: 46rpx;
				height: 46rpx;
			}
		}


		.title-price-sales {
			display: flex;
			flex-direction: column;
			margin: 30rpx 20rpx;

			.title {
				box-sizing: border-box;
				padding: 0 35rpx;
				font-size: 32rpx;
				line-height: 1.4;
				color: #000;
				margin-bottom: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.price-sales {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				justify-content: space-between;

				.goods-info-fx {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 130rpx;

					.item {
						width: 50rpx;
						height: 50rpx;
						right: 130rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						background: #fff;

						button {
							position: absolute;
							width: 50rpx;
							height: 50rpx;
							opacity: 0;
						}
					}
				}

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

		.goodsIntroduction {
			margin: 20rpx 20rpx 30rpx 20rpx;
			font-weight: 600;
		}

		.content {
			margin-bottom: 200rpx;

			image {
				width: 100vw;
				height: 880rpx;
				margin: 0rpx auto;
				margin-top: -12rpx;
			}
		}
	}
</style>
