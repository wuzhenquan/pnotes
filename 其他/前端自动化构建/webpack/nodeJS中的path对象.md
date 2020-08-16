NodeJS中的Path对象，用于处理目录.

引入path对象

```
var path = require('path');
```

##### 实用方法

- `path.resolve([from …], to)`

  相当于不断地调用系统的cd命令

  ```shell
  path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
  //相当于：
  cd foo/bar
  cd /tmp/file/
  cd ..
  cd a/../subfile
  pwd
  ```


- `path.dirname(p)`

  返回路径所在的文件夹名称

  ```shell
  path.dirname('/foo/bar/baz/asdf/quux')
  =>'/foo/bar/baz/asdf'
  ```


- `path.join([path1], [path2], […])`

  将所有名称用path.seq串联起来，然后用normailze格式化

  ```shell
  path.join('///foo', 'bar', '//baz/asdf', 'quux', '..');
  =>'/foo/bar/baz/asdf'
  ```

- `path.normalize(p)`

- `path.relative(from, to)`

- ` path.basename(p, [ext])`

- `path.extname(p)`

- `path.sep`

- `path.delimiter`

参考链接:

[Node.js的Path对象](http://www.css88.com/archives/4497)




