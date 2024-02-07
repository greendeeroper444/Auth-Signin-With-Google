import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../contexts/userContext'
import Dashboard from './pages/Dashboard'


  axios.defaults.baseURL = 'http://localhost:8000';
  axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
