在用 mongoose 的时候，返回的 documents 里会出现 `_id` `__v`这两个内部生成的字段

我现在想把 `_id` 转换为 `id`， `_v` 去掉

在这篇文章里找到了答案 [Mongoose toObject and toJSON transform behavior with sub-documents](https://alexanderzeitler.com/articles/mongoose-tojson-toobject-transform-with-subdocuments/)

先来介绍一下 [toObject](https://mongoosejs.com/docs/api.html#document_Document-toObject) 和 [toJSON](https://mongoosejs.com/docs/api.html#document_Document-toJSON)：two Schema options to transform Objects after querying MongoDb。

具体用法

```js
schema.set('toJSON', { virtuals: true }) // 这里配置了 { virtuals: true } 是因为 toJSON 默认的 virtuals 是false（https://mongoosejs.com/docs/guide.html#virtuals）
```

插播 [virtuals](https://mongoosejs.com/docs/guide.html#virtuals)：其实就是定义一个虚拟的字段

解决方法：

```js
(new Schema({...obj})).set('toObject', {
    virtuals: true, 
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
    } 
})
// toOject 文档里说：With transformations we can do a lot more than remove properties. We can even return completely new customized objects
// transforms 回调的参数是啥，看文档 https://mongoosejs.com/docs/api.html#document_Document-set
```





