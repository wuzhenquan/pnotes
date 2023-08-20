// 摘自 《 JavaScript 权威指南》 6.5 
// 把 p 中可枚举的属性复制到 o 中
// p 中的属性 -> o 中
function extend(o, p){
	for(prop in p){
			o[prop] = p[prop]
	}
	return o
}
// 把 p 中可枚举的属性(但这个枚举属性和 o 的属性不同名)复制到 o 中
function merge(o,p){
	for (prop in p){
		if(o.hasOwnProperty[prop]) continue;
		o[prop] = p[prop]
	}
	return o
}
// 从 o 中删除 p 中没有的属性
// 很像求 o 和 p 的交集, 但 p 中的属性值被忽略
function restrict(o, p){
	for (prop in o){
		if(! (prop in p)) delete o[prop];
	}
	return o
}
// 从 o 中删除 p 中有的属性
// 差集
function substract(o, p){
	for (prop in o){
		if (prop in p){
			delete o[prop]
		}
	}
	return o
}
// 返回一个新的对象
// 合并 o 和 p
function union(o, p){return extend(extend({},o),p)}
// 返回一个新对象
// 很像求 o 和 p 的交集, 但 p 中的属性值被忽略
function intersection(o, p){return restrict(extend({},o),p))}