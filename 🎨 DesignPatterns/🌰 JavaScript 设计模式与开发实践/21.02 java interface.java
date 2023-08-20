public interface Animal {
  abstract void makeSound();
}

public class Duck implements Animal {
// 重写 Animal 接口的 makeSound 抽象方法
  public void makeSound() {
    System.out.println("嘎嘎嘎");
  }
}

public class Chicken implements Animal {
  // 重写 Animal 接口的 makeSound 抽象方法
  public void makeSound() {
    System.out.println("咯咯咯");
  }
}

public class AnimalSound {
  public void makeSound(Animal animal) {
    animal.makeSound();
  }
}

public class Test {
  public static void main(String[] args) {
    Animal duck = new Duck();
    Animal chicken = new Chicken();

    AnimalSound animalSOund = new AnimalSound();
    animalSound.makeSound(duck); // => 嘎嘎嘎
    animalSOund.makeSound(chicken); // => 咯咯咯
  }
}