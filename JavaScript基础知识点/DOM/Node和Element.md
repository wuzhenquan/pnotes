

1. 通过顶层document节点获取：

（1） document.getElementById(elementId)：该方法通过节点的ID，可以准确获得需要的元素，是比较简单快捷的方法。如果页面上含有多个相同id的节点，那么只返回第一个节点。
如今，已经出现了如prototype、Mootools等多个JavaScript库，它们提供了更简便的方法：$(id)，参数仍然是节点的id。这个方法可以看作是document.getElementById()的另外一种写法，不过$()的功能更为强大，具体用法可以参考它们各自的API文档。

（2）document.getElementsByName(elementName)：该方法是通过节点的name获取节点，从名字可以看出，这个方法返回的不是一个节点元素，而是具有同样名称的节点数组。然后，我们可以通过要获取节点的某个属性来循环判断是否为需要的节点。
例如：在HTML中checkbox和radio都是通过相同的name属性值，来标识一个组内的元素。如果我们现在要获取被选中的元素，首先获取改组元素，然后循环判断是节点的checked属性值是否为true即可。

（3）document.getElementsByTagName(tagName)：该方法是通过节点的Tag获取节点，同样该方法也是返回一个数组，例如：document.getElementsByTagName('A')将会返回页面上所有超链接节点。在获取节点之前，一般都是知道节点的类型的，所以使用该方法比较简单。但是缺点也是显而易见，那就是返回的数组可能十分庞大，这样就会浪费很多时间。那么，这个方法是不是就没有用处了呢？当然不是，这个方法和上面的两个不同，它不是document节点的专有方法，还可以应用其他的节点，下面将会提到。
2、通过父节点获取：

（1）parentObj.firstChild：如果节点为已知节点（parentObj）的第一个子节点就可以使用这个方法。这个属性是可以递归使用的，也就是支持parentObj.firstChild.firstChild.firstChild...的形式，如此就可以获得更深层次的节点。

（2）parentObj.lastChild：很显然，这个属性是获取已知节点（parentObj）的最后一个子节点。与firstChild一样，它也可以递归使用。

在使用中，如果我们把二者结合起来，那么将会达到更加令人兴奋的效果，即：parentObj.firstChild.lastChild.lastChild...

（3）parentObj.childNodes：获取已知节点的子节点数组，然后可以通过循环或者索引找到需要的节点。
注意：经测试发现，在IE7上获取的是直接子节点的数组，而在Firefox2.0.0.11上获取的是所有子节点即包括子节点的子节点。

（4）parentObj.children：获取已知节点的直接子节点数组。
注意：经测试，在IE7上，和childNodes效果一样，而Firefox2.0.0.11不支持。这也是为什么我要使用和其他方法不同样式的原因。因此不建议使用。

（5）parentObj.getElementsByTagName(tagName)：使用方法不再赘述，它返回已知节点的所有子节点中类型为指定值的子节点数组。例如：parentObj.getElementsByTagName('A')返回已知的子节点中的所有超链接。

3、通过临近节点获取：

（1）neighbourNode.previousSibling：获取已知节点（neighbourNode）的前一个节点，这个属性和前面的firstChild、lastChild一样都似乎可以递归使用的。

（2）neighbourNode.nextSibling：获取已知节点（neighbourNode）的下一个节点，同样支持递归。

4、通过子节点获取：

（1）childNode.parentNode：获取已知节点的父节点。
上面提到的方法，只是一些基本的方法，如果使用了Prototype等JavaScript库，可能还获得其他不同的方法，例如通过节点的class获取等等。不过，如果能够灵活运用上面的各种方法，相信应该可以应付大部分的程序。