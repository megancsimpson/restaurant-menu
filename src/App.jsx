// src/App.jsx

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Home from './pages/Home'

import About from './pages/About'

import './App.css'

import ItemDetail from './pages/ItemDetail'

function App() {

  return (

    <div className="App">

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/menu/:id" element={<ItemDetail />} />

      </Routes>

    </div>
  )

}

export default App
