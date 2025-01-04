import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import ReviewPage from './components/ReviewPage'
import classService from './services/class'

function App() {
  const [count, setCount] = useState(0)
  const [classes, setClasses] = useState([])

  useEffect(() => {
    classService.getAll().then(fetchedClasses => {
        const data = fetchedClasses.data
        console.log('classes in database: ' + data[0].name)
        setClasses(data)
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home classes={ classes } />} />
        <Route path='/review/:id' element={<ReviewPage classes={ classes }/>} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
