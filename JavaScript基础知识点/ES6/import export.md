#### Name exports

- one file can have multiple exports
- use any name we like

```js
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) { return x * x; }

//------ main.js ------
// two ways
import { sqrt, square } from 'lib'; // different
import * as lib from 'lib'; // different
```

#### Default exports (one per module)

- on file only have one export
- no name

```js
//------ myFunc.js ------
export default function () { ... };

//------ main1.js ------
import myFunc from 'myFunc'; // different
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



https://hackernoon.com/import-export-default-require-commandjs-javascript-nodejs-es6-vs-cheatsheet-different-tutorial-example-5a321738b50f