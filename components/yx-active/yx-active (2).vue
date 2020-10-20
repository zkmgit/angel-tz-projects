<template>
	<view>
		<view class="header-body" id="box">
			<view style="height:120rpx;">
				<view class="header-search">
					<view style="height:10px;"></view>
					<view class="header-flex">
						<input type="text" placeholder="请输入需要查找的姓名" v-model="value"/>
						<view class="clear-icons"><uni-icons type="clear" size="22"  @click="clear" v-if="value"></uni-icons></view>
						<uni-icons type="search" size="26" class="search-icons" @click="search"></uni-icons>
					</view>
				</view>
			</view>
			
			<!-- 渲染标题的index下标对应着他的内容区 -->
			<!-- 标题渲染区 -->
			<view style="height:100rpx;">
				<view class="header-List">
					<view v-for="(item,index) in ActiveTitle" :key="index" class="herder-active">
							<view @click="logan(index)" :class="{active:ins==index}">{{item.name}}</view>
					</view>
				</view>
			</view>
			
			<!-- 本部门内容区 -->
			<view class="active-content">
				<view v-for="(time,key) in obje" :key="key" v-if="ins==0">
						<view class="list-item"  v-if="time.ment" >
							<image :src="time.type" class="picture"></image>
								<view class="box">	
								<view>{{time.name}}</view>
							</view>
						</view>
				</view>
			</view>
			
			<!-- 所有部门内容区 -->
				<view class="active-content">
					<view v-for="(time,key) in obje" :key="key" v-if="ins==1">
							<view class="list-item" v-if="!time.ment">
								<image :src="time.type" class="picture"></image>
								<view class="box">
									<view class="content-fize">{{time.name}}</view>
								</view>
							</view>
					</view>
				</view>
			
			<!-- loading加载 -->
			<view style="text-align: center;font-size:15px;margin:10px auto;">{{loading}}</view>
		</view>
	</view>
</template>
<script>
import uniIcons  from '../../components/uni-icons/uni-icons.vue'	
	export default {
		components:{
			uniIcons
		},
		data(){
			return {
				ActiveTitle:[{name:'本部门'},{name:'所有部门'}], //标题
				ins:0, //通过此下标来判断点击标题以及对应的显示内容
				value:'',
				obje:[{
					name:"杨雄",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"开发部",
					type:'../../static/yx-active/bumen.png',
				},
				{
					name:"周兴林",
					type:'../../static/yx-active/xingming.png',
					ment:'食品部'
				},
				{
					name:"财务部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"国服马超",
					type:'../../static/yx-active/xingming.png',
					ment:'安全部'
				},
				{
					name:"技术部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"国服韩信",
					type:'../../static/yx-active/xingming.png',
					ment:'打野发育部'
				},
				{
					name:"运营部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿Sir",
					type:'../../static/yx-active/xingming.png',
					ment:'保卫部'
				},
				{
					name:"运维部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿三",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"运输部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿四",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"安全部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿五",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"卫生部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿六",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"客服部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿七",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"销售部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿八",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"医疗部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿九",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"食品部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿爸",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"贩卖人体器官部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度阿妈",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"坑蒙拐骗部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度皇子",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"上班滑水部",
					type:'../../static/yx-active/bumen.png'
				},
				{
					name:"印度亚索",
					type:'../../static/yx-active/xingming.png',
					ment:'开发部'
				},
				{
					name:"上班摸鱼部",
					type:'../../static/yx-active/bumen.png',
				}],
				loading:'正在加载中',
				width:0
			}
		},
		/* 
		TODO 监听用户下拉触底事件
		 */
		async onReachBottom(){
			this.loading = "加载完成"
		},
		onShow() {   /* 模拟初始化数据加载 */
			this.loadin()
		},
		/* 获取屏幕宽度 */
		mounted() {
			var box = document.getElementById("box")
			this.width = window.getComputedStyle(box).width
		},
		methods:{
			/* 
			TODO 清空input搜索框
			 */
			clear(){
				this.value = ""
				console.log("删除")
			},
			/* 
			TODO 搜索
			 */
			search(){
				this.loadin()
				console.log("搜索")
			},
			/* 
			  TODO 初始化下拉提示
			 */
			logan(index){
				this.ins = index
				this.loadin()
				if(index == 0){
				  this.loading = "正在加载中我是内容1"
				}else if(index == 1){
				  this.loading = "正在加载中我是内容2"	
				}
				console.log(this.ins)
			},
			/* 
			TODO 模拟loading延迟加载 
			*/	
			loadin(){
				uni.showLoading({
				    title: '数据加载中',
					mask:true
				});
				setTimeout(function(){
					uni.hideLoading();
				},1000) 
			}		
		}
	}
</script>
<!-- 1px:2upx -->
<style>
	page{background-color:rgb(248,248,248);}
	.header-body{width:100%;margin:0px auto;}
	input:focus { outline: none; }
	.header-search{
		width:100%;
		height:64px;
		margin:0px auto;
	    border:1px solid  #FFFFFF;
		background-color: #FFFFFF;
		position: fixed;
		z-index:9999;
	}
	.header-search input{
		width:68%;
		padding-left:10px;
		height:45px;
		border-top-left-radius:6px;
		border-bottom-left-radius:6px;
		font-size:15px;
		background-color: rgb(239,244,250);
	}
	.header-List{
		width:100%;
		height:55px;
		line-height:55px;
		font-size:15px;
		display: flex;
		background-color: #FFFFFF;
		justify-content:space-around;
		z-index:999;
		position: fixed;
	}
	.herder-active{
		width:100%;
		display: flex;
		justify-content:space-around;
	}
	.herder-active view{
		width:100%;
		text-align: center;
	}
	
	@keyframes currentLine{
		0%{
			transform: scale(0.5);
		} 
		100%{
			transform: scale(1);
		}
	}
	.active{
		border-bottom:3px solid rgb(100,147,250);
		animation:currentLine 200ms forwards;
	}
	.search-icons{
		width:48px;
		height:36px;
		border-top-right-radius:6px;
		border-bottom-right-radius:6px;
		padding-top:9px;
		background-color:rgb(239,244,250);
	}
	.clear-icons{
		width:40px;
		height:35px;
		padding-top:10px;
		background-color:rgb(239,244,250);
	}
	.list-item{
		width:95%;
		margin:0px auto;
		border-bottom:1px solid rgb(236,241,246);
		height:50px;
		font-size:15px;
		display: flex;
	}
	.list-item view{
		padding-left:6px;	
	}
	.list-item .box{
		padding-top:6px;
		line-height:40px;
	}
	.picture{
		width:38px;
		height:36px;
		padding-top:7px;
	}
	.active-content{
		background-color: #FFFFFF;
		margin:10px auto;
	}
	.header-flex{
		display: flex;
		justify-content: center;
	}
	.content-fize{
		line-height:37px;
		font-size:16px;
		font-weight: 400;
	}
</style>
