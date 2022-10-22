// 改造前
const makeSound = function (animal) {
  if (naimal instanceof Duck) {
    console.log("Quack Quack Quack");
  } else if (animal instanceof Chicken) {
    console.log("Cluck Cluck Cluck");
  } else if (animal instanceof Dog) {
    console.log("Whoops Whoops Whoops");
  }
};

const Duck = function () {};
const Chicken = function () {};
const Dog = function () {};

makeSound(new Duck());
makeSound(new Chicken());
makeSound(new Dog());

// 改造后
const makeSound = (animal) => animal.sound();

const Duck = function () {};
Duck.prototype.sound = () => console.log("Quack Quack Quack");
const Chicken = function () {};
Chicken.prototype.sound = () => console.log("Cluck Cluck Cluck");
const Dog = function () {};
Dog.prototype.sound = () => console.log("Whoops Whoops Whoops");

makeSound(new Duck());
makeSound(new Chicken());
makeSound(new Dog());
