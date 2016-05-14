- 文本会溢出 文本内加空格就不会了
- ul li中li之间有间隔的解决办法
  - 第一种: 每个li标签之间不换行不空格
  - 第二种: 设置ul的属性`font-size: 0px;`, li的font-size再设置成相应大小, li的display设置为`inline-block`
- 手机上1rem显示不正确, 是因为meta的viewport标签没有写
- 垂直居中-1(这个效果只能让文字居中)
  - 父元素`display: table;`
  - 子元素`display: table-cell;vertical-align: middle;`
- div水平居中, 除了设置text-align:center;之外, 还要设置display:inline-block;
- 父元素宽度固定, 子元素div 自动换行
  - 父元素给一个固定的width, 子元素`float: left;`
- background-clip：border/padding/content
- background-origin：padding/border/content
- absolute 和 width: 100%;最好不要一起使用


- 给span加上宽高记得`display:inline-block`,不然就没有宽高了

- `<ul>`元素的默认`padding-left`为40px

- 把`<li>`打横并去掉默认样式`ul,li{margin:0px;padding:0pc}li{list-style-type:none;}`

- `body, div, ul, li, h2{margin:0;padding:0;}`把他们默认的 margin 和 padding 都去掉. 其他元素也需要的话后面补上就好. 

- 清除浮动
  - `.clearfix:after {content:"200B"; display:block; height:0; clear:both; } `其中`200B`表示的是**零宽度空格**

- `z-index`属性必须配合`position`属性, 不然就没有效果

- [七阶层叠](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651550819&idx=1&sn=7693f3c2a9d925bf069a08de90705682&scene=0&key=b28b03434249256b78385a9bad723fa032e7da49cd3e9861779e261bf273a1753340dd993b402eef62e1ce81a9333766&ascene=0&uin=NjA4MTU0NDU%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.11.3+build(15D21)&version=11020201&pass_ticket=Mq3pM%2BhKwDJAvg6MdIjqM%2BvoelYSvVTHTHvGcLxEm8U%3D)

  ​