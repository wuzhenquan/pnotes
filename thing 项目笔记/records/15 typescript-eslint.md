> :warning: **TSLint [has been deprecated](https://medium.com/palantir/tslint-in-2019-1a144c2317a9) as of 2019**. Please see this issue for more details: [Roadmap: TSLint → ESLint](https://github.com/palantir/tslint/issues/4534). [typescript-eslint](https://typescript-eslint.io/) is now your best option for linting TypeScript.



https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/



## Installation and setup

Run the following commands to setup ESLint in your TypeScript project.

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Create an `.eslintrc` file.

```bash
touch .eslintrc
```

```json
// .eslintrc
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

### Ignoring files we don't want to lint

Create an `.eslintignore` in order to prevent ESLint from linting stuff we don't want it to.

```bash
touch .eslintignore
```

```text
// .eslintignore
node_modules
dist
```

### Adding a lint script

n your project `package.json`, lets add a `lint` script in order to lint all TypeScript code.

```json
{
  "scripts": {
    ...
    "lint": "eslint . --ext .ts",
  }
}
```

Ready to try it out? Let's run the following command.

```bash
npm run lint
```

## 遇到的问题

#### Could not find a declaration file for module 'react'. 

> Could not find a declaration file for module 'react'. '/Users/Spring/Documents/GitHub/thing/frontend/react-tsx/node_modules/react/index.js' implicitly has an 'any' type.
>   If the 'react' package actually exposes this module, consider sending a pull request to amend 'https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react` 

原因：`@types/react` 没装































