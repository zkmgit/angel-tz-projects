import request from "./request.js";

//获取授权用户的所有收藏商品
export async function getCollectionByOpenid(token){
	let url = `getCollectionByOpenid?token=${token}`;
	let res = await request(url);
	return res.data.message;
}