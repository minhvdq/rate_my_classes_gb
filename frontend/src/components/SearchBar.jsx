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
            let filteredClasses = classes.filter(cl => cl.name.replace(/\s/g,'').toLowerCase().includes(txt.replace(/\s/g,'').toLowerCase()))
            filteredClasses = filteredClasses.slice(0, Math.min( 5, filteredClasses.length )) 
            console.log(`class is ${classes[0].name.replace(/\s/g,'').toLowerCase()}`)
            setDisplayClasses(filteredClasses)
            console.log('found: ' + JSON.stringify(filteredClasses) )
        }
        

    }

    return(
        <div className="search" style={{top: top,
                                        marginLeft: marginLeft, 
                                        width: width}}>
            <input onInput={handleOnInput} className='form-control' placeholder='Type in a class (i.e: CS 216 )' />
            <div className="border rounded shadow-sm " style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {displayClasses.map(element => (
                    <div
                        key={element.id}
                        onClick={() => window.location.href = `${reviewURL}/${element.id}`}
                        className="search-item border-bottom py-2 px-2 rounded hover-bg-light"
                        style={{ cursor: 'pointer' }}
                    >
                        <h5>{element.name}</h5>
                        <p className="text-muted mb-0">{element.department}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}