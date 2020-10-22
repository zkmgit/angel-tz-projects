import request from "./request.js";

//获取授权用户的所有的购物车
export async function getShopingCarByUser(token){
	let url = `getShoppingCarByCarContent?token=${token}`;
	let res = await request(url);
	return res.data.message;
}

// 
//修改购物车的数量
export async function updateShoppingCarNumByCarId(carId,num){
	let url = `updateShoppingCarNumByCarId?carId=${carId}&num=${num}`;
	let res = await request(url);
	return res.data.message;
}

// 删除购物车
export async function delShoppingCar(data){
	let url = `delShoppingCar`;
	let method = "POST";
	let res = await request(url,method,data);
	return res.data.message;
}