import './styles'
import { AppRouter } from "./providers/RouterProvider.jsx";
import { useEffect } from 'react';
import { api } from '../shared/api/instanse.js';
import { API_ENDPOINTS } from '../shared/api/endpoints.js';

function App() {
  useEffect(() => {
    api.get(API_ENDPOINTS.HEALTH)
      .then(response => console.log('API Health:', response.data))
      .catch(error => console.error('API Health Check Failed:', error))
  }, [])

  return <AppRouter />
}

export default App
