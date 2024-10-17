// routes.js

const express = require('express');
const { authenticateJWT } = require('./middleware/authMiddleware');
const { findUser } = require('./user');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ruta de login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);

  if (user && user.password === password) {
    // Genera un token JWT
    const accessToken = jwt.sign({ username: user.username, role: user.role }, 'tu_clave_secreta');
    res.json({ accessToken });
  } else {
    res.status(401).send('Usuario o contraseña incorrectos');
  }
});

module.exports = router;
