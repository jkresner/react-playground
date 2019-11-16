## Hooks

### Built in React hooks

Hooks are functions to “hook into” function component state and lifecycle
- don’t work inside classes => allow using React without classes
- let you organize side effects in a component 
  - by what pieces are related (e.g. add/remove an something)
  - don't force splitting code based on lifecycle methods

Don't:
- Use hooks inside loops, conditions, or nested functions
- Only use in a React.Component (not vanilla JS)


React out of the box:

**Basic Hooks**
- `useState`
- `useEffect`
- `useContext`

**Additional Hooks**
- `useReducer`
- `useCallback`
- `useMemo`
- `useRef`
- `useImperativeHandle`
- `useLayoutEffect`
- `useDebugValue`


### State Hook

```js
import React, { useState } from 'react';

function StateHookExample() {
  // Declare a new state variable, which we'll call "count"
  // param to useState is the initial value
  const [count, setCount] = useState(0);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}> add click </button>
    </>
  );
}
```


Both writing components and jsx becomes terser:

```js
// Inside class component
<button onClick={() => this.setState({ count: this.state.count + 1 })}>Click</button>

// Inside function component
<button onClick={() => setCount(count + 1)}>Click</button>
```

* Can use State variables to hold objects/arrays, so group related data. 
However, unlike this.setState in a class, updating a state variable always
replaces it instead of merging.


### Effect Hook

The Effect Hook, `useEffect`, adds the ability to perform side effects from a function component. 

Serves same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount

With useEffect, React runs your “effect” function after flushing changes to the DOM 

By default effects run after every render — including the first render

```js
function Example() {
  const [count, setCount] = useState(0);

  // Sim to componentDidMount / componentDidUpdate
  useEffect(() => {
    // Update something outside the component using the browser API
    document.title = `You clicked ${count} times`
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Can use multiple effects in a component.
Can specify how to “clean up” after an effect by returning a function from useEffect.

```js

function FriendStatusCount(props) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPI.subscribeToFriend(props.friend.id, handleStatusChange)

    return () => {
      ChatAPI.unsubscribeFromFriend(props.friend.id, handleStatusChange)
    }
  })

  if (isOnline === null) 
    return 'Loading...'
  
  return isOnline ? 'Online' : 'Offline'
}

```

### Custom hooks

Create your own Hooks to reuse stateful behavior between different components.

Custom Hooks let you share logic between components without adding more/parent 
components to your tree.

A custom Hook is a JavaScript function whose name starts with ”use” and that 
may call other Hooks.


```js
import React, { useState, useEffect } from 'react';


function useFriendStatus(friendID) {
  const [online, setOnline] = useState(null)

  function onStatusChange({online}) { setOnline(online) }

  useEffect(() => {
    ChatAPI.subscribeToFriend(friendID, onStatusChange)  
    return () => ChatAPI.unsubscribeFromFriend(friendID, onStatusChange)
  })

  return online
}

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id)
  if (isOnline === null) return 'Loading...'  
  return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);
  return (<li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>)
}
```

**Tip**: Optimizing Performance by Skipping Effects

Sometimes, performance problems may arise from cleaning up/applying effects on 
every render. To skip applying an effect if certain values haven’t changed between 
re-renders, pass an array as an optional second argument to useEffect:

```js

useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes

```