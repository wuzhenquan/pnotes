https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

https://blog.logrocket.com/mastering-mapped-types-typescript/

## what

设计到的 foundations：Indexed access types、Index signatures、union types、`keyof` type operator

## why

This example is problematic because there is an implicit relationship between `AppConfig` and `AppPermissions`.

```typescript
// Configuration values for the current user
type AppConfig = {
  username: string;
  layout: string;
};

// Whether or not the user has permission to change configuration values
type AppPermissions = {
  changeUsername: boolean;
  changeLayout: boolean;
};
```

**It is better to have the type system manage this relationship than to rely on the discipline of future program editors to make the appropriate updates to both types simultaneously.** 

using mapped types instead of explicit types:

```typescript
// Configuration values for the current user
type AppConfig = {
  username: string;
  layout: string;
};

// Whether or not the user has permission to change configuration values
type AppPermissions = {
  [Property in keyof AppConfig as `change${Capitalize<Property>}`]: boolean
};
```

## how

#### example 1: keep track of electronic devices 

```typescript
type Device = {
  manufacturer: string;
  price: number;
};
type DeviceFormatter = {
  [Key in keyof Device as `format${Capitalize<Key>}`]: (value: Device[Key]) => string;
};
```

#### example 2: keep track of electronic devices but also accessories for those devices

```typescript
type Accessory = {
  color: string;
  size: number;
};
type AccessoryFormatter = {
  [Key in keyof Accessory as `format${Capitalize<Key>}`]: (value: Accessory[Key]) => string;
};
```

### 上面的两个 example 优化下

```typescript
type Device = {
  manufacturer: string;
  price: number;
  releaseYear: number;
};

type Accessory = {
  color: string;
  size: number;
};

type Formatter<T> = {
  [Key in keyof T as `format${Capitalize<Key & string>}`]: (value: T[Key]) => string;
};

type DeviceFormatter = Formatter<Device>;
type AccessoryFormatter = Formatter<Accessory>;

const deviceFormatter: DeviceFormatter = {
  formatManufacturer: (manufacturer) => manufacturer,
  formatPrice: (price) => `$${price.toFixed(2)}`,
  formatReleaseYear: (year) => year.toString(),
};

const accessoryFormatter: AccessoryFormatter = {
  formatColor: (color) => color,
  formatSize: (size) => `${size} inches`,
};
```

