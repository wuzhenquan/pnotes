

## what

-  **is a function** 
- can stop midway and then continue.
- produces a sequence of results instead of a single value.
- generator function return a generator which is **iterable**
- There’s no way to “roll back” a generator. 
- generate iterators

![](https://cdn-images-1.medium.com/max/800/1*7X8rtWOiz5RKENZ_vugmKg.png)

### metaphor

bookmark. 

>  set a bookmark at the last page you read then begin the book from the page that you set the bookmark on

## how

```js
function * generatorFunction() { // Line 1
  console.log('This will be executed first.');
  yield 'Hello, ';   // Line 2
  console.log('I will be printed after the pause');  
  yield 'World!';
}
const generatorObject = generatorFunction(); // always returns a generator object, and it is an iterator object
console.log(generatorObject.next().value); // the generator begins executing
console.log(generatorObject.next().value); // the generator wakes up and begin executing from where it left
console.log(generatorObject.next().value); // the generator returns (instead of yielding) an object { value: undefined, done: true}
// This will be executed first.
// Hello, 
// I will be printed after the pause
// World!
// undefined
```

- first call `generator.next()` is always without an argument. 
- first call `generator.next()` starts the execution and return yield value and then pause the execution.
- `generator.next()` may take time to calculate the value.

### Passing Arguments to the next() Method
```js
function *generatorFunction(i){
    const x = yield 1;
    console.log(x)
    const y = yield 2;
    console.log(y)
}
let generator = generatorFunction()
console.log(generator.next('a'));
console.log(generator.next('b'));
console.log(generator.next('c'));
// 'b'
// 'c'
```



## advatanges

- Lazy Evaluation
- Memory Efficient
- Generators aim to make iterables easier
- Generators may continue forever

## Use cases

- Implementing Iterables
- better async funcion(actually async/await is better)
- Infinite Data Streams
- infinite series. (generative algorithms for graphics, computer game levels, music sequences)
  - Fibonacci Sequence (0, 1, 1, 2, 3, 5, 8, 13, 21, 34…)
    - generate the Golden Spiral

## reference

- [Understanding Generators in ES6 JavaScript with Examples](<https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5>)
- [generators](<https://javascript.info/generators>)
- [A Simple Guide to Understanding Javascript (ES6) Generators](<https://medium.com/dailyjs/a-simple-guide-to-understanding-javascript-es6-generators-d1c350551950>)
- [The Hidden Power of ES6 Generators: Observable Async Flow Control](<https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435>)