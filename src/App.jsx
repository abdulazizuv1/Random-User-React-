import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './pages/create/Create';
import Cart from './pages/cart_info/Cart';
import Slider from './pages/slider/Slider';

function App() {
  const [mode, setMode]=useState(false)
  const changeMode = ()=>{
    setMode(!mode)
  }
  return (
    <div className={mode ? "body night":"body"}>
      <ToastContainer />
      <BrowserRouter>
      <Navbar changeMode={changeMode}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/cart-info/:id' element={<Cart/>}/>
          <Route path='/slider' element={<Slider/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
