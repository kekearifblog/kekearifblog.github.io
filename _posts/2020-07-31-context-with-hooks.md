---

layout: post
title: A Simple Guide to React Context with Hooks
description: The simplest possible guide to understanding React Context with Hooks.
tags: ReactJS Javascript

---

It took me a while to get my head around using React Context with hooks, all the tutorials I read failed to explain it in a simple manner or seemed focused on class syntax. The class syntax is due to die soon so let me give it a try.
## Why use Context?
Passing props down multiple child components can become unwieldy.
```javascript
const [someState, setSomeState] = useState('cool value');

return <SomeBigDaddyComponent someState={someState} />
```

Now the implementation of `SomeBigDaddyComponent`.
```javascript
const SomeBigDaddyComponent = ({ someState }) = {
  return <SomeMediumDaddyComponent someSate={someState} />
}
```
Now the implementation of `SomeMediumDaddyComponent`.
```javascript
const SomeMediumDaddyComponent = ({ someState }) = {
  return <SomeSmallDaddyComponent someSate={someState} />
}
```

Now the implementation of `SomeSmallDaddyComponent`.........
It's becoming a mess right? This is about the right time to use context.

## Creating and Broadcasting a Context
Context is essentially a way to broadcast data down a chain of child components without passing props. It's easier to explain by just doing it. Let's create a very simple context.
```javascript
import React from 'react';

const CoolMessageContext = React.createContext('hello hello hello');

export default CoolMessageContext;
```

I initialized the context above with a simple string, however this can be any value and usually an object would be used. Now lets see how the context works. Consider `App.js`.

```javascript
import React from 'react';
import CoolMessageContext from './CoolMessageContext';

const App = () => {
  return (
    <CoolMessageContext.Provider value={'bye bye bye'} />
      <SomeBigDaddyComponent />
    </CoolMessageContext.Provider>
  );
}
```
The components that will have access to the context's value are wrapped in `Provider`. This is essentially saying "Hey I'm the provider of the value, anything below me will get that value". In the example above `SomeBigDaddyComponent` can get the value and also its children, `SomeMediumDaddyComponent` and `SomeSmallDaddy`. Anything above the provider can not access the value.
```javascript
const App = () => {
  return (
    <div>
      <SomeOtherComponent />
      <CoolMessageContext.Provider value={'bye bye bye'} />
        <SomeBigDaddyComponent />
      </CoolMessageContext.Provider>
    </div>
  );
}
```
`SomeOtherComponent` does not have access to the value because it is sitting above the provider. Note that an initial value must be provided, here I provide `'bye bye bye'`. Although an initial value was set with `createContext` this is really just a fail-safe value in case a value isn't provided when setting the provider.

## Getting the Context's Value
Now the value is being broadcast we can go ahead and access it from any of the children. To get the value we will use the hook `useContext`.
```javascript
import React, { useContext } from 'react';
import CoolMessageContext from './CoolMessageContext';

const SomeSmallDaddyComponent = () => {
  const coolMessage = useContext(CoolMessageContext);
  return <h1>{coolMessage}</h1>
};

export default SomeSmallDaddyComponent;
```
The `useContext` hook is initialized with the context object and so that the value can be accessed without messy prop passing. You can think of useContext as providing a teleport for the value so that it can teleport down into the component that needs it.

## Setting a Context's Value
A context's value can also be changed from anywhere in a similar manner if state is used.
```javascript
import React from 'react';

const ObjectContext = React.createContext({
  object: {
    number: 0,
    word: 'hello'
  },
  setObject: () => {}
});

export default ObjectContext;
```

The above context is similar to what we used before but also has a property to store the set function for `setState`.

```javascript
import React, { useState } from 'react';
import ObjectContext from './ObjectContext';

const App = () => {
  const [object, setObject] = useState({
    number: 1,
    word: 'bye'
  });

  return (
    // ES6 Object Property Value Shorthand 
    <ObjectContext value={{ object, setObject }} />
      <SomeBigDaddyComponent />
    </ObjectContext >
  );
};
```

The value above is set with the state object and also the state set function. Now setting the state from anywhere is the same as accessing the value.

```javascript
import React, { useContext } from 'react';
import ObjectContext from './ObjectContext';

const SomeSmallDaddyComponent = () => {
  const { object, setObject } = useContext(ObjectContext);
  const clickHandler = () => {
    const objectCopy = {...object};
    objectCopy.title = 'wow new title!';
    setObject(objectCopy);
  }
  return <button onClick={clickHandler}>{object.title}</button>
};

export default SomeSmallDaddyComponent;
```

That's the basic rundown of contexts! Let me know if I missed anything or you have any questions. If you like the post give me a follow on Twitter [@keke_arif](https://twitter.com/keke_arif). Cheers.

keke
