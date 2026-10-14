
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import { Authprovider } from './authcontext/Authprovider.jsx'

createRoot(document.getElementById('root')).render(

   <Authprovider>
    
 <App />

   </Authprovider>
 
)
