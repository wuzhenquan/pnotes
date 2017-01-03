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

