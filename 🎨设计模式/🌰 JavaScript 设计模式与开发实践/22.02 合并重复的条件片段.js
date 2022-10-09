const paging = (currPage) => {
  if (currpage <= 0) {
    currPage = 0;
    jump(currPage);
  } else if (currpage >= totalPage) {
    currpage = totalPage;
    jump(currPage);
  } else {
    jump(currPage);
  }
};

// 改成：

const paging1 = (currPage) => {
  if (currpage <= 0) {
    currPage = 0;
  } else if (currpage >= totalPage) {
    currpage = totalPage;
  }
  jump(currPage);
};
