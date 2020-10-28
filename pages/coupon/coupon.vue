<template>
	<view class="coupon-container">
		<view class="tag">
			<view v-for="item in tagList" :class="item.selected == 'true' ? 'selected tag-item' : 'tag-item' " :key="item.index" @click="setSelected(item.index)">
				{{ item.title }}
			</view>
		</view>
		
		<view class="coupon-list" v-if="isShow">
			<view class="coupon-item" v-for="item in couponList">
				<view class="img">
					<image src="../../static/images/coupon/coupons-active.svg" mode=""></image>
				</view>
				
				<view class="info">
					<view class="top">
						<van-tag color="#FFD121">代金券</van-tag>
						<text class="text">{{ item.title }}</text>
					</view>
					<view class="center">
						<view class="">
							
						</view>
						<view class="right">
							<text class="small">{{ item.condition }}</text><text class="color">￥<text class="size">{{ item.money }}</text></text>
						</view>
					</view>
					<view class="footer" @click="useCoupon(item.id,index)">
						{{ text }}
					</view>
				</view>
			</view>
			
		</view>
		<view class="empty" v-else>
			<image src="../../static/images/coupon/coupons-empty.svg" mode=""></image>
			<view class="text">
				暂无优惠卷
			</view>
		</view>
		
	</view>
</template>

<script>
	import UTC from '../../util/UTC.js';
	import { getPreferentialDatas,queryCollectVouchersById,collectVouchers } from '../../api/coupon.js';
	export default {
		data() {
			return {
				couponList:[],
				index:0,
				text:'立即领取',
				isShow:true,
				 tagList:[
					 {
						 "index": 0,
						 "title": "可领卷",
						 "selected": "true"
					 },
					 {
						"index": 1,
					 	"title": "已领卷",
					 	"selected": "false"
					 },
					 {
						 "index": 2,
					 	"title": "已失效",
					 	"selected": "false"
					 }
				 ],
				 // 优惠卷
				 couponData:[]
			};
		},
		async onLoad(options) {
			// let id = options.id;
			// console.log(id)
		},
		methods: {
			async addCoupon(id){
				// 领卷
				let { token } = uni.getStorageSync('token');
				let res = await collectVouchers({token,id});
				
				if(res.status == 200){
					uni.showToast({
						title:'领卷成功',
						icon:'none'
					})
				}
			},
			useCoupon(id,index){
				// 使用优惠卷
				switch(index){
					case 0:
					// console.log(id);
					// 领卷
					this.addCoupon(id);
					this.getCouponData();
						break;
					case 1:
					uni.switchTab({
						url:'../index/index'
					})
						break;
					case 2:
					uni.showToast({
						title:'已过期',
						icon:'none'
					})
						break;
				}
			},
			setSelected(key){
				
				if(key == 0) {
					console.log(key)
					this.text = "立即领取";
				}else if(key == 1){
					console.log(key)
					this.text = "立即使用";
				}else {
					console.log(key)
					this.text = "过期/已结束";
				}
				this.tagList.map(v=>{
					v.selected = "false"
				})
				this.tagList[key].selected = "true";
				this.couponList = this.couponData[key];
				if(this.couponList.length == 0){
					this.isShow = false;
				}else {
					this.isShow = true;
				}
				this.index = key;
			},
			// 获取优惠卷
			async getCouponData(){
				console.log('test');
				// 根据优惠卷状态进行处理
				// 可领卷
				let canVolume = [];
				// 已领卷
				let alreadyVolume = [];
				// 失效
				let Invalidation = [];
				
				let temp = [];
				
				let res = await getPreferentialDatas();
				canVolume = res;
				
				let { token } = uni.getStorageSync('token');
				// 已领卷
				let res2 = await queryCollectVouchersById(token);
				console.log('test',res2);
				if(res2.status != 201){
					// 用户的优惠卷
					let invalidationIds = [];
					let alreadyVolumeIds = [];
					res2.message.map(v=>{
						// 当前时间大于领卷时间+30天，则过期
						let time = new Date(UTC(v.add_time)).getTime() + 1000*30*24*60*60;
						if(new Date().getTime() > time){
							invalidationIds.push(v.preferential_id);
						}else {
							alreadyVolumeIds.push(v.preferential_id);
						}
					})
					
					// 失效的卷
					invalidationIds.map(v=>{
						canVolume.map(c=>{
							if(v == c.id) Invalidation.push(c);
						})
					})
					// 已领卷
					alreadyVolumeIds.map(v=>{
						canVolume.map(c=>{
							if(v == c.id) alreadyVolume.push(c);
						})
					})
					//可领卷
					canVolume.map(c=>{
						if(!alreadyVolumeIds.includes(c.id)) temp.push(c);
					})
				}else {
					temp = canVolume;
				}
				this.couponData = [];
				this.couponData.push(temp);
				this.couponData.push(alreadyVolume);
				this.couponData.push(Invalidation);
				this.couponList = this.couponData[0];
				if(this.couponList.length == 0){
					this.isShow = false;
				}
				console.log(this.couponData)
			}
		},
		onShow() {
			// 获取优惠卷
			this.getCouponData();
		}
	}
</script>

<style lang="scss">
	.coupon-container {
		background-color: #F4F5F9;
		height: 100vh;
		font-size: 28rpx;
		
		.tag {
			display: flex;
			justify-content: space-around;
			background-color: #EEEEEE;
			
			.tag-item {
				background-color: #EEEEEE;
				width: 33%;
				text-align: center;
				padding: 30rpx 0;
			}
			
			.selected {
				color: #FEB31C;
				// color: #FFD121;
				background-color: #FFFFFF;
			}
		}
	
		.coupon-list {
			background-color: #F7F8FA;
			padding: 0rpx 20rpx 0;
			
			.coupon-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #FFFFFF;
				padding: 30rpx 0;
				box-shadow: 2px 2px #EEEEEE;
				margin-top: 20rpx;
				
				.img {
					width: 150rpx;
					height: 150rpx;
					margin-left: 40rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.info {
					display: flex;
					flex-direction: column;
					.top {
						.text {
							margin-right: 20rpx;
							margin-left: 10rpx;
						}
					}
					
					.center {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						margin-top: 20rpx;
						margin-bottom: 20rpx;
						margin-right: 20rpx;
						
						.right {
							.small {
								font-size: 18rpx;
								margin-right: 20rpx;
								color: #9C9C9C;
							}
							.color {
								color: #FFD121;
								.size {
									font-size: 40rpx;
								}
							}
						}
						
						
					}
					
					.footer {
						border: 1rpx solid #ccc;
						border-right: 0rpx;
						text-align: center;
						border-radius: 30rpx 0 0 30rpx;
						color: #CCCCCC;
						padding: 10rpx 0;
						margin-left: 20rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	
		.empty {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 70rpx;
				
			image {
				width: 150rpx;
				height: 150rpx;
				margin-bottom: 40rpx;
			}
			
			.text {
				
			}
		}
	}
</style>
