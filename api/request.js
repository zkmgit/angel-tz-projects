const baseUrl = "http://47.112.194.162:5959/"
export default function request(url,method="Get",data){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + url,
			method:method,
			data:data,
			success(res) {
				resolve(res);
			},
			fail(err) {
				reject(err);
			},
			dataType: 'json',
			header: {
			    'content-type': 'application/x-www-form-urlencoded'
			} 
		})
	});
}