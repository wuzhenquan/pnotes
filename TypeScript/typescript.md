to read:
[TypeScript Assertion Signatures](https://www.carlrippon.com/typescript-assertion-signatures/) 

best pratices:
[6 useful TypeScript 3 features you need to know](https://www.carlrippon.com/6-useful-typescript-3-features-you-need-to-know/) 
[Fetch with async & await and TypeScript](https://www.carlrippon.com/fetch-with-async-await-and-typescript/) 
[practical ways to advance your TypeScript skills](https://www.sitepoint.com/advance-typescript-skills-practical-ways/) 

tutorial:
[TypeScript 速成教程](https://github.com/joye61/typescript-tutorial/blob/master/README.md) 
[TypeScript 学习笔记](https://www.cnblogs.com/niklai/category/864376.html) 
[TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) 

## 数据类型

### string/boolean/number/Array/Tuple/Enum/Any

### 例子

```ts
let name: string = 'wuzhenquan'
let str: string = 'Hello world';
let arr: number[] = [1, 2, 3, 4, 5];
let arr3: string[] = ["1","2"];
let arr2: Array<number> = [1, 2, 3, 4, 5];
let arr4: Array<string> = ["1","2"];
let t: [string, number] = ['No.', 1];
enum Role {Employee = 3, Manager, Admin}
let role: Role = Role.Employee
let name: string | undefined
```

## 函数

### 为函数定义类型

- 定义参数的类型
- 定义返回值的类型
- [可选参数和默认参数](https://www.typescriptlang.org/docs/handbook/functions.html#optional-and-default-parameters) (Optional and Default Parameters)
- [Rest Parameters](https://www.typescriptlang.org/docs/handbook/functions.html#optional-and-default-parameters) 

Lambda表达式。

```ts
// lambda表达式声明
let func_lambda: (x: number, y: number) => string = function (x, y) { 
  return String(x + y )
};
// 相当于
let sum = (x: number, y: number): number => {
    return x + y;
}
// 相当于
function func(x: number, y: number): string {
   return String(x + y );
}
// 指定参数的具体意义
let info: (name: string, age: number) => string = function (x: string, y:number) { 
  return String(x + y );
};
// 可选参数
function buildName(name?: string) { return name }
// default parameters
function buildName(name = 'Smith') { return name }
// 不返回值
function sayHi(): void { console.log('Hi!')}

// Typing Destructured Object Parameters in TypeScript
// https://mariusschulz.com/articles/typing-destructured-object-parameters-in-typescript
function toJSON(value: any, { pretty }: { pretty: boolean }) {
  const indent = pretty ? 4 : 0;
  return JSON.stringify(value, null, indent);
}
```

## 类

显式声明访问级别：public、protected、private

```ts
class User {
  name: string;
  private sex: string;
  protected age: number;
  constructor(_name: string) {
    this.name = _name;
  }
  sayHello(): string {
    return `Hello,${this.name}!`;
   }
}

let user = new User('John Reese');
user.name = 'Root';                 // 公有属性，可以赋值
user.sex = 'female';                // 私有属性，无法赋值
user.age = 28;                      // 受保护属性，无法赋值
user.sayHello();
```

### Accessors

https://www.typescriptlang.org/docs/handbook/classes.html#accessors

属性的get和set访问器

## 接口

- 可选属性
- 函数类型
- 数组类型
- Class 类型
- 继承接口
- 混合类型

作为参数类型

```ts
interface SquareConfig {
    color?: string; // 可选属性
    width?: number; // 可选属性
    [propName: string]: any;
}
```

作为其他类型

```ts
// 函数类型
interface FuncType { (x: string, y: string): string; }
// 函数参数名称不需要与接口成员的参数名称保持一致
const func1: FuncType = function (prop1: string, prop2: string): string { 
    return prop1 + ' ' + prop2;
}

// 数组类型
interface ArrayType { [index: number]: string; }
let arr: ArrayType;
arr = ['Dog', 'Cat'];

// 对象类型
// 可索引类型
// https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types

// 类类型
// https://www.typescriptlang.org/docs/handbook/interfaces.html#class-types
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) { this.currentTime = d; }
  constructor(h: number, m: number) {}
}
```

### 继承接口

https://www.typescriptlang.org/v2/docs/handbook/interfaces.html#interfaces-extending-classes

```ts
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

// 继承多个
interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```



Interfaces Extending Classes

https://www.typescriptlang.org/v2/docs/handbook/interfaces.html#interfaces-extending-classes

```ts
interface Animal {
    name: string;
    eat(): void;
}
class Dog implements Animal {
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    eat() {
        console.log(`${this.name} 吃狗粮。`)
    }
}
let dog: Animal;
dog = new Dog('狗狗');
dog.eat();
// 接口也可以多重继承 不举例了
```

类型转换

```js
interface Animal {
    name: string;
    age: number;
    eat(): void;
}
let thing = { name: '桌子' };
let otherThing = <Animal>thing;             // 类型转换
otherThing.age = 5;
otherThing.eat = function () {
    console.log(`${this.name} 不知道吃什么。`)
};
```



## 泛型

https://www.typescriptlang.org/docs/handbook/generics.html

### 泛型函数

声明泛型函数有以下两种方式：

```ts
// 第一种
function foo<T>(arg: T): T {
  let n: T = arg;
  return n;
}
// 第二种
const foo: <T>(arg: T) => T = function (arg) {
    return arg;
}

const m: string = foo<string>('hello world');
```

例子

```ts
// Array泛型方法 定义了参数类型是 Array 的泛型类型
function array_func<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}
```

### 泛型类

https://www.typescriptlang.org/docs/handbook/generics.html#generic-classes

通过指定明确类型的泛型类的实例，对属性赋值时，必须满足实际类型的约束。

```ts
class Generics_Demo<T>{
    value: T;
    show(): T { return this.value; }
}
let gene_demo1 = new Generics_Demo<number>();
gene_demo1.value = 1;
console.log(gene_demo1.show());
// 赋值新方法，返回值类型必须是number
gene_demo1.show = function () { 
  return gene_demo1.value + 1; 
}      
console.log(gene_demo1.show());
```

### 泛型类型

https://www.typescriptlang.org/docs/handbook/generics.html#generic-types

以下几个例子都是利用泛型类型定义变量或者方法参数的类型的示例

#### 泛型接口

```ts
// 简单
interface GIF<T> {
    attr: T;
}
// Identity<number>作为一个整体相当于一个接口名
let a: GIF<number> = {attr: 10};

// 复杂
```

#### 泛型类型继承

```ts
interface LengthInterface {
    length: number;
}
// 泛型类型继承 LengthInterface
function func_demo<T extends LengthInterface>(arg: T): T {
    console.log(arg.length);
    return arg;
}
func_demo({ a: 1, length: 2 });     // 含有length属性的对象
func_demo([1, 2]);                  // 数组类型
```



## function(a:1|2|3){}

只能是这三个值，执行 foo(4) 会报错。

## 模块

https://www.typescriptlang.org/docs/handbook/modules.html

## 命名空间

https://www.typescriptlang.org/docs/handbook/namespaces.html

## 声明文件

> [声明文件简介](https://www.cnblogs.com/niklai/p/6095974.html) 
>
> TypeScript作为JavaScript的超集，在开发过程中不可避免要引用其他第三方的JavaScript的库。虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript诸如类型检查等特性功能。为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述JavaScript库和模块信息的声明文件。通过引用这个声明文件，就可以借用TypeScript的各种特性来使用库文件了。

常见的库的结构：全局库/CommonJS/AMD/UMD

[Declaration Files - Indroduction](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

[TypeScript 入门教程 - 声明文件](https://ts.xcatliu.com/basics/declaration-files) 

[语法索引](https://ts.xcatliu.com/basics/declaration-files#xin-yu-fa-suo-yin) 

[declare module](https://ts.xcatliu.com/basics/declaration-files#declare-module) 用来扩展模块 

[declare namespace](https://ts.xcatliu.com/basics/declaration-files#export-namespace) 用来声明全局变量，看这个例子 [global.d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html) 

[typescript declare third party modules](https://stackoverflow.com/questions/44058101/typescript-declare-third-party-modules) 

```js
declare module "foo-module" {
  function foo(): void; 
  export = foo;
}
```

 [templates for various kinds of declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/templates.html)

参考：https://ts.xcatliu.com/basics/declaration-files

#### understand "declare" keyword

[What does 'declare' do in 'export declare class Actions'?](https://stackoverflow.com/a/40700848)

> The TypeScript declare keyword is used to declare variables that may not have originated from a TypeScript file.

看看这个[TypeScript definition for library](https://github.com/travist/jsencrypt/issues/94#issuecomment-510062531) 

## 作用域问题

一个文件里声明一个变量

```ts
// foo.ts
const foo = 123;
```

另一个文件里将这个变量赋值给一个新的变量

```ts
// bar.ts
const bar = foo;
```







参考：

**https://www.cnblogs.com/niklai/category/864376.html**