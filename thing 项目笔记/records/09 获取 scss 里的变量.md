## in js
1. make sure webpack is set up to import scss:

  ```js
  // webpack.config.js
  module.exports = {
    ...
    module: {
      rules: [{
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }]
    }
  };
  ```

2. define variables export file in variables.scss

   ```scss
   // variables.scss
   $white-color: #fcf5ed;
   
   // the :export directive is the magic sauce for webpack
   :export {
     whitecolor: $white-color;
   }
   ```
   
3. 如果是 TS 则需要声明变量

   ```ts
// file must be included in the src directory defined in tsconfig
   declare module '*.scss' {
     const content: {[className: string]: string};
     export = content;
   }
   ```

4. 使用

   ```ts
   import myStyles from '../../mystyles.scss'
   let iconColor = myStyles['whitecolor']
   ```

   

参考链接：

[Share SCSS Variables with Javascript](https://til.hashrocket.com/posts/sxbrscjuqu-share-scss-variables-with-javascript) 

关于在 typescript 也能使用的情况，有两种方法

1. [How to import scss file as variable in react with typescript](https://stackoverflow.com/questions/51038522/how-to-import-scss-file-as-variable-in-react-with-typescript) 
2. https://mattferderer.com/use-sass-variables-in-typescript-and-javascript