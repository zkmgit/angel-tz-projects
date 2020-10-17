import request from "./request.js";

//根据商品id获取对应的商品详情
export async function getGoodsDetailByGoodsId(goodsId){
	let url = `getGoodsDetailByGoodsId?goodsId=${goodsId}`;
	let res = await request(url);
	return res.data.message[0];
}

//根据商品id获取对应的商品信息
export async function getGoodsByGoodsId(goodsId){
	let url = `getGoodsByGoodsId?goodsId=${goodsId}`;
	let res = await request(url);
	return res.data.message[0];
}

