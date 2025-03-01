import React from 'react'
import {BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/signup'
import Login from './pages/login'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}
