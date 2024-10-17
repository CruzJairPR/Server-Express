import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Cambia la URL según sea necesario

// Función para iniciar sesión
const login = async (correo, pw) => {
  const response = await axios.post(`${API_URL}/login`, { correo, pw }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Guardar token en localStorage
  }

  return response.data; // Retornar los datos
};

// Función para cerrar sesión
const logout = () => {
  localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
};

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null; // Verifica si hay un token
};

export default {
  login,
  logout,
  isAuthenticated,
};
