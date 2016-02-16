## Atom使用随记

[快捷键](http://m.blog.csdn.net/blog/bomess/45674649)
[试用体验](http://www.ituring.com.cn/article/72264)
[中文官网](https://atom-china.org/t/guan-fang-shou-ce-atom-ji-chu-shi-yong/62)
[英文官网](https://atom.io/docs/latest/getting-started-atom-basics)
[插件推荐](https://atom-china.org/t/fen-xiang-zi-ji-shou-ji-de-shi-yong-cha-jian/107)

#### 插件安装方法
1. setting内部搜索安装
2. 上github下载插件,放在atom目录下的package,重开打开软件会自动识别
3. 使用apm命令安装,例:apm install 插件名称

###快捷键
- 呼出Panel对话框`Ctrl + Shift + P`
- Markdown实时预览`Crtl+Shift+M`
- 快速多文件切换 `cmd + T`
- 文件内跳转到指定行 `ctrl + G`
- 文件内查找和替换 `cmd + F `
- 多文件查找和替换`cmd + shift + F`
- 选中光标所在的行`cmd+l`,再一次`cmd+l`,再选中下一行
- 代码美化 安装atom-beautify后 `ctrl+option+B`
- 浏览器预览 安装run-in-browser后 `ctrl+option+R`
- 复制当前行到下一行`shift+cmd+D`

###markdown代码高亮
代码块可以使用语法高亮了！！在你的代码块中添加一个可选的语言标识符,我们会通过语法高亮显示运行它。例如，为了语法高亮ruby代码：

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

### 和brackets一样具有包裹标签的功能的功能
