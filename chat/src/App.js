import React, { useState }  from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import marked  from 'marked';
import SignUp from './signup';
import data from './model.data';
import { MaxHeightTextarea } from './input';


const themeStyles = makeStyles( theme => ({
  
  avatar: {
    margin: theme.spacing(1),
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid",
    borderWidth: 1,
    width: 60,
    height: 60,
  }

}));


// ### TODO 
//- imp ago time
function Message({id,me,time,text,name,avatar}) {
  const styles = themeStyles()

  return (
    <li key={id} className={me ? 'me' : ''}>
        <time>{time}</time>
        <Avatar alt={name} src={avatar} className={styles.avatar}  />
        <div dangerouslySetInnerHTML={({__html:marked(text)})}/>
    </li>
  );
}


function Thread({data,onClose}) {
  if (!data) return ('');

  const messages = data.history;

  const items = messages.map((m) => (<Message 
    key={m._id}
    text={m.text}
    name={m.user.name}
    avatar={m.user.avatar} 
    time="soon" />)
  );

  return (<div>
    <ul id="chat">{items}</ul>
    <MaxHeightTextarea />
    <IconButton color="primary" aria-label="send"><EmailOutlinedIcon /></IconButton>
    <IconButton onClick={onClose} color="secondary" aria-label="back">
      <ArrowBackIcon /> Close
    </IconButton>
  </div>);
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
function Inbox(props) {
  let [chats] = useState(props.data.chats) // , setChats
  let [current, setCurrent] = useState(null);

  let openChat = (chat) => setCurrent(chat)
  const styles = themeStyles()

  // TODO 
  // - un-hardcode unread class
  // - {{#each with}}
  //     <img class="media-object" src="{{avatar}}" alt="{{name}}" />
  // - time {{ ago last._id }}
  if (props.hidden) return null    
  if (current) return (<Thread data={current} onClose={()=>setCurrent(null)} />)
  if (!chats.length) return (<div><br/><p>No messages yet</p></div>)

  let list = chats.map((c, idx) => (
    <li key={c._id} 
        onClick={() => openChat(c)}
        className="unread">
      <Avatar alt={c.title} src={c.avatar} className={styles.avatar}  />
      <MarkunreadMailboxIcon color="action" fontSize="large" />
      <time>time ago</time>
      <h3>{c.title}</h3>
      <div dangerouslySetInnerHTML={({__html:marked(c.last.text)})}/>
    </li>))

  return (<ul id="inbox">{list}</ul>);
}


function SignUpPage({hidden}) {
  return hidden ? null : (<SignUp hidden={hidden} />)
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
    };
  }

  toggleSignUp() {
    this.setState({ signUp: !this.state.signUp });
  }

  render() {
    let {signUp} = this.state

    return (
      <div className="App">
        <header className="App-header">
          <IconButton 
            onClick={ () => this.toggleSignUp() } 
            color="secondary"
          >
            <PersonAddIcon />
          </IconButton>
          <h1>chat</h1>
        </header>
        <Inbox data={data} hidden={signUp}  />
        <SignUpPage hidden={!signUp} />
      </div>
    );
  }

}


export default App;
