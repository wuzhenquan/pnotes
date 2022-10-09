/** 方法名不同 */
const googleMap = {
  show: () => console.log("开始渲染谷歌地图"),
};

const baiduMap = {
  display: () => console.log("开始渲染百度地图"),
};

const baiduMapAdapter = {
  show: () => baiduMap.display(),
};

const renderMap = map => {
  if (map.show instanceof Function ){
    map.show();
  }
};

renderMap(googleMap);
renderMap(baiduMapAdapter);

/** 返回的数据格式不一致 */
const getGuangdongCity = () => [
  { name: "shenzhen", id: 11 },
  { name: "guangzhou", id: 12 },
];

const guandongCity = {
  shenzhen: 11,
  guanzhou: 12,
  zhuhai: 13,
};

const render = (fn) => {
  console.log("开始渲染广东省地图");
  document.write(JSON.stringify(fn()));
};

const addressAdapter = function (oldAddressFn) {
  let address = {};
  let oldAddress = oldAddressFn();

  for (let i = 0, c; (c = oldAddress[i++]); ) {
    address[c.name] = c.id;
  }

  return () => address;
};

render(addressAdapter(getGuangdongCity));
