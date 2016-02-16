## 搭建流程
> 在搭建的时候, 因为不了解hexo同步到wuzhenquan.github.io上的原理, 导致踩了一些坑

[教程1](http://www.jianshu.com/p/73779eacb494)
[主题修改](http://www.jianshu.com/p/70343b7c2fd3)

hexo初始化

	第一种: $ hexo init blog
	第二种: 创建并进入blog文件夹 $ hexo init
	
cd到blog

	$ npm install
	
安装hexo插件

	npm install hexo-generator-index --save
	npm install hexo-generator-archive --save
	npm install hexo-generator-category --save
	npm install hexo-generator-tag --save
	npm install hexo-server --save
	npm install hexo-deployer-git --save
	npm install hexo-deployer-heroku --save
	npm install hexo-deployer-rsync --save
	npm install hexo-deployer-openshift --save
	npm install hexo-renderer-marked@0.2 --save
	npm install hexo-renderer-stylus@0.2 --save
	npm install hexo-generator-feed@1 --save
	npm install hexo-generator-sitemap@1 --save
	
生成public文件

	$ hexo g
	
配置Github

> 要先在github上创建一个repo 名为yourname.github.io的仓库名 不要添加readme.md

在blog文件下找到 _config.yml 修改yml里面的文件

在最下面

	deploy:
	   type: git ##部署類型 其他類型自行google之
	   repo: https://github.com/yourname/yourname.github.io ##git倉庫地址
	   branch: master ##git 頁面分支
	   message: "updatee" ##git message建議默認字段update 可以自定義

命令行输入
	
	hexo g
	hexo deploy	   

至此 你就可以在wuzhenquan.github.io上看到自己的博客啦

## 更换主题
> 更换主题需要先在github上下载主题 这里我用 [TKL](https://github.com/SuperKieran/TKL)

在github上找到主题地址 然后在themes目录下执行
	
	$ git clone https://github.com/SuperKieran/TKL.git

在_config.yml里的

	theme: landscape
	修改成
	theme: TKL
	
执行`hexo s` 打开链接即可看到更换好的主题

把主题同步到github pages上

	hexo g
	hexo deploy



	