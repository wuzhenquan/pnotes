### zepto没有`end()`

### zepto要animate的效果需要加上fx.js插件

### Zepto 的选择器表达式: [name=value]  中value 必须用 双引号 "  or 单引号 ' 括起来

  例如执行：$('[data-userid=123123123]')
         结果：Error: SyntaxError: DOM Exception 12
  解决办法： $('[data-userid="123123123]"') or $("[data-userid='123123123']")
