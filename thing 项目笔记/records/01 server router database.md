https://github.com/wuzhenquan/thing/commit/a87090841290fa8b78f94896545d69d830bc470f

### 初始化一个服务器

```js
// backend/app/index.js
const Koa = require('koa')
const app = new Koa()
app.use(async ctx => {
    ctx.body = 'hello world'
})
start = async () => {
    try {
        await app.listen(3001)
    } catch (error) {
        console.log('Something went wrong')
    }
} 
start()
// 重点：（new Koa()).use(ctx => ctx.body).listen(3001)
```

### 添加路由

[API Reference](https://github.com/alexmingoia/koa-router#api-reference)

```js
const Router = require('koa-router')
const router = new Router()
const Koa = require('koa')

const userRouter = new Router()
userRouter.get('/', async ctx => {
    ctx.body = {}
})

router.use(() => {
    // 这里可以用来验证是否登录
    // 注意这里一定要 return next() 或者 return ctx.redirect('back') 或其他的 return 操作
}).use('./users', usersRouter.routes())

// app/index.js
(new Koa()).use(router.routes()).use(router.allowedMethods());
// 重点：(new Router()).get('/users', ctx => ctx.body={})
```

### 运行数据库

mongdb 升级到 4.2.2 到后

macOS:

按 [run mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition) 即可

```shell
brew services start mongodb-community@4.2
mongo
```

### 添加数据库

```js
const mongoose = require('mongoose')
const { Schema } = require('mongoose')
// server 连接 MongoDB
mongoose.Promise = global.Promise // 这句话是用来干啥的
connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(
            'mongodb://localhost:27017/thing`',
            { userMongoClient: true }
        )
        const connection = mongoose.connection
        connection.on('error', reject)
        connection.once('open', resolve)
    })
}
connect()
// define a schema
const UserSchema = new Schema({ username: {type: String} }) // 定义结构
// compile the schema into a Model
const User = mongoose.model('User', UserSchema)// 定义名称
// 操作 model 的函数
const read = async () => { return User.find() }
const create = ({ data = {} } = {}) => { return User.create(data) }
// 操作 model 
const users = await read() // 从数据库里读取用户
const user = await create({ data }) // 在数据库创建用户
```

