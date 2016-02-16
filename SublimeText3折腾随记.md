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

