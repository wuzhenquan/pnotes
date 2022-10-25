前端使用包 [jsecrnpy](https://www.npmjs.com/package/jsencrypt) 

后端使用包 [node-rsa](https://www.npmjs.com/package/node-rsa) 

## 后端

1. 生成公钥和私钥

```ts
const NodeRSA = require('node-rsa');
const fs = require('fs');
//生成公钥
function generator() {
    var key = new NodeRSA({ b: 512 }) // Generate new 512bit-length key
    key.setOptions({ encryptionScheme: 'pkcs1' })

    // exportKey 参数格式：https://www.npmjs.com/package/node-rsa#format-string-syntax
    var privatePem = key.exportKey('pkcs1-private-pem')
    var publicPem = key.exportKey('pkcs8-public-pem')

    fs.writeFile('${__dirname}/public.pem', publicPem, (err) => {
        if (err) throw err
        console.log('公钥已保存！')
    })
    fs.writeFile('${__dirname}/private.pem', privatePem, (err) => {
        if (err) throw err
        console.log('私钥已保存！')
    })
}
generator();
```

2. 后台设置获取公钥接口供前端使用

   ```js
   const Router = require('koa-router')
   const router = new Router()
   const fs = require('fs')
   router.get('/', ctx => {
     const publicKey = fs.readFileSync(`${process.cwd()}/src/app/rsa/public.pem`, 'utf-8')
     ctx.body = { publicKey }
   })
   module.exports = router
   ```

3. 后台用私钥解密

   ```js
  const decryptPassword = encryptedPassword => {
    const privateKey = fs.readFileSync(`${process.cwd()}/app/rsa/private.pem`, 'utf8')
    const buffer = Buffer.from(encryptedPassword, 'base64')//转化格式
    const password = crypto
      .privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING
        },
        buffer
      )
      .toString('utf8')
    return password
  }
  ```

   

## 前端

1. 前端获取公钥并加密数据传给后台

   ```js
   import { JSEncrypt } from "jsencrypt";
   const password = ''
   let encryptor = new JSEncrypt() //实例化
   encryptor.setPublicKey(publicKey) //设置公钥
   const encryptedPassword = encryptor.encrypt(password)
   ```

