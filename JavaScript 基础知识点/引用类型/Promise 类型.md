值得看的文章:

- [promises 很酷，但很多人并没有理解就在用了](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651551800&idx=1&sn=d06d319c002fdca153bc2abe9352e959&key=704ebd6d743c67047f00a8aa655b453b6080608d6578f4f989711d55c287953da026511afc178b9dfbc0269c612cded28bb3cb6b409922d82b3b2e527d86e43c72411fdb9eaa48e5decf398c3f1d80e1&ascene=0&uin=NjA4MTU0NDU%3D&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.12.3+build(16D32)&version=12000410&nettype=WIFI&fontScale=100&pass_ticket=GUQwuqUWlEj%2FySDi2a41I0zG%2BQZBuflrFe0qBZsj75g%3D)

```javascript
let getJSON = function(url){
  let promise = new Promise((resolve, reject)=>{
    let client = new XMLHttpRequest()
    client.open("GET", url)
    client.onreadystatechange = handler
    client.responseType = "json"
    client.setRequestHeader("Accept", "application/json")
    client.send()
    function handler(){
      if(this.readyState !== 4){
        return
      }
      if(this.status === 200){
        resolve(this.response)
      }else{
        reject(new Error(this.statusText))
      }
    }
  })
  return promise
}
let url = "https://api.github.com/search/users?q=wuzhenquan"
getJSON(url).then((json)=>{
  console.log(json)
}).catch(function(error){
  console.error('出错了', error)
})
```

