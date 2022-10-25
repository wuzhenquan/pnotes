https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/54



```js
//input
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]
// output
[1,2,3,4,5,6,7,8,9,10,11,12,13]
```

迭代实现

```js
function flatten(arr) {
  let arrs =[...arr]
  let newArr = [];
  while (arrs.length){
    let item = arrs.shift()
    if(Array.isArray(item)){
      arrs.unshift(...item)
    } else {
      newArr.push(item)
    }
  }
  return newArr
}
```

递归实现

```js
function flatten(arr) {
  let arrs = [];
  arr.forEach(item => {
    if(Array.isArray(item)){
      arrs.push(...flatten(item))
    } else {
      arrs.push(item)
    }
  })
  return arrs
}
```

字符串转换

```js
arr.join(',').split(',').map(item => Number(item))
```

使用Generator实现数组flatten

```js
function* flat(arr){
	for(let item of arr){
		if(Array.isArray(item)){
			yield* flat(item);//Generator委托
		}else {
			yield item
		}
	}
}
function flatten(arr) {
	let result = [];
	for(let val of(flat(arr))){
		result.push(val);
	}
	return result;
}
let arr1 = [1,[2,3,[4,5],6],[7]];
console.log(flatten(arr1));//[1, 2, 3, 4, 5, 6, 7]
```

