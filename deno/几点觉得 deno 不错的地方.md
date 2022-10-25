#### 没有 package.json, 管理依赖的时候更清爽

npm 生态下包信息存放在`package.json`，包含但不限于下面的内容：

- 项目元信息。
- 项目依赖和版本号。
- 依赖还进行分类，比如`dependencies`、`devDependencies`甚至`peerDependencies`。
- 标记入口，`main`和`module`，还有 TS 用的`types`与`typings`，脚手架的`bin`等等。
- npm scripts。

随着标准的不断更新，`package.json`信息已经非常臃肿了。

对于 Deno 来说，则使用`deps.ts`集中管理依赖：

```ts
export { assert } from "https://deno.land/std@v0.39.0/testing/asserts.ts";
export { green, bold } from "https://deno.land/std@v0.39.0/fmt/colors.ts";
```

`deps.ts`就是一个普通文件，只是将项目的依赖精确描述出来，这样其他地方引用`assert`时，就可以这么写了：

```ts
import { assert } from "./deps.ts";
```

不再需要 webpack

#### 关于去中心化

新的「中心化」依赖管理方式可能是另外一个亮点。node_module 被人诟病很大程度上是奇怪的嵌套结构以及有太多默认行为的 resolve 算法，而 deno 和主流编程语言（Java、Rust 等）则更相像，拥有全局的依赖缓存，进行全局的依赖管理，降低理解的心智负担，增强 resolve 明确性