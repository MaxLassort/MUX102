import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>MUX102</h1>
      <p>Projet React déployé via GitHub Pages.</p>
      <button onClick={() => setCount((c) => c + 1)}>
        compteur : {count}
      </button>
    </div>
  )
}
