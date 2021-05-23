const express = require('express');
const searchController = require('../controllers/search');

const router = express.Router();

/**
 * @method GET
 * @route /api/v1/search?q={query}
 */
router.get(
  '/',
  searchController.getSearchResults
);

module.exports = router;
