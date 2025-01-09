import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReviewHeader from './ReviewHeader'
import classService from '../services/class'
import reviewService from '../services/review'

export default function ReviewPage({curUser, setCurUser}) {
    const [curClass, setCurClass] = useState(null)
    const [classes, setClasses] = useState( null )
    const [reviews, setReviews] = useState( [] )
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

            foundClass.reviews.map( rvId => {
                console.log('review ID is ' + rvId)
                reviewService.getByID(rvId).then( data => {
                    const foundReview = data.data
                    console.log('review found is ' + JSON.stringify(foundReview))
                    setReviews([...reviews, foundReview])
                    setTotalDifficulty( totalDifficulty + foundReview.difficulty)
                    setTotalWorkload( totalWorkload + foundReview.workload)
                })
            })
        })
    }, [])

    const handleComment = (e) => {
        e.preventDefault()
        if( !curUser ) {
            window.location.href = 'http://localhost:5173/authen'
        }

        
    }

    return(
        <div>
            <ReviewHeader classes={classes} curUser={curUser} setCurUser={setCurUser}/>

            <div style={{marginTop: '30vh'}}>
                <div style={{border: '1px solid'}}>
                <h2>{curClass && curClass.name ? curClass.name : ""}</h2>
                    {curClass && curClass.department ? curClass.department : ""}
                    <p>Intructor</p>
                </div>
                <div  style={{border: '1px solid'}}>
                    <div>
                        Difficulty: {totalDifficulty / reviews.length}
                    </div>
                    <div>
                        Workload: {totalWorkload / reviews.length}
                    </div>
                    <div>
                        Attendance: {attendance}
                    </div>
                </div>

                <input onClick={handleComment} class="btn btn-primary" type="button" value="Leave a comment" />
                <div>
                    {reviews.map( review => {
                      console.log(reviews.length + " reviews left")
                      return(
                      <div>
                        Professor: {review.professor}
                        Comment:
                        <p>{review.comment}</p>
                      </div>
                      )}
                    )}
                </div>
            </div>
        </div>
    )
}

