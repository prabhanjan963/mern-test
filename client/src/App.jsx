import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Verify from './components/Verify'
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/verify/:token' element={<Verify />} />
      </Routes>
    </>
  )
}

export default App