<template>
	<!-- 公告详情 -->
	<view class="notice">
		<view class="title">
			{{title}}
		</view>
		<view class="text" v-for="(item,index) in Announcement.info" :key="index">
			<text>{{item.title}}</text>
			<text v-for="detail in item.activeDatas" :key="detail">
				{{detail}}
			</text>
		</view>
	</view>
</template>

<script>
	import {
		getAnnouncementDetailsById
	} from "../../api/homeApi.js"
	export default {
		data() {
			return {
				title:"",				// 公告标题
				Announcement: []		// 公告详情
			}
		},
		methods: {
			// 公告详情
			async getAnnouncementDetailsByIdData(title) {
				var res = await getAnnouncementDetailsById(title);
				console.log(res)
				this.Announcement = JSON.parse(res.content)
				console.log(this.Announcement)
			},
		},
		created() {
		},
		onLoad(options){
			console.log(options)
			this.getAnnouncementDetailsByIdData(options.title);
			this.title = options.title
		}
	}
</script>

<style lang="scss">
	.notice {
		padding: 32rpx;
		font-size: 26rpx;
		color: #333;
	}
	.title {
		width: 100%;
		font-weight: bold;
		border-bottom: 1rpx solid #eaeaea;
		padding-bottom: 32rpx;
	}
	.text {
		margin-top: 32rpx;
		line-height: 64rpx;
	}
</style>
