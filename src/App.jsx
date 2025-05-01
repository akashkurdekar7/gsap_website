import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import NavBar from './components/NavBar'

const App = () => {
  return (
   <main className="relative min-h-screen overflow-x-hidden w-screen ">
    <NavBar/>
    <Hero/>
    <About/>
   </main>
  )
}

export default App