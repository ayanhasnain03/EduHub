import React from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from './components/Home/Home'
import Header from './components/Layout/Header/Header'
import Courses from './components/Courses/courses'
import Footer from './components/Layout/Footer/Footer'
const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/courses' element={<Courses/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App