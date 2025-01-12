import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Select } from 'antd'
// import { Comment } from '@ant-design/compatible';
import ReviewHeader from './ReviewHeader'
import classService from '../services/class'
import reviewService from '../services/review'
import './Review.css'

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
        const fetchData = async () => {
            try {
                const fetchedClasses = await classService.getAll();
                const data = fetchedClasses.data;
    
                setClasses(data);
    
                const foundClass = data.find(cl => cl.id === id);
                if (!foundClass) {
                    throw new Error("NO PAGE FOUND");
                }
    
                setCurClass(foundClass);
    
                const arr = foundClass.professors.map(prof => ({ value: prof, label: prof }));
                arr.push({ value: "All", label: "All" });
                setProfOptions(arr);
    
                let cnt = 0;
    
                const reviewPromises = foundClass.reviews.map(async rvId => {
                    console.log('cnt: ' + cnt);
                    cnt++;
                    console.log('review ID is ' + rvId);
    
                    const data = await reviewService.getByID(rvId);
                    const foundReview = data.data;
                    console.log('review found is ' + JSON.stringify(foundReview));
    
                    return foundReview;
                });
    
                const fetchedReviews = await Promise.all(reviewPromises);
    
                // Update state after all reviews are fetched
                setReviews(fetchedReviews);
                setPresentReviews(fetchedReviews);
    
                const totalDiff = fetchedReviews.reduce((sum, review) => sum + review.difficulty, totalDifficulty);
                const totalWork = fetchedReviews.reduce((sum, review) => sum + review.workload, totalWorkload);
    
                setTotalDifficulty(totalDiff);
                setTotalWorkload(totalWork);
    
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);
    

    const handleComment = (e) => {
        e.preventDefault()
        if( !curUser ) {
            window.location.href = 'http://localhost:5173/authen'
        }else{
            window.location.href = `http://localhost:5173/comment/${curClass.id}`
        }


        
    }

    const handleChange = (value) => {
        if( value === "All" ) {
            setPresentReviews([...reviews])
            let totalD = 0
            let totalW = 0
            for( let review of reviews ) {
                totalD += review.difficulty
                totalW += review.workload
            }

            setTotalDifficulty(totalD)
            setTotalWorkload(totalW)
        }else{
            const sortedReviews = [...reviews].filter(review => review.professor === value)
            console.log(`sorted to ${sortedReviews.length} reviews`)
            console.log('reviews size is ' + reviews.length)
            setPresentReviews(sortedReviews)

            let totalD = 0
            let totalW = 0
            for( let review of sortedReviews ) {
                totalD += review.difficulty
                totalW += review.workload
            }

            setTotalDifficulty(totalD)
            setTotalWorkload(totalW)
        }
    }

    return(
        <>
            <ReviewHeader classes={classes} curUser={curUser} setCurUser={setCurUser}/>

            <div className="container" style={{marginTop: '30vh'}}>
                <div className='row'>
                    <div className='col'>
                        <h2>{curClass && curClass.name ? curClass.name : ""}</h2>
                        {curClass && curClass.department ? curClass.department : ""}
                        <p>Intructor: <Select
                            defaultValue="All"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={ profOptions }
                        /> </p>
                    </div>
                    <div className='col border d-flex align-items-center'>
                        <div className='row w-100'>
                            <div className='col'>
                                Difficulty: {totalDifficulty / presentReviews.length}
                            </div>
                            <div className='col'>
                                Workload: {totalWorkload / presentReviews.length}
                            </div>
                            <div className='col'>
                                Attendance: {attendance}
                            </div>
                        </div>
                    </div>
                </div>

            <div className='row mt-5 align-items-end justify-content-end'>
                <div className='col-auto '>
                    <input onClick={handleComment} className="btn btn-primary" type="button" value="Leave a comment" />
                </div>
            </div>

            <div className='row mt-5'>
                <div >
                    {presentReviews.map( review => {
                      console.log(reviews.length + " reviews left")
                      return(
                        <div class="row border mt-2">
                            <div className='row'>
                                <div className='col'>
                                    <h5 class="mr-2">{review.professor}</h5>
                                </div>
                                <div className='col'>
                                    Grade: {review.grade}
                                </div>
                                <div className='col'>
                                    {review.term} / {review.year}
                                </div>

                            </div>
                            <div className='row'>

                                <div class="comment-text-sm"><span>{review.comment}</span></div>
                            </div>

                            <div className='row'>
                                
                                <div className='col'>
                                    Workload: {review.workload}
                                </div>
                                <div className='col'>
                                    Difficulty: {review.difficulty}
                                </div>
                                <div className='col'>
                                    Attendance: {review.attendance ? "Yes" : "No"}
                                </div>
                                
                            </div>

                        </div>

                      )}
                    )}
                </div>
            </div>
        </div>
     </>
    )
}

