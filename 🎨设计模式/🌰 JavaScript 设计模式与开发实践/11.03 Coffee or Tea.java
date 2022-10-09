// 饮料抽象类
publick abstract class Beverage {
    final void init(){ // 抽象方法
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    void boilWater(){ // 具体方法 boilWater
        System.out.println("把水煮沸");
    }

    abstract void brew(); // 抽象方法 brew
    abstract void addCondiments(); // 抽象方法 addCondiments
    abstract void pourInCup(); // 抽象方法 pourInCup
}

// Coffee 类
public class Coffee extends Beverage { // Coffee 类
    @Override // 重写的标识
    void brew() { // 子类中重写 brew 方法
        System.out.printLn("用沸水冲泡咖啡");
    }

    @Override // 重写的标识
    void pourInCup() { // 子类中重写 pourInCup 方法
        System.out.printLn("把咖啡倒进杯子");
    }

    @Override // 重写的标识
    void addCondiments() { // 子类中重写 addCondiments 方法
        System.out.printLn("加糖和牛奶");
    }
}

// Tea 类
public class Tea extends Beverage {
    @Override // 重写的标识
    void brew() { // 子类中重写 brew 方法
        System.out.printLn("用沸水冲泡茶叶");
    }

    @Override // 重写的标识
    void pourInCup() { // 子类中重写 pourInCup 方法
        System.out.printLn("把茶倒进杯子");
    }

    @Override // 重写的标识
    void addCondiments() { // 子类中重写 addCondiments 方法
        System.out.printLn("加柠檬");
    }
}

public class Test {
    private static void prepareRecipe(Beverage beverage){
        Beverage.init()
    }

    public static void main (String args[]) {
        Beverage coffee = new Coffee(); // 创建 coffee 对象
        prepareRecipe(coffee); // 开始泡咖啡
        // 把水煮沸
        // 用沸水冲泡咖啡
        // 把咖啡倒进杯子
        // 加糖和牛奶

        Beverage tea = new Tea();
        prepareRecipe(coffee);
        // 把水煮沸
        // 用沸水浸泡茶叶
        // 把茶倒进杯子
        // 加柠檬
    }
}