import request from "./request.js";

//获取授权用户的所有地址
export async function allAddr(token){
	let url = `allAddr?token=${token}`;
	let res = await request(url);
	return res.data;
}

// 
//删除指定的地址
export async function delAddr(token,id){
	let url = `delAddr?token=${token}&id=${id}`;
	let res = await request(url);
	return res.data;
}
//新增地址
export async function addAddr(data){
	let url = `addAddr`;
	let method = "POST";
	let res = await request(url,method,data);
	return res.data;
}
//编辑地址
export async function editAddr(data){
	let url = `editAddr`;
	let method = "POST";
	let res = await request(url,method,data);
	return res.data;
}