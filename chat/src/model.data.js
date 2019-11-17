import moment from 'moment'


const Utc = (str) => moment.utc(str, 'YYMMDD HH')
const ObjectId = (id) => id


const usr = [{
  "_id" : ObjectId("597e2f52755541797ea3d8b2"),
  "name" : "Me Climb",
  "avatar": "https://0.gravatar.com/avatar/fcfa469e470f73b026fcccb4e30f6ca4"
},{
  "_id" : ObjectId("597e2f52755541797ea3d8b7"),
  "name" : "Jonathon Kresner",
  "avatar": "https://0.gravatar.com/avatar/780d02a99798886da48711d8104801a4"
},{
  "_id" : ObjectId("5989fb3d8b672e00049baddb"),
  "name" : "Andy Som",
  "avatar": "https://0.gravatar.com/avatar/8328e55312dc0de9c823e342556544ba"
},{
  "_id" : ObjectId("598a04aa5a938c0004036dd8"),
  "name" : "Alex McMiller",
  "avatar": "https://0.gravatar.com/avatar/d3e1cef87ade37f23d02cbca62bdbfcc"
}];

const tf = {
  "name" : "Touchstone friends",
  "avatar": "https://0.gravatar.com/avatar/605dba647cedef845f6afa1bf8dd4b5a"
}




const [me,jk,ag,em] = usr
    
// history
    //   _id
    //   text
    //   user
    //     _id
    //     name
    //     avatar
const chats = [{ 
  users: [jk],
  history: [{ _id: 'aab12404', user: me, time: Utc('191012 08'), text: `First message` },
            { _id: 'aab12403', user: me, time: Utc('191012 08'), text: `Second message` }, 
            { _id: 'aab12402', user: jk, time: Utc('191012 13'), text: `Let me check with the misses.` },
            { _id: 'aab12401', user: jk, time: Utc('191012 08'), text: `OK let's do it` }, 
           ]
},{  
  users: [ag],
  history: [{ _id: 'abb12402', user: ag, time: Utc('190802 08'), text: `Hello there!` },
            { _id: 'abb12401', user: me, time: Utc('190802 08'), text: `Let's meet there at 3pm!` }
            ]
},{  
  users: [em],
  history: [{ _id: 'acb12401', user: em, time: Utc('191112 08'), text: `Hello there!` }]  
},{  
  users: [em,jk,ag],
  history: [{ _id: 'adb12401', user: em, time: Utc('181111 11'), text: `See ya'll soon` }]  
}];
    



export default { chats: [
  { _id: '11aaaa', avatar: jk.avatar, title: jk.name, unread: true, history: chats[0].history, last: chats[0].history[3] },
  { _id: '11aaab', avatar: ag.avatar, title: ag.name, history: chats[1].history, last: chats[1].history[1] },
  { _id: '11aaac', avatar: em.avatar, title: em.name, history: chats[2].history, last: chats[2].history[0]  },
  { _id: '22aaac', avatar: tf.avatar, title: tf.name, history: chats[3].history, last:  chats[3].history[0] },  
]}
