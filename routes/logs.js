const express = require('express');
const router = express.Router();
const logsCtrl = require('../controllers/logs');
const isLoggedIn = require('../config/auth');


router.post('/exercises/:id/logs', isLoggedIn, logsCtrl.create);

// DELETE /logs/:id
router.delete('/logs/:id', isLoggedIn, logsCtrl.delete);

module.exports = router;