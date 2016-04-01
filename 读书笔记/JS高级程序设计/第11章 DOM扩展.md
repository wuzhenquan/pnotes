### 选择符API

- `element.querySelector()`
- `element.quertSelectorAll()`
- 通过`querySelectorAll()`, 可以找到某个元素下符合要求的子元素, 便可通`方括号`语法或者`item()`方法进行索引. 
- `matchesSelector()`

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
  - HTML5 新方法, 元素会有一个`classList`属性. classList还有这些方法`add(value)`, `contains(value)`, `remove(value)`, `toggle(value)`
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


### 样式

- `element.style`返回一个类数组对象, 里面除了属性(css样式), 还有一些方法
- `element.style.backgroundImage`
- float是保留字, 改成cssFloat
- `element.style.cssText`返回的是什么
- `element.style.removeProperty("属性名")`