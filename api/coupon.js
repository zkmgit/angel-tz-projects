import request from "./request.js";

//获取所有的优惠卷
export async function getPreferentialDatas(){
	let url = `getPreferentialDatas`;
	let res = await request(url);
	return res.data.message;
}