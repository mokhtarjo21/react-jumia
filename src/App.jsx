import { useState } from 'react'

// import './App.css'
import JumiaLogin from './components/login/HomeLogin'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
     <JumiaLogin />
      <Footer />
   
    </>
  )
}

export default App
