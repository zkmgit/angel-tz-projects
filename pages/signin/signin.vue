<template>
	<view class="signin-container">
		<ss-calendar :checks="checkList" />
		<button type="default" @click="setChecks">签到</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkList:[]
			};
		},
		methods:{
			setChecks(){
				let day = new Date().getDate();
				if(this.checkList.includes(day)){
					console.log('今天已经签到了');
				}else {
					this.checkList.push(day);
				}
				
			}
		}
	}
</script>

<style lang="scss">

</style>
