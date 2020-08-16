[理解 React Hooks 的 Capture Value 特性](https://mp.weixin.qq.com/s/D6Kt8rZ5nqgEeO0FLi-oPw) 

1. 每次 Render 都有自己的 Props 与 State
2. 函数在每次渲染时也是独立的
3. 每次 Render 都有自己的事件处理

Capture Value 特性解释了为什么下面的代码会输出 `5` 而不是 `3`:

```jsx
const App = () => {
  const [temp, setTemp] = React.useState(5);
  const log = () => {
    setTimeout(() => {
      console.log("3 秒前 temp = 5，现在 temp =", temp);
    }, 3000);
  };
  return (
    <div
      onClick={() => {
        log();
        setTemp(3);
        // 3 秒前 temp = 5，现在 temp = 5
      }}
    >
      xyz
    </div>
  );
};

```

