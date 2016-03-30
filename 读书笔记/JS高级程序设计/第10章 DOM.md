<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>

## 第7章 DOM

- 访问子节点
	- somenode.childNodes[0]
	- somenode.childNodes.item(0)
- 将Nodelist对象转换为数组
	- Array.prototype.slice.call(somenode.childNodes, 0)
- 节点关系
	- parentNode
	- childNodes----------children
	- firstChild----------firstElementChild
	- lastChild-----------lastElementChild
	- previousSibling-----previousElementChild
	- nextSibling---------nextElementChild
	- hasChildNodes()
- 操作节点
	- createElement()
	- createTextNode()
	- appendChild() 用`ele.innerHTML="<div></div>"`也是很方便的
	- insertBefore()
	- replaceChild()
	- removeChild()
- 其他方法
	- cloneNode()
	- normalize()
- 文档信息
	- document.documentElement();// 取得对html的引用
	- document.body;// 取得对body的引用
	- document.doctype;// 取得对<!DOCTYPE>的引用
	- document.title; // 取得文档的标题
	- document.title="new page title"; // 设置文档的标题
	- document.URL; // 取得完整的URL
	- document.domain; // 取得域名
	- document.referrer; // 取得来源页面的URL
- 查找元素
	- document.getElementById();
	- document.getElementByTagName();

对于节点的属性, 只要找到对应的节点对象访问其对应的属性名就好了, 例外的是class属性, 因为class是保留字, 所以访问class属性的使用用someNode.className来访问.还有一个例外是name属性, 得用someNode.nameItem()来访问. 干脆全部写下来好了


- 访问元素属性
	- element.tagName.toLowerCase;
	- element.id;
	- element.className;
	- element.title;
	- element.lang;
	- element.dir;
- 另一种方式访问元素属性
	- element.getAttribute("id");
	- element.getAttribute("class");
	- element.getAttribute("title");
	- element.getAttribute("lang");
	- element.getAttribute("dir");
- 设置元素属性
	- element.setAttribute("id","name");
	- element.setAttribute("class","name");
	- element.setAttribute("title","name");
	- element.setAttribute("lang","name");
	- element.setAttribute("dir","name");
	- 也可以通过给属性赋值来设置属性
		- element.id = "someOtherId";
		- element.className = "someOtherClassName";
		- 无法给自定义的属性设置属性值;
- 移除元素属性
	- element.removeAttribute("id");
	- element.removeAttribute("class");
	- element.removeAttribute("title");
	- element.removeAttribute("lang");
	- element.removeAttribute("dir");
- attributes属性
	- 通过attributes得到, 移除, 设置属性不够方便
	- 能派上用场的是用了遍历元素的特性(属性)
- 创建元素
	- var div = document.createElement("div");// div是元素标签名
	- div.id = "myNewDiv";
	- div.className = "box";
	- document.body.appendChild(div);//将新元素添加到文档树.
- 文本节点
	- 访问文本节点: element.firstChild;
	- 创建文本节点: document.creatTextNode(text);
	- `nodeValue`值为文本节点所包含的文本;
	- `parentNode`是一个Element;
	- `textNode.appendData(text);`将text添加到节点的末尾;
	- `textNode.deleteDate(offset,count);`从offset指定的位置删除count个字符
	- `textNode.insertData(offset, text);`从offset指定的位置插入text
	- `textNode.replaceDate(offset, count, text);`用text替换从offset指定的位置开始到offset+count为止的文本.
	- `textNode.splitText(offset);`从offset指定的为止将当前文本节点分成两个文本节点
	- `textNode.substring(offset, count);`提取从offset指定的位置开始到offset+count为止处的字符串
- 滚动
	- scrollIntoView();
	- 

