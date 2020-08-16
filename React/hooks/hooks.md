React hook 

Hooks are a new feature proposal that lets you use state and other React features without writing a class. 

toRead: 

- [Thinking in React Hooks ](https://wattenberger.com/blog/react-hooks ) 
- Video: https://youtu.be/dpw9EHDh2bM  
- [Redener props ](https://reactjs.org/docs/render-props.html ) 
- [High-Order Components ]( https://reactjs.org/docs/higher-order-components.html) 
- [Hooks API ](https://reactjs.org/docs/hooks-reference.html) 
- [Hooks FAQ ](https://reactjs.org/docs/hooks-faq.html ) 
- ✅[译 React hooks: 不是魔法，只是数组](https://zhuanlan.zhihu.com/p/48293710?utm_source=weibo&utm_medium=social&utm_oi=26706148589568&utm_content=snapshot)  
- ✅[精读《React Hooks》 ](https://zhuanlan.zhihu.com/p/49408348 )
- [使用 React Hooks 创建可复用的动画组件 ](https://mp.weixin.qq.com/s/rqivGGmQlg4-cECWIvVNfw)
- [React 函数式组件性能优化指南 ](https://mp.weixin.qq.com/s/mpL1MxLjBqSO49TRijeyeg)
- ✅[useEffect 完全指南](https://github.com/dt-fe/weekly/blob/master/96.%E7%B2%BE%E8%AF%BB%E3%80%8AuseEffect%20%E5%AE%8C%E5%85%A8%E6%8C%87%E5%8D%97%E3%80%8B.md) 

[some useful hooks](https://github.com/streamich/react-use) 

Overview 

What is a hook?  

- https://reactjs.org/docs/hooks-overview.html#but-what-is-a-hook 
- https://reactjs.org/docs/hooks-state.html#whats-a-hook 

use state and other React features without writing a class. 

problems: 

- hard to reuse stateful logic between components. https://reactjs.org/docs/hooks-custom.html 
- complex components become hard to understand. https://reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns 

why adding hooks 

- classes confuse both people and machines 

To solve these problems, Hooks let you use more of React’s features without classes. 

 

State Hook 

```
import { useState } from 'react';
```

Effect Hook 

```
import { useEffect } from 'react';
```

React runs the effects after every render.  

effect hook compares to class lifecycles? 

“clean up” by returning a function 

Using the State Hook 

What do we pass to useState as an argument? 

What does useState return? 

unlike this.setState in a class, updating a state variable always replaces it instead of merging it. 

Using the Effect Hook 

The Effect Hook lets you perform side effects in function components. 

Mutations, Data fetching, subscriptions, timers, logging, and manually changing the DOM in React components are all examples of side effects. 

two common kinds of side effects 

​	- don’t require cleanup 

​	- require cleanup 

By using this Hook, you tell React that your component needs to do something after render. 

By default, run after every render.  

If your effect returns a function, React will run it when it is time to clean up.（what is time to clean up?） 

cleanup? what's meaning when return function in userEffect 

second parameter, if second parameter is []? 

Rules of Hooks 

enforce these rules by https://www.npmjs.com/package/eslint-plugin-react-hooks 

- Only Call Hooks at the Top Level. Means don’t call Hooks inside loops, conditions, or nested functions.  
- Only Call Hooks from React Functions. Means don’t call Hooks from regular JavaScript functions. 

Building Your Own Hooks 

Try to resist adding abstraction too early. 



**Basic Hooks**

- `useState`
- `useEffect`
- `useContext`

**Advanced Hook**

- `useReducer`
- `useCallback`
- `useMemo`
- `useRef`
- `useImperativeHandle`
- `useLayoutEffect`
- `useDebugValue`

 

文章： 

- [对React Hooks的一些思考](https://zhuanlan.zhihu.com/p/48264713)

 

工具库 

- https://github.com/react-hook-form/react-hook-form 