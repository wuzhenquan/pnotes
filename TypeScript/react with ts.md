### [react-typescript-cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet) 

#### [practical ways to advance your TypeScript skills](https://www.sitepoint.com/advance-typescript-skills-practical-ways/) 

### types

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts

```tsx
React.MouseEvent
React.Dispatch<React.SetStateAction<Photo[]>>
React.LegacyRef<HTMLDivElement>
useRef<HTMLDivElement>(null)
```



### Components

```tsx
import React from 'react'

// Written as a function declaration
function Heading(): React.ReactNode {
  return <h1>My Website Heading</h1>
}

// Written as a function expression
const OtherHeading: React.FC = () => <h1>My Website Heading</h1>
```



## React Proptypes vs Typescript

> https://stackoverflow.com/a/43187969
> If you're writing a package that will be installed by developers who are not using TypeScript, they still need PropTypes in order to get errors at run-time. If your project is only for yourself/other TypeScript projects, the TypeScript interfaces for your props are enough because the project simply won't build.
> https://stackoverflow.com/a/54690878
> PropTypes are useful when you test how the components interact with external data
> Even though it may seem like Typescript and PropTypes do the same thing, they don't actually overlap at all. But it is possible to automatically generate PropTypes from Typescript so that you don't have to specify types twice. 

## Handling Form Events

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement 

https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react

```typescript
const Input = (): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");
    return (
        <input
            type="text"
            value={inputValue}
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
            ): void => setInputValue(e.target.value)}
        />
    );
};
// cheat sheet
<select onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}/>
<textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {}}/>
<select onChange={(e: React.ChangeEvent<HTMLInputSelect>) => {}}/>
<form onSumbit={(e: React.FormEvent<HTMLFormElement>) => {}}/>
```


## Extending Component Props

[You should use `React.FunctionComponent` or `React.FC`](https://stackoverflow.com/a/53886046) 

```typescript
import React from 'react';
interface ButtonProps {
    color: string;
    text: string;
}
interface ContainerProps extends ButtonProps {
    height: number;
}
const Container: React.FC<ContainerProps> = ({ color, height, width, text }) => {
  return <div style={{ backgroundColor: color, height: `${height}px` }}>{text}</div>
}
```

## Extending a standard type

```typescript
// React.InputHTMLAttributes is a standard type
// interface version
interface Props
  extends React.InputHTMLAttributes<    
    HTMLInputElement
  > {  label: string;
  text: string;
  onTextChange: (text: string) => void;
}
// type version
type Props = React.InputHTMLAttributes<
  HTMLInputElement
> & {
  label: string;
  text: string;
  onTextChange: (text: string) => void;
};
```

## Third-party Libraries

see if there’s a `@types` package with the TypeScript type definitions. 

### if they don’t have a @types package?

Add a basic declaration file or Add a thorough declaration file

[how to write declaration](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) 

```ts
// add a thorough declaration
declare namespace bananaJs {
    function getBanana(): string;
    function addBanana(n: number) void;
    function removeBanana(n: number) void;
}
```

## type function component props

different way that React component props can be strongly-typed with TypeScript.

#### with @types/react

```tsx
import React from 'react'
interface SignInProps {
  name: string
}
const SignIn: React.FC<SignInProps> = props => {}
```
#### with React Generic Props

Generic props are useful when you want to create a reusable data-driven component where the shape of the data varies. Reusable form, list, and table components are examples where generic props are handy.

```ts
interface GIF<T> { ... };
// T extends object otherwise we get a parsing error 
// T to avoid the parsing error
const ReusableComponent = <T extends object>(props: GIF<T> & { children?: ReactNode }) => { ... }
/*or*/ 
function ReusableComponent<T extends object>(props: GIF<T> & { children?: ReactNode }) { ... }
```

If we want the data to have a particular property, then we can specify this: 

```typescript
<T extends {name: string}>
```

[example](https://codesandbox.io/s/generic-table-gqz2w?file=/src/App.tsx:832-837) 

#### with useState

```tsx
import * as React from 'react';

interface IUser {
  username: string;
  email:  string;
  password: string;
}

const ComplexState = ({ initialUserData }) => {
  // TypeScript can cleverly infer the type for useState in many cases which is great. When TypeScript can’t infer the type we can pass it in as the generic parameter.
  // 如果 user 的值是固定一种类型的，那下面的泛型就不必了， 因为可以从 useState 的参数推算出来
  const [user, setUser] = React.useState<IUser | null>(initialUserData);
  return (
    ...
  );
}
```

#### with useReducer

```tsx
const reducer: React.Reducer<IState, IAction> = (state, action) => {}
const ComplexState = () => {
  const [state, dispatch] = React.useReducer<React.Reducer<IState, IAction>>(reducer, initialState);
  return (
    ...
  );
```

#### with useMemo

```tsx
const MyComponent = ({ end = 0 }) => {
  const memoizedNumber = React.useMemo<number>(computeExpensiveValue(end))
    
  return (
    <DisplayResult result={memoizedNumber} />
  );
}
```

#### with useRef

```tsx
function TextInputWithFocusButton() {
  // The type of our ref is an input element
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

#### with useRedux

#### useContext

[context 1 example](https://codesandbox.io/s/react-ts-context-simple-3boq8?fontsize=14&hidenavigation=1&theme=dark&file=/src/index.tsx:666-676)

[context 2 example](https://codesandbox.io/s/react-ts-complex-context-function-f1cv4?fontsize=14&hidenavigation=1&theme=dark) 

[context 4 example](https://codesandbox.io/s/react-ts-context-no-default-8ch32?fontsize=14&hidenavigation=1&theme=dark) 

### 其他

```tsx
type IInquiryItemStatus = 'success' | 'warning' | 'loading'; 
const [status, setStatus] = useState<IInquiryItemStatus>('success');

messages.reduce((tempArr: React.ReactElement<any>[], item)=>{
    ...
}
```



参考的系列文章

✅ [Typed useState with TypeScript](https://www.carlrippon.com/typed-usestate-with-typescript/) 
✅ [Strongly-typed React Redux Code with TypeScript](https://www.carlrippon.com/strongly-typed-react-redux-code-with-typescript/) 
✅ [React Context with TypeScript: Part 1 - Simple context with function components](https://www.carlrippon.com/react-context-with-typescript-p1/) 
✅ [React Context with TypeScript: Part 2 - Complex context with function components](https://www.carlrippon.com/react-context-with-typescript-p2/) 
~~✅ [React Context with TypeScript: Part 3 - Context with class components](https://www.carlrippon.com/react-context-with-typescript-p3/)~~ 
✅ [React Context with TypeScript: Part 4 - Creating a context with no default and no undefined check](https://www.carlrippon.com/react-context-with-typescript-p4/) 
[React Generic Props](https://www.carlrippon.com/React-generic-props/)

[Managing State in Functional React Components with useState](https://www.carlrippon.com/managing-state-in-functional-react-components-with-usestate/) 
[Managing State in Functional React Components with useReducer](https://www.carlrippon.com/managing-state-in-functional-react-components-with-usereducer/) 

[Improving Component Consumption with Defaults](https://www.carlrippon.com/improving-component-consumption-with-defaults/) 

