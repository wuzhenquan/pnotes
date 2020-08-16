https://overreacted.io/how-are-function-components-different-from-classes/

Performance primarily depends on what the code is doing rather than whether you chose a function or a class.

```jsx
// function component
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
// class component
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

these two snippets of code are subtly different. 

这个 [例子](https://codesandbox.io/s/pjqnl16lm7) 里的 ProfilePageClass.js 和 ProfilePageFunction.js  就是上面代码里的例子。可以看到这两个组件所场所的结果是不一样的。原因就在于 ProfilePageFunction.js 里有 capture values 特性。
If you plan to use functions more often in a React app, you might want to understand it.

如果一定要用 class component 来完成它，如何做到？

将 class methods 移到 render

```jsx
class ProfilePage extends React.Component {
  render() {
    // Capture the props!    const props = this.props;
    // Note: we are *inside render*.
    // These aren't class methods.
    const showMessage = () => {
      alert('Followed ' + props.user);    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```

但是这样做，还不如直接简化成 function component

functions component and class component 最大的区别就是 **Function components capture the rendered values**.