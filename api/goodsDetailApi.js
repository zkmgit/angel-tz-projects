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

//添加购物车
export async function addToShoppingCar(goods){
	let url = `addToShoppingCar`;
	let method = "POST";
	let data = goods;
	console.log("goods",goods)
	let res = await request(url,method,data);
	return res.data.message;
}

//根据购物车内容查询购物车中是否有匹配的数据信息
export async function getShoppingCarByCarContent(token){
	let url = `getShoppingCarByCarContent?token=${token}`;
	let res = await request(url);
	return res.data;
}

//修改购物车中的商品购买数量
export async function updateShoppingCarNumByCarId(carId,num){
	let url = `updateShoppingCarNumByCarId?carId=${carId}&num=${num}`;
	let res = await request(url);
	return res.data.message;
}

//添加收藏
export async function addCollection(obj){
	let url = `addCollection`;
	let method = "POST";
	let data = obj;
	let res = await request(url,method,data);
	return res.data;
}

//删除收藏
export async function delCollection(token){
	let url = `delCollection?token=${token}`;
	let res = await request(url);
	return res.data;
}

//根据openid查询对应的收藏数据信息
export async function getCollectionByOpenid(token){
	let url = `getCollectionByOpenid?token=${token}`;
	let res = await request(url);
	return res.data;
}

//根据openid查询对应的收藏数据信息
export async function getEvaluationByGoodsId(id){
	let url = `getEvaluationByGoodsId?goodsId=${id}`;
	let res = await request(url);
	return res.data;
}