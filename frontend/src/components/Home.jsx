import "bootstrap/dist/css/bootstrap.min.css"
import "./Home.css"
import Header from './Header'
import { useEffect, useState } from "react"
import classService from '../services/class'

export default function Home() {
    const [classes, setClasses] = useState([])
    const [displayClasses, setDisplayClasses] = useState([])

    useEffect(() => {
        classService.getAll().then(fetchedClasses => {
            const data = fetchedClasses.data
            console.log('classes in database: ' + data[0].name)
            setClasses(data)
        })
    }, [])



    const handleOnInput = (e) => {
        let txt = e.target.value
        if(txt == "" ){
            setDisplayClasses([])
        }else{
            const filteredClasses = classes.filter(cl => cl.name.toLowerCase().includes(txt.toLowerCase()))
            setDisplayClasses(filteredClasses)
            console.log('found: ' + JSON.stringify(filteredClasses) )
        }
        

    }

    return (
      <div className="mainPage">
        <Header />
  
        <form>
          <div className="search">
            <input onInput={handleOnInput} className='form-control' placeholder='Type in a class (i.e: CS 216 )' />
            {displayClasses.map(element => 
                <div class='search-item' >
                    <h1>{element.name}</h1>
                    <p> {element.department} </p>
                </div>
            )}
          </div>
        </form>
      </div>
    )
  }