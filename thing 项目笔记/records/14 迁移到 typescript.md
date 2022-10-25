## 前端部分

https://create-react-app.dev/docs/adding-typescript/

### 重命名文件

Rename all `.js/.jsx` files in `src` to `.ts/.tsx`

mac 下：

```shell
brew install rename
cd src
# 将目录下所有的 jsx 文件重命名为 tsx 文件
rename 's/\.js/\.ts/' **/*.jsx
# 将目录下所有的 js 文件重命名为 tsx 文件
rename 's/\.js/\.tsx/' **/*.js
# 只是打印出要改变的文件 实际并不会打印出来
rename -n 's/\.js/\.tsx/' **/*.js


# 将目录下所有的 js 文件重命名为 ts 文件
rename 's/\.js/\.ts/' **/*.js
# 只是打印出要改变的文件 实际并不会打印出来
rename -n 's/\.js/\.ts/' **/*.js

```

### 遇到的问题

#### 1. React Hook useEffect has a missing dependency: 'getTodos'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

```jsx
const Component = () => {
  /*...*/
  // keep function reference
  const getTodos = useCallback(() => {
    fetch('/api/businesses/').then(...)
  }, [/* additional dependencies */]) 
  useEffect(() => {
    getTodos();
  }, []);
  /*...*/
}
```

答案参考：

[Is it safe to omit functions from the list of dependencies?](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)

[How to fix missing dependency warning when using useEffect React Hook?](https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook) 

It's telling you that hook depends on function `getTodos`, so you should pass it as dependency.

解决办法：

```jsx
const Component = () => {
  const { getData } = props
  /*...*/
  // keep function reference
  const fetchBusinesses = useCallback(() => {
    getData()
  }, [getData]) 
  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);
  /*...*/
}
// or
const Component = props => {
  const { getData } = props
  useEffect(getData, [])
}                                     
```

#### 2. Argument of type '{ credentials: string; method: string; }' is not assignable to parameter of type 'RequestInit'.
Types of property 'credentials' are incompatible.
Type 'string' is not assignable to type '"include" | "omit" | "same-origin" | undefined'

```ts
// 问题代码
const config: CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || '',
  init: { credentials: 'include' }
}
function get(params: { a: string }) {
  return fetch(`${config.baseUrl}/${params.a}`, {
    method: 'GET',
    ...config.init
  }).then(res => res.json())
}
// 改正
interface CONFIG {
  readonly baseUrl: string;
  readonly init: {
    credentials: RequestCredentials;
  };
}
const config: CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || '',
  init: { credentials: 'include' }
}
```

完整 fectch 的 init

```ts
interface RequestInit {
  body?: any;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  window?: any;
}
```

#### 3. Could not find a declaration file for module 'jsencrypt'.

原因：[TypeScript作为JavaScript的超集，在开发过程中不可避免要引用其他第三方的JavaScript的库。虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript诸如类型检查等特性功能。为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述JavaScript库和模块信息的声明文件。通过引用这个声明文件，就可以借用TypeScript的各种特性来使用库文件了。](https://www.cnblogs.com/niklai/p/6095974.html) 

问题代码

```tsx
import { JSEncrypt } from 'jsencrypt'
```

改正，在 src 目录下添加 index.d.ts 文件, [解决方法](https://github.com/travist/jsencrypt/issues/94#issuecomment-510062531) 

```ts
// index.d.ts
declare module 'jsencrypt' {
  export class JSEncrypt {
    constructor();
    setPublicKey(pk: string): void;
    encrypt(key: string): string;
  }
}
```

在 `tsconfig` `include` 字段包含的范围内编写 .d.ts，都将被自动识别为声明文件

在`x.js`相同目录创建同名声明文件`x.d.ts`，这样也会被自动识别；

**为什么 typescript 装在 dependencies 里** 

> https://github.com/facebook/create-react-app/issues/6180#issuecomment-453640473
>
> In case of CRA, the end result is a static bundle. So in a sense *all* dependencies are "development dependencies", even React or libraries you use. They're used only at the build time.

[How do I decide whether @types/* goes into `dependencies` or `devDependencies`?](https://stackoverflow.com/questions/45176661/how-do-i-decide-whether-types-goes-into-dependencies-or-devdependencies) 

## 后端部分

*这部分内容只是说明如何运行 ts 后端代码，要运行开发环境请看[运行开发环境.md](https://github.com/wuzhenquan/thing/blob/master/record/运行开发环境.md)。* 

需要改动的地方，将 commonJS 的模块导入导出相关的语法改为 TS 模块系统导入导出的语法。

### ~~第一种：用 typescript 编译 ts 到 js~~ 

缺点：多了一个编译的阶段/

https://medium.com/@masnun/typescript-with-koa-part-1-c4843f16a4ad

**简单且原始** 

1. 安装

```shell
npm init -y
npm i -S koa koa-bodyparser koa-json koa-logger koa-router
npm i -g typescript
npm i -D @types/node
```

2. ⭐️ 创建目录分为 src 和 dist（独立出源码目录和编译目标目录）

3. ⭐️ 创建文件 [tsconfig.json](https://github.com/masnun/koamed/blob/c0cd9552dc/tsconfig.json) 或者直接用命令生成 `npx tsc --init` 

4. ⭐️ 创建文件 [src/index.ts](https://github.com/masnun/koamed/blob/c0cd9552dc/src/index.ts) 

5. ⭐️ 创建文件 [/index.js](https://github.com/masnun/koamed/blob/c0cd9552dc/index.js) 

6. ⭐️ 执行 `tsc`. That should create a index.js file in the `dist` directory. 

7. ⭐️ 执行 `node .` 

**进化** 

1. 自动化编译、自动化监听。

   1. 自动化编译： `tsc -w` (~~`tsc`~~)。
   2. 自动化监听：先安装 `npm i -g nodemon` ， `nodemon .` (~~`node`~~)。

2. Adding Type Definitions

   ```shell
   npm i -D @types/koa @types/koa-router @types/koa-json @types/koa-logger @types/koa-bodyparser 
   ```

3. Parsing Request Body

4. Adding Types for Request Body

   ```ts
   interface HelloRequest {
     name: string;
   }
   
   // Hello world
   router.post("/", async (ctx, next) => {
     const { name } = <HelloRequest>ctx.request.body;
     ctx.body = { name };
     await next();
   });
   ```

### 第二种：用 ts-node 直接运行项目

还是直接用 ts-node 比较直接比较爽

**原始** 

use [ts-node](https://github.com/TypeStrong/ts-node) to run: `ts-node src/index.ts` 

**进化** 

监听并运行： `ts-node-dev src/index.ts`，要装 `npm i -D typescript`。

**最终** 

```ts
// package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "NODE_PATH=src NODE_ENV=development ts-node-dev src/index.ts",
    "production": "NODE_PATH=src NODE_ENV=production ts-node src/index.ts"
},
```





**为什么 typescript 装在 devDependencies  里**

> https://github.com/facebook/create-react-app/issues/6180#issuecomment-453640473
>
> the distinction is meaningful for Node apps because they actually are deployed as runtime. So you might not want to deploy development dependencies.

[How do I decide whether @types/* goes into `dependencies` or `devDependencies`?](https://stackoverflow.com/questions/45176661/how-do-i-decide-whether-types-goes-into-dependencies-or-devdependencies) 

if you were using `NODE_PATH`, and maybe`SASS_PATH` for absolute imports, you’ll need to do this:

Have a separate file `tsconfig.extended.json` *(name is irrelevant)*, with content:

```
{
  "compilerOptions": {
    "baseUrl": "src"
  }
}
```

In `tsconfig.json`, at the root of the JSON add:
`"extends": "./tsconfig.extended.json",`

The reason you need to do this is, CRA will remove any properties it deems invalid in `tsconfig.json`. However, it won’t touch files it extends. And adding this does work, so, maybe it’ll be officially supported in the near future.

**参考** 

[Node.js 项目 TypeScript 改造指南](https://juejin.im/post/5de4867f51882573135415dd) 

这篇文章讲到了*目录结构*、*模板文件提取*、*ESLint 配置*

### 遇到的问题

#### 1. Cannot redeclare block-scoped variable 'fs'.

```js
const fs = require('fs')
// 会报这个错 Cannot redeclare block-scoped variable 'fs'.
```

**为什么？** [File has been declared as a *script* and share the global scope with other scripts.](https://medium.com/@muravitskiy.mail/cannot-redeclare-block-scoped-variable-varname-how-to-fix-b1c3d9cc8206) [TypeScript doesn't recognize your files as actual modules](https://stackoverflow.com/a/35759334/5825344) 

**如何解决？** 

- 第一种：文件最后使用 `export {}` 

  为什么这样就可以解决？涉及到 TS 的[作用域问题](https://github.com/wuzhenquan/Notes/blob/master/TypeScript/typescript.md#作用域问题)，这样每个文件就是一个模块，就是单独的作用域。

- 第二种：改成这样写 `import * as fs from "fs"` 



#### 2. File '/src/app/index.ts' is not a module.

```ts
import * as app from 'app/index'
// 会报这个错 File '/src/app/index.ts' is not a module.
```

**如何解决？** 将 `app/index.ts` 的导出改成 TS 的模块系统的导出语法就好了。[来源](https://stackoverflow.com/a/32805764/5825344) 



#### 3. Property 'session' does not exist on type 'ParameterizedContext<any, IRouterParamContext<any, {}>>'. 

```ts
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-550784278
...
const router = new Router();
...
router.get('/', (ctx) => {
  ctx.body = 'welcome';
  ctx.session.name = 'abc'; // error TS2339: Property 'session' does not exist on type 'ParameterizedContext<any, IRouterParamContext<any, {}>>'.
});
...
```

**为什么？** `koa-session` extends `Context` by [typescript declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html), but `koa-router` uses `ParameterizedContext` instead of `Context`.  [来源](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417) 

**如何解决？** we just need to use capabilities of generic Router class

```ts
...
import { DefaultState, Context } from 'koa';
const router = new Router<DefaultState, Context>();
...
```

## 学习资料：

[Typescript 学习笔记](https://www.cnblogs.com/niklai/category/864376.html) 

[TypeScript Deep Dive - Node.js QuickStart](https://basarat.gitbook.io/typescript/nodejs)

[How to Setup a TypeScript + Node.js Project](https://khalilstemmler.com/blogs/typescript/node-starter-project/) 

##   总结

create-react-app 前端项目可以将所有的包放到 dependencies 里，但 后端项目不能？

为什么？https://github.com/facebook/create-react-app/issues/6180

### 开发环境指南

**前端** 

`yarn start`

**后端** 

```json
  "scripts": {
    "start": "NODE_PATH=src NODE_ENV=development ts-node-dev src/index.ts",
    "production": "NODE_PATH=src NODE_ENV=production ts-node src/index.ts"
  }
```