const getUserInfo = () => {
  ajax("http://xxx.com/userInfo", () => {
    console.log("userId: " + data.userId);
    console.log("userName: " + data.userName);
    console.log("nickName: " + data.nickName);
  });
};

// 改成：

const getUserInfo1 = function () {
  ajax("http://xxx.com/userInfo", () => {
    printDetails(data);
  });
};

const printDetails = (data) => {
  console.log("userId: " + data.userId);
  console.log("userName: " + data.userName);
  console.log("nickName: " + data.nickName);
};
