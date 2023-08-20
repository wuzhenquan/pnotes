/* ------------------------- 不用代理模式 ------------------------- */
const MyImage = (function () {
  const imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  const img = new Image();

  img.onload = () => imgNode.src = img.src;

  return {
    setSrc(src) {
      imgNode.src = "本地链接";
      img.src = src;
    },
  };
})();

MyImage.setSrc("http://imacache.qq.com/music/photo/k/000GGDys0yaoNk.jpg");

/* ------------------------- 代理模式------------------------- */
/* 本体对象 */
const myImage = (function () {
  const imgNode = document.createElement("img");
  document.body.appendChild(imgNode);

  return (src) => (imgNode.src = src);
})();

/* 代理对象 */
const proxyImage = (function () {
  const imgObj = new Image();
  imgObj.onload = function () {
    myImage(this.src);
  }; // 这边的 this 指的是 imgObj

  return (src) => {
    myImage("本地图片链接");
    imgObj.src = src;
  };
})();

/* 通过 proxyImage 间接访问 MyImage */
proxyImage("http://imacache.qq.com/music/photo/k/000GGDys0yaoNk.jpg");
