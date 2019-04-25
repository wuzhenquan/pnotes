## for...of

```js
const arr = []
for (const item of arr){
    console.log(item)
}
```

why?

because array in JavaScript provides an iterator

```js
let myArray = [1,2,3]
let iterator = myArray[Symbol.iterator]()
console.log(iterator.next()) // { value: 1, done: false};
console.log(iterator.next()) // { value: 2, done: false};
console.log(iterator.next()) // { value: 3, done: false};
console.log(iterator.next()) // { value: undefined, done: true};
```

## Iterables

### what

what iterable are?  if it implements a method who is key is [Symbol.iterator], we call it iterable.

```js
const iterable = {
	[Symbol.iterator](){
  	return {
    	next(){
        }
    }
  }
}
```



A lot of things are iterables in JavaScript

- Arrays and [TypedArrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- Strings
- Maps
- Sets
- `arguments`
- DOM elements
- `for-of` loop
- Destructuring of Arrays
- The spread operator (...)
- `Promise.all` and `Promise.race` accept iterables over Promises.

### why

- easy to manage the iteration on data for various type of data structure.(iterating on array is different from iterating on an object)
- for sets and maps.
- ` const [a,b] = new Set(iterable)`
- `for (const x of iterable) {console.log(x)}`
- `const arr = Array.from(new Set(iterable)`
- `const arr = [...new Set(iterable)]`
- `yield* anIterable`
- `var it = a[Symbol.iterator]() `
  - `var [x,y] = it;var [z,...w] = it;`
- `var a = [1,2,3,4,5]`
  - `foo(...a)`
    - `var b = [0, ...a, 6]`

### how

1. create an iterator: `const iter = iterable[Symbol.iterator]()`
2. `iterable[Symbol.iterator]()` handles the whole iteration
3. call iterator's method `iter.next()` ,  form is `{done: Boolean, value: any}`
4. `done=true` means that the iteration is finished

### make our own custom objects iterable!

```js
const iterable = {
    [Symbol.iterator](){
        let step = 0;
        const iterator = {
            next(){
                step++;
                if (step === 1){
                    return { value: 'This', done: false};
                } else if (step === 2){
                    return { value: 'is', done: false};
                } else if (step === 3){
                    return { value: 'iterable', done: false};
                }
                return { value: undefined, done: true };
            }
        };
        return iterator;
    }
}
var iterator = iterable[Symbol.iterator]();
iterator.next() // { value: 'This', done: false};
iterator.next() // { value: 'is', done: false};
iterator.next() // { value: 'iterable', done: false};
iterator.next() // { value: undefined, done: true};
```

## Iterators

- The result of `iterable[Symbol.iterator]` is called an *iterator*

- An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the iteration end, otherwise the `value` is the next value.

```js
{next(){return {done: Boolean, value: any}}}
```

## practice

### practice 1

how to loop it to get all authors?

```js
const myFavouriteAuthors = {
    allAuthors: {
        fiction: ['Agatha Christie', 'J. K. Rowling', 'Dr. Seuss'],
        scienceFiction: ['Neal Stephenson', 'Arthur Clarke', 'Isaac Asimov', 'Robert Heinlein'],
        fantasy: ['J. R. R. Tolkien', 'J. K. Rowling', 'Terry Pratchett']
      }
}
```

answer

```js
const myFavouriteAuthors = {
  allAuthors: {
    fiction: ['Agatha Christie', 'J. K. Rowling', 'Dr. Seuss'],
    scienceFiction: ['Neal Stephenson', 'Arthur Clarke', 'Isaac Asimov', 'Robert Heinlein'],
    fantasy: ['J. R. R. Tolkien', 'J. K. Rowling', 'Terry Pratchett']
  },
  [Symbol.iterator]() {
    const genres = Object.values(this.allAuthors);
    let currentAuthorIndex = 0;
    let currentGenreIndex = 0;
    
    return {
      next() {
        const authors = genres[currentGenreIndex];
        const doNothaveMoreAuthors = !(currentAuthorIndex < authors.length);
        if (doNothaveMoreAuthors) {
          currentGenreIndex++;
          currentAuthorIndex = 0;
        }
        const doNotHaveMoreGenres = !(currentGenreIndex < genres.length);
        if (doNotHaveMoreGenres) {
          return {value: undefined,done: true};
        }
        return {
          value: genres[currentGenreIndex][currentAuthorIndex++],
          done: false
        }
      }
    };
  }
};

for (const author of myFavouriteAuthors) {
  console.log(author);
}

console.log(...myFavouriteAuthors) // ["Agatha Christie", "J. K. Rowling", "Dr. Seuss", "Neal Stephenson", "Arthur Clarke", "Isaac Asimov", "Robert Heinlein", "J. R. R. Tolkien", "J. K. Rowling", "Terry Pratchett"] 也太方便了吧！
```

## practice 2

```js
let range = { from: 1, to: 5};
// We want the for..of to work:
// for(let num of range) ... num=1,2,3,4,5
```

answer

```js
let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },
  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

## iterator 真的不如  generator 吗？

## reference

[A Simple Guide to ES6 Iterators in JavaScript with Examples](https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e)

[Iterables and Iterators](https://codeburst.io/javascript-es6-iterables-and-iterators-de18b54f4d4)

[Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html)

[Iterables](https://javascript.info/iterable)