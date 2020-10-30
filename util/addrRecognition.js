import data2 from "./data2.js";
import addrs from "./data.js";

export function addrRecognition(content){
	let tempStr = "";
	//将获取出来的信息按照指定的分割符进行分割出来
	let str1 = " ,;，";		//指定的分割符
	let arr = [];			
	for(let char of content){
		arr.push(char);
	}
	let index = -1;
	arr.map(e => {
		let i = str1.indexOf(e);
		if(i >= 0){
			index = i;
		}
	});
	let arr2 = content.split(str1[index]);		//地址分割结果
	if(arr2.length != 3){
		uni.showToast({
			title:"格式错误了，请检查",
			icon:"none"
		})
		return;
	}
	//格式检测成功
	let tempStr2 = arr2.join("");		//保存重新拼接起来的数据，用来后面进行截取
	
	//获取出省份
	let provinces = {};
	let provincesIndex = -1;
	for(let i = 0;i < addrs.length; i++){
		let proviceName = addrs[i].provinceName;
		if(tempStr2.indexOf(proviceName) >= 0){
			let s1 = tempStr2.substring(0,tempStr2.indexOf(proviceName));
			let s2 = tempStr2.substring(tempStr2.indexOf(proviceName)+proviceName.length);
			// provinces = content.substring(content.indexOf(proviceName),content.indexOf(proviceName)+proviceName.length);
			tempStr = s1+s2;
			provinces = addrs[i];
			provincesIndex = i;
		}
	}
	// if(provincesIndex == -1){
	// 	uni.showToast({
	// 		title:"请输入有效的省份",
	// 		icon:"none"
	// 	})
	// 	return;
	// }
	
	if(provincesIndex == -1){
		console.log("没有省份");
		let city = {};
		let cityIndex = -1;
		let cityCode;
		let provincesIndexCode;
		console.log("contentcontentcontent",content);
		for(let i = 0;i < addrs.length; i++){
			let citys = addrs[i].city;
			for(let j = 0;j < citys.length; j++){
				if(content.indexOf(citys[j].cityName) > -1){
					cityCode = citys[j].cityCode;
					cityIndex = j;
					provincesIndexCode = addrs[i].provinceCode;
					console.log("provincesIndexCode2",provincesIndexCode);
					
				}
			}
		}
		let provinceRes = addrs.find(e => e.provinceCode == provincesIndexCode)
		if(!provinceRes){
			let cityName;
			let countyName;
			let tempI = -1;
			for(let i = 0;i < addrs.length; i++){
				let citys = addrs[i].city;
				for(let j = 0;j < citys.length; j++){
					let county = citys[j].county;
					for(let k = 0;k < county.length; k++){
						if(content.indexOf(county[k].countyName) > -1){
							cityName = citys[j].cityName;
							tempI = content.indexOf(county[k].countyName);
							countyName = county[k].countyName;
							provincesIndexCode = addrs[i].provinceCode;
						}
					}
				}
			}
			if(tempI == -1){
				uni.showToast({
					title:"地址有误",
					icon:"none"
				})
				return;
			}
			let {provinceName} = addrs.find(e => e.provinceCode == provincesIndexCode);
			let index4 = content.indexOf(provinceName);
			let ar = provinceName+cityName+countyName;
			tempStr2 = tempStr2.substring(0,tempStr2.indexOf(countyName))+tempStr2.substring(tempStr2.indexOf(countyName)+countyName.length);
			//获取出手机号
			let phoneReg = /[1][0-9]{10}/g;			//验证手机号码正则
			let phoneResult = phoneReg.exec(tempStr2);
			if(!phoneResult){
				uni.showToast({
					title:"请输入正确的手机号码",
					icon:"none"
				})
				return;
			}
			console.log("tempStr2tempStr2tempStr2",tempStr2);
			let reg2 = /^(.*)+[1][0-9]{10}(.*)+$/g;
			let regResult = reg2.exec(tempStr2);
			if(regResult[2] == ""){
				uni.showToast({
					title:"格式错误了，地址,电话号,收件人",
					icon:"none"
				})
				return;
			}
			let regResult1Index = content.indexOf(regResult[1]);
			let regResult2Index = content.indexOf(regResult[2]);
			let detailAr = "";
			let name = "";
			if(index4 < regResult1Index){
				 detailAr = regResult[1];
				 name = regResult[2];
			 }else{
				 detailAr = regResult[2];
				 name = regResult[1];
			 }
			return {phone:phoneResult,provinceName,cityName,countyName,detailAddr:detailAr,name}
		}
	}else{
		//获取出市
		let cityArrs = provinces.city;
		let city = {};
		let cityIndex = -1;
		for(let i = 0;i < cityArrs.length; i++){
			let cityName = cityArrs[i].cityName;
			if(tempStr2.indexOf(cityName) >= 0){
				let s1 = tempStr.substring(0,tempStr.indexOf(cityName));
				let s2 = tempStr.substring(tempStr.indexOf(cityName)+cityName.length);
				tempStr = s1+s2;
				city = cityArrs[i];
				cityIndex = i;
			}
		}
		if(cityIndex == -1){
			uni.showToast({
				title:"请输入有效的市",
				icon:"none"
			})
			return;
		}
		
		//获取出区
		let areaArrs= city.county;
		let area = {};
		let areaIndex = -1;
		let areaIndex2 = -1;
		for(let i = 0;i < areaArrs.length; i++){
			let countyName = areaArrs[i].countyName;
			if(tempStr2.indexOf(countyName) >= 0){
				areaIndex2 = content.indexOf(countyName) + countyName.length;
				let s1 = tempStr.substring(0,tempStr.indexOf(countyName));
				let s2 = tempStr.substring(tempStr.indexOf(countyName)+countyName.length);
				tempStr = s1+s2;
				area = areaArrs[i];
				areaIndex = i;
			}
		}
		if(areaIndex == -1){
			uni.showToast({
				title:"请输入有效的区域",
				icon:"none"
			})
			return;
		}
		//获取出手机号
		let phoneReg = /[1][0-9]{10}/g;			//验证手机号码正则
		let phoneResult = phoneReg.exec(tempStr);
		if(!phoneResult){
			uni.showToast({
				title:"请输入正确的手机号码",
				icon:"none"
			})
			return;
		}
		let index4 = content.indexOf("省");
		let r = provinces.provinceName+city.cityName+area.countyName;
		tempStr2 = tempStr2.substring(0,tempStr2.indexOf(r))+tempStr2.substring(tempStr2.indexOf(r)+r.length);
		console.log("tempStr2tempStr2tempStr2",tempStr2);
		let reg2 = /^(.*)+[1][0-9]{10}(.*)+$/g;
		let regResult = reg2.exec(tempStr2);
		if(regResult[2]==""){
			uni.showToast({
				title:"格式错误了，地址,电话号,收件人",
				icon:"none"
			})
			return;
		}
		let regResult1Index = content.indexOf(regResult[1]);
		let regResult2Index = content.indexOf(regResult[2]);
		let detailAr = "";
		let name = "";
		if(index4 < regResult1Index){
			 detailAr = regResult[1];
			 name = regResult[2];
		 }else{
			 detailAr = regResult[2];
			 name = regResult[1];
		 }
		// let index3 = -1;
		// for(let i = 0;i < tempStr.length; i++){
		// 	let t = tempStr.substring(i,i+11);
		// 	if(t == phoneResult[0]){
		// 		index3 = i;
		// 	}
		// }
		// let s1 = tempStr.substring(0,index3).trim();
		// let s2 = tempStr.substring(index3+11).trim();
		// tempStr = s1+s2;
		// //获取出剩余数据，详细地址还有收货人
		// let s3;
		// if(tempStr.indexOf(content.substring(areaIndex2,areaIndex2+3)) == 0){
		// 	s3 = tempStr.substring(tempStr.indexOf(content.substring(areaIndex2,areaIndex2+3))+3);
		// }else{
		// 	s3 = tempStr.substring(0,tempStr.indexOf(content.substring(areaIndex2,areaIndex2+3)));
		// }
		// let s4 = tempStr.substring(0,tempStr.indexOf(s3));
		// let s5 = tempStr.substring(tempStr.indexOf(s3)+s3.length);
		// let detailAr = s4+s5;
		// let name = s3;
		return {phone:phoneResult,provinceName:provinces.provinceName,cityName:city.cityName,countyName:area.countyName,detailAddr:detailAr,name}
	}	
}