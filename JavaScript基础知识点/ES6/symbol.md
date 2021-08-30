https://javascript.info/symbol

https://www.javascripttutorial.net/es6/symbol/

# what

生成唯一值

Technically, symbols are not 100% hidden.

### api

- **Symbol.for()**: create a symbol that will be shared

- **Symbol.keyFor**: get the key associated with a symbol

  ```js
  const sym = Symbol.for("name");
  alert( Symbol.keyFor(sym) ); // name
  ```

- **Symbol.hasInstance**: change the behavior of he instanceof operator

  ```js
  class Stack {
      static [Symbol.hasInstance](obj) { return Array.isArray(obj); }
  }
  console.log([] instanceof Stack); // true 👏👏👏
  ```

- **Symbol.iterator**: The objects that have `Symbol.iterator` property are called iterable objects.

  ```js
  var numbers = [1, 2, 3];
  var iterator = numbers[Symbol.iterator]();
  console.log(iterator.next()); // Object {value: 1, done: false}
  console.log(iterator.next()); // Object {value: 2, done: false}
  console.log(iterator.next()); // Object {value: 3, done: false}
  console.log(iterator.next()); // Object {value: undefined, done: true}
  ```

- **Symbol.isConcatSpreadable**: 

  ```js
  // example 1
  let arr = [1,2,3];
  let extras = arr.concat(4);
  console.log(extrasf); // [1,2,3,4]
  
  / example 2
  let list = {
      0: 'JavaScript',
      1: 'Symbol',
      length: 2,
      [Symbol.isConcatSpreadable]: true
  };
  let message = ['Learning'].concat(list);
  console.log(message); // ["Learning", "JavaScript", "Symbol"]
  ```

- **Symbol.toPrimitive**: 

  ```js
  function Money(amount, currency) {
      this.amount = amount;
      this.currency = currency;
  }
  Money.prototype[Symbol.toPrimitive] = function(hint) {
      var result;
      switch (hint) {
          case 'string':
              result = this.amount + this.currency;
              break;
          case 'number':
              result = this.amount;
              break;
          case 'default':
              result = this.amount + this.currency;
              break;
      }
      return result;
  }
  
  var price = new Money(799, 'USD');
  
  console.log('Price is ' + price); // Price is 799USD
  console.log(+price + 1); // 800
  console.log(Number(price)); // 799
  console.log(String(price)); // 799USD
  ```

# why

- Using symbold as unique values

  ```js
  let statuses = {
      OPEN: Symbol('Open'),
      IN_PROGRESS: Symbol('In progress'),
      COMPLETED: Symbol('Completed'),
      HOLD: Symbol('On hold'),
      CANCELED: Symbol('Canceled')
  };
  ```

- “Hidden” object properties.

  - If we want to add a property into an object that "belongs" to another script or a library, we can create a symbole an use it as a property key;
  - A symbol property dose not appear in `for..in`;
  - It won't be accessed directly. 
  
  ```js
  let status = Symbol('status');
  let task = {
      [status]: statuses.OPEN,
      description: 'Learn ES6 Symbol'
  };
  console.log(Object.keys(task)); // ["description"]
  console.log(Object.getOwnPropertyNames(task)); // ["description"]
  console.log(Object.getOwnPropertySymbols(task)); //[Symbol(status)]
  ```
  
  

