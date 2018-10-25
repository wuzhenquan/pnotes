

#### create

```javascript
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    ctx.body = 'Hello World'
})

app.listen(3000)
```

#### connect to a database

```javascript
const mongoose = require('mongoose')
await new Promise((resolve, reject)=>{
    mongoose.connect('mongodb://localhost:27017/newnode', {
        userMonglClient: true
    })
    
    const connection = mongoose.connection
    connection.on('error', reject)
    connection.once('open', resolve)
})
```



#### add middleware

```javascript
app.use(async ctx => {
    console.log()
    awati next()
})
```

#### add api

```javascript
// controller.js
const User = require('./model.js')
export.read = async ()=>{
    return User.find()
}
export.create = async ({ data={} }={}) => User.create(data)

// model.js
const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const UserSchema = new Schema({
    // 这只是一个例子
    username: { type: String, required: true }
})
const User = mongoose.model('User', UserSchema)
module.exports = User

// routes.js
const route = require('koa-router')()
const controller = require('./controller')
router.get('/', async ctx =>{
    const users = await controller.read()
    ctx.body = users
})
router.post('/', async ctx => {
    const data = ctx.request.body
    const user = await controller.create({ data })
    ctx.body = user
})
module.exports = router.routes()
```

#### node modules

- [bodyparser](https://www.npmjs.com/package/koa-bodyparser)
- [koa-router](https://www.npmjs.com/package/koa-router)
- [How to set up a koa project in Node.js](https://www.youtube.com/watch?v=0OPZCiB7E54)