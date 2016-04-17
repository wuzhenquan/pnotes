学习了阮老师的React教程, 目的是为了熟悉React语法.

以后还会写React with npm初探

另外, webpack也是要学习的, 移步我的笔记[webpack初探]()

以下是学习了阮老师的[React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html?bsh_bid=1041433791), 记的一些笔记

## React HTML模板

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script><!--React 的核心库-->
    <script src="../build/react-dom.js"></script><!--与 DOM 相关的功能-->
    <script src="../build/browser.min.js"></script><!--将JSX转换成JavaScript-->
  </head>
  <body>
    <div id="example"></div>
    <!--凡是使用 JSX 的地方，都要加上 type="text/babel"-->
    <script type="text/babel">
      // ** Our code goes here! **
    </script>
  </body>
</html>
```

实际上线的时候, 不应该引入文件`browser.min.js`, 这种将JSX转换成JavaScript的过程应该在放到服务器完成用

```
$ babel src --out-dir build
```

## ReactDOM.render()

在指定的元素内插入JSX



先看例子

```html
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

以目前的理解, 应该就是`ReactDOM.render(JSX,要插入的父类元素)`的语法了, 搭配JSX, 还挺好用的

## JSX

JSX 的基本语法规则：**遇到 HTML 标签（以 `<` 开头），就用 HTML 规则解析；遇到代码块（以 `{` 开头），就用 JavaScript 规则解析**, 但只是说用这个规则解析, 实际上所有的JSX都是JavaScript.

按照这个规则, 在使用ReactDOM.render()时第一个参数就是JSX了, 里面可以写html和javascript, 值得书之一的是, 写javascript的时候必须在包裹上`{}`, 这样才能解析出javascript, 在JSX上写javascript的目的, 也是用来return文本或者html标签, 如下

```html
<script type="text/babel">
	var names=['wu','zhen','quan'];
        ReactDOM.render(
          <div>
              {
                names.map(function(nameItem){
                  // html标签内想要返回通过js计算出来的变量, 应该包裹一个`{}`
                  return <div>{nameItem}</div>
                })
              }
          </div>,
          document.getElementById('example')
        );
    );
</script>
```

至此发现了一个关于javascript的小坑, 在`var name=[1,2,3]`时, 结果name还是字符串, 原因是因为name是关键字, 不能用name作为变量名, 用names

## 定义一个组件

`React.createClass()`用于生成一个组件(componet), 具体用法见下

```html
// 生成一个组件, 变量名HelloMessage首字母必须大写
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render(
// 生成HelloMessage后的用法, 把HelloMessage当做标签来使用
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```

##### 问题1

React和ReactDOM的区别是?

可以说, ReactDOM只是React的一部分, 在上面的例子中, `ReactDOM`可以替换成`React`, 不会出现问题. 他们可以算作两个React的package(经过自己的发现, React依赖的是react.js, ReactDOM依赖的是react-dom.js), 除了这两个还有其他的可以通过npm require的packages: [`react-native`](https://facebook.github.io/react-native/), [`react-art`](https://github.com/reactjs/react-art), [`react-canvas`](https://github.com/Flipboard/react-canvas),  [`react-three`](https://github.com/Izzimach/react-three) ---- by [stackoverflow](http://stackoverflow.com/questions/34114350/react-vs-reactdom)

##### 问题2

可以通过this.props访问name, 可是自定义的属性比如data-id怎么访问?

##### 发现

`React.createClass()`和`React.Component()`功能几乎是一样的, 至于区别, 移步[ `React.createClass()`VS`React.Component()`](https://toddmotto.com/react-create-class-versus-component/)

`React.createClass()`里面必须有个render方法, 用于输出组件(component)

当 ` return <div>react <span>dom</span></div>`后, 在html显示的是`<div><span>react</span> <span>dom</span></div>`, 所以为了避免出现多添加的标签, 最好在文本之外都套上html标签

##### 注意

因为JSX并不遵循XML或者HTML规范, JSX是根据ECMAScript的特性来设计的.因此在JSX中, 一些保留字比如class, for, 不要使用

```javascript
// JSX中
<HelloMessage name="John" id="iddd" class="classss" for="forrr"/> // 错误
<HelloMessage name="John" id="iddd" className="classss" htmlFor="forrr"/> // 正确
```
## this.props.children

```html
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

`React.Children.map()`是用来遍历对象子节点的方法

`this.props.children`表示的是组件的所有子节点, 这是`this.props`对象的唯一一个例外属性. 除了`this.props.children`, `this.props`对象的其他属性都和组件的属性一样对应

## PropTypes

有时, 我们需要一种机制, 验证别人使用组件是, 提供的参数是否符合要求

组件的`PropTypes`属性, 就是用来验证组件实例的属性是否符合要求

```html
var MyTitle = React.createClass({
  // 这是组件的propsType属性
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },
  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
var data = 123;
ReactDOM.render(
  <MyTitle title={data} />,
  document.body
);
// 结果是, title属性不通过验证, 因为已经要求了title属性必须是字符串
```

`getDefaultProps`方法可以用来设置组件属性的默认值

##### 问题

`React.PropTypes.string.isRequired,`是怎么用的?

除了`PropTypes`,`render`, `getDefaultProps`,组件类还有什么属性?

## 获取真实的DOM节点



```html
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);
```

##### 问题1

`this.refs`指的是?

##### 问题2

`this.refs.myTextInput`指的是?

`<input type="text" ref="myTextInput" />`.如果要获取用户的输入, 组件里的`input`框必须有一个`ref`属性. 然后 `this.refs.[refName]` 就会返回这个真实的 DOM 节点。

##### 问题3

`this.refs.myTextInput.focus()`指的是?

##### 问题4

为什么`onClick`要用驼峰法?因为`onclick`是保留字吗?

不. JSX里面的元素不遵循HTML规范. JSX里面全是JS. 所以`onClick`是React封装后的事件.[完整的事件清单](http://facebook.github.io/react/docs/events.html#supported-events)

##### 问题5

为什么不用原生的`onclick`?

`React.createClass()`里面是对象, 再用`element.onclick()`就不好用啦.虽然在组件之外也可以通过`element.onclick()`去实现, 但是, 对组件化的实现不利, 把元素, 事件, 写在一个组件里, 会更好管理.

##### 发现

- `handleClick`是子定义的属性, handleClick是自定义的, 这里定义一个函数, 方便组件元素里用onClick调用
- 我尝试着组JSX上写`<input type="button" onClick={this.handleClick;this.clickAlert}/>`报错, 看来不能同时放两个函数啊.

## this.state

组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个**状态机**，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI 

```html
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
  // 上面为什么要event, 删除了发现不要也可以
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```

点击查看[原文例子](http://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-shouldnt-go-in-state)

效果:点击`You like this. Click to toggle.`, 变成`You like this. Click to toggle.`, 如此toggle下去.

这种状态机, 有三个必要的属性或者方法

`getInitialState:function(){return {aaa: true}`: 属性. 用于定义初始状态

`this.setState(aaa: !this.state.liked)`:方法. 修改状态值

`this.state`:对象. 通过`this.state.aaa`查看此时的状态

**注意**: `this.props`和`this.state`的区别, `this.props`是用来查看组件的属性(id啊, class啊, name啊什么的), `this.state`则是状态了, 状态机需要用到`this.state` 

## 表单

```html
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input/>, document.body);
```

##### 发现

- `<input type="text" value={value} onChange={this.handleChange} />`添加`上ref="textInput"`

再把`this.setState({value: event.target.value});`换成`this.setState({value: this.refs.textInput.value});`也是可以的, 不过原来的更好.

- 可以在getInitialState属性中定义多个状态! ,这样可以在一个组件中同步不同的元素状态, 比如价格输入框和价格显示同步, 数量输入框和数量显示同步

   ```
  getInitialState: function(){
    return {value1: 'Hello`',
    		  value2: 'Hello',
    		  valur3: 'Hello'
    		 }
  }	
   ```

## 组件的生命周期

组件生命周期([Component Lifecycle](https://facebook.github.io/react/docs/working-with-the-browser.html#component-lifecycle))的三个状态

- Mounting
- Updating
- Unmounting

三种状态五种处理函数

- `componentWillMount()`
- `componentDidMount()`
- `componentWillUpdate(object nextProps, object nextState)`
- `componentDidUpdate(object prevProps, object prevState)`
- `componentWillUnmount()`

React 还提供两种特殊状态的处理函数。

- `componentWillReceiveProps(object nextProps)`：已加载组件收到新的参数时调用
- `shouldComponentUpdate(object nextProps, object nextState)`：组件判断是否重新渲染时调用

```html
var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  },

  render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
});

ReactDOM.render(
  <Hello name="world"/>,
  document.body
);
```

##### 问题1

`this.timer`是什么?

自己定义的, 改成`this.aaa`也行. 去掉`this.timer=`也可以! 说明this.timer只是为了给组件添加一个timer属性.

##### 问题2

既然不要`this.timer`, 为什么这里要?

因为调用`setTimeout`或者`setIntervel`之后, 该方法会返回一个数值ID, 是计划执行代码的唯一标识符,可以通过它来取消超时调用比如`clearTimeout(ID)`或者`clearInterval(ID)`. 因此有必要通过`this.timer`给组件加一个timer属性.

##### 发现

- 用到了`setIntervar(function(){}.bind(this),100)`,  不然里面的`this`会指向window.
- [React 组件样式](https://facebook.github.io/react/tips/inline-styles.html)是一个对象. `<div style={{opacity: this.state.opacity}}></div>`中,第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。
- `<div style="{{opacity: this.state.opacity}}"></div>`是错的, 不能加引号.原因嘛, 我猜因为这是JSX, 不是HTML, JSX里面的`""`会认为是字符串.......

## AJAX

```html
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.body
);
```

##### 发现

- `$.get(url,function(){this})`这个this指向的是XHR对象, 如果要指向这个组件, 改成`$.get(url,function(){this}).bind(this)`

(完)