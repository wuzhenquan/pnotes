[Strongly typed models with Mongoose and TypeScript](https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722) 

#### create strongly typed Mongoose <u>models</u> with TypeScript

1. create your models
2. create an interface extends `mongoose.Documnet` 
3. create & export your model

```ts
import * as mongoose from 'mongoose'
const { Schema, Document } = mongoose

// create an interface for our user model
interface IUser extends Document {
  name: string
}

const UserSchema = new Schema({
  name: { type: String, required: true }
})

export default mongoose.model<IUser>('User', UserSchema)

```

