import React, { useState }  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './App.css';
import marked  from 'marked';
import SignUp from './signup';
import data from './model.data';
import { MaxHeightTextarea } from './input';


const themeStyles = makeStyles( theme => ({
  
  appBar: {
    background: 'linear-gradient(orange 25%, yellow)',
    '& h6': { color: "black" },
  },
  avatar: {
    margin: theme.spacing(1),
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid",
    borderWidth: 1,
    width: 60,
    height: 60,
  },
  footer: {
    position: "fixed",
    backgroundColor: "black",
    bottom: 0,
    left: 0,
    right: 0
  },
  tabs: {
    background: "#d3d3d3"
  },
  tabPanel: {
    paddingTop: theme.spacing(1),
    paddingBottom:  theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },

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
  // - time {{ ago last._id }}
  if (props.hidden) return null    
  if (current) return (<Thread data={current} onClose={()=>setCurrent(null)} />)
  if (!chats.length) return (<div><br/><p>No messages yet</p></div>)

  let list = chats.map((c, idx) => (
    <li key={c._id} 
        onClick={() => openChat(c)}
        className={c.unread ? 'unread' : ''}>
      <Avatar alt={c.title} src={c.avatar} className={styles.avatar}  />
      <MarkunreadMailboxIcon color="action" fontSize="large" />
      <time>time ago</time>
      <h3>{c.title}</h3>
      <div dangerouslySetInnerHTML={({__html:marked(c.last.text)})}/>
    </li>))

  return (<ul id="inbox">{list}</ul>);
}


function TabPanel({ children, id, show, ...other }) { 
  return !show ? null : (
  <Typography
      component="div"
      role="tabpanel"
      hidden={!show}
      id={`tabpanel-${id}`}
      aria-labelledby={`tab-${id}`}>
    <Box p={3}>{children}</Box>
  </Typography>); 
}


function HideOnScroll({children}) {
  const trigger = useScrollTrigger()

  return (<Slide 
    appear={false} 
    direction="down" 
    in={!trigger}>{children}
  </Slide>)
}


function App(props) {
  let pages = [`INBOX`,`MESSAGE`,`PROFILE`]

  const styles = themeStyles()
  let [page,setPage] = useState(0)

  let handleTab = (e, val) => setPage(val)  

  return (<>
    <HideOnScroll {...props}>
      <AppBar className={styles.appBar}>
        <Typography variant="h6">{pages[page]}</Typography>
      </AppBar>
    </HideOnScroll>
    <Container className={styles.tabPanel}>
      <TabPanel id="inbox" show={page===0}>
        <Inbox data={data} hidden={false}  />
      </TabPanel>
      <TabPanel id="message" show={page===1}>
          Item Two
      </TabPanel>
      <TabPanel id="profile" show={page===2}>
        <SignUp />
      </TabPanel>
    </Container>
    <Paper square className={styles.footer}>
      <BottomNavigation
          className={styles.tabs}
          value={page}
          onChange={handleTab}
          showLabels>
        <BottomNavigationAction icon={<MarkunreadMailboxIcon />} label="INBOX" />
        <BottomNavigationAction icon={<EmailOutlinedIcon />} label="MESSAGE" />
        <BottomNavigationAction icon={<PersonAddIcon />} label="PROFILE" />
      </BottomNavigation>
    </Paper>
  </>)

}


export default App;
