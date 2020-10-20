<template>
	<!-- 公告详情 -->
	<view class="announcementDetail">
		<view v-for="item in Announcements" :key="item.id">
			<view class="title">
				{{item.title}}
			</view>
		</view>
		<view>
			<view class="text">
				{{Announcement.content}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAnnouncementDatas,
		getAnnouncementDetailsById
	} from "../../api/homeApi.js"
	export default {
		data() {
			return {
				Announcements: [], // 公告
				Announcement: [], //  公告详情
			}
		},
		methods: {
			// 公告
			async getAnnouncementData() {
				var res = await getAnnouncementDatas();
				this.Announcements = res;
			},
			// 公告详情
			async getAnnouncementDetailsByIdData(title) {
				var res = await getAnnouncementDetailsById(title);
				console.log(res)
				this.Announcement = res;
				console.log(this.Announcement)
			},
		},
		created() {
			this.getAnnouncementData();
		},
		onLoad(options){
			console.log(options)
			
			this.getAnnouncementDetailsByIdData(options.title);
		}
	}
</script>

<style lang="scss">
	.title {
		width: 100%;
		font-weight: bold;
		border-bottom: 1rpx solid #eaeaea;
		padding-bottom: 32rpx;
	}

	.text {
		margin-top: 32rpx;
		line-height: 64rpx;
		image {
			max-width: 100%;
		}
	}
</style>
