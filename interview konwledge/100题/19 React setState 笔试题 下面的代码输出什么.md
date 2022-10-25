https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/18
```react
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

第一次、第二次进入了**批量更新**模式

第三次、第四次进入了**非批量更新**模式

在React的setState函数实现中，会根据一个变量 isBatchingUpdate 来判断是直接同步更新this.state还是放到队列中异步更新 。React使用了事务的机制，React的每个生命周期和合成事件都处在一个大的事务当中。在事务的前置钩子中调用batchedUpdates方法修改isBatchingUpdates变量为true，在后置钩子中将变量置为false。原生绑定事件和setTimeout异步的函数没有进入到React的事务当中，或者当他们执行时，刚刚的事务已近结束了，后置钩子触发了，所以此时的setState会直接进入非批量更新模式，表现在我们看来成为了同步SetState。 

