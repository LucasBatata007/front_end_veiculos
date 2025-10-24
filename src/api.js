import axios from 'axios';

// Cria uma instância do axios configurada para a sua API do Docker
const api = axios.create({
  baseURL: 'http://4.228.133.252/api' // A porta que definimos no docker-compose
});

export default api;