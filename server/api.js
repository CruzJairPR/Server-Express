const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

const SECRET_KEY = "xideral"; 

// Base de datos simulada
const usuarios = [
  {
    id: 1,
    nombre: "Ana García",
    correo: "anagarcia@example.com",
    rol: "Administrador",
    estado: true,
    pw: "password125", 
  },
  {
    id: 2,
    nombre: "Carlos Martínez",
    correo: "carlosmartinez@gmail.com",
    rol: "Usuario",
    estado: true,
    pw: "secure_pass", 
  },
  {
    id: 3,
    nombre: "Luis Pérez",
    correo: "luisperez@example.com",
    rol: "Usuario",
    estado: false,
    pw: "luis_password", // Contraseña simulada
  },
 
  {
    id: 4,
    nombre: "Pedro Rodríguez",
    correo: "pedrorodriguez@outlook.com",
    rol: "Colaborador",
    estado: false,
    pw: "pass12345",
  },
  {
    id: 5,
    nombre: "Laura Fernández",
    correo: "laurafernandez@gmail.com",
    rol: "Administrador",
    estado: true,
    pw: "supersecret",
  },
  {
    id: 6,
    nombre: "David Sánchez",
    correo: "davidsanchez@hotmail.com",
    rol: "Usuario",
    estado: true,
    pw: "password123",
  },
  {
    id: 7,
    nombre: "Sofía Pérez",
    correo: "sofiaperez@outlook.com",
    rol: "Editor",
    estado: false,
    pw: "secure_pass",
  },
  {
    id: 8,
    nombre: "Miguel Gómez",
    correo: "miguelgomez@gmail.com",
    rol: "Colaborador",
    estado: true,
    pw: "mystrongpass",
  },
  {
    id: 9,
    nombre: "Ana Martínez",
    correo: "anamartinez@hotmail.com",
    rol: "Administrador",
    estado: false,
    pw: "pass12345",
  },
  {
    id: 10,
    nombre: "Carlos López",
    correo: "carloslopez@outlook.com",
    rol: "Usuario",
    estado: true,
    pw: "supersecret",
  },
  {
    id: 11,
    nombre: "María Rodríguez",
    correo: "mariarodriguez@gmail.com",
    rol: "Editor",
    estado: false,
    pw: "password123",
  },
  {
    id: 12,
    nombre: "Pedro Fernández",
    correo: "pedrofernandez@hotmail.com",
    rol: "Colaborador",
    estado: true,
    pw: "secure_pass",
  },
  {
    id: 13,
    nombre: "Laura Sánchez",
    correo: "laurasanchez@outlook.com",
    rol: "Administrador",
    estado: false,
    pw: "mystrongpass",
  },
  {
    id: 14,
    nombre: "David Gómez",
    correo: "davidgomez@gmail.com",
    rol: "Usuario",
    estado: true,
    pw: "pass12345",
  },
  {
    id: 15,
    nombre: "Sofía Pérez",
    correo: "sofiaperez@hotmail.com",
    rol: "Editor",
    estado: false,
    pw: "supersecret",
  },
  {
    id: 16,
    nombre: "Miguel Martínez",
    correo: "miguelmartinez@outlook.com",
    rol: "Colaborador",
    estado: true,
    pw: "password123",
  },
  {
    id: 17,
    nombre: "Ana López",
    correo: "analópez@gmail.com",
    rol: "Administrador",
    estado: false,
    pw: "secure_pass",
  },
  {
    id: 18,
    nombre: "Carlos Rodríguez",
    correo: "carlosrodriguez@hotmail.com",
    rol: "Usuario",
    estado: true,
    pw: "mystrongpass",
  },
  {
    id: 19,
    nombre: "María Fernández",
    correo: "mariafernandez@outlook.com",
    rol: "Editor",
    estado: false,
    pw: "pass12345",
  },
  {
    id: 20,
    nombre: "Pedro Sánchez",
    correo: "pedrosanchez@gmail.com",
    rol: "Colaborador",
    estado: true,
    pw: "supersecret",
  },
  {
    id: 100, // Un ID único para el superadmin
    nombre: "Admin",
    correo: "admin@example.com", // Correo del superadmin
    rol: "SuperAdmin", // Rol para gestionar usuarios
    estado: true,
    pw: "admin123", // Contraseña del superadmin
  },
];

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).json({ mensaje: "No se proporcionó token" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY); // Decodificar el token
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: "Token no válido" });
  }
};

// Ruta de login para generar token
app.post("/api/login", (req, res) => {
  const { correo, pw } = req.body; // Recibe correo y contraseña desde el cliente
  const usuario = usuarios.find((u) => u.correo === correo && u.pw === pw);

  if (!usuario) {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }

  // Generar el token JWT con los datos del usuario (id y rol)
  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({
    token,
    usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
  });
});

// Ruta protegida - Obtener todos los usuarios (requiere token)
app.get("/api/usuarios", verificarToken, (req, res) => {
  res.json(usuarios);
});

// Ruta protegida - Obtener un usuario específico
app.get("/api/usuarios/:id", verificarToken, (req, res) => {
  const usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  if (!usuario)
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  res.json(usuario);
});

// POST - Crear un nuevo usuario (protegida)
app.post("/api/usuarios", verificarToken, (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    correo: req.body.correo,
    rol: req.body.rol,
    estado: req.body.estado || true,
    pw: req.body.pw, // Contraseña recibida en la solicitud
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// PATCH - Actualizar el estado de un usuario (protegida)
app.patch("/api/usuarios/:id", verificarToken, (req, res) => {
  const usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  if (!usuario)
    return res.status(404).json({ mensaje: "Usuario no encontrado" });

  if (req.body.estado !== undefined) {
    usuario.estado = req.body.estado;
  }
  res.json(usuario);
});

// DELETE - Eliminar un usuario (protegida)
app.delete("/api/usuarios/:id", verificarToken, (req, res) => {
  const index = usuarios.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ mensaje: "Usuario no encontrado" });

  usuarios.splice(index, 1);
  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API de usuarios ejecutándose en http://localhost:${port}`);
});
