<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>

## 我们为什么要用call()?
	

看下面的代码:

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

如果我们想找到指定的grid的div的索引值, 想当然的会用下面的方法, 但其实错误的

	var grid = document.querySelectorAll(".grid");
	grid.indexOf(grid[2]);

因为grid对象没有indexOf()方法, grid对象是类数组对象, 但不是真正的数组, 只有真正的数组才有indexOf()方法

于是我们可以通过借用数组的indexOf()方法去实现, 此时必须用到call(), 代码如下:

	var grid = document.querySelectorAll(".grid");
	Array.prototype.indexOf.call(grid, grid[2]);

Array是个构造函数, 它的方法现在prototype原型里, 我们在Array的原型prototype里找到这个indexOf()方法, 再用call()调用, 便实现了返回其索引值

这有有什么用呢, 举个例子:

点击grid的任意一个div 返回对应的索引值, 代码如下:

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