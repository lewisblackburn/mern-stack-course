const mongoose = require('mongoose')

const Schema = mongoose.Schema

const songSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  artists: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

module.exports = mongoose.model('Song', songSchema)
