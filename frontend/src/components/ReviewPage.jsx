import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReviewHeader from './ReviewHeader'
import classService from '../services/class'
import reviewService from '../services/review'

export default function ReviewPage() {
    const [curClass, setCurClass] = useState(null)
    const [classes, setClasses] = useState( null )
    // const [reviews, setReviews] = useState( [] )
    const {id} = useParams();
    const [totalDifficulty, setTotalDifficulty] = useState(0)
    const [totalWorkload, setTotalWorkload] = useState(0)
    const [attendance, setAttendance] = useState(false)

    useEffect(() => {
        classService.getAll().then(fetchedClasses => {
            const data = fetchedClasses.data
            console.log('classes in database: ' + data[0].name)
            setClasses(data)
            const foundClass = data.find(cl => cl.id === id )
            console.log('The found class is ' + foundClass)
            if(!foundClass ){
                throw new Error("NO PAGE FOUND")
            }
            setCurClass(foundClass)
        })
    }, [])

    return(
        <div>
            <ReviewHeader classes={classes}/>

            <div style={{marginTop: '30vh'}}>
                <div style={{border: '1px solid'}}>
                <h2>{curClass.name ? curClass.name : ""}</h2>
                    {curClass.department ? curClass.department : ""}
                    <p>Intructor</p>
                </div>
                <div  style={{border: '1px solid'}}>
                    <div>
                        Difficulty: {totalDifficulty}
                    </div>
                    <div>
                        Workload: {totalWorkload}
                    </div>
                    <div>
                        Attendance: {attendance}
                    </div>
                </div>
            </div>
        </div>
    )
}

