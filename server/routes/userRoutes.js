// server/routes/userRoutes.js
const express = require('express');
const { getCurrentUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, getCurrentUser); // Ruta protegida

module.exports = router;
