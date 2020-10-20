import request from "../api/request.js";

export default async function isUserInfo(){
	// 判断用户是否授权
	     let userInfo = uni.getStorageSync('user');
	     let data = uni.getStorageSync('token');
		 if(userInfo && data){
			let url = "checktoken?token="+data.token;
			let res = await request(url);
			if(res.data.status == 200){
				return res.data.message[0];
			}else{
				return false;
			}	
		 }else{
			return false;
		 }
}