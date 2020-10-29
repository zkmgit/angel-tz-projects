<template>
	<view class="addr-container">
		<van-popup
		  round
		  :show="show"
		  position="bottom"
		  custom-style="height: 50%;"
		  @close="onClose"
		>
			<view class="cancel" @click="cancel">
				取消
			</view>
			<view class="determine" @click="determine">
				确定
			</view>
			<van-picker :columns="columns" @change="onChange" />
		</van-popup>
		
		<view class="shoping-addr" @click="getAddr" v-if="choose != 'edit'">
			<view class="text">
				获取微信收货地址
			</view>
			<view class="img">
				<image src="../../static/images/userAddr/right.png" mode=""></image>
			</view>
		</view>
		
		<view class="addr-list">
			<view class="province common" @click="showPopup('province')">
				<view class="text">
					省份
				</view>
				<view class="choose">
					{{ province }}
				</view>
				<view class="img">
					<image src="../../static/images/userAddr/right.png" mode=""></image>
				</view>
			</view>
			
			<view class="city common" @click="showPopup('city')" v-if="city != ''">
				<view class="text">
					城市
				</view>
				<view class="choose">
					{{ city }}
				</view>
				<view class="img">
					<image src="../../static/images/userAddr/right.png" mode=""></image>
				</view>
			</view>
			
			<view class="area common" @click="showPopup('district')" v-if="district != ''">
				<view class="text">
					区县
				</view>
				<view class="choose">
					{{ district }}
				</view>
				<view class="img">
					<image src="../../static/images/userAddr/right.png" mode=""></image>
				</view>
			</view>
			
		</view>
		
		
		<van-cell-group>
		  <van-field
		    class='color'
			label="姓名"
		    :value="name"
		    placeholder="填写收货人"
		    @change="setName"
		  />
		  <van-field
		    class='color'
			label="手机号码"
		    :value="phone"
			type="number"
		    placeholder="填写手机号码"
		    @change="setPhone"
		  />
		  <van-field
		    class='color'
		    label="详细地址"
		    :value="address"
		    placeholder="街道门牌信息"
		    @change="setAddress"
		  />
		</van-cell-group>
		<view class="Identify">
			<textarea maxlength='60' value="" v-model="IdentifyValue" placeholder="请输入格式为收货地址,电话号码,收件人" />
			<view class="IdentifyBtn" @click="IdentifyAddr">
				智能识别
			</view>
		</view>
		<view class="footer">
			<view class="btn" @click="save">
				保存
			</view>
			<view class="del-btn" @click="del(addrItem.id)" v-if="choose != 'add'">
				删除该地址
			</view>
		</view>
		
	</view>
</template>

<script>
	import area from '../../util/area.js';
	import { addrRecognition } from '../../util/addrRecognition.js';
	import { delAddr,addAddr,editAddr } from '../../api/addr.js';
	export default {
		data(){
			return {
				// 用于隐藏
				choose:'',
				// 用于编辑的地址回显
				addrItem:{},
				areaList: area,
				province: '请选择',
				city: '',
				name: '',
				address: '',
				phone: '',
				district: '',
				checked:true,
				show:false,
				// 判断当前的省市区
				currAddr: '',
				// 获取监听的地址
				value: '',
				// 存放省市区
				columns: [],
				IdentifyValue: ''
			}
		},
		
		onLoad(e){
			this.choose = e.switch;
			
			if(e.item != undefined) {
				this.addrItem = JSON.parse(e.item);
				this.name = this.addrItem.receiver;
				this.address = this.addrItem.address;
				this.phone = this.addrItem.phone; 
				var arr = this.addrItem.area.split(',');
				this.province = arr[0];
				this.city = arr[1];
				this.district = arr[2];
			}
		},
		methods:{
			IdentifyAddr(){
				// 智能识别地址
				let res = addrRecognition(this.IdentifyValue);
				if(res != undefined){
					console.log(res);
					this.name = res.name;
					this.address = res.detailAddr;
					this.phone = res.phone[0]; 
					this.province = res.provinceName;
					this.city = res.cityName;
					this.district = res.countyName;
				}
			},
			setAddress(e){
				console.log('address',e.detail);
				this.address = e.detail;
			},
			setName(e){
				this.name = e.detail;
			},
			setPhone(e){
				this.phone = e.detail;
			},
			async del(id){
				// 删除地址
				let { token } = uni.getStorageSync('token');
				let res = await delAddr(token,id);
				if(res.status == 200){
					// 删除成功
					uni.navigateBack({
						delta: 1,
						animationType:'slide-out-right'
					})
				}
			},
			determine(){
				// 选中优惠并退出
				this.onClose();
				switch(this.currAddr){
					case 'province' :
						this.province = this.value;
						this.city = '请选择';
						break;
					case 'city' :
						this.city = this.value;
						this.district = '请选择';
						break;
					case 'district' :
						this.district = this.value;
						break;
				 }
			},
			cancel(){
				// 取消并退出
				this.onClose();
			},
			showPopup(e) {
				// 根据省市区进行渲染
				this.columns.length = 0;
				this.columns.push('请选择');
				this.currAddr = e;
				// 根据省市区对数组进行处理
				switch(this.currAddr){
					case 'province' :
					// 获取所有的省份
						for(let key in area.province_list){
							this.columns.push(area.province_list[key]);
						}
						break;
					case 'city' :
					// 根据省获取对应的所有市
						// 获取当前的省份的key
						let provinceKey;
						for(let key in area.province_list){
							if(area.province_list[key] == this.province){
								provinceKey = key;
								break;
							}
						}
						// 根据key去获取所有的市
						for(let key in area.city_list){
							if(key.substring(0,2) == provinceKey.substring(0,2)){
								this.columns.push(area.city_list[key]);
							}
						}
						
						break;
					case 'district' :
						// 获取当前市的key
						let cityKey;
						for(let key in area.city_list){
							if(area.city_list[key] == this.city){
								cityKey = key;
								break;
							}
						}
						// 根据key去获取所有的区县
						for(let key in area.county_list){
							if(key.substring(0,4) == cityKey.substring(0,4)){
								this.columns.push(area.county_list[key]);
							}
						}
						break;
				 }
				// 弹出层显示
				this.show = true;
			 },
			 onClose() {
				// 点击空白处关闭
				this.show = false;
			 },
			 onChange(event) {
				 const { picker, value, index } = event.detail;
				this.value = value;
			},
			async save(){
				if(this.name == ''){
					uni.showToast({
						icon:'none',
						title:'姓名未填写'
					})
					return;
				}
				
				if(this.province == '请选择' || this.city == '请选择' || this.district == '请选择'){
					uni.showToast({
						icon:'none',
						title:'地区未填写完整'
					})
					return;
				}
				
				let str = this.phone;
				if(str.length != 11){
					uni.showToast({
						title:'号码位数不正确',
						icon:'none'
					})
				    return;
				}
				let reg = /^[1][3-9]\d{9}$/g;
				console.log();
				if(!reg.test(str)){
					uni.showToast({
						title:'号码格式错误',
						icon:'none'
					})
					return;
				}
				// 
				if(this.address == ''){
					uni.showToast({
						title:'请填写详细地址',
						icon:'none'
					})
					return;
				}
				// token,receiver,phone,address,area,id
				let { token } = uni.getStorageSync('token');
				let item = {
					token,
					phone:this.phone,
					receiver:this.name,
					address:this.address,
					area:this.province + ',' + this.city + ',' + this.district,
					id:this.addrItem.id
				}
				console.log('item',item);
				// 注册地址 编辑地址
				let res;
				if(this.choose == 'add'){
					res = await addAddr(item);
				}else {
					res = await editAddr(item);
				}
				
				if(res.status == 200){
					// 回退到上一页
					uni.navigateBack({
						delta: 1,
						animationType:'slide-out-right'
					})
				}else {
					uni.showToast({
						title:res.message
					})
				}
			},
			getAddr(){
				let _this = this;
				// 获取微信地址
				uni.chooseAddress({
				  success(res) {
					console.log(res);
					_this.name = res.userName;
					_this.address = res.detailInfo;
					_this.phone = res.telNumber; 
					_this.province = res.provinceName;
					_this.city = res.cityName;
					_this.district = res.countyName;
					
				    // console.log()
				    // console.log(res.postalCode)
				    // console.log()
				    // console.log(res.cityName)
				    // console.log(res.countyName)
				    // console.log(res.detailInfo)
				    // console.log()
				    // console.log(res.telNumber)
				  }
				})
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
		font-size: 28rpx;
		
		.Identify {
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx;
			background-color: #FFFFFF;
			
			.IdentifyBtn {
				font-size: 25rpx;
				background-color: #0ACE0A;
				color: #FFFFFF;
				height: 80rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 80rpx;
			}
			
			textarea {
				height: 80rpx;
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
		
		.shoping-addr {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			border-top: 2rpx solid #CCCCCC;
			
			.text {
				color: #FF0000;
				font-size: 24rpx;
			}
			
			.img {
				width: 30rpx;
				height: 30rpx;
				
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.color {
			color: red;
		}
		.addr-list {
			background-color: #FFFFFF;
			padding: 0 30rpx;
			margin-top: 20rpx;
			
			.common {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 25rpx 0rpx;
				border-bottom: 2rpx solid #F6F7F8;
				background-color: #FFFFFF;
				
				.text {}
				
				.choose {
					margin-right: 225rpx;
				}
				
				.img {
					width: 30rpx;
					height: 30rpx;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
				
			}
		}
		
		
		.footer {
			padding: 60rpx 20rpx 0rpx;
			background-color: #FFFFFF;
			.btn,.del-btn {
				background-color: #0ACE0A;
				color: #FFFFFF;
				height: 80rpx;
				border-radius: 10rpx;
				text-align: center;
				line-height: 80rpx;
			}
			.del-btn {
				margin-top: 20rpx;
				background-color: #FF0000;
			}
		}
	}

</style>