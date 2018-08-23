`this.props.children.props.onClick = ()=>{}` 这种方法已经 [frozen](https://reactjs.org/blog/2015/10/07/react-v0.14.html#breaking-changes) 了.

得用 

```javascript
const childrenWithProps = React.Children.map(
    this.props.children, 
    child => React.cloneElement(child, { doSomething: this.doSomething })
);
```

