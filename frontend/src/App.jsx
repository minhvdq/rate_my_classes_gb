import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import ReviewPage from './components/ReviewPage'
import AuthenPage from './components/AuthenPage'
import Comment from './components/Comment'
import classService from './services/class'
import customStorage from './services/customStorage'

function App() {
  const [classes, setClasses] = useState([])
  const [curUser, setCurUser] = useState(null)

  useEffect(() => {
    classService.getAll().then(fetchedClasses => {
        const data = fetchedClasses.data
        console.log('classes in database: ' + data[0].name)
        setClasses(data)
    })

    const loggedUser = customStorage.getItem('localUser')
    if(loggedUser){
      const lUser = JSON.parse(loggedUser)

      console.log('cur user is ' + lUser)
      setCurUser(lUser)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setCurUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home classes={ classes } curUser={ curUser } setCurUser={setCurUser}/>} />
        <Route path='/review/:id' element={<ReviewPage classes={ classes } curUser={curUser} setCurUser={setCurUser} />} />
        <Route path='/authen' element={<AuthenPage curUser={curUser} setCurUser={setCurUser} />} />
        <Route path='/comment' element={<Comment />} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
