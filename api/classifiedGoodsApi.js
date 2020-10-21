import request from "./request.js";

//根据分类id获取对应的分类商品信息
export async function getClassifiedGoods(classificationId){
	let url = `getClassifiedGoods?classificationId=${classificationId}`;
	let res = await request(url);
	return res.data.message;
}


//获取首页八宫格数据信息
export async function getMenuDatasByHome(){
	let url = `getMenuDatasByHome`;
	let res = await request(url);
	return res.data.message;
}