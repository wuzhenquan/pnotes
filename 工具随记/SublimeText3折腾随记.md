## package control
> 安装package control有两种 

### 安装

-  第一种 控制台安装
	- 打开sublime官网[packagecontro.io](https://packagecontrol.io/) 
	- 点击 "Install Now"
	- 复制安装代码
	- 在sublime中打开控制台`view > show console `(快捷键control+` )
	- 重启Sublime Text，完成安装

-  第二种 手动安装
	- `Preferences > Browse Packages...`
	- 在打开的资源管理器中向上一个目录，然后进入到Installed Packages/目录
	- 下载[Package Control.sublime-package](https://sublime.wbond.net/Package%20Control.sublime-package) 并复制到Installed Packages/目录下
	- 重启Sublime Text，完成安装
	
### 打开控制台

- 快捷键 `control+shift+P`
- 输入`package control` 或者 `PC` 下来才懂有很多选项
	- install package 安装插件
	- list package 列出所有插件

## 自定义

在`Preferences->Setting-Default`里, 是sublime的默认配置文件, 要想自定义一些配置, 建议在`Preferences->Setting-User`里直接添加

比如在`Preferences->Setting-Default`里的折叠标签显示`"fade_fold_buttons": false,`要想改为true, 得在`Preferences->Setting-User`

## 安装主题

- 快捷键`control+shift+P`
- 加载所有的插件 输入 `pci`(package control install)
- 输入主题名字比如`Material Theme` 回车
- 安装完成之后会 sublime会出现package control message文件, 是关于这个Material Theme主题的说明
- 找到配置信息比如
	
	  {
	    "theme": "Material-Theme.sublime-theme",
	    "color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",
	  }

- preferences > setting users 把配置信息放到该文件下
- 保存就会立即使用该主题 

## 插件

- 最好看的主题 [Material Theme](https://github.com/equinusocio/material-theme)
- 代码美化(需要nodejs)[HTMLPrettify](https://github.com/victorporof/Sublime-HTMLPrettify)
- BufferScroll 轻松书写一个文件多个位置了
- git和gitgutter, 不知道两者之间的区别是什么, 不过听好用的, 在window最底部会出现乱码. [解决办法](https://www.zhihu.com/question/20537304)
## 快捷键

- `Ctrl+Shift+[` 折叠代码
- `Ctrl+Shift+]` 展开代码