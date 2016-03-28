属性

- jquery: attr()
- javascript: `getAttribute` `setAttribute` `removeAttribute`

设置radio属性的checked值

- jquery: `$("input[type='radio']").prop("checked","checked")`
- javascript

获取属性(以获取id属性为例)

- jquery: `$("div").attr("id");`
- javascript: `doucment.getElementsByTagName("div").id`

改变属性(以改变src属性为例)

- jquery: `$("#image").attr("src", "landscape.jpg")`
- javascript: `document.getElementById("image").src="landscape.jpg"`

改变文本节点

- jquery: `$("#p").text("New text!")`
- javascript:` document.getElementById("p").innerHTML="New text!";`(还没测试)

获取节点相对于兄弟节点的索引值

- jquery: `$("li").index(listItem)`或者`$(listItem).index('li')`
- javascript: [参考链接](http://segmentfault.com/q/1010000002983934)

删除元素

- jquery: `$("div").remove()`
- javascript: `element.parentNode.removeChild(element)`(还没测试)