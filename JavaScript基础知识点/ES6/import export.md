#### Name exports

```js
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) { return x * x; }

//------ main.js ------
import { sqrt, square } from 'lib';
// or
import * as lib from 'lib';
```

#### Default exports (one per module)

```js
//------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
import myFunc from 'myFunc';
```

#### Mixed named & default exports

```js
//------ underscore.js ------
export default function (obj) {...};
export function each(obj, iterator, context) {...}
export { each as forEach };

//------ main.js ------
import _, { each } from 'underscore';
```

#### Cyclical Dependencies

```js
// lib.js
import Main from 'main';
var lib = {message: "This Is A Lib"};
export { lib as Lib };

// main.js
import { Lib } from 'lib';
export default class Main { 
  // ....
}
```

#### export imports

```js
import d, {obj} from '...';
export {obj, d};
export {obj as name1, d as name2};
```

#### re-export

```js
// re-export all named imports
export * from '...';
export * as name1 from '...';
// re-export some named imports
export {a, b as name1} from '...';
// re-export default import as default export
export { default } from '...';
// re-export default import as named export
export {default as name1} from '...';
```



[import, export, default cheatsheet](<https://hackernoon.com/import-export-default-require-commandjs-javascript-nodejs-es6-vs-cheatsheet-different-tutorial-example-5a321738b50f>)
[Using Named Exports as the Default Export](https://medium.com/@timoxley/named-exports-as-the-default-export-api-670b1b554f65)

