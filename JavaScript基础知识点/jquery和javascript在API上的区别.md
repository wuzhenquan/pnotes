属性

- javascript: `getAttribute` `setAttribute` `removeAttribute`
- jquery: attr()


设置radio属性的checked值

- javascript: document.querySelector("input[type='radio']").checked=true;
- jquery: `$("input[type='radio']").prop("checked","checked")`


获取属性(以获取id属性为例)

- javascript: `doucment.getElementsByTagName("div").id`
- jquery: `$("div").attr("id");`


改变属性(以改变src属性为例)

- javascript: `document.getElementById("image").src="landscape.jpg"`
- jquery: `$("#image").attr("src", "landscape.jpg")`


改变文本节点

- javascript:` document.getElementById("p").innerHTML="New text!";`(还没测试)
- jquery: `$("#p").text("New text!")`


获取节点相对于兄弟节点的索引值

- javascript: [参考链接](http://segmentfault.com/q/1010000002983934)
- jquery: `$("li").index(listItem)`或者`$(listItem).index('li')`


删除元素

- javascript: `element.parentNode.removeChild(element)`(还没测试)
- jquery: `$("div").remove()`

添加元素

- JavaScript: `element.innerHTML = "巴拉巴拉一堆元素标签"`
- jQuery: `$element.html()`

通过类名查找元素

- JavaSctipt: `element.querySelectorAll(".className")`;
- jQuery: `$element.find(".className")`;

移除类名

- JavaScript: `element.classList.remove("disabled")`(HTML5新增), IE9不支持, 用
  ```javascript
  var removeClassName=element.className.replace("要删除的类名 ","");//注意在"要删除的类名"后加空格
  element.className=removeClassName;
  ```

- jQuery: `$element.removeClass("disabled")`

添加类名

- JavaScript: `element.classList.add("current")`(HTML5新增), IE9一下不支持, 可以用`element.calssName+=" 类名"`(记得在类名前加空格)
- jQuery: `$element.addClass("current")`

toggle类名

- JavaScript: `element.classList.toggle("user")`(HTML5新增)
- jQuery: `$element.toggleClass("user")`

```

\```