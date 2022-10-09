// 让鸭子发出叫声
public class Duck { // 鸭子类
  public void makeSound(){
    System.out.println("嘎嘎嘎");
  }
}

public class AnimalSound { // 只接收 Duck 类型的参数
  public void makeSound(Duck duck){
    duck.makeSound(); 
  }
}

public class Test {
  public static void main(String[] args) {
    AnimalSound animalSound = new AnimalSound();
    Duck duck = new Duck();
    animalSound.makeSound(duck); // 输出: 嘎嘎嘎
  }
}

// 现在我们想让鸡也发出叫声，发现不可能
// 因为 AnimalSound 方法里只接受 Duck 类型的对象作为参数

public class Chicken { // 咯咯咯
  public void makeSound() {
    System.out.println("咯咯咯");
  }
}

public class Test {
  public static void main(String args[]){
    AnimalSound animalSound = new AnimalSound();
    Chicken chicken = new Chicken();
    animalSound.makeSound(chicken); // 报错，animalSound.makeSound 只能接受 Duck 类型的参数
  }
}

// 想让鸡也叫唤起来，必须先把 duck 对象和 chicken 对象都向上转型为它们的超类型 Animal 类
// 进行向上转型的工具就是抽象类或者 interface

// 下面使用抽象类

// ------ ⬇️
public abstract class Animal {
  abstract void makeSound(); // 抽象方法
}

// Duck 类继承自抽象类 Animal
public class Chicken extends Animal {
  public void makeSound() {
    System.out.println("咯咯咯");
  }
}

// Chicken 类继承自抽象类 Animal
public class Duck extends Animal {
  public void makeSound() {
    System.out.println("嘎嘎嘎");
  }
}

// 让 AnimalSound 类的 makeSound 方法接收 Animal 类型的参数
// 而不是具体的 Duck 类型或者 Chicken 类型
public class AnimalSound {
  // 接收 Animal 类型的参数，而非 Duck 类型或 Chicken 类型
  public void makeSound(Animal animal) {
    animal.makeSound();
  }
}

public class Test {
  publick static void main(String args[]){
    AnimalSound animalSound = new AnimalSound();

    // 要同时让鸭和鸡发出叫声，关键是让抽象类 Animal 给 duck 和 chicken 进行向上转型
    Animal duck = new Duck(); // 向上转型
    Animal chicken = new Chicken(); // 向上转型
    
    animalSound.makeSound(duck); // 输出 嘎嘎嘎
    animalSound.makeSound(chicken); // 输出 咯咯咯
  }
}

// 抽象类在这里主要有两个作用
// - 向上转型 让 Duck 对象和 Chicken 对象的类型都隐藏在 Animal 类型身后，
// 隐藏对象的具体类型之后，Duck 对象和 Chicken 对象才能被交换使用，
// 这是让对象表象出多态性的必经之路。
// - 建立一些契约。继承自抽象类的具体类都会继承抽象类里的 abstract 方法，并且要求覆写它们。
// 这些契约在实际编程中非常重要，可以帮助我们编写可靠性更高的代码。
// 比如在命令模式中，各个子命令类都必须实现 exectue 方法，
// 才能保证在调用 command.execute 的时候不会抛出异常。

// 如果让子命令类 OpenTvCommand 继承自抽象类 Command:
abstract class Command {
  public abstract void execute();
}
public class OpenTvCommand extends Command {
  public OpenTvCommand (){};
  public void execute (){
    System.out.println("打开电视机");
  }
}
// 那么自然有编译器帮助我们检查和保证子命令类 OpenTvCommand 覆写了抽象类 Command 中的 execute 方法

// 抽象类和接口又有什么关系？「面向接口编程」又是什么？
// 这里的接口并不是指 interface，而是一个抽象的概念。
// 「面向接口编程」其实是「面向超类型编程」，
// 当对象的具体类型被隐藏在超类型身后时，这些对象就可以互相替换使用，
// 我们的关注点才能从对象的类型上转移到对象的行为上。
// 「面向接口编程」也可以看成面向抽象编程，即针对超类型中的 abstract 方法编程，
// 接口在这里被当场 abstract 方法中约定的契约行为。
// 这些契约行为暴露了一个类或者对象能够做什么，但是不关心具体如何去做。