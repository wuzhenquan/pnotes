##iTerm2和oh my zsh
> 知乎说: iTerm2下使用oh my zsh, 好用到飞起
>
> [iTerm2](http://iterm2.com) & [ oh my zsh](http://ohmyz.sh)

###心酸历程的总结
这里记录了一些从开始到现在的输入命令的步骤, 一个人瞎搞的辛酸就不多说了:

- 查询系统有几种shell: 输入`cat /etc/shells`
- 安装oh my zsh:输入
  `curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh`
  安装好后会提示输入密码, 输入之后会进场chsh(当然在iTerm下输入`chsh`, 再输入密码之后也会进入chsh)
- 把shell修改成zsh: s



> 现在已经是zsh了, 但是也安装了oh my zsh, 但是发现好像, 好像没有再使用oh my zsh, 于是想重新装一遍, 用这个命令`wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh`, 结果发现wget命令not command, 于是去安装wget了, 安装wget之前要安装homebrew, [homebrew官网](http://brew.sh/index_zh-cn.html), 再输入`brew install wget`
>
> 虽然可以用wget命令了,氮素!!!!尼玛!!!!!输入`wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh`发现说安装好了但还是看不到oh my zsh!!!!!!!
> i
- 半透明的终端从天而降，有质感，有逼格！(preferences-->keys-->Hotkeys)
- 在终端输入`~/.zshrc`提示permission denied, 切换到该文件的目录下输入`chomd a+x ./.zshrc`

##iTerm命令
- `chsh`: 修改用户shell的种类
- `echo $SHELL`: 查看现在用了那种shell


## zsh命令

- 清屏: `clear`或者按`ctrl+L`