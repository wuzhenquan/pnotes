// 把 500 元订单，200 元订单以及普通购买分成 3 个函数
// orderType、pay、stock 这三个字段当作参数递给 500 元订单函数
// 如果该忽视不符合处理条件，则把这个请求传递给后面的 200 元订单函数，
// 如果200 元订单函数依然不能处理该请求，则继续传递请求给普通购买函数

// 500 元订单
const order500 = (orderType, pay, stock) => {
  if (orderType === 1 && pay === true) {
    console.log("500 元定金预购，得到100优惠券");
  } else {
    order200(orderType, pay, stock); // 将请求传递给 200 元订单
  }
};

// 200 元订单
const order200 = (orderType, pay, stock) => {
  if (orderType === 2 && pay === true) {
    console.log("200 元定金预购，得到 50 优惠券");
  } else {
    orderNormal(orderType, pay, stock); // 将请求传递给普通订单
  }
};

// 普通购买订单
const orderNormal = (orderType, pay, stock) => {
  if (stock > 0) {
    console.log("普通购买，无优惠券");
  } else {
    console.log("手机库存不足");
  }
};

// 测试结果
order500(1, true, 500); // 输出：500 元定金预购，得到100优惠券
order500(1, false, 500); // 输出：普通购买，无优惠券
order500(2, true, 500); // 输出：200 元定金预购，得到 50 优惠券
order500(3, false, 500); // 输出：普通购买，无优惠券
order500(3, false, 0); // 输出：手机库存不足
