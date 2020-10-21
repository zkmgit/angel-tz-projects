import request from "./request.js"

// 搜索 
export async function getGoodsByGoodsName(goodsName){
	let url = `getGoodsByGoodsName?goodsName=${goodsName}`;
	let res = await request(url);
	console.log(res);
	return res.data.message;
}

