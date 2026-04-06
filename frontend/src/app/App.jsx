import './styles'
import {AppRouter} from "./providers/RouterProvider.jsx";
import { useEffect } from 'react';
import { api } from '../shared/api/instanse.js';

function App() {
  useEffect(() => {
    api.get('/health')
    .then(response => console.log('Succsess', response.data))
    .catch(response => console.log('Error', response.data))
  }, [])

  return (
    <AppRouter/>
  )
}

export default App
