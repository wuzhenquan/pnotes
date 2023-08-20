https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/59

BFC: **Block Formatting Context**



用途：

- 清除浮动
- 防止同一 BFC 容器中的相邻元素间的外边距重叠问题

特性：

- 容器里面的子元素不会影响到外面的元素，容器外的元素也不会影响到里面
- BFC 容器会一个挨着一个排列
- 计算 BFC 的高度时，浮动元素也参与计算
- BFC 的区域不会与float box重叠

如何触发：

- boby 的根节点
- 浮动的元素：float除了none以外
- 绝对定位的元素：position（`absolute`、`fixed`）
- display为`inline-block`、`table-cells`、`flex`、`inline-flex`、`flow-root`（*没有副作用的方案，但需注意兼容性*）、`grid`、`inline-grid`等
- overflow除了visible之外



应用举例

1. 利用特性4可实现左图右文之类的效果：

```html
<img src='image.png'>
<p>我是超长的文字<p>
```

```css
img {
    float:left
}
p {
    overflow:hidden
}
```

1. 利用特性5可以解决浮动元素造成的父元素高度塌陷问题：

```html
<div class='parent'>
    <div class='float'>浮动元素</div>
</div>
```

```css
.parent {
    overflow:hidden;
}
.float {
    float:left;
}
```

此外还能实现登高两栏布局，具体见 https://github.com/alianggu/blog/issues/6

**`display:flow-root`这种方式创建一个BFC是最没有副作用的方式**，但是有兼容性问题

https://zhuanlan.zhihu.com/p/25321647

https://github.com/alianggu/blog/issues/6