## async function
```js
async function f() {
  return 1; // equal to `return Promsie.resolve()`
}
f().then(alert); // 1
```

- the function always returns a promise

## await 

wait promise

wait until  promise settles and **returns its result**. That doesn’t cost any CPU resources, because the engine can do other jobs meanwhile: execute other scripts, handle events etc.

## why

compare `promise.then`, it is more elegant syntax, easier to read/write. 

pretty clean and easy to read. 

```js
// less readable
fetch('https://api.com/values/1')
    .then(response => response.json())
    .then(json => console.log(json));
// more readable
const request = async () => {
    const response = await fetch('https://api.com/values/1');
    const json = await response.json();
}
request
```

## async/await is a combination of Promisesand Generators?.

## error handling

best: [Promises Chaining]()

try...catch 

## others

- async/await code flow will never be interrupted by other handlers or events.
- rarely need to write `promise.then/catch`

reference:

https://javascript.info/async-await#error-handling(还有练习题)

