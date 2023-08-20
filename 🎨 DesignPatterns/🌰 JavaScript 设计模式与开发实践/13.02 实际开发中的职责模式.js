const order = (orderType, pay, deposit) => {
  if (orderType === 1) {
    // 500 元定金购买模式
    if (pay === true) {
      // 已支付定金
      console.log("500 元定金预购，得到 100 优惠券");
    } else {
      // 为支付定金，降级到普通模式
      if (deposit > 0) {
        console.log("普通购买，无优惠券");
      } else {
        console.log("手机库存不足");
      }
    }
  } else if (orderType === 2) {
    // 200 元定金购买模式
    if (pay === true) {
      console.log("200 元定金预购，得到 50 优惠券");
    } else {
      if (deposit > 0) {
        console.log("普通购买，无优惠券");
      } else {
        console.log("手机库存不足");
      }
    }
  } else if (orderType === 3) {
    if (deposit > 0) {
      console.log("普通购买，无优惠券");
    } else {
      console.log("手机库存不足");
    }
  }
};

order(1, true, 500);
