```js
const getURLParameters = url => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {}); 

// Examples 
getURLParameters("http://url.com/page?n=Adam&s;=Smith"); // {n: "Adam", s: "Smith"} getURLParameters("google.com"); // {}

```

