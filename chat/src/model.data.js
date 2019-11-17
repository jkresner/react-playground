const ObjectId = (id) => id
const usr = [{
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

const [jk,ag,em] = usr
    
// history
    //   _id
    //   text
    //   user
    //     _id
    //     name
    //     avatar
const chats = [{ 
  users: [jk],
  history: [{ _id: 'aab12401', user: jk, text: `First message` },
            { _id: 'aab12402', user: jk, text: `Second message` }]
},{  
  users: [ag],
  history: [{ _id: 'aab12401', user: ag, text: `Hello there!` }]
},{  
  users: [em],
  history: [{ _id: 'aab12401', user: em, text: `Hello there!` }]  
},{  
  users: [em,jk,ag],
  history: [{ _id: 'aab12401', user: em, text: `See ya'll soon` }]  
}];
    



module.exports = { chats: [
  { _id: '11aaaa', avatar: jk.avatar, title: jk.name, unread: true, history: chats[0].history, last: { text: `let's do it` } },
  { _id: '11aaab', avatar: ag.avatar, title: ag.name, history: chats[1].history, last: { text: `want to meet there?` } },
  { _id: '11aaac', avatar: em.avatar, title: em.name, unread: true, history: chats[2].history, last: { text: `how about top rope?` } },
  { _id: '22aaac', avatar: '', title: 'Touchstone friends', history: chats[3].history, last: { text: `See ya'll soon` } },  
]}
