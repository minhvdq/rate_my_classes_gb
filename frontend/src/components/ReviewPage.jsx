import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Select } from 'antd'
import ReviewHeader from './ReviewHeader'
import classService from '../services/class'
import reviewService from '../services/review'

export default function ReviewPage({curUser, setCurUser}) {
    const [curClass, setCurClass] = useState(null)
    const [classes, setClasses] = useState( null )
    const [reviews, setReviews] = useState( [] )
    const [presentReviews, setPresentReviews] = useState([])
    const [profOptions, setProfOptions] = useState([])
    const {id} = useParams();
    const [totalDifficulty, setTotalDifficulty] = useState(0)
    const [totalWorkload, setTotalWorkload] = useState(0)
    const [attendance, setAttendance] = useState(false)

    useEffect(() => {
        classService.getAll().then(fetchedClasses => {
            const data = fetchedClasses.data
            // console.log('classes in database: ' + data[0].name)
            setClasses(data)
            const foundClass = data.find(cl => cl.id === id )
            console.log('The found class is ' + JSON.stringify(foundClass) )
            const arr = foundClass.professors.map(prof => {return{value: prof, label: prof}})
            arr.push({value:"All", label:"All"})
            setProfOptions( arr )
            if(!foundClass ){
                throw new Error("NO PAGE FOUND")
            }
            setCurClass(foundClass)

            let allReviews = []
            let allPresentReviews = []

            foundClass.reviews.map( rvId => {
                console.log('review ID is ' + rvId)
                reviewService.getByID(rvId).then( data => {
                    const foundReview = data.data
                    console.log('review found is ' + JSON.stringify(foundReview))

                    allReviews.push(foundReview)

                    setReviews([...allReviews, foundReview])
                    setPresentReviews([...allPresentReviews, foundReview])
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

    const handleChange = (value) => {
        if( value === "All" ) {
            setPresentReviews([...reviews])
        }else{
            const sortedReviews = [...reviews].filter(review => review.professor === value)
            console.log(`sorted to ${sortedReviews.length} reviews`)
            console.log('reviews size is ' + reviews.length)
            setPresentReviews(sortedReviews)
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
                    <Select
                        defaultValue="All"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={ profOptions }
                    />
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
                    {presentReviews.map( review => {
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

