#### 用户信息操作

配置

- git config --global user.name <yourname>
- git config --global user.email <youremail>

获取

- git config --get user.name
- git config --get user.email

#### 撤销修改

> 场景1: 修改后还没有放到暂存区, 要撤销的话

git checkout -- filename 直接丢弃工作区的修改

如果丢弃后又要捡回来, 在文本编辑器上用撤销快捷键

> 场景2: 修改了且添加到了暂存区, 要撤销这次add的话

- git reset HEAD filename 加add后的filenam文件退回到工作区
- git checkout -- filename 直接丢弃工作区的修改

> 场景3: 已经commit了, 想撤销的话

- git reset --hard HEAD^

> 场景4: 撤回最近一次 commit, 并将这次修改的地方放到暂存区

- git reset --soft HEAD^

> 场景5: 误删要恢复

- git checkout -- filename

> 场景6: 回退到之前的版本号之后, 再跳到最新的版本号

- git reflog
- 复制commit-id
- git reset --hard commit-id

>  场景7: 修改已经提交的 commit 的作者

-  git commit --amend --author "username  <wzq@gmail.com>"

>  场景8: 回退的版本要再提交

-  新建分支
  -  git checkout -b temp              //新建分支并切换到temp分支
  -  git push origin temp:temp         //将代码push到temp分支
-  删除主分支
  -  git push origin --delete master   //删除远端主分支
  -  git branch -d master              //删除本地主分支
-  新建主分支
  -  git checkout -b master            //新建主分支并切换到主分支
  -  git push origin master            //提交主分支
- 删除暂存分支
  -  git branch -d temp
  -  git push origin --delete temp


#### 删除文件

> 场景1: 确实要删除

- git rm filename
- git commit -m""

>场景2: 误删要恢复

- git checkout -- filename

#### 合并 commit 

> 场景1: 合并最新的三个commit

- `git rebase -i HEAD~~~` (要合并几个 commit 就几个波浪号)
- 此时进入vim, 第一行不动, 后面两行把 `pick` 改成 `s` ( s 代表squash), 保存退出
- 删掉默认的 commit 备注, 自己写一个commit 备注, 保存退出
- 参考链接: http://blog.csdn.net/zmyde2010/article/details/8603810

## 多人协作 

#### 添加单个SSH公钥

- 生成SSH: `ssh-keygen -t rsa -C "username@example.com"`(注册的邮箱)
- 添加公钥: `vi .ssh/id_rsa.pub`，复制其中全部内容，填写到SSH_RSA公钥key下的一栏, 然后点击添加
- 如果`git remote show origin`后还要输入密码, 用`git remote -v`查看是在用HTTPS还是用SSH方式访问仓库, 如果是用HTTPS方式访问仓库, 要修改成SSH方式
  - 执行`git remote remove origin`删除该远程路径
  - 执行`git remote add origin git@aaaaaa.github.com:aaaaaa/xxxxxx.git`加上正确的远程仓库。

#### 添加多个SSH公钥

[reference](https://blog.csdn.net/lyfqyr/article/details/87892271) 

1. 创建第二个密钥 `ssh-keygen -t rsa -C "$your_email"`
2. 此时命令行出现 `Enter file in which to save the key (Users/Spring/.ssh/id_rsa):`，此时自己输入第二个密钥名，例如 `id_rsa_meiyou` 
3. 在 `.ssh` 目录下新建 config 文件，示例：
  ```
  Host github.com
    HostName      github.com
    User  git
    IdentityFile  /Users/wuzhenquan/.ssh/id_rsa_github
  Host gitlab.meiyou.com
    HostName      gitlab.meiyou.com
    User  git
    IdentityFile  /Users/wuzhenquan/.ssh/id_rsa_meiyou
  ```
4. 清空 `.ssh/known_hosts` 文件内容
5. ssh命令验证结果 `ssh -T git@gitlab.meiyou.com`

#### 将已有git项目放到github上

- 在github上创建一个同名仓库, 例如:hello-world
- 在本地git仓库下
  - git remote add origin git@github.com:wuzhenquan/hello-world
  - git push -u origin master
  - "-u"了一次之后, 就不用再"-u"了, 直接 git push origin master就行了

#### 克隆github上的项目
> clone后, 只有默认的master是可见的, 要让dev可见, 需**建立远程origin的dev到本地dev**

- git clone git@github.com:wuzhenquan/learngit.git
- git checkout -b dev origin/dev

#### 与主干保存同步

- 第一种
  - git pull origin 分支名
- 第二种
  - git fetch origin master
    - git fetch origin表示取回所有分支的更新
    - git fetch origin master表示只取回origin主机的master分支
  - git log -p master..origin/master 比较本地的master分支和origin/master分支的差别
    - git merge origin/master 将本地master和远程master(origin/master)合并


#### 分支

> 使用分支完成某个任务, 合并后再删掉分支, 虽然和在master分支上工作效果一样, 但过程更为安全


- 创建并切换分支: git checkout -b branchname
  - 创建分支: git branch branchname
  - 切换分支: git checkout branchname
  - 从远程分支创建到本地分支: git checkout -b 本地分支名 origin/远程分支名  或者  git fetch origin 远程分支名:本地分支名
- 列出所有的分支并显示当前分支: git branch 
- 合并分支: git merge branchname
  - 在master上合并(fast forward模式): git merge branchname (merge后显示不出分支信息)
  - 在master上合并(禁用fast forward模式): git merge --no-ff -m"备注信息" branchname
- 删除分支: 
  - 删除本地分支: git branch -d branchname 
  - 删除远程分支: git push origin --delete branchname
如果在分支上修改没有提交就直接切换回master上的话, 文件是不会更改的


#### 解决分支冲突

> 两个分支(例如feature1和master)修改了同一处地方再merge之后, 会产生冲突, 冲突结果是在当前分支上合并都合并各自的内容

解决方法:

- git status 先查看状态
- 修改冲突标记的部分
- git add filename
- git commit -m"conflict fixed"

#### 推送分支 

> 将分支推送到远程仓库, 要注意哪些必须需要推送哪些不需要推送

- **master和dev分支必须推送**
  - git push origin master
  - git push origin dev
- 如果本地新建的分支不推送到远程, 对其他人就是不可见的
- 从本地推送分支

#### 抓取分支
> git pull(会自动merge), 把最新的提交从origin上抓下来

- git pull
  - 如果失败, 说明没有指定dev分支与远程origin/dev分支的链接, 需要`git branch --set-upstream dev origin/dev`
  - 如果提示有冲突, 要手动解决冲突
- 再git pull
- git commit -m"merge & fix dev"
- git push origin dev

#### 把已经提交的commit, 从一个分支放到另一个分支
> git cherry-pick <commit id> (这里的 commit id 指的是另外一个要合并的分支的 commt id)

## 标签管理

- 创建标签 `git tag v1.0 `
  - 在master上建一个带有备注信息的v1.0版本的标签 `git tag -a v1.0 -m "version 0.1 released"`
- 删除标签 `git tag -d v0.1`
- 推送标签到远程`git push origin <tagname>` 
  - 一次性全部推送`git push origin --tags` 
- 在历史提交的commit-id上打标签 `git tag v1.0 commit-id`
- 查看标签 `git tag` (列出的标签是按字母顺序的)
- 查看标签某一个标签信息 `git show v1.0`

## git和svn的不同之处
- git分布式, svn集中式
- git有暂存区, svn没有
- git有强大的分支管理, svn没有



## 场景

场景1:当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时

> 答: 用命令git checkout -- file。

场景2:当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改

> 答: 第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交

> 参考版本回退一节，不过前提是没有推送到远程库。

场景4: 在dev分支上, 其他人最新的push和你试图push的有冲突

> - git pull
	- 如果失败, 说明没有指定dev分支与远程origin/dev分支的链接, 需要`git branch --set-upstream dev origin/dev`
> - 在git pull
> - git commit -m"merge & fix dev"
> - git push origin dev


场景5: master主干上有一个bug, 急需修复.新功能还没开发完, 等解决完bug之后回到刚才开发新功能的工作状态

> 答: 用git stash 相关的命令操作

场景6: 想切换分支, 但是还有修改的代码没 commit

> 答: 用 git stash 相关命令暂存现在的工作区

