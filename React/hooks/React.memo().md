## React.memo()

`React.memo()` wraps a component

`React.memo()` improves the performance, 

When a component is wrapped in `React.memo()`, React renders the component and memoizes the result. Before the next render, if the new props are the same, React reuses the memoized result *skipping the next rendering*.

```jsx
export function Movie({ title, releaseDate }) {
  return (
    <div>
      <div>Movie title: {title}</div>
      <div>Release date: {releaseDate}</div>
    </div>
  );
}

export const MemoizedMovie = React.memo(Movie);
```

`MemoizedMovie` render output is memoized. The memoized content is reused as long as `title` or `releaseDate` props are the same on next renderings.

```jsx
// First render. React calls MemoizedMovie function.
<MemoizedMovie title="Heat"   releaseDate="December 15, 1995" />

// On next round React does not call MemoizedMovie function,
// preventing rendering
<MemoizedMovie title="Heat"   releaseDate="December 15, 1995" />
```

[Open the demo](https://codesandbox.io/s/react-memo-demo-c9dx1), then expand the console. You will see that React renders `<MemoizedMovie>` just once, while `<Movie>` re-renders every time. 

You gain a *performance boost*: by reusing the memoized content, React skips rendering the component and doesn’t perform a virtual DOM difference check.

The same functionality for class components is implemented by [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent).

### Custom equality check of props

By default `React.memo()` does a [shallow](https://github.com/facebook/react/blob/v16.8.6/packages/shared/shallowEqual.js) comparison of props and objects of props.

You can use the second argument to indicate a custom equality check function:

```javascript
React.memo(Component, [areEqual(prevProps, nextProps)]);
```

`areEqual(prevProps, nextProps)` function must return `true` if `prevProps` and `nextProps` are equal.

##  When to use React.memo()

1. Your **pure function component** is functional and given the same props, always render the same output.
2. Renders often
3. Re-renders with the same props
4. Your Component contains a decent amount of UI elements to reason props equality check.

## When to avoid React.memo()

Don’t use memoization if you can’t quantify the performance gains.

Performance-related changes applied incorrectly can even harm performance. Use `React.memo()` wisely. 

## references

https://dmitripavlutin.com/use-react-memo-wisely/