箭头函数没有自己的this

1

```js
// demo1
var obj =  {
  a: 1,
  b1: this.a,
  b2: () => this.a,
};

console.log(obj.b1); 
console.log(obj.b2()); 
```

2

```js
(function fn(){
  var a = 2;
  console.log(this.a);

  const subf = ()=>this.a;
  console.log(subf());
})()
```

3

```js
var obj2 =  {
  a: 3,
  b1: function(){ return this.a;},
  b2: function(){ return ()=>this.a},
};
console.log(obj2.b1()); 
console.log(obj2.b2()());
```

4

```js
function f0() {
  var a = 5;

  setTimeout(function() {
    var b1 = this.a;
    console.log(b1);
  }, 100);

  setTimeout(function() {
    var b2 = ()=> this.a;
    console.log(b2());
  }, 200);
}

f0();
```

5

```js
function f1() {
  console.log(this.a); 
  setTimeout(() => {
    console.log(this.a);  
  }, 100);
}
f1.call({a: 7})
```

