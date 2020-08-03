---

layout: post
title: Understanding State and Lifecycle in React
description: Make sure you understand the React component lifecycle or you will run into issues later.
tags: ReactJS Javascript

---

When does a component re-render? What about mounting? It's easy to just rush over these concepts and continue on with a shallow understanding, however they will eventually come back to bite you. Let's clear them up once and for all.

### Rendering
Think of rendering as just drawing the UI to the screen. When we talk about UI in React we are referring to components.
```javascript
import React from 'react';

const App = () => {
  console.log('render app');
  return <h1>Hello World</h1>;
};

export default App;
```
`App` is a component and when the application is run React needs to render it to the screen. A component can also re-render because of some changes made. This usually goes hand in hand with updating state.

```javascript
import React, { useState } from 'react';

const App = () => {
  const [title, setTitle] = useState('Hello World');

  const buttonHandler = () => {
    const newTitle = title === 'Hello World' ? 'Goodbye World' : 'Hello World';
    setTitle(newTitle);
  };

  console.log('render app');

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={buttonHandler}>tap</button>
    </div>
  );
};

export default App;
```
Tapping on the button above will trigger the render again. This is confirmed in the console output. Let's examine what happens if `App` has a child component.

```javascript
const SomeChild = () => {
  console.log('render a child');

  return <h1>I'm a child</h1>;
};

const App = () => {
  const [title, setTitle] = useState('Hello World');

  const buttonHandler = () => {
    const newTitle = title === 'Hello World' ? 'Goodbye World' : 'Hello World';
    setTitle(newTitle);
  };

  console.log('render app');

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={buttonHandler}>tap</button>
      <SomeChild />
    </div>
  );
};

export default App;
```
**Both** the _parent_ and its _child_ components are re-rendered. This is an important effect that state variables have. State variables will re-render the component they are in **and** all child components down the chain.
## Component Lifecycle
Components go through a variety of lifecycle phases during the life of a React app.
![React Component Lifecycle](https://dev-to-uploads.s3.amazonaws.com/i/wh5rqu2bshfexy0w7g6a.png)
The order of life is as follows:
1) A component is first initialized with its constructor function.
2) The component renders for the very first time.
3) The component mounts.
4) The component will render again if new props are set, a state is set or `forceUpdate` is triggered.
## Mount and Unmount
As a React programmer the moments a component *mount* or *unmount* are important because this is where we usually call API code, set states or do cleanup. Two Simple rules to remember here:
1) When the component renders for the first time it mounts.
2) When the component's parent is no longer needed or the parent component performs an update that no longer renders the component it unmounts. This is easy to see in a typical React conditional statement.
```javascript
import React, { useState, useEffect } from 'react';

const SomeChild = () => {

  useEffect(() => {
    console.log('mounted');
    return () => console.log('unmounted');
  });

  return <h1>I'm a child</h1>;
};

const App = () => {
  const [needsShowChild, setNeedsShowChild] = useState(false);

  const buttonHandler = () => {
    setNeedsShowChild(!needsShowChild);
  };

  return (
    <div>
      <button onClick={buttonHandler}>tap</button>
      {needsShowChild && 
        <SomeChild />
      }
    </div>
  );
};

export default App;
```
Hope that clear up some understanding. If you liked the post give me a follow on Twitter [@keke_arif](https://twitter.com/keke_arif). Cheers.

Keke
