<template>
	<view class="car-container">
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
						<van-stepper @plus="add(item.id,item.num)" @minus="sub(item.id,item.num)" :value="item.num" min="1" max="10" disable-input />
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
</template>

<script>
	import isUserInfo from '../../util/isarzt.js';
	import { getShopingCarByUser,updateShoppingCarNumByCarId,delShoppingCar } from '../../api/shopingCar.js';
	export default {
		data() {
			return {
				result: [],
				isShow: true,
				checked:false,
				first:true,
				carData:[],
				// 总金额
				totalPrice: 0
			};
		},
		async onLoad() {
			let pages = getCurrentPages();
			let route = pages[pages.length - 1].route;
			let res = await isUserInfo();
			
			if(res == false) {
				uni.redirectTo({					
					url: `../authorization/authorization?route=${route}`
				})
			}
		},
		created() {
			
		},
		onShow() {
			this.getAllCar();
			console.log('页面加载');
		},
		methods:{
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
			},
			onChange(event) {
			    this.result = event.detail;
				this.calculation();
				
				if(this.first){ 
					this.checked = !this.checked;
					this.first = !this.first;
				}
				
				if(this.result.length == 0){
					this.checked = !this.checked;
					this.first = !this.first;
				}
				
				
			},
			switchBtn(){
				// 切换按钮
				this.isShow = !this.isShow;
			},
			setCheck(){
				this.checked = !this.checked;
				this.first = !this.first;
				if(this.checked){
					this.getAllCarIds().map(v=>{
						this.result.push(v);
					})
					// this.result.push('b');
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
					    duration: 2000
					});
				}
				let { token } = uni.getStorageSync('token');
				// 删除购物车
				await delShoppingCar({token,ids:this.result.join(',')});
				console.log(this.result.join(','));
				// 获取所有的购物车
				this.getAllCar();
				console.log('删除',this.result);
				this.checked = false;
				this.result.length = 0;
				this.first = true;
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
</style>
