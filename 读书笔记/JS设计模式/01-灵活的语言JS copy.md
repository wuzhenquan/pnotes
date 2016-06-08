函数也是变量, 所以注意函数定义在全局环境里也是全局变量

介绍了函数的几种编写方式, 其中最后一种链式添加方法最有意思

#### 入职第一天

```javascript
function checkName(){};
function checkEmail(){};
function checkPassword(){};
```

#### 用对象收编变量

```javascript
function CheckObject = {
  checkName: function(){},
  checkEmail: function(){},
  checkPassword: function(){}
}
```

缺点: 无法实例化

#### 对象的另一种形式

```javascript
var CheckObject = function(){};
checkObject.checkName = function(){};
checkObject.checkEmail = function(){};
checkObject.checkPassword = function(){};
```

缺点: 无法实例化, 无法复制

#### 真假对象

```javascript
var CheckObject = function(){
  return {
  	checkName: function(){},
    checkEmail: function(){},
    checkPassword: function(){}
  }	
}
```

评价: 他不是一个真正意义上类的创建方式, 并且创建对象 a 和对象 checkObject没有任何关系.(a instance checkObject 返回的是false)

#### 类也可以

```javascript
var CheckObject = function(){
  this.checkName = function(){};
  this.checkEmail = function(){};
  this.checkPassword = function(){};
}
var a = new checkObject();
a.checkEmail();
```

评价: 这些新创建的对象都会有自己的一套方法, 造成资源消耗

修改

```javascript
var CheckObject = function(){}
checkObject.prototype.checkName = function(){};
checkObject.prototype.checkEmail = function(){};
checkObject.prototype.checkPassword = function(){};
```
评价: 要将 prototype 写很多遍

再修改

```javascript
var CheckObject = function(){}
CheckObject.prototype = {
	checkName: function(){},
    checkEmail: function(){},
    checkPassword: function(){}
}
```
评价: 导致重写了整个原型. 这两种方式不能混着用, 否则一旦混用, 如在后面为对象的原型赋值新对象时, 那么它将会覆盖掉之前对 prototype 对象复制的方法.

问题: 这种方式不能使用

```javascript
var a = new CheckObject();
a.checkName().checkEmail().checkPassword();// 为什么会错? 
// 错误提示 Cannot read property 'checkEmail' of undefined(…)
// a
```

这样的链式调用.

#### 方法还可以这样用

要能实现链式调用, 修改

```javascript
var CheckObject = function(){}
CheckObject.prototype = {
    checkName: function(){return this},
    checkEmail: function(){return this},
    checkPassword: function(){return this}
}
var a = new CheckObject();
a.checkName().checkEmail().checkPassword();// 成功 不会报错
```

#### 链式添加方法

有意思

```javascript
// 有意思
// 创建一个函数是会为其创建一个 this
Function.prototype.addMethod = function(name, fn){
  this[name] = fn;
  return this;
}
var methods = function(){};

methods.addMethod('checkName', function(){})
	   .addMethod('checkEmail', function(){})
	   .addMethod('checkPassword', function(){});

methods.checkName().checkEmail();
```