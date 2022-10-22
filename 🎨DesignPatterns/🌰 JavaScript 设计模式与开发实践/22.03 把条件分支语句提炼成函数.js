const getPrice = (price) => {
  const date = new Date();
  if (date.getMonth() >= 6 && date.getMonth() <= 9) {
    return price * 0.8;
  }
  return price;
};

// 改成：

const isSummer = () => {
  const date = new Date();
  return date.getMonth() >= 6 && date.getMonth() <= 9;
};

const getPrice1 = (price) => {
  if (isSummer()) return price;
  return price;
};
