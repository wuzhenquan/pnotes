// 出了用 let 创建作用域，旧的方式是直接通过函数来创建作用域
var myObject = (function(){
  var __name = 'sven'; // 私有(private)变量
  return {
    getName: function() { // 公开(public)变量
      return __name;
    }
  }
})();

console.log(myObject.getName()); // => 'sven'
console.log(myObject.__name); // => undefined