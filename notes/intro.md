# Intro react notes

## Concepts

*props* essentially attributes of component/tag
*state* maintained data for component and child components
*function Component* returns template (no render method to call)
*React.Component* base class:
   - with props or state, use constructor / call super([constructor_params])
   - implement render() method
   - define state modifying functions on class => `this.jumpTo() { /* modify state */ }`
   
## Tips

*immutable data* easier to maintain history / rewind state

### state vs props

use state when: ?

use props when: ?

### render in-line vs use component

in-line

```jsx
const moves = history.map((step, move) => {
  return (
    <li key={move}>
      <button onClick={() => this.jumpTo(move)}>Some {step} text</button>
    </li>
  );
})

return (
    <div>{{moves}}</div>
);
```

fn component
```jsx
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Grid extends React.Component {
  
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
        </div>
        <div className="board-row">
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
      </div>
    );
  }
  
}
```