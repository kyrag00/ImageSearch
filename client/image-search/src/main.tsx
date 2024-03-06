import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages/Router.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <Auth0Provider
    domain="dev-m8ecejb58ot1rmgj.eu.auth0.com"
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
      <App/>
      <RouterProvider router={router}></RouterProvider>
    
  </Auth0Provider>
  </React.StrictMode>,
)
