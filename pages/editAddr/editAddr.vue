<template>
	<view class="addr-container">
		<van-cell-group>
		  <van-field
		  class='color'
			label="姓名"
		    value=""
		    placeholder="填写收货人"
		    @change="onChange"
		  />
		  <van-field
		   class='color'
			label="手机号码"
		    value=""
			type="number"
		    placeholder="填写手机号码"
		    @change="onChange"
		  />
		  <van-field
		  class='color'
		    label="详细地址"
		    value=""
		    placeholder="街道门牌信息"
		    @change="onChange"
		  />
		</van-cell-group>
		<view class="footer">
			<view class="btn">
				保存
			</view>
		</view>
		
		
		<!-- <view class="list-item"
		  @tap="handleTap('picker3')">
		  <text class="sub-title">省市区三级选择</text>
		  <view class="item-content">
		    <text class="item-title">绑定值:{{ JSON.stringify(value3) }}</text>
		    <view class="item-value">
		      <text class="item-label">{{ label3 }}</text>
		      <text v-if="!label3"
		        class="item-placeholder">点我打开选择器</text>
		    </view>
		  </view> -->
	</view>
</template>

<script>
	import area from '../../util/area.js';
	export default {
		data(){
			return {
				areaList: area
			}
		},
		methods:{
			getAddr(e){
				console.log(e.target.values)
			},
			setChange(e){
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addr-container {
		background-color: #F4F5F9;
		height: 100vh;
		
		.color {
			color: red;
		}
		
		.footer {
			padding: 60rpx 20rpx 0rpx;
			background-color: #FFFFFF;
			.btn {
				background-color: #0ACE0A;
				color: #FFFFFF;
				height: 80rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>