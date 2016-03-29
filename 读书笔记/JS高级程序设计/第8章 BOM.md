<link rel="stylesheet" href="http://yandex.st/highlightjs/6.1/styles/default.min.css">
<script src="http://yandex.st/highlightjs/6.1/highlight.min.js"></script>
<script>
    hljs.tabReplace = '    ';
    hljs.initHighlightingOnLoad();
</script>

## 第8章 BOM

### 窗口位置

- window.screenLeft相当于window.screenX
- window.screenTop相当于window.screenY
- 注意火狐只有screenX和screenY

跨浏览器取得窗口左边和上边的位置

	var leftPos = (typeof window.screenLeft == "number")?window.screenLeft:window.screenX;
	var topPos = (typeof window.screenTop == "number")?window.screenTop:window.screenY;

### 窗口大小

- 浏览器窗口本身的尺寸outerHeight和outerWidth
- 浏览器页面视区的大小innerHeight和innerWidth

### window.location




