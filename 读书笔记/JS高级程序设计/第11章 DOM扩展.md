### 选择符API

- `element.querySelector()`
- `element.quertSelectorAll()`
- 通过`querySelectorAll()`, 可以找到某个元素下符合要求的子元素, 便可通`方括号`语法或者`item()`方法进行索引. 
- `matchesSelector()`

### HTML5新增(只讨论和DOM节点相关的内容)

- `element.getElementsByClassName()`括号里面可选取多个类名, 这不是和`quertSelectorAll()`大同小异么......

- 对一个元素的类名增加, 删除, 替换

  - HTML5以前的方法
  - ​

  ```html
  <div class="bd user disabled">...</div>
  <script>
  	var className = div.className.split(/\s+/);
      var pos = -1, i, len;
      for(i=0, len = className.length; i<len; i++){
    		
      }
  </script>
  ```

    



### 样式

- `element.style`返回一个类数组对象, 里面除了属性(css样式), 还有一些方法
- `element.style.backgroundImage`
- float是保留字, 改成cssFloat
- `element.style.cssText`返回的是什么
- `element.style.removeProperty("属性名")`