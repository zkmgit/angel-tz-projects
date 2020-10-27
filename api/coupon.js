import request from "./request.js";

//获取所有的优惠卷
export async function getPreferentialDatas(){
	let url = `getPreferentialDatas`;
	let res = await request(url);
	return res.data.message;
}
//获取用户的优惠卷
export async function queryCollectVouchersById(token){
	let url = `queryCollectVouchersById?token=${token}`;
	let res = await request(url);
	return res.data;
}
//领卷
export async function collectVouchers(data){
	let method = "POST";
	let url = `collectVouchers`;
	let res = await request(url,method,data);
	return res.data;
}