import request from "./request.js";

//获取授权用户的所有收藏商品
export async function getCollectionByOpenid(token){
	let url = `getCollectionByOpenid?token=${token}`;
	let res = await request(url);
	return res.data.message;
}

//删除授权用户的指定收藏商品
export async function delCollection(token,id){
	let url = `delCollection?token=${token}&id=${id}`;
	let res = await request(url);
	return res.data;
}