var makeSound = function(animal) {
  if (animal instanceof Duck) {
    console.log('嘎嘎嘎');
  } else if (animal instanceof Chicken) {
    console.log('咯咯咯');
  }
}

var Duck = function() {};
var Chicken = function() {};

// 当我们分别向鸭和鸡发出“叫唤”的消息时，
// 它们根据此消息作出了各自不同的反应
makeSound(new Duck()); // => 嘎嘎嘎
makeSound(new Chicken()); // => 咯咯咯

// 但这样的“多态性”是无法令人满意的，
// 如果后来又增加了一只动物（比如狗，显然狗的叫声是汪汪叫的），
// 此时我们必须得改动 makeSound 函数，
// 才能让狗也发出叫声。
// -- 修改代码总是危险的。