import request from "./request.js";

//获取当前用户的签到日期getSigninDatas
export async function getSigninDatas(token){
	let url = `getSigninDatas?token=${token}`;
	let res = await request(url);
	return res.data;
}


//签到addSignin
export async function addSignin(data){
	let method = 'POST';
	let url = `addSignin`;
	let res = await request(url,method,data);
	return res.data;
}