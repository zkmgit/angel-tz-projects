<template>
	<view class="user-container">
		<!-- head -->
		<view class="head">
			<view class="img">
				<image src="/static/images/nav/微信图片_202007111331035.png" mode=""></image>
			</view>
			<view class="userInfo">
				<view class="id">
					用户ID：1710221
				</view>
				<view class="name">
					@杀猪饲料
				</view>
			</view>
		</view>
		<!-- user-menu -->
		<view class="user-menu">
			<view class="item">
				<view class="money">
					0.00
				</view>
				<text>余额</text>
			</view>
			<view class="item">
				<view class="money">
					0.00
				</view>
				<text>冻结</text>
			</view>
			<view class="item">
				<view class="money">
					10
				</view>
				<text>积分</text>
			</view>
			<view class="item">
				<view class="money">
					0
				</view>
				<text>成长值</text>
			</view>
		</view>
			
		<van-cell size="large" title-style="color:#000000" title="我的订单" is-link @click="goOrderList('0')"/>
		<view class="wire"></view>
		<!-- 订单状态 -->
		<view class="order-status">
			<view class="item" @click="goOrderList('1')">
				<view class="img">
					<image src="/static/images/order/topay.png" mode=""></image>
				</view>
				<text>待付款</text>
			</view>
			<view class="item" @click="goOrderList('2')">
				<view class="img">
					<image src="/static/images/order/fahuo.png" mode=""></image>
				</view>
				<text>待发货</text>
			</view>
			<view class="item" @click="goOrderList('3')">
				<view class="img">
					<image src="/static/images/order/shouhuo.png" mode=""></image>
				</view>
				<text>待收货</text>
			</view>
			<view class="item" @click="goOrderList('4')">
				<view class="img">
					<image src="/static/images/order/pj.png" mode=""></image>
				</view>
				<text>待评价</text>
			</view>
			<view class="item" @click="goOrderList('5')">
				<view class="img">
					<image src="/static/images/order/shouhou.png" mode=""></image>
				</view>
				<text>售后</text>
			</view>
		</view>
		<view class="wire"></view>
		<van-cell size="large" title-style="color:#000000" title="收货地址" is-link @click='goUserAddr' />
		<view class="wire"></view>
		<van-cell size="large" title-style="color:#000000" title="资金明细" is-link />
		<view class="margin"></view>
		<van-cell size="large" title-style="color:#000000" title="我的收藏" is-link @click='goCollect'/>
		<view class="wire"></view>
		<van-cell size="large" title-style="color:#000000" title="领卷中心" is-link @click="goCoupon"/>
		<view class="margin"></view>
		<van-cell size="large" title-style="color:#000000" title="每日签到" is-link @click="goSignin"/>
		<view class="wire"></view>
		<van-cell size="large" title-style="color:#000000" title="积分卷兑换积分" is-link />
		<view class="wire"></view>
		<van-cell size="large" title-style="color:#000000" title="积分兑换成长值" is-link @click="goIntegral"/>
		
		<view class="phone">
			<text>绑定手机</text>
			<view class="btn">
				<button type="primary" size='mini'>立即绑定</button>
			</view>
		</view>
		
		<van-cell-group>
			<van-cell title-style="color:#000000" title="关于我们" is-link />
			<view class="swire">
				<view class="wire"></view>
			</view>
			<van-cell title-style="color:#000000" title="帮助中心" is-link />
			<view class="swire">
				<view class="wire"></view>
			</view>
			<van-cell title-style="color:#000000" title="清楚缓存" is-link />
			<view class="swire">
				<view class="wire"></view>
			</view>
			<van-cell title-style="color:#000000" title="退出登录" is-link />
			<view class="swire">
				<view class="wire"></view>
			</view>
			<van-cell title-style="color:#000000" title="当前版本" value="8.15.1" />
		</van-cell-group>
	</view>
</template>

<script>
	import isUserInfo from '../../util/isarzt.js';
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goOrderList(status){
				// 前往订单列表
				uni.navigateTo({
					url:`../orderList/orderList?status=${status}`
				})
			},
			goUserAddr(){
				// 前往我的地址
				uni.navigateTo({
					url:'../userAddr/userAddr'
				})
			},
			goCollect(){
				// 前往我的收藏
				uni.navigateTo({
					url:'../collect/collect'
				})
			},
			goSignin(){
				// 前往每日签到
				uni.navigateTo({
					url:'../signin/signin'
				})
			},
			goCoupon(){
				// 前往领卷中心
				uni.navigateTo({
					url:'../coupon/coupon'
				})
			},
			goIntegral(){
				// 前往积分兑换成长值
				uni.navigateTo({
					url:'../integral/integral'
				})
			}
		},
		created(){
			
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
			console.log(222)
		}
	}
</script>

<style lang="scss">
	.user-container {
		background-color: #F4F5F9;
		font-size: 26rpx;
		
		.head {
			display: flex;
			align-items: center;
			background-color: #FF0000;
			overflow: hidden;
			padding: 30rpx 35rpx;
			font-size: 28rpx;
			
			.img {
				float: left;
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				overflow: hidden;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			.userInfo {
				float: left;
				font-size: 26rpx;
				margin-left: 25rpx;
				
				color: #FFFFFF;
				
				.id {
					margin-top: 10rpx;
				}
				
			}
		}
		
		.user-menu {
			display: flex;
			padding: 20rpx 0;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			
			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 2rpx solid #ccc;
				width: 25vw;
			}
		}
		
		.van-cell:after {
			border: 0;
		}
		
		.wire {
			border-top: 2rpx solid #EEEEEE;
		}
	
		.order-status {
			display: flex;
			padding: 20rpx 0;
			background-color: #FFFFFF;
			
			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 25vw;
				font-size: 20rpx;
				color: #333;
				
				.img {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 10rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	
		.phone {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			align-items: center;
			padding: 15rpx 30rpx;
			text-align: center;
			background-color: #FFFFFF;
			color: #000000;
			font-size: 33rpx;
			
		}
		
		.swire {
			background-color: #FFFFFF;
			padding: 0rpx 30rpx;
		}
		
		.margin {
			margin-bottom: 20rpx;
		}
	}
</style>
