const express = require('express');
const songController = require('../controllers/song');

const router = express.Router();

router.get(
  '/:idWithText', 
  songController.getSong
);

module.exports = router;
