##### 使用 css 写出一个三角形角标

元素宽高设置为 0，通过 `border` 属性来设置，让其它三个方向的 `border` 颜色为透明或者和背景色保持一致，剩余一条 `border` 的颜色设置为需要的颜色。

```
div {
    width: 0;
    height: 0;
    border: 5px solid #transparent;
    border-top-color: red;
}
```