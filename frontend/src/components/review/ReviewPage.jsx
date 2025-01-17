import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Select } from 'antd'
// import { Comment } from '@ant-design/compatible';
import ReviewHeader from './ReviewHeader'
import CommentPage from './Comment'
import classService from '../../services/class'
import reviewService from '../../services/review'
import './Review.css'

export default function ReviewPage({curUser, setCurUser, classes}) {
    const [curClass, setCurClass] = useState(null)
    const [reviews, setReviews] = useState( [] )
    const [presentReviews, setPresentReviews] = useState([])
    const [profOptions, setProfOptions] = useState([])
    const [totalDifficulty, setTotalDifficulty] = useState(0)
    const [totalWorkload, setTotalWorkload] = useState(0)
    const [attendance, setAttendance] = useState(false)
    const [inComment, setInComment] = useState(false);
    const [selectedValue, setSelectedValue] = useState("All")
    const {id} = useParams();
    
    /**
     * fetch all data for the current page
     */
    const fetchData = async () => {
        try {
            const data = await classService.getByID(id)
            // consolawait new Promise(r => setTimeout(r, 2000))e.log('class found: ' + JSON.stringify(foundClass) )
            const foundClass = data.data
            if (!foundClass) {
                throw new Error("NO PAGE FOUND");
            }
    
            setCurClass(foundClass);
    
            const arr = foundClass.professors.map(prof => ({ value: prof, label: prof }));
            arr.push({ value: "All", label: "All" });
            setProfOptions(arr)
    
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
            setReviews(fetchedReviews)
            setPresentReviews(fetchedReviews)
    
            const totalDiff = fetchedReviews.reduce((sum, review) => sum + review.difficulty, totalDifficulty);
            const totalWork = fetchedReviews.reduce((sum, review) => sum + review.workload, totalWorkload);

            let totalAttendance = 0
            for( let review of fetchedReviews ){
                if( review.attendance) totalAttendance ++
            }
            setAttendance(totalAttendance > (fetchedReviews.length/2 ) )
    
            setTotalDifficulty(totalDiff)
            setTotalWorkload(totalWork)
    
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    const togglePage = () => {
        setInComment(!inComment)
    }

    /**
     * Handle leave comment button onClick
     * @param {*} e The event value
     */
    const handleComment = (e) => {
        e.preventDefault()
        if( !curUser ) {
            window.location.href = 'http://localhost:5173/authen'
        }else{
            // window.location.href = `http://localhost:5173/comment/${curClass.id}`
            togglePage()
        }


        
    }

    /**
     * Handle tha onChange event of the Professor select
     * @param {*} value The value of selected Professor
     */
    const handleChange = (value) => {
        setSelectedValue(value)
        console.log(value + ' chosen')
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
        }
        else{
            const sortedReviews = [...reviews].filter(review => review.professor === value)
            // console.log(`sorted to ${sortedReviews.length} reviews`)
            // console.log('reviews size is ' + reviews.length)
            // console.log(JSON.stringify(sortedReviews) + 'is sorted')
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
        // console.log('prof options: ' + JSON.stringify(profOptions) )
    }
    const MainReviewPage = () => {
        return(
            <>
                <ReviewHeader classes={classes} curUser={curUser} setCurUser={setCurUser}/>

                <div className="container" style={{marginTop: '30vh'}}>
                    <div className='row'>
                        <div className='col'>
                            <h2>{curClass && curClass.name ? curClass.name : ""}</h2>
                            {curClass && curClass.department ? curClass.department : ""}
                            <div>Intructor: <Select
                                value={selectedValue}
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={ profOptions }
                            /> </div>
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
                                    Attendance: {attendance ? "Yes" : "No"}
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
                            <div key={review.id} className="row border mt-4 p-3">
                                <div className="row border-bottom pb-2 mb-3">
                                    <div className="col-2">
                                        <p className="mb-0 text-muted font-weight-bold">Professor: {review.professor}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="mb-0 text-muted font-weight-bold">Grade: {review.grade}</p>
                                    </div>
                                    <div className="col-4 text-right">
                                        <p className="mb-0 text-muted font-weight-bold">Term/Year: {review.term} / {review.year}</p>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <p className="text-secondary font-italic">{review.comment}</p>
                                    </div>
                                </div>

                                <div className="row text-center">
                                    <div className="col">
                                        <p className="mb-0 text-muted font-weight-bold">Workload: {review.workload}</p>
                                    </div>
                                    <div className="col">
                                        <p className="mb-0 text-muted font-weight-bold">Difficulty: {review.difficulty}</p>
                                    </div>
                                    <div className="col">
                                        <p className="mb-0 text-muted font-weight-bold">Attendance: {review.attendance ? "Yes" : "No"}</p>                                </div>
                                </div>
                            </div>

                        )}
                        )}
                    </div>
                </div>

                <div className='row mt-5'>
                    <footer style={{fontSize: '12px', height:  '5vh', textAlign: 'center', marginTop: '3vh'}}>
                        <p>Copyright &#169; 2025 <span style={{color:'blue'}}>Rate_My_Classes_GB</span>. All Rights Reserved.</p>
                    </footer>
                </div>

                </div>
            </>
        )
    }

    return(
        <>
            {inComment ? <CommentPage curUser={curUser} curClass={curClass} togglePage={togglePage} /> : <MainReviewPage />}
        </>
    )
}

