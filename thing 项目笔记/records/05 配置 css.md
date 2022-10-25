虽然暂时不考虑用上 css Modules，在怀着好奇心折腾一下的时候发现不能用（import 引入的 后缀名为 module.css 的文件打印出来后的对象是空的）

网上搜索了下找到[答案](https://stackoverflow.com/questions/50234890/how-to-use-css-modules-with-create-react-app)了:

> You need to eject create-react-app and then in config files for webpack you add these 2 lines 
![](https://i.stack.imgur.com/Mmlip.jpg)

