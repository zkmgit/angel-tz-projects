<template>
<!-- 授权登录 -->
    <div class="login">
      <h3 class="login__title">天使童装</h3>
      <h3 class="login__m1">申请获取以下权限</h3>
      <h3 class="login__m2">获得你的公开信息(昵称，头像等)</h3>
      <button class="login__btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
	  <view class="footer">
	  	<view class="btn" @click="goIndex">前往天使童装首页</view>
	  </view>
    </div>
</template>
<script>
	import isUserInfo from '../../util/isarzt.js';
export default {
  data() {
    return {
		prePage: '',
    }
  },
  created () {
  },
  methods: {
	  goIndex(){
		  console.log(111)
		  uni.switchTab({
		  	url:'../index/index'
		  })
	  },
    bindGetUserInfo (e) {
		let _this = this;
		console.log("test")
      if (e.mp.detail.userInfo) {
        //用户按了允许授权按钮
        // console.log(e.mp.detail.userInfo)
		// 用户的信息
		let { nickName,city,province,country,avatarUrl } = e.mp.detail.userInfo;
		// let userInfo = {
		// 	nickName,
		// 	addr: province + "," + city + ',' + country,
		// 	avatarUrl
		// }
		// console.log(userInfo);
		uni.login({
		  provider: 'weixin',
		  success: function (loginRes) {
			  var {code} = loginRes;
			  console.log("code",code)
			  uni.request({
			      url: 'http://47.112.194.162:5959/gentoken', //仅为示例，并非真实接口地址。
				  method: 'POST',
			      data: {
			          code,
					  nickName,
					  addr: province + "-" + city + '-' + country,
					  avatarUrl
			      },
				  dataType: 'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					} ,
			      success: (res) => {
			          console.log("data",res.data.token);
					  uni.setStorage({
					    key: 'token',
					    data: res.data
					  })
					  // 缓存用户信息
					  uni.setStorage({
					    key: 'user',
					    data: e.mp.detail.userInfo
					  })
					  
					  if(_this.prePage.indexOf("index") > 0 || _this.prePage.indexOf("shopingCar") > 0 || _this.prePage.indexOf("user") > 0 ){
						  console.log("switchTab");
						  uni.switchTab({
						  	url: _this.prePage
						  })
					  }else{
						  console.log("navigateTo");
						  uni.navigateTo({
						  	url: _this.prePage
						  })
					  }
					  
					  
			      }
			  });
		    
			// 2 
		  }
		});
		//1. uni.login => code
		//2. code => 调用后台获取openid存储到数据库，并根据用户信息生成一个token,返回前端,并存储到本地存储
		//3. 调用后台接口getUserInfo 传递参数token,解析出用户的信息如头像，昵称，并返回给前端
		//4. 把用户信息存储到本次存储或者是中 
		
		// 每次启动进入 app.vue  onlaunch生命周期
		// 每次进来的时候，可以检测是否有token, 无，则 执行 1 2 3 4
		// 有token  则 执行  3 4
		        
      } else {
        uni.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
          }
        })
      }
    }
  },
  mounted () {
    uni.setNavigationBarTitle({title: '授权登录'})
  },
  onLoad(e) {
	console.log(e.route);
	this.prePage = '..' + e.route.substring(5);
	console.log(this.prePage);
  }
}
</script>
<style lang="less">
	.footer {
		padding: 20rpx;
		.btn {
			background-color: #CCCCCC;
			color: #FFFFFF;
			height: 90rpx;
			border-radius: 10rpx;
			text-align: center;
			line-height: 90rpx;
		}
	}
	
.login{
    padding: 10% 0 0 0;
    &__title{
      color: #FDBB0D;
      font-size: 25px;
      text-align: center
    }
    &__m1{
      color: #282828;
      font-size: 20px;
      margin: 4% 0 0 4%;
    }
    &__m2{
      color: #9d9d9d;
      font-size: 20px;
      margin: 4% 0 0 4%;
    }
    &__btn{
      width: 94%;
      background-color: #FDBB0D;
      margin-top: 5%;
    }
}
</style>
