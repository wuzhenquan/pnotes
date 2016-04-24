# Webpack傻瓜式指南

  链接:[Webpack傻瓜式指南(一)](http://zhuanlan.zhihu.com/p/20367175?columnSlug=FrontendMagazine)   [Webpack傻瓜指南(二)](http://zhuanlan.zhihu.com/p/20397902)   [Webpack傻瓜指南(三)](http://zhuanlan.zhihu.com/p/20522487) 

  相关链接:[初学webpack遇到的坑](http://www.yatessss.com/2016/01/29/%E5%88%9D%E5%AD%A6webpack%E9%81%87%E5%88%B0%E7%9A%84%E5%9D%91.html)

  ## 指南二

### 开发技巧

#### 启用source-map
#### 配置webpack-dev-server代理
#### 使用preLoaders和postLoaders
#### 加载jQuery plugin或者其他legacy第三方库

### 部署上线

这样生成的bundle.js文件大小会小一点

#### 分离app.js和第三方库

里面有个vendors 意思就是jquery, moment这样的第三方库

执行之后生成一个叫vendors.js的文件, 是这些第三方库的压缩版

#### 生成多页面

在plugins选项里面两个 new HtmlwebpackPlugin 生成两个页面并对应一些配置

#### 生成Hash名称的script来防止缓存















 

  
