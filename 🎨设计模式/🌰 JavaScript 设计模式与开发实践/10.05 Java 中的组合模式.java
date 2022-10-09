// 最上层的对象
public abstract class Component {
    public void add(Component child) {}
    public void remove(Component child) {}
}

// 组合对象
public class Composite extends Component {
    public void add(Component child)
    public void remove(Component child)
}

// 叶对象
public class Leaf extends Component {
    public void add(Component child){
        // 叶对象不能再添加子节点
        throw new UnsupportedOperationException()
    }
    public void remove(Component child){}
}

public class client (){
    public static void main(String args[]){
        Component root = new Composite();

        Component c1 = new Composite();
        Component c2 = new Composite();

        Component leaf1 = new Leaf();
        Component leaf2 = new Leaf();

        root.add(c1);
        root.add(c2);

        c1.add(leaf1);
        c1.add(leaf2);

        root.remove(c1);
    }
}   