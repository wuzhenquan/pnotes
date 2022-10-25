遇到的问题

用 mongoose 创建一个 schema 的时候

```js
const todoSchema = new Schema({
  content: { type: String, default: '' },
  create_on: { type: Date, default: Date.now },
  update_on: { type: Date, default: Date.now }
})
```

发现用 todoSchema 创建的 model 返回了 `_id` 和 `_v`

因此我有一个想法，修改返回的数据里的字段

- 将 `_id` 改为 `id`，但数据库里不变
- 将 `_v` 去掉，但数据库不变

于是在 stackoverflow 里搜到了这个答案，能解决我现在的问题

[MongoDB: output 'id' instead of '_id'](https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id)

主要就是用

- [Virtuals](https://mongoosejs.com/docs/guide.html#virtuals)
- [Schema.prototype.virtual()](https://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual)
- [option: toObject](https://mongoosejs.com/docs/guide.html#toObject)
- [Schema.prototype.set()](https://mongoosejs.com/docs/api.html#schema_Schema-set)
- [Mongoose.prototype.get()](https://mongoosejs.com/docs/api.html#mongoose_Mongoose-get)
- [Schema Options]([Options](https://mongoosejs.com/docs/guide.html#options))



具体是这样的

```js
// Duplicate the ID field.
// get: get schema option
todoSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
// set: set schema option
// 设置 schema option 的 toObject 属性 的 virutals 属性是 true
todoSchema.set('toObject', { virtuals: true })
// or 
new Schema({..}, {toObject: { virtuals: true }})
```

完成。

但是后来我发现。。。。。。。

根本就不要这一句啊

```js
// 就是这一句，不要
todoSchema.virtual('id').get(function () {
  return this._id.toHexString()
})
```

因为文档里 [option: id](https://mongoosejs.com/docs/guide.html#id) 说 mongoose 已经把 id 设成 virtual 了

不过学到了 virtual，很有用。

将 `_v` 和 `_id` 去掉，但数据库不变



