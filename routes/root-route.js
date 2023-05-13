const express = require('express');
const router = express.Router();

const {root} = require('./../controllers/tasks-controllers');

router.route('/').get(root);


module.exports = router;