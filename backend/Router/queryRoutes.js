const express = require('express');
const router = express.Router();

const validateForm = require('../Middlewares/queryValidation');
const { queryTeams } = require('../Controllers/queryController');

router.post('/', validateForm, queryTeams);

module.exports = router;