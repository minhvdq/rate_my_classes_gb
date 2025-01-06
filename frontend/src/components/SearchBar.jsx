import {useState} from 'react'
import './Home.css'

const reviewURL = 'http://localhost:5173/review'

export default function SearchBar({ classes, top, marginLeft, width }) {
    const [displayClasses, setDisplayClasses] = useState([])

    const handleOnInput = (e) => {
        let txt = e.target.value
        if(txt == "" ){
            setDisplayClasses([])
        }else{
            const filteredClasses = classes.filter(cl => cl.name.replace(/\s/g,'').toLowerCase().includes(txt.replace(/\s/g,'').toLowerCase()))

            console.log(`class is ${classes[0].name.replace(/\s/g,'').toLowerCase()}`)
            setDisplayClasses(filteredClasses)
            console.log('found: ' + JSON.stringify(filteredClasses) )
        }
        

    }

    return(
        <div className="search" style={{top: top, marginLeft: marginLeft, width: width}}>
            <input onInput={handleOnInput} className='form-control' placeholder='Type in a class (i.e: CS 216 )' />
            {displayClasses.map(element => 
                <div onClick={() => window.location.href = `${reviewURL}/${element.id}`} className='search-item' >
                    <h1>{element.name}</h1>
                    <p> {element.department} </p>
                </div>
            )}
        </div>
    )
}