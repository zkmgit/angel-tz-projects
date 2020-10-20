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
			<view class="item">
				<view class="img">
					<image src="/static/images/nav/微信图片_202007111331035.png" mode=""></image>
				</view>
				<view class="info">
					<view class="title">
						幼儿园园服韩版男女童装春秋季班服英伦学院分白色衬衫小学生校服1
					</view>
					<view class="price">
						<view class="totalPrice">
							￥236
						</view>
						<view class="count">
							x 1
						</view>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="img">
					<image src="/static/images/nav/微信图片_202007111331035.png" mode=""></image>
				</view>
				<view class="info">
					<view class="title">
						幼儿园园服韩版男女童装春秋季班服英伦学院分白色衬衫小学生校服1
					</view>
					<view class="price">
						<view class="totalPrice">
							￥236
						</view>
						<view class="count">
							x 1
						</view>
					</view>
				</view>
			</view>
			
			<view class="item">
				<view class="img">
					<image src="/static/images/nav/微信图片_202007111331035.png" mode=""></image>
				</view>
				<view class="info">
					<view class="title">
						幼儿园园服韩版男女童装春秋季班服英伦学院分白色衬衫小学生校服1
					</view>
					<view class="price">
						<view class="totalPrice">
							￥236
						</view>
						<view class="count">
							x 1
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
			<view class="addr" @click="goAddAddr">
				<image class="img" src="/static/images/confirmOrder/add.png" mode=""></image>
				<text>新增收货地址</text>
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
			<van-cell title="商品小计" value="2846" />
			<van-cell title="运费"  value="0" />
			<van-cell title="优惠金额"  value="0" />
		</view>
		<!-- footer -->
		<view class="footer">
			<text class="total">合计：</text>
			<view class="red">
				￥<text class="size">2843</text> 
			</view>
			<text>+0 积分</text>
			<view class="btn">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:true,
				discount:'请选择使用优惠卷',
				title:'请选择使用优惠卷',
				show:false,
				columns: ['一人一份[满0元可减1元]', '新店优惠[满2000元可减25元]', '新店优惠[满2000元可减25元]', '新店优惠[满1000元可减25元]'],
			};
		},
		methods:{
			goAddAddr(){
				uni.navigateTo({
					url:'../editAddr/editAddr'
				})
			},
			determine(){
				// 选中优惠并退出
				this.onClose();
				this.title = this.discount;
			},
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
		background-color: #F4F5F9;
		font-size: 26rpx;
		padding-bottom: 120rpx;
		
		
		.car-container{
			background-color: #FFFFFF;
			
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
