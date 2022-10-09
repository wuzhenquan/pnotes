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

### 屏幕宽高

- `screen.width`
- `screen.height`

### 浏览器宽高

- 浏览器窗口本身的尺寸`window.outerHeight`和`window.outerWidth`(包括滚动条)
- 浏览器页面视区的大小`innerHeight`和`innerWidth`

### 浏览器视口宽高

- `document.body.clientWidth`and`document.body.clientHeight`(不包括滚动条)

- `document.documentElement.clientWidth`and`document.documentElement.clientHeight`(不包括滚动条)

  ​


