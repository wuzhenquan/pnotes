##mac xxamp搭建本地服务器

> 在mac上快速搭建本地服务器的软件有mamp pro(付费)和xxamp(免费), 这里介绍了xxamp的使用 

- [安装教程](http://www.arefly.com/xampp-mac/)
- [使用教程1](http://blog.sina.com.cn/s/blog_9592635a0102uy87.html)
- [下载地址](https://www.apachefriends.org/zh_cn/index.html)
- 安装成功后在浏览器上输入`http://localhost`就可以看到如下页面表示成功了![](http://hi.csdn.net/attachment/201201/7/0_132594826701r0.gif)
- 把需要测试的php文件放在`Applications/xampp/xamppfiles/htdocs`, 在浏览器上输入http://localhost/hsq/,会出现403错误,提示"Access forbidden", 如图:
![](http://s13.sinaimg.cn/large/4ed32a40gdf14f340c12c&690)
出现这样的原因是因为在`/XAMPP/xamppfiles/apache2/conf`内的`http.conf`文件的配置没有修改, 把`deny from all`改为`Allow from all`, 在重启apache就行了
- 在浏览器地址栏输入`http://localhost/php文件名/`就可以浏览php文件了, 但刚开始的时候没有导入数据, php文件打不开.
- 此时导入数据, 在浏览器地址栏输入`http://localhost/phpmyadmin/`, 然后就创建, 把数据文件导入
> 具体怎么操作我也忘了, -_-, 什么utf-8什么鬼的.
- 把原来复制的php删了, 用svn从服务器checkout了一份, 发现, 打开不了php文件, 在php文件的Home文件下新建一个Runtime文件, 右键点击这个文件，显示简介－－》加上读与写，然后点开右下角的锁，然后点锁左边的设置图标－》应用到包含的项目就ok [更多的解决方法](https://www.baidu.com/s?wd=mac%20xampp%20%E6%9D%83%E9%99%90&rsv_spt=1&rsv_iqid=0xf7057c9f000366d8&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=0&oq=mac%20xampp%20runtime%E6%9D%83%E9%99%90&rsv_t=0581ExTFEWM4b8jDi%2Bm151E5hBLhvoQhpi97%2FF%2FsIRE5YoxGWaleYgnHKtUyZSOT0oPH&rsv_pq=baaaecae00034b49&inputT=1842&rsv_sug3=40&rsv_sug1=25&bs=mac%20xampp%20runtime%E6%9D%83%E9%99%90)