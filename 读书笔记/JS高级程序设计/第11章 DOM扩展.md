> 虽然DOM为与XML及HTML文档交互指定了一系列核心API, 但仍然有几个规范对标准的DOM进行了扩展. 这些扩展中有和很多事浏览器专有的, 但后来成为了事实标准, 于是其他浏览器也都提供了相同的实现.

### 选择符API

- `element.querySelector()`
- `element.quertSelectorAll()`
- 通过`querySelectorAll()`, 可以找到某个元素下符合要求的子元素, 便可通`方括号`语法或者`item()`方法进行索引. 
- `matchesSelector()`

### 元素遍历

- `childElement`
- `fistElementChild`
- `lastElementChild`
- `previousElementChild`
- `nextElementChild`

### HTML5新增(只讨论和DOM节点相关的内容)

- `element.getElementsByClassName()`括号里面可选取多个类名, 这不是和`quertSelectorAll()`大同小异么......

- 对一个元素的类名增加, 删除, 替换

  - HTML5以前的方法, 将某个元素的类名通过字符串的`split()方法`转换成数组, 通过数组的方法去增加, 删除, 替换
    ```html
    <div id="div" class="bd user disabled">...</div>
    <script>
         // 取得类名字符串并拆分成数组
      var div = document.getElememtById("div");
      var className = div.className.split(/\s+/);
      // 找到要删的类名
      var pos, i, len;
      for(i=0, len = className.length; i<len; i++){
              if(className[i] == "user"){
                  pos = i;
              break;
            }
        }
        // 删除类名
        className.splice(i, 1);
        // 把剩下的类名拼成字符串并重新设置
        className.join(" ");// 注意里面是个空格
    </script>
    ```

  - HTML5 新方法, 元素会有一个`classList`属性. classList还有这些方法

    - `ele.classList.add(value)`, 

    - `ele.classList.contains(value)`, 

    - `ele.classList.remove(value)`, 

    - `ele.classList.toggle(value)`

      ```html
      <div class="bd user disabled">...</div>
      <script>
          var div = document.getElememtById("div");
        var className = div.className.split(/\s+/);
        div.classList.remove("disabled");// 
        div.calssList.toggle("user");
        if(div.classList.contains("bd")&&!div.class.contains("disabled")){
        // 执行操作
          }
        // 迭代类名
        for(var i=0, lendiv.classList.length; i>len;i++){
        doSomething(div.classList[i]);
          }
      </script>
      ```




- 焦点管理
  - `document.activeElement("")`返回当前获得了焦点的元素
  - `document.hasFocus()`检查文档是否获得了焦点
- 检测文档是否加载完毕`document.readyState`, 返回`loading`或`complete`, HTML5之前必须借助onload事件处理程序设置一个标签.
- 兼容模式: `document.compatMode`, 标准模式下值为`CSS1Compat`, 兼容模式下值为`BackCompat`
- `document.head`, 和`document.body`如出一辙.
- 字符集属性
  -  `document.charset`, 访问或者设置这个字符集, 比如`document.charset="UTF-8"`
  -  `document.defaultCharset`, 查看默认的字符集

- 自定义属性
  - 示例: `<div data-myname="wzq"></div>`, 在JS中更改这个属性值`ele.dataset.myname="Tran"`

- 插入元素
  - `innerHTML`
  - `outerHTML`
  - `insertAdJacentHTML()`
  - 使用`innerHTML`, 效率高, 可读性强
  - 注意用这种方式删除带有事件处理程序的节点的时候, 记得也删除这个事件处理程序,
  - 避免在循环内使用`innerHTML`, 效率低. 最好最后一次性将结果字符串赋给`innerHTML`

- 插入文本
  - `innerText`返回元素下(包括子元素)所有的文本节点(用字符串表示)
    - `element.innerText=element.innerText`可以过滤掉HTML标签.
    - 注意与`textContent`的区别.
    - 火狐不支持`innerText`, 但支持`textContent`
    - 有必要编写一个函数来检测可以使用哪些属性.

  - `outerText`不建议用, 会替换整个元素

- `element.scrollIntoView()`让元素出现在视口中, 与视扣顶部平齐
- `element.children`
- 某个节点是不是另一个节点的后代`parentElement.contains(childELement)`返回true或false
- `element.compareDocumentPosition(anotherElement)`, 根据其返回的掩码值判断`element`和`anotherElement`之间的关系. 
- 滚动(不是所有浏览器都支持, 不常用)
  - `scrollIntoViewIfNeed(alignCenter)`
  - `scrollByLines(lineCount)`
  - `scrollByPages(Pagecount)`



