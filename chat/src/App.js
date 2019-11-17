import React, { useState }  from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import './App.css';
import themeStyles from './App.css.js';
import {Inbox,Thread} from './chat';
import SignUp from './signup';
import data from './model.data';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


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
  </Slide>);
}


function App(props) {
  let pages = [`INBOX`,`MESSAGE`,`PROFILE`]

  const css = themeStyles()
  let [page,setPage] = useState(0)
  let [chat,setChat] = useState(null)

  let openChat = (val) => { 
    setChat(val)
    setPage(1) 
  } 
  let handleTab = (e, val) => setPage(val)  

  return (<div>
    <HideOnScroll {...props}>
      <AppBar className={css.appBar}>
        <Typography variant="h6">{pages[page]}</Typography>
      </AppBar>
    </HideOnScroll>
    <Container className={css.tabPanel}>
      <TabPanel id="inbox" show={page===0}>
        <Inbox data={data} hidden={false} openChat={openChat} />
      </TabPanel>
      <TabPanel id="message" show={page===1}>
        <Thread data={chat} />
      </TabPanel>
      <TabPanel id="profile" show={page===2}>
        <SignUp />
      </TabPanel>
    </Container>
    <Paper square className={css.footer}>
      <BottomNavigation
          className={css.tabs}
          value={page}
          onChange={handleTab}
          showLabels>
        <BottomNavigationAction icon={<MarkunreadMailboxIcon />} label="INBOX" />
        <BottomNavigationAction icon={<EmailOutlinedIcon />} label="MESSAGE" />
        <BottomNavigationAction icon={<PersonAddIcon />} label="PROFILE" />
      </BottomNavigation>
    </Paper>
  </div>);
}


export default App;
