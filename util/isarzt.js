export default function isUserInfo(){
	// 判断用户是否授权
	console.log(999);
	     let userInfo = uni.getStorageSync('user');
	     let token = uni.getStorageSync('token');
		 console.log(userInfo,token);
		 console.log(888);
		 if(userInfo != '' && token != '') return true;
		 return false;
}