// src/App.jsx

import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'

import Home from './pages/Home'

import About from './pages/About'

import './App.css'

import ItemDetail from './pages/ItemDetail'

function App() {

  return (

    <div className="App">

      <NavBar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/menu/:id" element={<ItemDetail />} />

      </Routes>

    </div>
  )

}

export default App
