## 我们为什么要用call()?


看下面的代码:
```html
<div class="grids">
  <div class="grid">1</div>
  <div class="grid">2</div>
  <div class="grid">3</div>
  <div class="grid">4</div>
  <div class="grid">5</div>
  <div class="grid">6</div>
  <div class="grid">7</div>
  <div class="grid">8</div>
  <div class="grid">9</div>
</div>
```

如果我们想找到指定的grid的div的索引值, 想当然的会用下面的方法, 但其实错误的

```javascript
var grid = document.querySelectorAll(".grid");
grid.indexOf(grid[2]);
```

因为grid对象没有indexOf()方法, grid对象是类数组对象, 但不是真正的数组, 只有真正的数组才有indexOf()方法

于是我们可以通过借用数组的indexOf()方法去实现, 此时必须用到call(), 代码如下:
```javascript
var grid = document.querySelectorAll(".grid");
Array.prototype.indexOf.call(grid, grid[2]);
```
Array是个构造函数, 它的方法现在prototype原型里, 我们在Array的原型prototype里找到这个indexOf()方法, 再用call()调用, 便实现了返回其索引值

这有有什么用呢, 举个例子:

点击grid的任意一个div 返回对应的索引值, 代码如下:
```html
<div class="grids">
  <div class="grid">1</div>
  <div class="grid">2</div>
  <div class="grid">3</div>
  <div class="grid">4</div>
  <div class="grid">5</div>
  <div class="grid">6</div>
  <div class="grid">7</div>
  <div class="grid">8</div>
  <div class="grid">9</div>
</div>
<script type="text/javascript">
  var grid = document.querySelectorAll(".grid");
  for (var i = 0; i < grid.length; i++) {
    grid[i].addEventListener("click", function () {
      for(var j = 0; j<grid.length;j++){
        grid[j].className = grid[j].className+" "+"gather";
      }
      alert("点击的是"+(Array.prototype.indexOf.call(grid,this)+1)+"号格子")
    });
  }
</script>
```
#### call() 和 apply 的区别

apply和call的用法只有一个地方不一样，除此之外，其他地方基本一模一样

- call() 可以有 n 个参数, 
- apply() 只有两个参数, 

什么情况下用到 apply()

```javascript
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
// 将arr2中的所有元素添加到arr1中(ES5)
Array.prototype.push.apply(arr1, arr2);
// 不过有了 ES6 , 可以用以下的方法了
arr1.push(...arr2);
```

