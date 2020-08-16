必须安装 16.6.1 以上的版本

## 基本用法

### 创建一个 context

```react
// CommonContext.js
import React from 'react'
export const common = {
    isSignedIn: false
}

export const CommonContext = React.createContext(common)
```

### 提供 context 数据

将创建好的 context 包在子组件上，并传入 value

The context’s Provider is just a conduit. It doesn’t retain any data. 

```react
// App.js
import { CommonContext } from './CommonContext'

class App extends Component {
    render() {
        return (
          <CommonContext.Provider value={{ isSignedIn: this.state.isSignedIn }}>
            <div>
              {子组件}
            </div>
          </CommonContext.Provider>
        );
    }
}
```

### 获取 context 数据

##### Class.contextType

使用 context 的数据

```react
// component.jsx
import { CommonContext } from '../../CommonContext.js'
class Component extends Component {
    render() {
        console.log(this.context,'this.context')
        return null 
    }
}
Component.contextType = CommonContext
export default BtnSignOut
```

##### Context.Consumer

```react
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```



## API

### React.createContext: 

```react 
const MyContext = React.createContext(defaultValueObj);
```

### Context.Provider : 

```react
class App extends React.Component {
  render() {
    return (
	  <MyContext.Provider value={/* some value */}>
          <Content />
      </MyContext.Provider>
    );
  }
}
```

### Class.contextType:

~~`MyClass.contextType = MyContext`~~(缺点：不能同时使用多个 contexts)

### Context.Consumer: 

```react
function Content(){
  return (
    <MyContext.Consumer>
      {value => /* render something based on the context value */}
    </MyContext.Consumer>
  )
}
```

### Context.displayName

```react
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';
<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

## 问题

### 多个 context 如何使用

> React will find the closest theme Provider above and use its value.

<https://reactjs.org/docs/context.html#consuming-multiple-contexts>

<https://stackoverflow.com/questions/53346462/react-multiple-contexts>

1. 最外层包多个 [Context.Provider](<https://reactjs.org/docs/context.html#contextprovider>)
2. 需要使用到多个 context 的组件外面包上多个 [Context.Consumer](<https://reactjs.org/docs/context.html#contextconsumer>)

关于第二点，更好的办法还是用 [HOC](<https://reactjs.org/docs/higher-order-components.html>) 

```react
const withThemeContext = Component => (
  props => (
    <ThemeContext.Consumer>
      {context => <Component themeContext={context} {...props} />}
    </ThemeContext.Consumer>
  )
)

const YourComponent = ({ themeContext, ...props }) => {
  themeContext.someFunction()
  themeContext.someProperty
  return (<div>Hi Mom!</div>)
}

export default withThemeContext(YourComponent)
```

### Updating Context from a Nested Component

<https://reactjs.org/docs/context.html#updating-context-from-a-nested-component>

## Caveats

<https://reactjs.org/docs/context.html#caveats>

