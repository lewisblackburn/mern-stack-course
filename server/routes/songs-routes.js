const express = require('express')
const { check } = require('express-validator')

const {
  getSongById,
  getSongsByUserId,
  createSong,
  updateSong,
  deleteSong
} = require('../controllers/songs-controllers')

const fileUpload = require('../middleware/file-upload')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.get('/:sid', getSongById)
router.get('/user/:uid', getSongsByUserId)
router.use(checkAuth)
router.post(
  '/',
  fileUpload.single('image'),
  [check('name').not().isEmpty(), check('artists').not().isEmpty()],
  createSong
)
router.patch(
  '/:sid',
  [check('name').not().isEmpty(), check('artists').not().isEmpty()],
  updateSong
)
router.delete('/:sid', deleteSong)

module.exports = router
