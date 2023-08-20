var makeSound = function(animal) {
  animal.sound();
}

var Duck = function() {};
Duck.prototype.sound = function() {
  console.log('嘎嘎嘎');
}

var Chicken = function() {};
Chicken.prototype.sound = function() {
  console.log('咯咯咯');
};

makeSound(new Duck());
makeSound(new Chicken());

// 如果有一天动物世界里又增加了一条狗
// 这时候只要简单追加一些代码就可以了

var Dog = function() {};
Dog.prototype.sound = function() {
  console.log('汪汪汪');
};

makeSound(new Dog());

// JavaScript 作为一门动态类型语言，
// 它在编译时没有类型检查的过程，
// 没有检查传递的参数类型。
// 我们既可以往 makeSound 函数里传递 duck 对象当作参数，
// 也可以传递 chicken 对象当作参数。

// 由此可见，某一种动物能否发出叫声，
// 只取决于它有没有 makeSound 方法，
// 而不是取决于它是否是某种类型的对象，
// 这里不存在任何程度上的“类型耦合”。
// JavaScript 中，
// 并不需要诸如向上转型之类的技术来取得多态的效果。