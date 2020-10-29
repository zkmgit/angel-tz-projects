<template>
	<view class="content">
	    <ren-calendar ref='ren' :markDays='markDays'  @onDayClick='onDayClick'></ren-calendar>
	</view>
</template>

<script>
	import { getSigninDatas,addSignin } from '../../api/signin.js';
	 import RenCalendar from '@/components/ren-calendar/ren-calendar.vue'
	    export default {
	        components:{
	            RenCalendar
	        },
	        data() {
	            return {
	                markDays:[]
	            }
	        },
			onShow() {
				// 获取当前用户的签到日期
				this.getSigninDatas();
			},
	        methods: {
				async getSigninDatas(){
					let { token } = uni.getStorageSync('token');
					let res = await getSigninDatas(token);
					console.log('获取',res);
					if(res.status == 200){
						console.log(res.message)
						this.markDays = JSON.parse(res.message.checkInTime);
					}
				},
	            async onDayClick(data){
					console.log('test',data);
					let today = this.$refs.ren.getToday().date;
					
					if(today != data.date){
						return;
					}
					if(!this.markDays.includes(today)){
						// 签到入库
						this.markDays.push(data.date);
						let { token } = uni.getStorageSync('token');
						let checkInTime = JSON.stringify(this.markDays);
						let res = await addSignin({token,checkInTime});
						console.log('入库',res);
						
					}else {
						uni.showToast({
							title:'今日已签到',
							icon:'none'
						})
					}
					
	            }
	        }
	    }
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
