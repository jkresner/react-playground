import React, { useState }  from 'react';
import Avatar from '@material-ui/core/Avatar';
import { MaxHeightTextarea } from './input';
import marked  from 'marked';
import themeStyles from './App.css.js';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';


function TimeAgo({ago}) {
  return (<time>{ago.fromNow()}</time>);
}


function Message({id,me,time,text,name,avatar}) {
  const css = themeStyles()

  return (
    <li key={id} className={me ? 'me' : ''}>
        <TimeAgo ago={time} />
        <Avatar alt={name} src={avatar} className={css.avatar}  />
        <div dangerouslySetInnerHTML={({__html:marked(text)})}/>
    </li>
  );
}


export function Thread({data,onClose}) {
  if (!data) return ('');

  const messages = data.history;

  const items = messages.map((m) => (<Message 
    key={m._id}
    text={m.text}
    name={m.user.name}
    avatar={m.user.avatar} 
    time={m.time} />)
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
export function Inbox(props) {
  const css = themeStyles()
  let [chats] = useState(props.data.chats) // , setChats

  if (props.hidden) return null    
  if (!chats.length) return (<div><br/><p>No messages yet</p></div>)

  let list = chats.map((c, idx) => (
    <li key={c._id} 
        onClick={() => props.openChat(c)}
        className={c.unread ? 'unread' : ''}>
      <MarkunreadMailboxIcon color="action" fontSize="large" />
      <Avatar alt={c.title} src={c.avatar} className={css.avatar}  />
      <TimeAgo ago={c.last.time} />
      <h3>{c.title}</h3>
      <div dangerouslySetInnerHTML={({__html:marked(c.last.text)})}/>
    </li>))

  return (<ul id="inbox">{list}</ul>);
}
