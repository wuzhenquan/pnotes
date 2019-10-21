 [Iterators and Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) make dealing with asynchronous data streams and collections of objects easier.

**Iterators**

provide a means to access items in a collection one at a time, while keeping track of the current index.

**Generators**

a factory for **Iterators**

**Generators + Promises**

```js
foo(function *doStuff(){
    var result = yield someAsyncMethod();
    var another = yield anotherAsyncFunction();
});
```

This is a revelation, but one that async/await neatly wraps up for us.

we should know them, but we don't need them in our code, **async/await** is fine.



## `async/await` `coroutines` `promises` `callbacks` 

### async/await

Pros

- Clean code, low syntax noise
- Native in current Chrome, Node.js

Cons

- Still needs to be transpiled with Babel for most projects

### Promise Chaining

more oldschool

Pros

- No extra libraries needed since Promises are native

Cons

- Noisy callbacks

### Callbacks

Pros

- Easy to understand
- No libs needed, backward compatible

Cons

- Pyramid of doom
- More difficult to maintain

### Coroutines

Pros

- No pyramid of doom
- Flow can be traced easily

Cons

- Some coroutine library is needed
- Generators must be used


[You don’t really need to learn Generators](<https://hackernoon.com/javascript-es6-you-dont-really-need-to-learn-generators-96aa2e9114fa>)

[Async/await vs Coroutines vs Promises vs Callbacks](<https://blog.benestudio.co/async-await-vs-coroutines-vs-promises-eaedee4e0829>)

