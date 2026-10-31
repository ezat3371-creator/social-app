
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { CounterContextProvider } from './context/counter.context.tsx'
import AuthContextProvider from './context/auth.context.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
  </AuthContextProvider>
  
)
