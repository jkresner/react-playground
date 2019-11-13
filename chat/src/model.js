const Id = String, 
      required = true,
      index = true,
      sparse = true;


const userRef = {
  _id:             { type: Id, required, ref: 'User', index },
  name:            { type: String, required },
  avatar:          { type: String, required },
  unread:          { type: Boolean, required, default: true },
  // blocked
}


const message = {
  // commId:          { type: Id, sparse, ref: 'Comm' },
  userId:          { type: Id, sparse, ref: 'User' },
  postId:          { type: Id, sparse, ref: 'Post' },
  text:            { type: String, required },
  // deleted:      [{_id,userId}]
}


const conversation = {
  users:           { type: [userRef], required },
  history:         { type: [message], required },
  // log:             { type: Log }
}



module.exports = { message, conversation } 
