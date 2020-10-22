import request from "./request.js"

// 搜索商品
export async function getGoodsByGoodsName(goodsName){
	let url = `getGoodsByGoodsName?goodsName=${goodsName}`;
	let res = await request(url);
	console.log(res);
	return res.data.message;
}
// 商品列表
export async function getGoodsList(){
	let url = `getGoodsList`;
	let res = await request(url);
	return res.data.message;
}
