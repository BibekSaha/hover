const express = require('express');
const artistController = require('../controllers/artist');

const router = express.Router();

/**
 * @method GET
 * @route /api/v1/artist/:id
 */
router
  .get('/:id', artistController.getArtist);

/**
 * @method GET
 * @route /api/v1/aritst/:id/songs?page={page-number}
 */
router
  .get('/:id/songs', artistController.getArtistSong);

module.exports = router;
