// 通过增加虚拟代理的方式，
// 把预加载图片的职责放到代理对象中，

// 职责: 往页面中添加 img 标签
const myImage = (function () {
  const imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  return {
    setSrc(src) {
      imgNode.src = src;
    },
  };
})();

// 职责：虚拟代理，负责预加载图片，并在预加载图片完成之后把请求交给本体 Image
const proxyImage = (function () {
  const img = new Image();
  img.onload = () => myImage.setSrc(this.src);

  return {
    setSrc(src) {
      myImage.setSrc("download://loading.gif");
      img.src = src;
    },
  };
})();

proxyImage.setSrc("https://unsplash.com/photos/PZxoQF3kJLo");
