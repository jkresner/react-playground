### Immutable state

For arrays: use `[].concat` or es6 `[ ...params]`

For objects: use `Object.assign({}, ...)` or es6 `{...params}`

```js

// More concise than Object.assign
const {name, value} = event.target
let user = {...this.state.user, [name]: value}
this.setState({user})

// One line
this.setState({user: {...this.state.user, [target.name]: target.value}});


```

Or use library
- github.com/kolodny/immutability-helper
- facebook.github.io/immutable-js
- github.com/rtfeldman/seamless-immutable
- github.com/aweary/react-copy-write

`setState` is asynchronous. 
- creates a pending state transition 
- this.state after calling setState would potentially return the existing value
- Use the callback of setState to run code after setState completes

`setState` also has a functional signature

```js

setState((prevState) => {
 // use previous value in state to build new state... 
 const updatedUser = {...prevState.user, [target.name]: target.value};     
 
 // return value will be set as the new state
 return { user: updatedUser }; 
}, () => {
 // Can safely utilize the new state
 this.doSomething(this.state.user); 
}) 

 ```
 
### Function/Stateless and React.PureComponent

#### Functional components

- Prevent constructing class instances
- Reduce bundle size as it minifies better

#### PureComponent

React.PureComponent does a shallow state change comparison. 
Compares values for primitive types, and references for objects. 

* Must make sure 
1. Component State/Props are immutable
2. State/Props should not have a multi-level nested objects


### React.Fragments to optimize HTML 

Group children without adding an extra html parent tag.

```js

render() {
  return (
    <React.Fragment>
      <h1>Title</h1>
      <p>comments</p>
   </React.Fragment>
  )
} 
  
// concise syntax
render() { return (<><h1>Title</h1><p>comments</p></>) }   
    
```

### Throttle / debounce


```js
import debouce from 'lodash.debounce'

class SearchInput extends React.Component {
 
 constructor(props) {
   super(props)
   this.state = { search: “” }
 }

 setQuery = debounce(e => 
   this.setState({ search: e.target.value })
 , 1000)

 render() {
   return (<input type="text" onChange={this.setQuery} />)
 }
 
}
```

### Initial state

Using props to initialize state in a constructor function often leads to 
duplication of “source of truth”, i.e. where the real data is. This is 
because constructor function is only invoked when the component is first created.

Solution: 
1. use props directly and forget state
2. use `componentWillReceiveProps` to update state when props change


### Memoization

```js

const UserDetail = ({user, onEdit}) => {
  const {title, name, avatar} = user
  return (<><img src={avatar} /><h4>{name}</h4><p>{title}</p></>)
}

export default React.memo(UserDetail)

```