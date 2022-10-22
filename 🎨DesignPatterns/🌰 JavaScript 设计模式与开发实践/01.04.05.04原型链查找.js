var obj = { name: 'sven' };
var A = function(){};
A.prototype = obj;
var a= new A();
console.log(a.name); // => sven
// a.name❓ → a__proto__.name❓ → A.prototype.name❓ → obj.name✅

var A = function(){};
A.prototype = { name: 'sven' };
var B = function(){};
B.prototype = new A();
var b = new B();
console.log(b.name); // => sven

// b.name❓ → b.__proto__.name❓ → B.prototype.name❓ → A.prototype.name✅
