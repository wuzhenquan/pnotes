https://overreacted.io/a-complete-guide-to-useeffect/

文章的目的不是为了学 useEffect，是为了 unlearning。

## Each Render Has Its Own Props and State

https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-props-and-state

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>      
        <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Whenever we update the state, React calls our component. Each render result “sees” its own `counter` state value which is a *constant* inside our function.

The key takeaway is that the `count` constant inside any particular render doesn’t change over time. It’s our component that’s called again — and each render “sees” its own `count` value that’s isolated between renders.

## Each Render Has Its Own Event Handlers

https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-event-handlers

看看这个 [例子](https://codesandbox.io/s/w2wxl3yo0l?file=/src/index.js) ，点击三次 「Click me」→ 点击 「Show alert」→  点击两次「Click me」，结果会是什么？是 5 还是 3 ？event handlers “belong” to a particular render, and when you click, it keeps using the `counter` state *from* that render.**Inside any particular render, props and state forever stay the same.** 

our function gets called many times (once per each render), but every one of those times the count value inside of it is constant and set to a particular value (state for that render).（记得翻译一下）

## Each Render Has Its Own Effects

https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-effects

Conceptually, you can imagine effects are a part of the render result.

in the mental model we’re building up, effect functions *belong* to a particular render in the same way that event handlers do.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => { document.title = `You clicked ${count} times`; });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**first render:**

- **React:** Give me the UI when the state is `0`.
- **Your component:**
  - Here’s the render result: `You clicked 0 times`.
  - Also remember to run this effect after you’re done: `() => { document.title = 'You clicked 0 times' }`.
- **React:** Sure. Updating the UI. Hey browser, I’m adding some stuff to the DOM.
- **Browser:** Cool, I painted it to the screen.
- **React:** OK, now I’m going to run the effect you gave me.
  - Running `() => { document.title = 'You clicked 0 times' }`.

**what happens after we click:**

- **Your component:** Hey React, set my state to `1`.
- **React:** Give me the UI for when the state is `1`.
- **Your component:**
  - Here’s the render result: `You clicked 1 times`.
  - Also remember to run this effect after you’re done: `() => { document.title = 'You clicked 1 times' }`.
- **React:** Sure. Updating the UI. Hey browser, I’ve changed the DOM.
- **Browser:** Cool, I painted your changes to the screen.
- **React:** OK, now I’ll run the effect that belongs to the render I just did.
  - Running `() => { document.title = 'You clicked 1 times' }`.

## Each Render Has Its Own… Everything

https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-everything

We know now that **effects** run after every render, are conceptually **a part of the component output**, and “see” the props and state from that particular render.

```jsx
// If I click several times with a small delay, what is the log going to look like?
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {    
      setTimeout(() => {      
          console.log(`You clicked ${count} times`);    
      }, 3000);  
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Swimming Against the Tide

https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-everything

**every** function inside the component render (including event handlers, effects, timeouts or API calls inside them) captures the props and state of the render call that defined it.

Of course, sometimes you *want* to read the latest rather than captured value inside some callback defined in an effect. The easiest way to do it is by using refs, as described in the last section of [this article](https://overreacted.io/how-are-function-components-different-from-classes/).

when you want to read the *future* props or state from a function in a *past* render, you’re swimming against the tide. 

## So What About Cleanup?

https://overreacted.io/a-complete-guide-to-useeffect/#so-what-about-cleanup

React only runs the effects after [letting the browser paint](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f). This makes your app faster as most effects don’t need to block screen updates. 

Say `props` is `{id: 10}` on the first render, and `{id: 20}` on the second render.

something like this happens:

- **React renders UI for `{id: 20}`.**
- The browser paints. We see the UI for `{id: 20}` on the screen.
- **React cleans up the effect for `{id: 10}`.**
- React runs the effect for `{id: 20}`.

You might be wondering: but how can the cleanup of the previous effect still “see” the old `{id: 10}` props if it runs *after* the props change to `{id: 20}`?

Quoting the previous section:

> Every function inside the component render (including event handlers, effects, timeouts or API calls inside them) captures the props and state of the render call that defined it.

Now the answer is clear! The effect cleanup doesn’t read the “latest” props, whatever that means. It reads props that belong to the render it’s defined in:

## Synchronization, Not Lifecycle

https://overreacted.io/a-complete-guide-to-useeffect/#synchronization-not-lifecycle

React is that it unifies describing the initial render result and the updates. 

```jsx
function Greeting({ name }) {
  return (
    <h1 className="Greeting">
      Hello, {name}
    </h1>
  );
}
```

It doesn’t matter if I render `<Greeting name="Dan" />` and later `<Greeting name="Yuzhi" />`, or if I just render `<Greeting name="Yuzhi" />`. In the end, we will see “Hello, Yuzhi” in both cases.

**It’s all about the destination, not the journey.** 

**React synchronizes the DOM according to our current props and state.** There is no distinction between a “mount” or an “update” when rendering.

**`useEffect` lets you \*synchronize\* things outside of the React tree according to our props and state.** 

## Don’t Lie to React About Dependencies

https://overreacted.io/a-complete-guide-to-useeffect/#dont-lie-to-react-about-dependencies

Lying to React about dependencies has bad consequences.

```jsx
function SearchResults() {
  async function fetchData() {
    // ...
  }
  useEffect(() => {
    fetchData();
  }, []); // Is this okay? Not always -- and there's a better way to write it.
  // ...
}
```

**The solution to that problem is *not* to remove a dependency.** 

remember: if you specify deps,  ***all* values from inside your component that are used by the effect *must* be there**. Including props, state, functions — anything in your component.

如何解决：[But I Can’t Put This Function Inside an Effect](https://overreacted.io/a-complete-guide-to-useeffect/#but-i-cant-put-this-function-inside-an-effect) 

## What Happens When Dependencies Lie

https://overreacted.io/a-complete-guide-to-useeffect/#what-happens-when-dependencies-lie

## Two Ways to Be Honest About Dependencies

https://overreacted.io/a-complete-guide-to-useeffect/#two-ways-to-be-honest-about-dependencies

 a few common techniques for removing dependencies

- Making Effects Self-Sufficient：`setCount(c => c + 1)` 

## Functional Updates and Google Docs

https://overreacted.io/a-complete-guide-to-useeffect/#functional-updates-and-google-docs

if we had two state variables whose values depend on each other, or if we needed to calculate the next state based on a prop, it wouldn’t help us. Luckily, `setCount(c => c + 1)` has a more powerful sister pattern. Its name is `useReducer`.

## Decoupling Updates from Actions

https://overreacted.io/a-complete-guide-to-useeffect/#decoupling-updates-from-actions

[demo](https://codesandbox.io/s/zxn70rnkx) 虽然没问题，但是会 reset interval。

但是我们如果不想 reset interval 呢，有什么别的办法吗？

reducer 来了

> **When setting a state variable depends on the current value of another state variable, you might want to try replacing them both with `useReducer`.**

reducer 的作用

> A reducer lets you **decouple expressing the “actions” that happened in your component from how the state updates in response to them**.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;
useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: 'tick' }); // Instead of setCount(c => c + step);  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);
```

上面这样写有什么好处? dispatch 是 constant 的。

>  **React guarantees the `dispatch` function to be constant throughout the component lifetime. So the example above doesn’t ever need to resubscribe the interval.**

> *(You may omit `dispatch`, `setState`, and `useRef` container values from the deps because React guarantees them to be static. But it also doesn’t hurt to specify them.)*

[完整代码](https://codesandbox.io/s/xzr480k0np) 

## Why useReducer Is the Cheat Mode of Hooks

https://overreacted.io/a-complete-guide-to-useeffect/#why-usereducer-is-the-cheat-mode-of-hooks

**It lets me decouple the update logic from describing what happened. This, in turn, helps me remove unnecessary dependencies from my effects and avoid re-running them more often than necessary.**

## Moving Functions Inside Effects

https://overreacted.io/a-complete-guide-to-useeffect/#moving-functions-inside-effects

## But I Can’t Put This Function Inside an Effect

https://overreacted.io/a-complete-guide-to-useeffect/#but-i-cant-put-this-function-inside-an-effect

A common misconception is that “a function would never change”. But as we learned throughout this article, this couldn’t be further from truth.Indeed, a function defined inside a component changes on every render!

-  you can hoist it outside the component and then freely use it inside your effects
- Alternatively, you can wrap it into the [`useCallback` Hook](https://reactjs.org/docs/hooks-reference.html#usecallback) 

**The same solution works for function props passed from parents**

```jsx
// 当组件需要用到父组件的函数时
function Parent() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes  
  const fetchData = useCallback(() => {    
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query; 
    // ... Fetch data and return it ...
  }, [query]);  // ✅ Callback deps are OK
  return <Child fetchData={fetchData} />
}

function Child({ fetchData }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
```

## Are Functions Part of the Data Flow?

https://overreacted.io/a-complete-guide-to-useeffect/#are-functions-part-of-the-data-flow

**With `useCallback`, functions can fully participate in the data flow.** We can say that if the function inputs changed, the function itself has changed, but if not, it stayed the same. Thanks to the granularity provided by `useCallback`, changes to props like `props.fetchData` can propagate down automatically.

**I want to emphasize that putting `useCallback` everywhere is pretty clunky.**

## Speaking of Race Conditions

https://overreacted.io/a-complete-guide-to-useeffect/#speaking-of-race-conditions

- If the async approach you use supports cancellation, that’s great! 

- Alternatively, the easiest stopgap approach is to track it with a boolean:

  ```jsx
  function Article({ id }) {
    const [article, setArticle] = useState(null);
  
    useEffect(() => {
      let didCancel = false;
  
      async function fetchData() {
        const article = await API.fetchArticle(id);
        if (!didCancel) {
          setArticle(article);
        }
      }
  
      fetchData();
  
      return () => {
        didCancel = true;
      };
    }, [id]);
  
    // ...
  }
  ```

[This article](https://www.robinwieruch.de/react-hooks-fetch-data/) goes into more detail about how you can handle errors and loading states, as well as extract that logic into a custom Hook. I recommend you to check it out if you’re interested to learn more about data fetching with Hooks.