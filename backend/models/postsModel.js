// embedded relationship
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
   subject: { type: String },
   body: { type: String },
   user: { type: String, default: 'Bob' },
   // comments field here
   comments: [{ 
      text: { type: String },
      user: { type: String, default: 'Bob' }
   }]
}, { timestamps: true })

const Post = mongoose.model('posts', postSchema)

module.exports = Posts