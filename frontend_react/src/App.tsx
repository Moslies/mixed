import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const handleAdd = () => {
    setCount(count + 1)
    setTimeout(() => {
      setCount(count + 1)
    }, 0)
  }
  return (
    <>
      <section id="center">
        <div>
          <h1>Count is {count}</h1>
        </div>
        <button
          type="button"
          className="counter"
          onClick={handleAdd}
        >
          ++
        </button>
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
