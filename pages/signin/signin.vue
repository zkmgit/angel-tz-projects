<template>
	<view class="content">
	    <ren-calendar ref='ren' :markDays='markDays' disabledAfter="true" @onDayClick='onDayClick'></ren-calendar>
	</view>
</template>

<script>
	 import RenCalendar from '@/components/ren-calendar/ren-calendar.vue'
	    export default {
	        components:{
	            RenCalendar
	        },
	        data() {
	            return {
	                markDays:['2020-10-18','2020-10-19','2020-10-20']
	            }
	        },
			onShow() {
				// 获取当前用户的签到日期
			},
	        methods: {
				
	            onDayClick(data){
					let today = this.$refs.ren.getToday().date;
					
					if(today != data.date){
						return;
					}
					
					if(!this.markDays.includes(today)){
						// 签到入库
						this.markDays.push(data.date);
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
