// 优化👆节无法让鸡叫唤起来的问题
// 先创建一个 Animal 类
// 在分别让 Duck 和 Chicken 都继承自 Animal 抽象类

public abstract class Animal {
  abstract void makeSound(); // 抽象方法
}

public class Chicken extends Animal {
  public void makeSound() {
    System.out.println("咯咯咯");
  }
}

public class Duck extends Animal {
  public void makeSound() {
    System.out.println("嘎嘎嘎");
  }
}

Animal duck = new Duck();
Animal chicken = new Chicken();

// 让 AnimalSound 类的 makeSound 方法接受 Animal 类型的参数
// 而不是具体的 Duck 类型或者 Chicken 类型:

public class AnimalSound {
  // 接受 Animal 类型的参数
  public void makeSound(Animal, animal) {
    animal.makeSOund();
  }
}

public class Test {
  public static void main(String args[]) {
    AnimalSound animalSound = new AnimalSound();
    Animal duck = new Duck();
    Animal chicken = new Chicken();
    animalSOund.makeSound(duck); // => 嘎嘎嘎
    animalSOund.makeSound(chicken); // => 咯咯咯
  }
}