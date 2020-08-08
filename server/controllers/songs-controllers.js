const fs = require('fs')

const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Song = require('../models/song')
const User = require('../models/user')

const getSongById = async (req, res, next) => {
  const songId = req.params.sid
  let song
  try {
    song = await Song.findById(songId)
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find a song. ', 500)
    )
  }
  if (!song) {
    return next(
      new HttpError('Could not find a song for the proveded id. ', 404)
    )
  }
  res.json({ song: song.toObject({ getters: true }) })
}

const getSongsByUserId = async (req, res, next) => {
  const userId = req.params.uid

  let userWithSongs
  try {
    userWithSongs = await User.findById(userId).populate('songs')
  } catch (err) {
    return next(
      new HttpError('Fetching songs failed, please try again later', 500)
    )
  }
  if (!userWithSongs || userWithSongs.songs.length === 0) {
    return next(
      new HttpError('Could not find any songs for the provided user id. ', 404)
    )
  }
  res.json({
    songs: userWithSongs.songs.map((song) => song.toObject({ getters: true }))
  })
}

const createSong = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { name, artists } = req.body
  const createdSong = new Song({
    image: req.file.path,
    name,
    artists,
    owner: req.userData.userId
  })

  let user
  try {
    user = await User.findById(req.userData.userId)
  } catch (err) {
    return next(new HttpError('Creating song failed, please try again', 500))
  }

  if (!user) {
    return next(new HttpError('Could not find user for provided id.', 404))
  }

  // console.log(user)

  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await createdSong.save({ session: session })
    user.songs.push(createdSong)
    await user.save({ session: session })
    await session.commitTransaction()
  } catch (err) {
    return next(new HttpError('Creating song failed, please try again.', 500))
  }
  res.status(201).json({ song: createdSong })
}

const updateSong = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { name, artists } = req.body
  const songId = req.params.sid

  let song
  try {
    song = await Song.findById(songId)
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update song', 500)
    )
  }

  if (song.owner.toString() !== req.userData.userId) {
    return next(new HttpError('You are not allowed to edit this song', 401))
  }

  song.name = name
  song.artists = artists

  try {
    await song.save()
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not update song', 500)
    )
  }

  res.status(200).json({ song: song.toObject({ getters: true }) })
}

const deleteSong = async (req, res, next) => {
  const songId = req.params.sid

  let song
  try {
    song = await Song.findById(songId).populate('owner')
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete song. ', 500)
    )
  }

  if (!song) {
    return next(new HttpError('Could not find song for this id.', 404))
  }

  if (song.owner.id !== req.userData.userId) {
    return next(new HttpError('You are not allowed to delete this song', 401))
  }

  const imagePath = song.image

  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await song.remove({ session: session })
    song.owner.songs.pull(song)
    await song.owner.save({ session: session })
    await session.commitTransaction()
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not delete song. ', 500)
    )
  }

  fs.unlink(imagePath, (err) => {
    console.log(err)
  })

  res.status(200).json({ message: 'Deleted song' })
}

exports.getSongById = getSongById
exports.getSongsByUserId = getSongsByUserId
exports.createSong = createSong
exports.updateSong = updateSong
exports.deleteSong = deleteSong
