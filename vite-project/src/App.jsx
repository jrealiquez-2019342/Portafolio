import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [count2, setCount2 ]= useState(100);
  //const [constantePrincipal, metodoModificador] = 
  // useState(defaultValue)

  function aumentar() {
    setCount2((count2)=> count2 + 1)
  }

  function disminuir(){
    setCount2((count2)=> count2 - 1)
  }

  function aumentarEn8() {
    if (count2 + 8 > 200) {
      alert('Se sale del rango de +200')
    }else{
      setCount2((count2)=> count2 + 8)
    }
    
  }

  function disminuirEn8(){
    if (count2 - 8 < -200) {
      alert('Se sale del rango de -200')
    }else{
      setCount2((count2)=> count2 - 8)
    }
    
  }

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
      <h1>Vite + React | Jreliquez</h1>
      <div className="card">
        
        <p>
          Contador General:
          {count2}
        </p>
        <button onClick={() => aumentar()}>Aumentar</button>-
        <button onClick={() => disminuir()}>Disminuir</button>
        <p>|</p>
        <button onClick={() => aumentarEn8()}>Aumentar: +8</button>-
        <button onClick={() => disminuirEn8()}>Disminuir: -8</button>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

//Virtual DOM | DOM

/**
 * Primero actualiza el virtual DOM para decirle al DOM
 * que unicamente actualice una unica parte.
 */


//Ejercicio
/**
 * Contador - Aumentar y restar de uno en uno
 * Contador que sume de 8 en 8 con rango de -200<x<200
 */