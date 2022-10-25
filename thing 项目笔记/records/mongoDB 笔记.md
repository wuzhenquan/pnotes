[API Docs](https://mongoosejs.com/docs/api.html) 

> MongoDB stores [BSON documents](https://docs.mongodb.com/manual/core/document/#bson-document-format), i.e. data records, in [collections](https://docs.mongodb.com/manual/reference/glossary/#term-collection); the collections in databases.

- [Mongoose.prototype.model()](https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-model) 

#### **Schemas** 

- define the shape and content of documents

- embedded documents in a collection

#### **Models** 

for creating and reading documents.

#### **Documents** 

the basic unit of data in MongoDB.

#### **Collenctions** 

a grouping of  [documents](https://docs.mongodb.com/manual/reference/glossary/#term-document).

```javascript
// schema 是
var schema = new mongoose.Schema({ name: 'string', size: 'string' }); // make a schema
var Tank = mongoose.model('Tank', schema); // make a model
var small = new Tank({ size: 'small' }); // make a document
```



