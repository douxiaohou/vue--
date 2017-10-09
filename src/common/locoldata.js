// 实现数据存储  获取  和删除功能的封装

export const key = 'goodsdata';
export var valueObj = {'goodsid':0,'goodscount':0}

export function setItem(value){
	// 获取本地存储localStorage 中的数据 是一个json格式的字符串
	var jsonStr = localStorage.getItem(key) || '[]';
	var arr =JSON.parse(jsonStr);
	arr.push(value);
	// 转换成字符串的格式进行存储。
	var arrstr  = JSON.stringify(arr);
	localStorage.setItem(key,arrstr);



}
// 获取存储在本地的数据
export function getItem(){
	var jsonStr = localStorage.getItem(key) || '[]';
	//转换为对象格式
	var arrObj =JSON.parse(jsonStr);
	console.log(arrObj);
	return arrObj;
	
}

// 将本地存储的数据 转换为 api 请求数据的格式

export function getGoodsData(){
	// 调用 getItem() 方法获取本地数据
	var strObj = getItem();
	// 转换好格式的数据 存储到新的对象 dataObj中
	var dataObj = {};
	for(var i=0;i<strObj.length;i++){
		var tem = strObj[i];
		if(!dataObj[tem.goodsid]){
			//没有的话 赋值给对应的值 {87:1} id键 数量是值 组合成键值对
			dataObj[tem.goodsid] = tem.goodscount;
		}else{
			//如果存在了 那么追加进去
			dataObj[tem.goodsid] +=tem.goodscount; 
		}
	}
	console.log(dataObj);
	return dataObj;

}
// 根据购物车组件传递回来的数据(实际是购物车的购物数量子组件更新的数据) 更新本地数据
//obj的格式：{goodsid:87,type:'add'}
export function updateData(obj){
	var arr = getItem();// 获取本地数据
	var count = 1; // 每次加减一个
	if(obj.type == 'add'){
		//  通过传递过来的type类型  判断是 加还是 减 add 加
		arr.push({'goodsid':obj.goodsid,'goodscount':count})
	}else{
		// 减
		for(var i =0;i<arr.length;i++){
			if(arr[i].goodsid == obj.goodsid){
                if(arr[i].goodscount > 1){
                    arr[i].goodscount = arr[i].goodscount -1;
                    break;
                }else{
                    // 如果 商品数量就一个 那么删除此对象
                    arr.splice(i,1);
                    break;
                }
            }
		}
	}
	//    将最新的arr保存回localStorage中
    localStorage.setItem(key,JSON.stringify(arr));
}