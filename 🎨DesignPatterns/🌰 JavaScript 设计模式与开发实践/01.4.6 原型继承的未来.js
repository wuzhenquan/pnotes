class Animal {
  // 想象等同于 ES5 的什么
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Dog extends Animal {
  // 想想等同于 ES5 的什么
  constructor(name) {
    super(name);
  }
  speak() {
    return "woof";
  }
}
var dog = new Dog("Scamp");
console.log(`${dog.getName()} says ${dog.speak()}`);
