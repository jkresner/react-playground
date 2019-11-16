## Component lifecycle

```js

class Timer extends React.Component {
    
  componentDidMount() {
    this.timerID = setInterval( () => this.tick(), 1000 )
  }

  componentWillUnmount() { 
    clearInterval(this.timerID)
  }
  
}

```


## Handling events

Cannot return false from event handler, need to explicitly call preventDefault()

```js

class LoginForm extends React.Component {  
  
  handleSubmit(e) {
    e.preventDefault();
  }

}

```


If you are using the experimental public class fields syntax, you can use class
fields to correctly bind callbacks:

```js

class LoggingButton extends React.Component {
 
  // *experimental* syntax ensures `this` is bound within handleClick
  handleClick = () => {
    console.log('this is:', this);
  }
  
}

```


## JSK rendering

`true && expression` always evaluates to expression
`false && expression` always evaluates to false

```js
// inline conditional render
return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
```


You might want a component to hide itself even though it was rendered by another component. 

To do this return null instead of its render output.

Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods. For instance componentDidUpdate will still be called.


## Forms

An input form element whose value is controlled by React in this way is called a “controlled component”.

```js
class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

In React, a `<textarea>` uses a value attribute instead of innerHtml. This way, a form 
using a <textarea> can be written same as a form that uses a single-line input
    
In HTML `<select>` default selection is set with the selected attribute on the desired `<option>`. 
    React uses a value attribute on the root select tag as it is more convenient in a controlled 
    component because you only need to update it in one place.