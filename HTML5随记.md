## HTML5新特性
> 有些为了兼容更多文档的的省略或者简写特性, 就不记录了

> 学习链接: [慕课网-HTML5之元素与标签结构](http://www.imooc.com/learn/24)

#### 标签增加了布尔值
`<input type="checkbox" checked/>`(有checked表示true, 没有表示false)而不用写成`<input type="checkbox" checked="checked"/>`

#### 不允许写结束符的标签
`<input/>`不能写成`<input></input>`;`<br/>`不能写成<`br></br>`;

#### 新增的标签
结构标签 媒体标签 表单控件标签 其他标签

#### 被废除的标签
没一个用过所以不记录了

#### 新增属性(摘取)
表单属性 链接属性 其他属性 可以用CSS代替的属性

`<script defer>`该标签下的脚本下载完后等整个HTML文档加载完才执行

`<script async>`马上运行, 同时在运行的过程中继续解析下面的HTML内容

`<iframe seamless sandbox="" src=""></frame>`
- seamless 无边框
- sandbox 阻止提交表单 或 阻止JS运行脚本 或 表示异源

全局属性
- data-yourvalue
- hidden
- spelback
- tabindex
- contenteditable
- designMode
