<template>
	<!-- 公告列表 -->
	<view>
		<view class='cashlogs' v-for="item in Announcement" :key="item.id" @click="comment(item.title)">
			<view class='profile'>
				<view class='typeStr'>{{item.title}}</view>
				<view class='dateAdd'>{{item.add_time}}</view>
			</view>
			<view class='amount'> 查看 > </view>
		</view>
	</view>
</template>

<script>
	import {
		getAnnouncementDatas
	} from "../../api/homeApi.js"
	export default {
		data() {
			return {
				Announcement: [], // 公告
			}
		},
		methods: {
			// 公告
			async getAnnouncementData() {
				var res = await getAnnouncementDatas();
				this.Announcement = res;
			},
			
			comment:function(title){
				uni.navigateTo({
					url: `/pages/announcementDetail/announcementDetail?title=${title}`
				});
			},
		},
		created() {
			this.getAnnouncementData();
		},
	}
</script>

<style lang="scss">
	.cashlogs {
		width: 702rpx;
		margin-top: 24rpx;
		margin-left: 24rpx;
		height: 148rpx;
		background: #FFFFFF;
		box-shadow: 0 0 16rpx 0 rgba(36, 44, 69, 0.20);
		border-radius: 8rpx;

		display: flex;
		justify-content: space-between;
		align-items: center;
		.profile {
			display: flex;
			flex-direction: column;
			margin-left: 24rpx;
			.typeStr {
				font-size: 30rpx;
				color: #333333;
			}
			.dateAdd {
				margin-top: 16rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}
		.amount {
			font-size: 24rpx;
			color: #FEB21C;
			margin-right: 24rpx;
			flex-shrink: 0;
		}
	}
</style>
