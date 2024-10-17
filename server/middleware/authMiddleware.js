const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).send('Acceso denegado. No se proporcionó un token.');

  jwt.verify(token.split(' ')[1], 'tu_secreto_aqui', (err, user) => {
    if (err) return res.status(403).send('Token no válido.');
    req.user = user;
    next();
  });
};

// Usar el middleware en la ruta
app.get('/api/usuarios', verifyToken, (req, res) => {
  // Aquí va la lógica para retornar los usuarios
});
