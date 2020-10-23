import request from "./request.js";

//生成订单
export async function addOrder(data){
	let url = `addOrder`;
	let method = "POST";
	let res = await request(url,method,data);
	return res.data;
}
// 获取用户所有的订单
export async function allOrder(token){
	let url = `allOrder?token=${token}`;
	let res = await request(url);
	return res.data;
}

// 获取用户指定的订单的所有购物车
export async function allCarByOrderId(token,id){
	let url = `allCarByOrderId?token=${token}&id=${id}`;
	let res = await request(url);
	return res.data;
}
