

```html
<span>Sample Text <svg viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"></path></svg></span>
```

```css
span {
  font-size: 1em;
  border-bottom: 1px dotted red;
  zoom: 3; /* for easier readability */
}

span svg {
  fill: #3b5998;
  height: 1em;
  vertical-align: bottom;// 关键在这，默认的 vertical-align 是 baseline, 改成 bottom 就好了
}
```

 try the following values `top`,`text-top`,`middle`,`bottom`,`text-bottom` and see the differences.

为什么 svg 会如此特殊？

先了解 vertial-align 



参考链接

- [SVG inside span isn't on the same line as the text](https://stackoverflow.com/questions/46503436/svg-inside-span-isnt-on-the-same-line-as-the-text)
- [5 Gotchas You’re Gonna Face Getting Inline SVG Into Production](https://css-tricks.com/gotchas-on-getting-svg-into-production/)
- [Align SVG Icons to Text and Say Goodbye to Font Icons](https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4)