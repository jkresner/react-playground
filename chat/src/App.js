import data from './model.data';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import './App.css';

/*
<div class="full chat">
  <ul id="chat">
    {{#each r.history}}
    <li {{#if user.avatar }}{{else}}class="me"{{/if}}>
      <time>{{ ago _id }}</time>
      {{#if user.avatar }}<img src="{{ user.avatar }}" alt="{{ user.name }}">{{/if}}
      <div>{{ markup text}}</div>
    </li>
    {{/each}}
  </ul>
  <form id="messageForm">
    <fieldset>
      <input type="hidden" id="chatId" value="{{r._id}}" />
      <input type="hidden" id="postId" value="{{r.postId}}" />
      <textarea id="text" placeholder="Text Message"></textarea>
      <a class="ion-arrow-up-c btn" href="#"></a>
    </fieldset>
  </form>
</div>
*/


// ### TODO 
//- markup text (md)
//- assign li class on message owner
//- imp ago time
function Message(props) {
  return (
    <li key={props.id} className="me">
        <time>{props.time}</time>
        <img src={props.avatar} alt={props.name} />
        <div>{props.text}</div> 
    </li>
  );
}


class Thread extends React.Component {

  render() {
    let {data,onClose} = this.props;

    if (!data) return ('');

    const messages = data.history;

    const items = messages.map((m) => {
      return (<Message 
        key={m._id}
        text={m.text}
        name={m.user.name}
        avatar={m.user.avatar} 
        time="soon" />);
    });

    return (<div>
      <ul id="chat">{items}</ul>
      <IconButton onClick={onClose} color="secondary" aria-label="back">
        <ArrowBackIcon /> Close
      </IconButton>
      </div>
    );
  }

}

/* chats: 
    _id
    unread
    title
    with [
      _id
      name
      avatar
    ]
    last
*/
class Inbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chats: props.data.chats,
      current: null,
    };
  }

  openChat(chat) {
    this.setState({ current: chat });
  }

  closeChat() {
    console.log('closing chat')
    this.setState({ current: null });
  }

  renderEmpty() {
    return (
      <div><br/>
      <p>No messages yet</p>
      </div>
    );
  }

  // TODO 
  // - un-hardcode unread class
  // - {{#each with}}
  //     <img class="media-object" src="{{avatar}}" alt="{{name}}" />
  // - time {{ ago last._id }}
  // - md last.text  
  render() {
    let {current,chats} = this.state
    
    if (current) 
      return (<Thread 
          data={current} 
          onClose={() => this.closeChat() } 
        />);
     
    if (!chats.length) 
      return this.renderEmpty()

    let list = this.state.chats.map((c, idx) => {
      return (
        <li key={c._id} 
            onClick={() => this.openChat(c)}
            className="unread">
          <Icon color="action" fontSize="large">markunread</Icon>
          <time>time ago</time>
          <h3>{c.title}</h3>
          <div>{c.last.text}</div>
        </li>
      );
    });

    return (<ul id="inbox">{list}</ul>);
  }

}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>chat</h1>
      </header>
      <Inbox data={data} />
    </div>
  );
}


export default App;
