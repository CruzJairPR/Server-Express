const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080; 

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos simulada
const usuarios = [
  {
    "id": 1,
    "nombre": "Ana García",
    "correo": "anagarcia@example.com",
    "rol": "Administrador",
    "estado": true,
    "pw": "password125"
  },
  {
    "id": 2,
    "nombre": "Carlos Martínez",
    "correo": "carlosmartinez@gmail.com",
    "rol": "Usuario",
    "estado": false,
    "pw": "secure_pass"
  },
  {
    "id": 3,
    "nombre": "María López",
    "correo": "marialopez@hotmail.com",
    "rol": "Editor",
    "estado": true,
    "pw": "mystrongpass"
  },
  {
    "id": 4,
    "nombre": "Pedro Rodríguez",
    "correo": "pedrorodriguez@outlook.com",
    "rol": "Colaborador",
    "estado": false,
    "pw": "pass12345"
  },
  {
    "id": 5,
    "nombre": "Laura Fernández",
    "correo": "laurafernandez@gmail.com",
    "rol": "Administrador",
    "estado": true,
    "pw": "supersecret"
  },
  {
    "id": 6,
    "nombre": "David Sánchez",
    "correo": "davidsanchez@hotmail.com",
    "rol": "Usuario",
    "estado": true,
    "pw": "password123"
  },
  {
    "id": 7,
    "nombre": "Sofía Pérez",
    "correo": "sofiaperez@outlook.com",
    "rol": "Editor",
    "estado": false,
    "pw": "secure_pass"
  },
  {
    "id": 8,
    "nombre": "Miguel Gómez",
    "correo": "miguelgomez@gmail.com",
    "rol": "Colaborador",
    "estado": true,
    "pw": "mystrongpass"
  },
  {
    "id": 9,
    "nombre": "Ana Martínez",
    "correo": "anamartinez@hotmail.com",
    "rol": "Administrador",
    "estado": false,
    "pw": "pass12345"
  },
  {
    "id": 10,
    "nombre": "Carlos López",
    "correo": "carloslopez@outlook.com",
    "rol": "Usuario",
    "estado": true,
    "pw": "supersecret"
  },
  {
    "id": 11,
    "nombre": "María Rodríguez",
    "correo": "mariarodriguez@gmail.com",
    "rol": "Editor",
    "estado": false,
    "pw": "password123"
  },
  {
    "id": 12,
    "nombre": "Pedro Fernández",
    "correo": "pedrofernandez@hotmail.com",
    "rol": "Colaborador",
    "estado": true,
    "pw": "secure_pass"
  },
  {
    "id": 13,
    "nombre": "Laura Sánchez",
    "correo": "laurasanchez@outlook.com",
    "rol": "Administrador",
    "estado": false,
    "pw": "mystrongpass"
  },
  {
    "id": 14,
    "nombre": "David Gómez",
    "correo": "davidgomez@gmail.com",
    "rol": "Usuario",
    "estado": true,
    "pw": "pass12345"
  },
  {
    "id": 15,
    "nombre": "Sofía Pérez",
    "correo": "sofiaperez@hotmail.com",
    "rol": "Editor",
    "estado": false,
    "pw": "supersecret"
  },
  {
    "id": 16,
    "nombre": "Miguel Martínez",
    "correo": "miguelmartinez@outlook.com",
    "rol": "Colaborador",
    "estado": true,
    "pw": "password123"
  },
  {
    "id": 17,
    "nombre": "Ana López",
    "correo": "analópez@gmail.com",
    "rol": "Administrador",
    "estado": false,
    "pw": "secure_pass"
  },
  {
    "id": 18,
    "nombre": "Carlos Rodríguez",
    "correo": "carlosrodriguez@hotmail.com",
    "rol": "Usuario",
    "estado": true,
    "pw": "mystrongpass"
  },
  {
    "id": 19,
    "nombre": "María Fernández",
    "correo": "mariafernandez@outlook.com",
    "rol": "Editor",
    "estado": false,
    "pw": "pass12345"
  },
  {
    "id": 20,
    "nombre": "Pedro Sánchez",
    "correo": "pedrosanchez@gmail.com",
    "rol": "Colaborador",
    "estado": true,
    "pw": "supersecret"
  }
];

// Rutas
// GET - Obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

// GET - Obtener un usuario específico
app.get('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(usuario);
});

// POST - Crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    correo: req.body.correo,
    rol: req.body.rol,
    estado: req.body.estado || true
  };
  
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// PATCH - Actualizar el estado de un usuario
app.patch('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  
  if (req.body.estado !== undefined) {
    usuario.estado = req.body.estado;
  }
  
  res.json(usuario);
});

// DELETE - Eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  
  usuarios.splice(index, 1);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API de usuarios ejecutándose en http://localhost:${port}`);
});