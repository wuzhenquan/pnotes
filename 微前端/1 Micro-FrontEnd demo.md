https://www.youtube.com/watch?v=lKKsjpH09dU

# 笔记

## 使用 pnpx 安装微前端 app 
---
1 先安装好 pnpm

2 安装两个项目
1. `pnpx create-mf-app`: home ➡️  Application ➡️  port 3000 ➡️ react ➡️  javascript ➡️  tailwind
2. `pnpx create-mf-app`: pdp(product detail page) ➡️ javascript ➡️ react ➡️  tailwind

3 进入各自的目录跑起来 `yarn && yarn start`

4 webpack 的插件 ModuleFederationPlugin  配置

修改 `src/home/webpack.config.js
```js
{
	plugins: [
		new ModuleFederationPlugin({ 
			exposes: {
				"./Header": "./src/Header.jsx",
				"./Footer": "./src/Footer.jsx",
			},
		}),
	]
}
```

修改 `src/pdp/webpack.config.js
```js
{
	plugins: [
		new ModuleFederationPlugin({ 
			exposes: {
				"./Header": "./src/Header.jsx",
				"./Footer": "./src/Footer.jsx",
			},
		}),
	]
}
```

## Server Setup
---
📺 https://youtu.be/lKKsjpH09dU?t=1931

**0 初始化**
```shell
pnpx create-mf-app
# 之后选择：命名为 server ➡️ API Server ➡️ 8080 端口 ➡️ 选择 nestjs-auth 模版
yarn
yarn start:dev #continuously wath the server for updates
```
之后就会生成模版代码，有兴趣可以了解一下文件结构。

authorized.controller.ts: 访问 http://localhost:8080/unauthorized 页面会显示一个 “true”

**1. set up routing properly** 
get products without actually being logged in
把 unauthorized 相关的代码改为 products

**2. products list** 
src/products.ts 放 product 的数据

**3. get product info by product id**
products.controller.ts
```ts
  @Get(':id')
  async show(@Param('id') id: string): Promise<Product> {
    return products.find((product) => product.id === parseInt(id));
  }
```

## Sharing Functions
--- 
home 项目新增组件 HomeContent，用来显示所有的产品。
	src/product.js 添加请求方法 getProducts、getProductById，公共方法 currency。并配置到 webpack expose 里
	
pdg 项目新增组件 `PDPcontent`，用来显示产品详情页。
	添加路由 `/product/:id` 对应组件 `PDPcontent`

## Nomenclature 
---
https://youtu.be/lKKsjpH09dU?t=3003 why? explore how to state bewteen the host and the remote.
home page is the remote. pdp page is the host 

## Sever Cart Setup
---
https://youtu.be/lKKsjpH09dU?t=3250 
将 `src/modules/authorized` 模块改造成 `src/modules/cart` 模块
`src/modules/cart.controller.ts`: 添加方法 create 和 destory，用于添加购物车和删除购物车。

## Sharing State
---
之前已经有了 `home` 和 `pdp` 两个项目了，现在我们来加一下第三个项目 -- `cart` 项目
`pnpx create-mf-app`: cart ➡️  Application ➡️  port 3002 ➡️ react ➡️  javascript ➡️  tailwind
	`yarn add rxjs` 

## Sharing JWT
---
##### 给 cart 项目添加登录功能
- `src/App.jsx` 
	- 引用 `home` 项目的组件 `home/Header` 和 `home/Footer`
	- 引用组件 `./CartContent`
- `./CartContent` 
	- 监听 `./cart` 里的 `jwt`
	- 引用组件 `./Login`
- `./Login` 组件编写了一系列 UI 和 `./cart` 里的 login 和 userLoggedIn 做交互
- `./cart` 
	- 暴露请求登录的方法
	- 暴露 hook useLoggedIn


## Sharing the Cart
---
`cart` 项目 `src/cart` 新增三个 API 请求方法 `getCart`、`addToCart`、`clearCart`
`cart` 项目新增 `MiniCart` 和 `Login` 组件

在 `home` 项目的组件 `src/Header` 中引入了 `cart` 项目的组件  `Login` 和 `MiniCart`，满足 `home` 项目的登录和查看购物车功能。
给 `home` 项目的组件 src/HomeContent 添加 “Add to Cart” UI 和事件

配置 `cart` `home` `pdp` 项目的 webpack，remotes 
```js
remotes: {
	home: "home@http://localhost:3000/remoteEntry.js",
	header: "header@http://localhost:3001/remoteEntry.js",
	cart: "cart@http://localhost:3002/remoteEntry.js",
},
```

## Finishing the Cart
---
修改 `cart` 项目的 `src/CartContent` 组件。

## Cross-Platform Micro-Frontends
---
新建一个项目 `addtocart`，新增组件 `AddToCart` 和 `placeAddToCart`， webpack 暴露：
```js
exposes: {
	'./AddToCart': "./src/AddToCart.jsx",
	'./placeAddToCart': "./src/placeAddToCart.js",
  },
```

项目 pdp 的组件 `PDPContent` 引入项目 `addtocart` 的组件 `placeAddToCart`，注意这里引用的方式不一样了，是用 `ref` 获取 `PDPContent` 的一个 `div`，再把这个 `div` 做为参数传输到 placeAddToCart 的。

## Micro-Frontend Routing
---
现在有一个问题, 在 localhost:3000 登录然后添加一个商品到购物车后，再在地址栏输入 localhost:3002 跳转，发现这个页面没有登录，还需要登录一遍，因为这是一个 new page refresh，并不是一个单页应用。

所以，我们如何将 localhost:3000、localhost:3001、localhost:3002 合成一个单页应用呢？

`home` 项目的 `App.jsx` 里使用 `MainLayout` 组件, `MainLayout` 组件包含了 `Header` 组件、路由(`HomeContent`、`PDPContent`、`CartContent`)、Footer 组件

为什么每个路由页面都能共享登录状态？
因为用的都是同一个来自 `cart` 项目的 hook -- useLoggedIn，useLoggedIn 里又用了`rxJS` 去订阅 `jwt` ，登录成功后 jwt 就是有值了，表示登录了。然后使用 useLoggedIn 就会拿 jwt 是否有值去判断是否登录。

接下来就是给 home/Header 添加 react-router 的 Link 用来跳转路由了。

# 问题

1. 服务挂了怎么办，可打包，然后用 server 在 dist 目录下起一个静态文件服务器
2. how to handle asynchronous loading? https://youtu.be/lKKsjpH09dU?t=1265
3. pdp 项目在使用 home 项目的组件时，home 的组件修改了代码，pdp 项目并不知道 home 修改了，导致 pdp 项目出错了。
	答：1. react error boundary 2. 如果 something blows up，可以回退到上一个版本(是一种 fallback methodology)(使用 federation 或 npm 的方法去 fallback)。
3. 跨域问题，pdp 页面在使用 home 的组件的时候发现 API 请求跨域了，会有这种情况出现吗？

