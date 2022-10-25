```js
const httpGet = (url, callback, err = console.error) => {     
    const request = new XMLHttpRequest();     
    request.open("GET", url, true);
    request.onload = () => callback(request.responseText);     
    request.onerror = () => err(request);     
    request.send(); 
}; 

httpGet(
    "https://jsonplaceholder.typicode.com/posts/1", 
    console.log
); 
// Logs: {"userId": 1, "id": 1, "title": "sample title", "body": "my text"}

```

