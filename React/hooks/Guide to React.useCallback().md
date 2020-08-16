# Guide to React.useCallback()

such usage of useCallback() makes the component slower, harming the performance. 


```jsx
import React, { useCallback } from 'react';
function MyComponent() {
  const handleClick = useCallback(() => {}, []);
  return <MyChild onClick={handleClick} />;
}
```

why?

但是如果是这样的话，MyComponent 作为子组件的话，每次渲染这个子组件 useCallback 会重新调用一次啊。。。

## how to use correctly `useCallback()`.

### First we should understand functions equality check

```javascript
function factory() {
  return (a, b) => a + b;
}
const sum1 = factory();
const sum2 = factory();
sum1 === sum2; // => falsesum1 === sum1; // => true
```

That’s just how JavaScript works. An object (including a function object) [equals](https://dmitripavlutin.com/the-legend-of-javascript-equality-operator/#the-identity-operator) only to itself.

### The purpose of useCallback()

1. A component wrapped inside `React.memo()` (or `shouldComponentUpdate`) accepts a callback prop
2. When the function is used as a dependency to other hooks, e.g. `useEffect(..., [callback])`

### A good use case

Imagine you have a component that renders a big list of items:

```jsx
import React, { useCallback } from 'react';
import useSearch from './fetch-items';

export default function MyParent({ term }) {
  // Same dependency, useCallback() returns the same function instance.
  const handleClick = useCallback(item => { console.log('You clicked ', item) }, [term]);
  return <MemoizedMyBigList term={term} handleClick={handleClick} />
}

// The list could be big, probably a few hundreds of items. 
function MyBigList({ term, handleClick }) {
  const items = useSearch(term);
  const itemToElement = item => <div onClick={handleClick}>{item}</div>;
  return <div>{items.map(itemToElement)}</div>;
}
// To preserve the list re-rendering, you wrap it into React.memo.
const MemoizedMyBigList = React.memo(MyBigList);

```

### A bad use case

such usage of useCallback() makes the component slower, harming the performance. 


```jsx
import React, { useCallback } from 'react';
function MyComponent() {
  // The inline function is still created on every render.
  const handleClick = useCallback(() => {}, []);
  return <MyChild onClick={handleClick} />;
}

function MyChild ({ onClick }) {
  return <button onClick={onClick}>I am a child</button>;
}
```

why?

- Because every time `MyComponent` is rendered the `useCallback()` is called. Even having `useCallback()` returning the same function instance, it doesn’t bring any benefits because **the optimization costs more than not having the optimization**. Simply accept that on each re-render new functions are created:
- It is creating a new function for the onClick handler on every render. The useCallback approach avoids that. So that’s a performance penalty of your method. [link](https://www.reddit.com/r/reactjs/comments/bkjexl/dependencies_in_usecallback_are_they_really/emh3gga?utm_source=share&utm_medium=web2x) 
- Because the thing you pass to onClick (e => ...) is a new anonymous function that gets created on every render.  [link](https://www.reddit.com/r/reactjs/comments/bkjexl/dependencies_in_usecallback_are_they_really/emh51ui?utm_source=share&utm_medium=web2x) 
- [Are Hooks slow because of creating functions in render?](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render) 

```jsx
import React, { useCallback } from 'react';

function MyComponent() {
  const handleClick = () => {    // handle the click event  };
  return <MyChild onClick={handleClick} />;
}

function MyChild ({ onClick }) {
  return <button onClick={onClick}>I am a child</button>;
}
```

## references

https://dmitripavlutin.com/dont-overuse-react-usecallback/