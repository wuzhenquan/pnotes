public class Duck {
  public void makeSound() {
    System.out.println("嘎嘎嘎");
  }
}

public class Chicken {
  public void makeSound() {
    System.out.println("嘎嘎嘎");
  }
}

public class AnimalSound {
  public void makeSound(Duck duck) {
    duck.makeSound();
  }
}

public class Test {
  public static void main(String args[]){
    AnimalSound animalSound = new AnimalSound();
    Duck duck = new Duck();
    animalSound.makeSound(duck); // => 嘎嘎嘎
  }
}

// 如果想让鸡也叫唤起来，
// 发现这是一件不可能实现的事情。
public class Test {
  public static void main(String args[]){
    AnimalSound animalSound = new AnimalSound();
    Chicken chicken = new Chicken();
    animalSound.makeSound(chicken); // 报错 只能接受 Duck 类型的参数
  }
}

// 为了解决这一问题，
// 静态类型通常可以被设计为向上转型
// 向上转型: 当给一个类变量赋值时，这个变量的类型既可以使用这个类本身，也可以使用这个类的超类。
