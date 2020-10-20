import request from "./request.js";

//获取授权用户的所有的购物车
export async function getShopingCarByUser(token){
	let url = `getShoppingCarByCarContent?token=${token}`;
	let res = await request(url);
	return res.data;
}