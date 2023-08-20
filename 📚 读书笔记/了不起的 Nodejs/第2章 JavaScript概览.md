自定义模块时, 添加package.json的三个好处

- 通过`npm install`就可以把依赖的模块下载下来
- 方便的记录模块的版本号, 可检查依赖的模块版本是否较低
- 有了package.json文件, 通过`npm publish`就可以发布到npm中了


用node运行index.js文件

```shell
$ node index     // 第一种
$ node index.js  // 第二种
```

package.json中

main参数的作用是?(需要模块暴露API是, main很重要.....不懂)

`npm search`

`npm install -g express`后再一个昔年目录下执行`express`命令后无效?这是为什么?



### v8中的JavaScript

获取自有键

```javascript
var a = {a:'b',c:'d'};
Object.keys(a);  //['a','b']
```

检查是否是数组

```javascript
Array.isArray([]);  // true
```

数组方法

```javascript
// 遍历数组
[1,2,3].forEach(function(v){
  console.log(v);
});
// 过滤数组元素
[1,2,3].filter(function(v){
  return v < 3;
});  // 返回[1,2]
// 改变数组中每个元素的值
[5,10,15].map(function(v){
  return v*2;
});  //返回 [10,20,30]
```

字符串方法

```javascript
// 移除字符串首末空格
'   hello   '.trim();
```

JSON

```javascript
var obj = JSON.parse('{"a":"b"}');
obj.a == 'b';
```

FUNCTION#BIND

```javascript
// 改变对this的引用 call/apply也可以改变
function a(){
  return this.hello == 'world'; // true
};

var b = a.bind({hello: 'world'});
b();
```

FUNCTION#NAME

`__PROTO__(继承)`

存取器

```javascript
// 查看现在距离某个时间多久了
Date.prototype.__defineGetter__('ago',function(){
  var diff = (((new Date()).getTime() - this.getTime())/1000);
  var day_diff = Math.floor(diff/86400);// 多了一个day_diff是为了便于识别, 86400后数字就复杂了....
  return day_diff == 0 && (
    	diff < 60 && "just now" ||
    	diff < 120 && "1 minute ago" || 
    	diff < 3600 && Math.floor(diff / 60 ) + " minutes ago" ||
    	diff < 7200 && "1 hour ag0" ||
    	diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
    day_diff == 1 && "Yesterday" ||
    day_diff < 7 && day_diff + " days ago" ||
    Math.ceil(day_diff/7) + " weeks ago";
})
var a = new Date('12/12/1990');
a.ago // 多少 weeks ago;
```



自己动手, 加上"年"

```javascript
Date.prototype.__defineGetter__('ago',function(){
  var diff = (((new Date()).getTime() - this.getTime())/1000);
  var day_diff = Math.floor(diff/86400);
  var week_diff = Math.floor(day_diff/7);
  var year_diff = Math.floor(day_diff/365);
  return day_diff == 0 && (
    	diff < 60 && "just now" ||
    	diff < 120 && "1 minute ago" || 
    	diff < 3600 && Math.floor(diff / 60 ) + " minutes ago" ||
    	diff < 7200 && "1 hour ag0" ||
    	diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
    day_diff == 1 && "Yesterday" ||
    day_diff < 7 && day_diff + " days ago" ||
    week_diff < 52 && week_diff + " weeks ago" ||
    year_diff + " years ago";
})
var a = new Date('4/12/2016');
a.ago // 多少 weeks ago;
```