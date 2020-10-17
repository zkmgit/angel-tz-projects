export default function isUserInfo(){
	// 判断用户是否授权
	let userInfo = {};
	try {
	     userInfo = uni.getStorageSync('user');
	} catch (e) {
	    // error
	}
	 return userInfo;
}