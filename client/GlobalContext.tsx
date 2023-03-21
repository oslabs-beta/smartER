import React, {createContext, useContext} from 'react';

type GlobalContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const defaultState = {
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  defaultState
);

////////////

///////////

// import React, { useContext } from 'react';

// First, we need to create a context
// export const MyContext = React.createContext<MyContextType | undefined>(undefined);

// // Then, we can define the type for the context value
// type MyContextType = {
//   someValue: string;
//   someFunction: () => void;
// };

// // Now we can use the context in a functional component like this:
// function MyComponent() {
//   // useContext accepts a context object (the value returned from React.createContext)
//   // and returns the current context value, which is determined by the nearest
//   // <MyContext.Provider> above the component in the tree
//   const context = useContext(MyContext);

//   // Now we can use the context value in our component
//   return (
//     <div>
//       {context.someValue}
//       <button onClick={context.someFunction}>Click me</button>
//     </div>
//   );
// }

// // To provide a context value for a tree of components, we can use a context provider:
// function App() {
//   return (
//     <MyContext.Provider
//       value={{
//         someValue: 'Hello, world!',
//         someFunction: () => console.log('Button was clicked'),
//       }}
//     >
//       {/* The context value will be available to all components below this provider in the tree */}
//       <MyComponent />
//     </MyContext.Provider>
//   );
// }
