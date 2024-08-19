import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Contact from './components/Contact'
import Photoshoots from './components/Photoshoots'
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import router dom



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Katarina Paredes</h1>
      <Photoshoots />
      <Contact />
    </>
  )
}

export default App
