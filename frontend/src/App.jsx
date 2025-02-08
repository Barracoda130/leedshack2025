import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Demo from './components/demo'
import DisplayGraph from './components/nodeMap'
import Sidebar from './components/sideBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <DisplayGraph />
        <Sidebar />
        
    </>
  )
}

export default App
