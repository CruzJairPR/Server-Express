const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'mi_secreto'; // Cambia esto por una clave secreta más fuerte

// Base de datos simulada
const usuarios = [
  { id: 1, nombre: "Ana García", correo: "anagarcia@example.com", rol: "Administrador", estado: true, pw: "password125" },
  { id: 2, nombre: "Carlos Martínez", correo: "carlosmartinez@gmail.com", rol: "Usuario", estado: true, pw: "secure_pass" },
  { id: 3, nombre: "Luis Pérez", correo: "luisperez@example.com", rol: "Usuario", estado: false, pw: "luis_password" },
  { id: 100, nombre: "Admin", correo: "admin@example.com", rol: "SuperAdmin", estado: true, pw: "admin123" }
];

// Ruta de login para generar token
app.post('/api/login', (req, res) => {
  const { correo, pw } = req.body; // Recibe correo y contraseña desde el cliente
  const usuario = usuarios.find(u => u.correo === correo && u.pw === pw);

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API ejecutándose en http://localhost:${port}`);
});
