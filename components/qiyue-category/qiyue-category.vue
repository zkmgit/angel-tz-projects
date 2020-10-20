<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<scroll-view scroll-y style="height:100vh">
					<view class="nav-left-item" v-for="(item,index) in categoryList" @click="categoryClickMain(item,index)" :key="index"
					 :style="index==categoryActive?'color:'+activeTextColor+';background-color:'+activeBackgroundColor:''">
						{{item.name}}
					</view>
				</scroll-view>
			</view>
			<view class="nav-right">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" style="height:100vh" scroll-with-animation>
					<view class="line" v-if="subCategoryList.length == 0">
						<text class="x"></text>
						<text>暂无商品</text>
						<text class="x"></text>
					</view>
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categoryClickSub(item)">
						<view class="" style="margin-right: 10rpx;">
							<image :src="item.show_img" style="width: 160rpx;height: 160rpx;" />
						</view>

						<view class="goodmessage">
							<view class="top">
								{{item.name}}
							</view>
							<view class="goodjoin">
								<view class="goods">
									<view class="price">
										￥{{item.now_price}}
									</view>
									<view class="shopcar">
										<image src="../../static/images/category/car.svg"></image>
									</view>
								</view>
								<view class="car">
									<view class="sale">
										已售{{item.sales}} 件
									</view>
									<view class="appraise">
										评价 +{{item.collectionNum}}积分
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>


			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				scrollHeight: 0,
				categoryActive: 0,
				activeStyle: {
					color: this.activeTextColor,
					backgroundColor: this.activeBackgroundColor
				}
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			activeTextColor: {
				type: String,
				default: '#F24544'
			},
			activeBackgroundColor: {
				type: String,
				// default: '#e5e5e5'
			},
			label: {
				type: String,
				default: 'name'
			},
			imgSrc: {
				type: String,
				default: 'logo'
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick', category)
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick', category)
			}
		},
		mounted() {
			this.categoryActive = this.defaultActive
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight;
				}
			})
		},
		watch: {
			subCategoryList(newValue, oldValue) {

			}
		}
	}
</script>

<style scoped>
	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
	}

	.nav-left-item {
		height: 50px;
		/* border-right: solid 1px #E0E0E0; */
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-left: 4rpx solid #d81e06;
	}

	.nav-right {
		width: 70%;
	}

	.nav-right .line {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav-right .line text {
		font-size: 26rpx;
	}

	.nav-right .line .x {
		margin: 0 20rpx;
		width: 120rpx;
		height: 3rpx;
		background-color: #ccc;
	}

	.nav-right-item {
		float: left;
		text-align: center;
		/* padding: 5px; */
		font-size: 13px;
		display: flex;
		padding: 0rpx 20rpx;
		border-bottom: 1px solid #f7f7f7;
		align-items: center;
	}

	.nav-right-item image {
		width: 60px;
		height: 60px;
	}

	.nav-right-item .goodmessage {
		position: relative;
		text-align: left;
		font-size: 36rpx;
		line-height: 40rpx;
		/* border-bottom: 1px solid #f7f7f7; */
	}

	.nav-right-item .goodmessage .top {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 28rpx;
	}

	.nav-right-item .goodjoin {
		display: flex;
		flex: 1;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-end;
		overflow: hidden;
		font-size: 22rpx;
		line-height: 22rpx;
	}

	.nav-right-item .goodjoin .goods {
		display: flex;
		width: 95%;
		justify-content: space-between;
	}

	.nav-right-item .goodjoin .goods .price {
		color: #d81e06;
		margin-top: 10rpx;
		width: 120rpx;
		font-size: 28rpx;
		font-weight: bold;
		line-height: 40rpx;
	}

	.nav-right-item .goodjoin .car .sale {
		color: #d81e06;
		padding: 2px;
		border: 1px solid #d81e06;
		border-radius: 5rpx;
	}


	.nav-right-item .goodjoin .shopcar {
		display: flex;
		flex: 1;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-end;
		overflow: hidden;
		font-size: 22rpx;
		line-height: 22rpx;
		justify-content: flex-end;
	}

	.nav-right-item .goodjoin .car {
		display: flex;
		width: 95%;
		padding: 30rpx 10rpx;
	}

	.nav-right-item .goodjoin .shopcar image {
		width: 46rpx;
		height: 46rpx;
	}

	.nav-right-item .goodjoin .car .appraise {
		display: flex;
		flex: 1;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-end;
		overflow: hidden;
		font-size: 22rpx;
		line-height: 22rpx;
		justify-content: flex-end;
	}

	.active {
		background: #fff;
		border-left: 4rpx solid #d81e06;
	}

	.padding {
		height: var(--status-bar-height);
		width: 100%;
		top: 0;
		position: fixed;
		background-color: #F24544;
	}
</style>
