const express = require('express');
const songController = require('../controllers/song');

const router = express.Router();

/**
 * @method GET
 * @route /api/v1/songs/song-name-{id}
 */
router.get(
  '/:idWithText', 
  songController.getSong
);

module.exports = router;
