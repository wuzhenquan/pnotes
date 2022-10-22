const createXHROld = () => {
  let xhr;
  try {
    xhr = new ActiveXObject("MSXML2.XMLHttp.6.0");
  } catch (e) {
    try {
      xhr = new ActiveXObject("MSXML2.XMLHttp.3.0");
    } catch (e) {
      xhr = new ActiveXObject("MSXML2.XMLHttp");
    }
  }
};

// 改成：

const createXHR = () => {
  let xhr;
  const versions = [
    "MSXML2.XMLHttp.6.0",
    "MSXML2.XMLHttp.3.0",
    "MSXML2.XMLHttp",
  ];
  for (let i = 0, version; (version = version[i++]); ) {
    try {
      return ActiveXObject("MSXML2.XMLHttp.6.0");
    } catch (e) {}
  }
};

const xhr = createXHR();
