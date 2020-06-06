## what

```ts
function foo<T>(x: T): T { return x; }
// akin
const foo = <T extends {}>(x: T) => x;
// akin
const foo: <T>(x: T) => T = x=> x

let numArr = foo<number>(1) 
// short version without explicitly pass the type in the angle brackets
let numArr = foo(1) 
```

- `<T>` **type variable**, a special kind of variable that denotes types. 

- `<T>` remembers the type that the user provides and works with that particular type only.

- `<T>` is a type variable, but `T` is not.

## why

Generics offer **a way to create reusable components**. Generics provide a way to make components work with any data type and not restrict to one data type. So, components can be called or used with a **variety of  types**. 

problem example which is not generic: 

```ts
function getNumberArray(items : number[] ) : number[] {
    return new Array().concat(items);
}
function getStringArray(items : string[] ) : string[] {
    return new Array().concat(items);
}
let numArr = getNumberArray([1, 2, 3]);
let strArr = getStringArray(["Hello", "World"]);
```

problem example which is generic but not capturing type: 

```ts
// accept an array of type any
function getArray(items : any[] ) : any[] {
    return new Array().concat(items);
}
// We may want to add the numbers to number array 
let numArr = getArray([1, 2, 3]);
// We may want to add the strings to the string array
let strArr = getArray(["Hello", "World"]);
```

Generics uses  `<T>` to solve this problem: 

```ts
function getArray<T>(items: T[]): T{
  return new Array().concat(items)
}
let numArr = getArray<number>([1, 2, 3])
let strArr = getArray<string>(["Hello", "World"])
```

## how

The above function can be written as below

```ts
function getArray<T>(items : T[] ) : T[] {
    return new Array<T>().concat(items);
}

let myNumArr = getArray<number>([100, 200, 300]);
let myStrArr = getArray<string>(["Hello", "World"]);
// akin
let myNumArr = getArray([100, 200, 300]);
let myStrArr = getArray(["Hello", "World"]);
```

- `getArray<T>`: specify *type variable* to the function.

- `(items : T[] )`: specify the *data type* of arguments.

- `: T[]`: specify the *data type* of return value.
- `new Array<T>()`: specify the *type variable* of method.

Generics can be applied to the function's argument, a function's return type, and a class fields or methods.

other example:

```ts
/* Multiple Type Variables */
function  displayType<T, U>(id:T, name:U): void { 
  console.log(typeof(id) + ", " + typeof(name));  
}

/* Generic with Non-generic Type */
function displayType<T>(id:T, name:string): void { 
  console.log(typeof(id) + ", " + typeof(name));  
}

/* with Generic Type Variables */
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

```

The constraint `<T extends Person>` specifies that the generic type T must extend the class `Person`. 

## Generic Interface

### what


```ts
interface IProcessor<T> 
{ 
    result:T;
    process(a: T, b: T) => T;
}
```

Example: Generic Interface

```ts
function identity<T>(arg: T): T { return arg; }

let myIdentity: <T>(arg: T) => T = identity;
// akin - call signature of an object literal type:
let myIdentity: { <T>(arg: T): T } = identity;

// akin - our first generic interface
interface GenericIdentityFn { <T>(arg: T): T; }
let myIdentity: GenericIdentityFn = identity

// akin - Dictionary<string> rather than just Dictionary. This makes the type parameter visible to all the other members of the interface.
interface GenericIdentityFn<T> { (arg: T): T; }
let myIdentity: GenericIdentityFn<number> = identity;
```

### why

```ts
interface KeyPair1 = {
    key: number;
    value: number;
}
interface KeyPair2 = {
    key: string;
    value: string;
}
const kv1: KeyPair1 = { key: 1, value:2 }
const kv1: KeyPair2 = { key: 'a', value:'b' }
```

Did you find anything duplicate? Actually the above example can be re-written as below:

```ts
interface KeyPair<T, U> {
    key: T;
    value: U;
}
let kv1: KeyPair<number, number> = { key: 1, value:2 }; // OK
let kv2: KeyPair<string, string> = { key: 'a', value:'b' }; // OK
```

### how

#### Interfaces describing Object properties

```ts
interface Command<T, R> {
    id: T;
    run(): R;
}

let c: Command<String, number> = {
    id: Math.random().toString(36),
    run: function () {
        return 3;
    }
};

console.log(c.id); // 0.aeni3okdiig
console.log(c.run()); // 3
```

#### Interfaces describing functions

[Function Types](https://www.staging-typescript.org/docs/handbook/interfaces.html#function-types) 

```ts
interface ElementChecker <T> {
  //parameters are in left side parenthesis,
  //right side 'string' is return type
  (items: T[], toBeChecked: T, atIndex: number): boolean;
}

function checkElementAt<T>(elements: T[], toBeChecked: T, atIndex: number): boolean {
    return elements[atIndex] == toBeChecked;
}

let checker: ElementChecker = checkElementAt;
let items = [1,3,5,7];
let b: boolean = checker<number>(items, 5,1);
console.log(b); // false
let b2: boolean = checker<number>(items, 5,2);
console.log(b2); // true
```

```ts
interface KeyValueProcessor<T, U>
{
    (key: T, val: U): void;
};

function processKeyPairs<T, U>(key:T, value:U):void { 
    console.log(`processKeyPairs: key = ${key}, value = ${value}`)
}

let numKVProcessor: KeyValueProcessor<number, number> = processKeyPairs;
numKVProcessor(1, 12345); //Output: processKeyPairs: key = 1, value = 12345 

let strKVProcessor: KeyValueProcessor<number, string> = processKeyPairs;
strKVProcessor(1, "Bill"); //Output: processKeyPairs: key = 1, value = Bill 
```

#### Interfaces describing indexables

```ts
interface States<R> {
    [state: string]: R;
}

let s: States<boolean> = {'enabled': true, 'maximized':false};
console.log(s); // { enabled: true, maximized: false }
console.log(s['maximized']); // false
```

## Generic Class

Example: Generic Class

```ts
class KeyValuePair<T,U>
{ 
    private key: T;
    private val: U;
    setKeyValue(key: T, val: U): void { 
        this.key = key;
        this.val = val;
    }
    display():void { 
        console.log(`Key = ${this.key}, val = ${this.val}`);
    }
}
let kvp1 = new KeyValuePair<number, string>();
kvp1.setKeyValue(1, "Steve");
kvp1.display(); //Output: Key = 1, Val = Steve 
```

Example: optimization

```ts
interface IKeyValueProcessor<T, U>
{
    process(key: T, val: U): void;
};
class kvProcessor<T, U> implements IKeyValueProcessor<T, U>
{ 
    process(key:T, val:U):void { 
        console.log(`Key = ${key}, val = ${val}`);
    }
}
let proc: IKeyValueProcessor<number, string> = new kvProcessor();
proc.process(1, 'Bill'); //Output: processKeyPairs: key = 1, value = Bill 
```

## Generic Constraints

```ts
// create an interface that describes our constraint
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```

it will no longer work over any and all types:

```ts
loggingIdentity(3); // Error, number doesn't have a .length property
```

we need to pass in values whose type has all the required properties:

```ts
loggingIdentity({ length: 10, value: 3 });
```

### Type Parameters in Generic Constraints

You can declare a type parameter that is constrained by another type parameter. 

```ts
// K is constrained by T. 
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

## references:

[typescript generic](https://www.tutorialsteacher.com/typescript/typescript-generic) 

[typescript handbook - generics](https://www.typescriptlang.org/v2/docs/handbook/generics.html)

[TypeScript - Using Generics In Interfaces](https://www.logicbig.com/tutorials/misc/typescript/generics-in-interfaces.html) 