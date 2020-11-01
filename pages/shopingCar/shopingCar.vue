<template>
	<view class="container">
		
	
	<view class="car-container" v-if="isEmpty">
		<view class="manager" @click="switchBtn">
			管理
		</view>
		<view class="carList">
			
			<van-checkbox-group :value="result" @change="onChange">
				<view class="car-item" v-for="item in carData" :key="item.id">
					<view class="radio">
						<van-checkbox :name="item.id"></van-checkbox>
					</view>
					<view class="img">
						<image :src="item.showImg" mode=""></image>
					</view>
					<view class="info">
						<view class="title">
							{{ item.goods_name }}
						</view>
						<view class="price">
							￥{{ item.goods_price }}
						</view>
					</view>
					<view class="stepper">
						<van-stepper @plus="add(item.id,item.num)" @minus="sub(item.id,item.num)" :value="item.num" min="1" max="100" disable-input />
					</view>
				</view>
		
			</van-checkbox-group>
	
		</view>
		<view class="bottomFiexd">
			
			<view class="footer">
				<van-checkbox :value="checked" @change="setCheck">全选</van-checkbox>
				<view class="right" v-if="isShow">
					<view class="price">
						<text class="fs">合计</text>:￥{{ totalPrice }}
					</view>
					<view class="btn" @click="settlementCar">
						结算
					</view>
				</view>
				<view class="delBtn" v-else @click="delCar">
					删除
				</view>
			</view>
		</view>
	</view>
	<view class="empty" v-else>
		<van-empty
		  class="custom-image"
		  image="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603463108589&di=cd9735283a9e7e2b67556c398dbda2b5&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F17%2F05%2F23%2F0d2019a7ca7937adaf34a3b15fd7b92e.jpg"
		  description="购物车空空"
		/>
		<view class="btn" @click="goIndex">
			去逛逛
		</view>
	</view>
	</view>
</template>

<script>
	import isUserInfo from '../../util/isarzt.js';
	import { getShopingCarByUser,updateShoppingCarNumByCarId,delShoppingCar } from '../../api/shopingCar.js';
	export default {
		data() {
			return {
				// 当没有购物车时，友好提示
				isEmpty: false,
				result: [],
				// 切换删除或合计的按钮
				isShow: true,
				//全选
				checked:false,
				first:true,
				carData:[],
				// 总金额
				totalPrice: 0
			};
		},
		async onShow() {
			this.checked = false;
			this.result = [];
			let pages = getCurrentPages();
			let route = pages[pages.length - 1].route;
			let res = await isUserInfo();
			
			if(res == false) {
				uni.redirectTo({					
					url: `../authorization/authorization?route=${route}`
				})
			}
			this.getAllCar();
		},
		methods:{
			goIndex(){
				// 前往首页
				uni.switchTab({
					url:'../index/index'
				})
			},
			async add(carId,num){
				console.log(carId,num+1);
				// 购物车商品数量增加
				await updateShoppingCarNumByCarId(carId,num+1);
				await this.getAllCar();
			},
			async sub(carId,num){
				console.log(carId,num-1);
				// 购物车商品数量减少
				await updateShoppingCarNumByCarId(carId,num-1);
				await this.getAllCar();
			},
			// 计算总价格
			calculation(){
				let price = 0;
				if(this.carData.length > 0){
					this.carData.map(v=>{
						if(this.result.includes(v.id+"")) price += v.goods_price*100*v.num;
					})
				}
				
				this.totalPrice = price / 100;
			},
			getAllCarIds(){
				let ids = [];
				this.carData.map(v=>{
					ids.push(v.id + '');
				})
				return ids;
			},
			async getAllCar(){
				let { token } = uni.getStorageSync('token');
				let res = await getShopingCarByUser(token);
				// 获取授权用户的所有购物车
				this.carData = res.result2;
				// 用于计算所有购物车的价格
				this.calculation();
				if(this.carData.length == 0){
					this.isEmpty = false;
					console.log(this.isEmpty);
				}else {
					this.isEmpty = true;
					console.log(this.isEmpty);
				}
			},
			onChange(event) {
				console.log('test',event.detail);
				console.log(this.getAllCarIds().length);
			    this.result = event.detail;
				this.calculation();
				if(this.result.length == this.getAllCarIds().length){
					this.checked = true;
				}else {
					this.checked = false;
				}
				// if(this.first){ 
				// 	this.checked = !this.checked;
				// 	this.first = !this.first;
				// }
				
				// if(this.result.length == 0){
				// 	this.checked = !this.checked;
				// 	this.first = !this.first;
				// }
				
				
			},
			switchBtn(){
				// 切换按钮
				this.isShow = !this.isShow;
			},
			setCheck(){
				this.checked = !this.checked;
				// this.first = !this.first;
				if(this.checked){
					this.getAllCarIds().map(v=>{
						this.result.push(v);
					})
				}else {
					this.result.length = 0;
				}
				this.calculation();
			},
			settlementCar(){
				// 结算购物车
				if(this.result.length == 0){
					uni.showToast({
					    title: '请选中购物车的商品',
						icon:"none",
					    duration: 2000
					});
				}else {
					let carList = [];
					this.carData.map(v=>{
						if(this.result.includes(v.id+"")){
							carList.push(v);
						}
					});
					let list = JSON.stringify(carList);
					uni.navigateTo({
						url:`../confirmOrder/confirmOrder?carList=${list}&total=${this.totalPrice}`
					})
				}
				console.log("结算",this.result);
			},
			async delCar(){
				// 删除购物车
				if(this.result.length == 0){
					uni.showToast({
					    title: '请选中购物车的商品',
						icon:'none',
					    duration: 2000
					});
				}
				let { token } = uni.getStorageSync('token');
				// 删除购物车
				await delShoppingCar({token,ids:this.result.join(',')});
				// 获取所有的购物车
				this.getAllCar();
				this.checked = false;
				this.result.length = 0;
				// this.first = true;
			}
		}
	}
</script>

<style lang="scss">
	.car-container {
		background-color: #F2F2F2;
		font-size: 26rpx;
		padding-bottom: 100rpx;
		
		.manager {
			margin-left: 85vw;
			padding: 15rpx 0;
			font-size: 32rpx;
			color: #6E6E6E;
		}
		
		.carList {
			padding: 0 20rpx;
			background-color: #FFFFFF;
			
			.car-item {
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #EEEEEE;
				background-color: #FFFFFF;
				padding: 20rpx 0;
				
				.radio {
					display: flex;
					align-items: center;
					margin-right: 20rpx;
				}
				
				.img {
					width: 120rpx;
					height: 120rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.info {
					flex: 1;
					margin-left: 20rpx;
					
					.title {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					
					.price {
						margin-top: 20rpx;
						color: red;
						font-size: 24rpx;
					}
				}
				
				.stepper {
					margin-top: 10%;
				}
			}
		}
		
		.bottomFiexd {
			position: fixed;
			bottom: 0;
			width: 100vw;
		}
		
		.footer {
			display: flex;
			// position: fixed;
			// bottom: 0rpx;
			// width: 100vw;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			background-color: #FFFFFF;
			
			.right {
				display: flex;
				align-items: center;
				
				.price {
					margin-right: 15rpx;
					color: #FF7900;
					.fs {
						color: #6E6E6E;
						font-size: 32rpx;
					}
				}
				
				.btn {
					background-color: #FF0000;
					color: #FFFFFF;
					width: 200rpx;
					height: 80rpx;
					border-radius: 50rpx 50rpx 50rpx 50rpx;
					text-align: center;
					line-height: 80rpx;
				}
			}
			
			.delBtn {
				background-color: #FF0000;
				color: #FFFFFF;
				// border: 2rpx solid #FF0000;
				width: 200rpx;
				height: 80rpx;
				border-radius: 50rpx 50rpx 50rpx 50rpx;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}

	.empty {
		background-color: #F6F6F6;
		.btn {
			width: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			// background-color: red;
			margin: 0 auto;
			border-radius: 10rpx;
			background-color: #E75653;
		}
	}
</style>
