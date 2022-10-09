// 原有方式
login.succ((data) => {
  header.setAvatar(data.avatar);
  nav.setAvatar(data.avatar);
  message.refresh();
  cart.refresh();
  address.refresh();
});

// 观察者方式
login("http://xxx.com?login", (data) => {
  login.trigger("loginSucc", data);
});

const header = (function () {
  login.listen("loginSucc", (data) => header.setAvatar(data.avatar));
  return {
    setAvatar(data) {
      console.log("设置 header 模块的头像");
    },
  };
})();
const nav = (function () {
  login.listen("loginSucc", (data) => header.setAvatar(data.avatar));
  return {
    setAvatar(data) {
      console.log("设置 nav 模块的头像");
    },
  };
})();
const address = (function () {
  login.listen("loginSucc", (data) => address.refresh(data));
  return {
    setAvatar(data) {
      console.log("刷新收获地址列表");
    },
  };
})();
