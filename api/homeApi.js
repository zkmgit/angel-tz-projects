import request from "./request.js"

// 轮播图
export async function getIndexLunbo(){
	let url = `getIndexLunbo`;
	let res = await request(url);
	return res.data.message;
}
// 公告
export async function getAnnouncementDatas(){
	let url = `getAnnouncementDatas`;
	let res = await request(url);
	return res.data.message;
}
// 公告详情
export async function getAnnouncementDetailsById(title){
	let url = `getAnnouncementDetailsById?title=${title}`;
	let res = await request(url);
	return res.data.message[0];
}
// 宫格分类
export async function getMenuDatasByHome(){
	let url = `getMenuDatasByHome`;
	let res = await request(url);
	return res.data.message;
}
export async function getClassifiedGoods(classificationId){
	let url = `getClassifiedGoods?classificationId=${classificationId}`;
	let res = await request(url);
	return res.data.message[0];
}
// 直播公告
export async function getRooms(){
	let url = `getRooms`;
	let res = await request(url);
	return res.data.message;
}
// 限时秒杀
export async function getSeckillGoods(){
	let url = `getSeckillGoods`;
	let res = await request(url);
	return res.data.message;
}
// 爆品推荐
export async function getRecommendedGoods(){
	let url = `getRecommendedGoods`;
	let res = await request(url);
	return res.data.message;
}
// 商品列表
export async function getGoodsList(){
	let url = `getGoodsList`;
	let res = await request(url);
	return res.data.message;
}
// 拼团
export async function getSpellAGroupGoods(){
	let url = `getSpellAGroupGoods`;
	let res = await request(url);
	return res.data.message;
}