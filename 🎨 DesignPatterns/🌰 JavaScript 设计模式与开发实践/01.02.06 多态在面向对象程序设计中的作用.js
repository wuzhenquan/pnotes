/* 反例 */
const googleMap = { show: () => console.log("开始渲染 google 地图") };
const baiduMap = { show: () => console.log("开始渲染 baidu 地图") };
const sosoMap = { show: () => console.log("开始渲染 soso 地图") };
const renderMap = (type) => {
  switch (type) {
    case "google":
      googleMap.show();
      break;
    case "baidu":
      baiduMap.show();
      break;
    case "soso":
      sosoMap.show();
      break;
    default:
      break;
  }
};
renderMap("google");
renderMap("baidu");
renderMap("soso");

/* 改成 */
// 怎么去做
const googleMap = { show: () => console.log("开始渲染 google 地图") };
const baiduMap = { show: () => console.log("开始渲染 baidu 地图") };
const sosoMap = { show: () => console.log("开始渲染 soso 地图") };
// 做什么
const renderMap = (map) => map.show instanceof Function && map.show();
renderMap(googleMap);
renderMap(baiduMap);
renderMap(sosoMap);
