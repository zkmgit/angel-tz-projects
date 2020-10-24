<template>
	<view class="confirm-order">
		
		<van-popup
		  round
		  :show="show"
		  position="bottom"
		  custom-style="height: 50%;"
		  @close="onClose"
		>
			<!-- <button @click="onClose">取消</button> -->
			<!-- <button @click="onClose">确定</button> -->
			<view class="cancel" @click="cancel">
				取消
			</view>
			<view class="determine" @click="determine">
				确定
			</view>
			<van-picker :columns="columns" @change="onChange" />
		</van-popup>
		<!-- 购物车 -->
		<view class="car-container">
			<view class="item" v-for="item in carList" :key="item.id">
				<view class="img">
					<image :src="item.showImg" mode=""></image>
				</view>
				<view class="info">
					<view class="title">
						{{ item.goods_name }}
					</view>
					<view class="price">
						<view class="totalPrice">
							￥{{ item.goods_price }}
						</view>
						<view class="count">
							x {{ item.num }}
						</view>
					</view>
				</view>
			</view>
			
		</view>
	
		<!-- 配送方式 -->
		<view class="delivery">
			<view class="mode">
				<text class="color">配送方式</text>
				<view class="btn">
					<van-checkbox
					  :value="checked"
					  checked-color="#07c160"
					  bind:change="onChange"
					>
					  快递
					</van-checkbox>
				</view>
			</view>
			<view class="line">
				
			</view>
			<view class="addr" @click="goAddAddr" v-if="isShow">
				<image class="img" src="/static/images/confirmOrder/add.png" mode=""></image>
				<text>新增收货地址</text>
			</view>
			<view class="addr-item" @click="goUserAddr" v-else>
				<view class="addr-info">
					<view class="name">
						<view class="size">{{ item.receiver }}</view><view class="">{{ item.phone }}</view> 
					</view>
					<view class="street">
						{{ item.address }}
					</view>
				</view>
				<view class="img">
					<image src="../../static/images/userAddr/right.png" mode=""></image>
				</view>
			</view>
			
			<view class="line">
				
			</view>
			<view class="mark">
				 <van-field
					label="备注"
				    value=""
				    placeholder="如需备注请输入"
				    border="false"
				    bind:change="onChange"
				  />
			</view>
		</view>
		
		<!-- 优惠卷 -->
		<view class="coupon">
			<view class="text">
				使用优惠卷
			</view>
			<van-cell :title="title" is-link @click="showPopup" />
		</view>
		
		<!-- info -->
		<view class="info">
			<van-cell title="商品小计" :value="total" />
			<van-cell title="运费"  value="0" />
			<van-cell title="优惠金额"  :value="discountMoney" />
		</view>
		<!-- footer -->
		<view class="footer">
			<text class="total">合计：</text>
			<view class="red">
				￥<text class="size">{{ num }}</text> 
			</view>
			<text>+0 积分</text>
			<view class="btn" @click="generateOrders">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	import { getPreferentialDatas } from '../../api/coupon.js';
	import { allAddr } from '../../api/addr.js';
	import { addOrder } from '../../api/order.js';
	import { delShoppingCar } from '../../api/shopingCar.js';
	export default {
		data() {
			return {
				isShow: true,
				// 默认使用倒序的地址
				item: {},
				// 合计
				num:0,
				// 保存当前优惠的数组
				discountArr: [],
				// 优惠金额使用优惠卷后
				discountMoney:0,
				total:'',
				// 获取要结算的购物车数据
				carList: [],
				checked:true,
				discount:'请选择使用优惠卷',
				title:'请选择使用优惠卷',
				show:false,
				columns: [],
				// 当前优惠的价钱
			};
		},
		onLoad(e){
			console.log('list',e);
			console.log(JSON.parse(e.carList));
			this.total = e.total;
			this.num = e.total;
			this.carList = JSON.parse(e.carList);
		},
		created() {
		},
		onShow() {
			this.getDefaultAddr();
			this.getAllCoupon();
		},
		methods:{
			async delCar(ids){
				let { token } = uni.getStorageSync('token');
				let data = {
					token,
					ids
				}
				await delShoppingCar(data);
			},
			async getDefaultAddr(){
				let { token } = uni.getStorageSync('token');
				let res = await allAddr(token);
				console.log('地址',res.status);
				if(res.status == 200){
					this.item = res.message[0];
					this.isShow = false;
				}
			},
			goUserAddr(){
				// 前往用户地址
				uni.navigateTo({
					url:`../userAddr/userAddr`
				})
			},
			async generateOrders(){
				if(this.isShow){
					uni.showToast({
						title:'请填写收货地址',
						icon:'none'
					})
					return;
				}
				// 提交订单
				// 订单号
				let { token } = uni.getStorageSync('token');
				let order_number = new Date().getTime();
				// 商品总金额，实付金额，商品数量，所有购物车id，收件人，详细地址,地区
				let goods_total,total_price,goods_ids,recipient,addr,area;
				let total_count = 0;
				let arr = [];
				// 实付金额
				total_price = this.num;
				// 商品总金额
				goods_total = this.total;
				// 所有的购物车
				this.carList.map(v=>{
					// 拼接购物车ids
					arr.push(v.id);
					// 商品数量
					console.log(v)
					total_count += parseInt(v.num);
				})
				goods_ids = arr.join(',');
				// 收件人
				recipient = this.item.receiver;
				// 详细地址
				addr = this.item.address;
				// 地区
				area = this.item.area;
				// 生成订单
				let order = {
					order_number,
					goods_total,
					total_price,
					total_count,
					goods_ids,
					recipient,
					addr,
					area,
					token
				}
				// console.log(order);
				let res = await addOrder(order);
				if(res.status == 200){
					// 删除购物车
					await this.delCar(goods_ids);
					// delShoppingCar
					uni.navigateTo({
						url:'../orderList/orderList?status=all'
					})
				}
			},
			async getAllCoupon(){
				// 获取所有优惠卷
				let res = await getPreferentialDatas();
				res.map(v=>{
					this.columns.push(`${v.title}[${v.condition}元可减${v.money}元]`)
				})
			},
			goAddAddr(){
				// TODO 若没有地址，新增后跳往确认订单页面
				uni.navigateTo({
					url:'../editAddr/editAddr?switch=add'
				})
			},
			determine(){
				// 选中优惠并退出
				this.onClose();
				this.title = this.discount;
				// 清空当前保存优惠的数组
				this.discountArr.length = 0;
				
				var reg = /(\d+)+/gi;
				let r;
				while (r = reg.exec(this.title)) {
					this.discountArr.push(r[1])
				}
				// 若当前总价钱大于优惠卷金额，则进行满减
				if(parseInt(this.total) > parseInt(this.discountArr[0])){
					// 合计重新赋值，重新计算
					this.num = this.total;
					this.num = parseInt(this.total) - parseInt(this.discountArr[1]);
					this.discountMoney = parseInt(this.discountArr[1]);
				}
				// discountMoney			},
			cancel(){
				// 取消并退出
				this.onClose();
			},
			showPopup() {
				// 弹出层显示
				this.show = true;
			 },
			
			 onClose() {
				// 点击空白处关闭
				this.show = false;
			 },
			 onChange(event) {
				 console.log(event);
			     const { picker, value, index } = event.detail;
			     console.log(`当前值：${value}, 当前索引：${index},${picker}`);
				this.discount = value;
			   },
		}
	}
</script>

<style lang="scss">
	.confirm-order {
		background-color: #F2F2F2;
		font-size: 26rpx;
		padding-bottom: 120rpx;
		
		
		.car-container{
			background-color: #FAFAFA;
			
			.item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 15rpx 20rpx;
				
				.img {
					width: 150rpx;
					height: 150rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.info {
					flex: 1;
					margin-left: 20rpx;
					
					.title {
						font-weight: 600;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					
					.price {
						display: flex;
						justify-content: space-between;
						
						.totalPrice {
							color: #FF0000;
							font-size: 30rpx;
							font-weight: 900;
						}
					}
				}
			}
		}
		
		.delivery {
			background-color: #FFFFFF;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			
			.addr-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #F0F0F0;
				padding: 30rpx 20rpx;
				
				.addr-info {
					
					.name {
						display: flex;
						align-items: flex-end;
						
						
						.size {
							font-size: 24rpx;
							margin-right: 20rpx;
						}
					}
					
					.street {
						margin-top: 10rpx;
						font-size: 24rpx;
						color: #CBCBCB;
					}
				}
				
				.img {
					width: 35rpx;
					height: 35rpx;
					margin-right: 30rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			
			.line {
				border-top: 2rpx solid #EEEEEE;
			}
			
			.mode {
				display: flex;
				justify-content: space-between;
				padding: 30rpx 20rpx;
				
				.color{
					color: #666666;
				}
				
				.btn {
					font-size: 32rpx;
					font-weight: 500;
				}
			}
			
			.addr {
				display: flex;
				align-items: center;
				padding: 40rpx 20rpx;
				
				.img {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}
			
			.mark {}
		}
	
		.info {
			margin-top: 20rpx;
		}
		
		.coupon {
			background-color: #FFFFFF;
						
			.text {
				font-size: 28rpx;
				padding: 20rpx 30rpx;
			}
		}
		
		.footer {
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;
			width: 100vw;
			padding: 10rpx 0;
			font-size: 28rpx;
			
			.total {
				margin-left: 200rpx;
			}
			
			.red {
				color: #FF0000;
				margin-right: 10rpx;
				
				.size {
					font-size: 36rpx;
					font-size: 900;
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
				margin-left: 20rpx;
			}
		}
	
		.van-popup {
			// position: relative;
			
			.cancel {
				position: absolute;
				bottom: 8%;
				left: 22%;
				background-color: #F4F5F9;
				color: #0AE84D;
				width: 200rpx;
				height: 80rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 80rpx;
				z-index: 10;
			}
			
			.determine {
				position: absolute;
				bottom: 8%;
				left: 53%;
				background-color: #0AE84D;
				color: #FFFFFF;
				width: 200rpx;
				height: 80rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 80rpx;
				z-index: 10;
			}
		}
	}
</style>
