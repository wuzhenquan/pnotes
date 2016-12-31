
## 数组的方法

##### array.concat(item...)

```javascript
var number1=['one','two','three','four','five']
var number2=['six','seven']
number1.concat(number2,'eight','night',10)
// 结果返回["one", "two", "three", "four", "five", "six", "seven", "eight", "night", 10]
// 但number1仍然是['one','two','three','four','five']
```

##### array.join(seprator)

```javascript
var a=['a','b','c'];
a.join('')
// 返回结果为'abc'
// 建议不用这个, 改用+元素运算符, 性能高于Array.join()
```

##### array.push(item...)

```javascript
var number=['one','two','three','four','five']
number.push('six','seven');
// 数组结果var number=['one','two','three','four','five','six','seven']
```

##### unshift(item...)

```javascript
var number=['one','two','three','four','five']
number.unshift('six','seven');
// 数组结果var number=["six", "seven", "one", "two", "three", "four", "five"]
```

##### array.shift()

```javascript
var number=['one','two','three','four','five']
var c=number.shift();
// 现在c是'one', number是['two','three','four','five']
```

##### array.pop()

```javascript
var number=['one','two','three','four','five']
var c=number.pop()
//现在c是'five', number是['one','two','three','four']
```

##### array.reverse()

```javascript
var number=['one','two','three','four','five']
number.reverse()
//数组结果number=["five", "four", "three", "two", "one"]
```

##### delete array[i]

```javascript
var number=['one','two','three','four','five']
delete number[2]
// 数组结果number=['one','two',undefined,'four','five','six']
```

##### array.slice(start, end)	

```javascript
var number=['one','two','three','four','five'];
number.slice(2); // 返回 ['three','four','five']
number.slice(2,4); // 返回 ['three','four']
// 摘取数组中的片段 2代表起始位置, 4代表复制的个数
// 但number仍然是['one','two','three','four','five'];
```

##### array.splice(start, deleteCount, item)

```javascript
var number=['one','two','three','four','five']
number.splice(2,3) //2代表索引位置 3代表删除的个数
// 返回值是 ["three", "four", "five"]
// 数组结果number == ['one','two']

var number=['one','two','three','four','five']
number.splice(2,3,'six','seven') // 返回的是删除的部分
//'six','seven'替换删掉的这3个元素
// 返回值是 ["three", "four", "five"]
// 数组结果var number=['one','two','six','seven']
```

##### array.sort(comparefn)

> 按字符编码顺序排序 数字不能正确排序


```javascript
var n=[4,8,15,16,23,42];
n.sort();
// n的结果为[15,16,23,4,42,8];

// 数字排序
n.sort(function(a,b){ // 参数a是array[i],参数b是array[i+1]
	return a-b;
})
// 此时n为n=[4, 8, 15, 16, 23, 42]

// 数字和字符串排序
var m=['aa','bb','a',4,8,15,16,23,42]
m.sort(function(a,b){
	if(a===b){
		return 0;
	}
	//同类型的进行排序
	if(typeof a === typeof b){
		return a < b ? -1 : 1;
	}
	//把数字放前面
	return typeof a < typeof b ? -1 : 1;
})
```

##### array.every(callbackfn[, thisArg])

##### array.some(callbackfn[, thisArg])

##### array.filter(callbackfn[, thisArg])

##### array.map(callback[, thisArg])

[MDN Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```javascript
var number=['one','two','three','four','five']
var aaa=number.map(function(aaa){return aaa+'quan'});
console.log(aaa); // ["onequan", "twoquan", "threequan", "fourquan", "fivequan"]
// 求和
var arr = [1,2,3,4],
sum = 0;
arr.map(function(obj){sum += obj});//return undefined array. sum = 10  
```

##### array.forEach(callback[, thisArg])

和 map 很像, 但是 forEach 不返回值, 也不会对原来的数组有任何的改动, 仅仅只是对数组进行操作

```javascript
var arr = [1,2,3];
arr.map(function(x){return x*2}); //[2, 4, 6]
arr.forEach(function(x){return x*2}); // undefined
// 求和
var arr = [1,2,3,4],
sum = 0;
arr.forEach(function(e){sum += e;}); // sum = 10  
```

##### for in

> 用for in遍历数组的所有属性无法保证属性的顺序
```javascript
var arr = [1,2,3];
for(x in arr){
  console.log(x)
}
```

##### array.reduce(callbackfn[, initialValue])

> 从数组的某一个元素起开始执行 callbackfn, callbacfn 的第一个参数是上次计算返回的结果
> reduce 专为累加这种操作而设计，为累加这类操作而设计的参数，十分方便

**注意了:  callbackfn 可以带四个参数: previousValue, currnetValue, currentIndex, array **

http://elijahmanor.com/reducing-filter-and-map-down-to-reduce/

```javascript
// 1
var arr = [1,2,3];
arr.reduce(function(previousValue, currentValue){
	return previousValue + currentValue
}) // 6

// 2
var arr = [1,2,3];
arr.reduce(function(previousValue, currentValue){
	return previousValue + currentValue
},-1)  // 5


// 不传 initialValue 值
var arr = [1,2,3];
arr.reduce(function(pre,cur,index,arr){debugger;return pre+cur}); // return 6
// 传 initialValue 值
var arr = [1,2,3];
arr.reduce(function(pre,cur,index,arr){debugger;return pre+cur},10); // return 10
// 求和
var arr = [1,2,3,4];
arr.reduce(function(pre,cur){return pre + cur});// return 10
// 求乘积
var arr = [1,2,3,4]
arr.reduce(function(pre,cur,index,arr){return pre * cur});
// 求最大值
var arr = [1,2,3,4]
var max = a.reduce(function(pre,cur,inde,arr){return pre>cur?pre:cur;});
// 将数组合并成字符串
var initState = '';
var actions = ['a', 'b', 'c'];
var newState = actions.reduce(
    ( (prevState, action) => prevState + action ),
    initState
);// newState 为 "abc"


// 不用 map 和 filter, 改用 reduce
var doctors = [
    { number: 1,  actor: "William Hartnell",      begin: 1963, end: 1966 },
    { number: 2,  actor: "Patrick Troughton",     begin: 1966, end: 1969 },
    { number: 3,  actor: "Jon Pertwee",           begin: 1970, end: 1974 },
    { number: 4,  actor: "Tom Baker",             begin: 1974, end: 1981 },
    { number: 5,  actor: "Peter Davison",         begin: 1982, end: 1984 },
    { number: 6,  actor: "Colin Baker",           begin: 1984, end: 1986 },
    { number: 7,  actor: "Sylvester McCoy",       begin: 1987, end: 1989 },
    { number: 8,  actor: "Paul McGann",           begin: 1996, end: 1996 },
    { number: 9,  actor: "Christopher Eccleston", begin: 2005, end: 2005 },
    { number: 10, actor: "David Tennant",         begin: 2005, end: 2010 },
    { number: 11, actor: "Matt Smith",            begin: 2010, end: 2013 },
    { number: 12, actor: "Peter Capaldi",         begin: 2013, end: 2013 }    
];
doctors = _.reduce(doctors, function(memo, doctor) {
    if (doctor.begin > 2000) {
        memo.push({
            doctorNumber: "#" + doctor.number,
            playedBy: doctor.actor,
            yearsPlayed: doctor.end - doctor.begin + 1
        });
    }
    return memo;
}, []);
console.log(JSON.stringify(doctors, null, 4));
//[
//    { doctorNumber: "#9",  playedBy: "Christopher Eccleston", yearsPlayed: 1 },
//    { doctorNumber: "#10", playedBy: "David Tennant",         yearsPlayed: 6 },
//    { doctorNumber: "#11", playedBy: "Matt Smith",            yearsPlayed: 4 },
//    { doctorNumber: "#12", playedBy: "Peter Capaldi",         yearsPlayed: 1 }
//] 
```
