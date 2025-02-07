import avaClasses from '../../assets/profList.json'
import { Select } from 'antd'
import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import classService from '../../services/class'
import reviewService from '../../services/review'

const homePageUrl = 'http://localhost:5173'

export default function Comment({curUser, curClass, togglePage}) {
    const [professors, setProfessors] = useState([])
    const [comment, setComment] = useState("")
    const [workload, setWorkload] = useState(3)
    const [difficulty, setDifficulty] = useState(3)
    const [attendance, setAttendance] = useState(false)
    const [term, setTerm] = useState("Fall")
    const [year, setYear] = useState(2025)
    const [grade, setGrade] = useState("")
    const [selectedProf, setSelectedProf] = useState("")
    const [error, setError] = useState(null)
    const scores = [1, 2, 3, 4, 5]
    const grades = ["N/A", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"]


    const handleSubmit = (e) => {
        e.preventDefault()
        if(!curUser) window.location.href = `${homePageUrl}/authen`

        const requestBody = {
            class: curClass.id,
            user: curUser.id,
            professor: selectedProf,
            comment: comment,
            workload: workload,
            difficulty: difficulty,
            attendance: attendance,
            grade: grade,
            term: term,
            year: year
        }


        reviewService.submitReview(requestBody)
        .then( data => window.location.href = `${homePageUrl}/review/${curClass.id}`)
        .catch(e => {
            setError('* Some fields are missing')
            setTimeout(() => {
                setError(null)
            }, 5000)
        } )
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{curClass ? curClass.name : ""}</h1>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label htmlFor="select-professor" className="form-label">Professor:<span style={{color:'red'}}>*</span></label>
                    <Select id="select-professor"
                        defaultValue="No Selection"
                        className="form-select"
                        onChange={(value) => setSelectedProf(value)}
                        options={curClass.professors.map(professor => { return { value: professor, label: professor } })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Comment:</label>
                    <textarea onChange={(e) => setComment(e.target.value)} className="form-control" id="comment" rows="4" placeholder="Enter your comment here..."></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="attendance" className="form-label">Is attendance required ?<span style={{color:'red'}}>*</span></label>
                    <Select id="attendance"
                        defaultValue={false}
                        className="form-select"
                        onChange={(value) =>  setAttendance(value)}
                        options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="difficulty" className="form-label">Difficulty:<span style={{color:'red'}}>*</span></label>
                    <Select id="difficulty"
                        defaultValue={3}
                        className="form-select"
                        onChange={(value) => setDifficulty(value)}
                        options={scores.map(score => { return { value: score, label: score } })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="workload" className="form-label">Workload:<span style={{color:'red'}}>*</span></label>
                    <Select id="workload"
                        defaultValue={3}
                        className="form-select"
                        onChange={(value) => setWorkload(value)}
                        options={scores.map(score => { return { value: score, label: score } })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="grade" className="form-label">Your Grade:</label>
                    <Select id="grade"
                        defaultValue="N/A"
                        className="form-select"
                        onChange={(value) => setGrade(value)}
                        options={grades.map(grade => {  return { value: grade, label: grade } })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="term" className="form-label">Term:<span style={{color:'red'}}>*</span></label>
                    <Select id="term"
                        defaultValue="Fall"
                        className="form-select"
                        onChange={(value) => setTerm(value)}
                        options={[{ value: "Fall", label: "Fall" }, { value: "Spring", label: "Spring" }]}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year:<span style={{color:'red'}}>*</span></label>
                    <input onChange={(e) => { e.preventDefault(); setYear(e.target.value) }} id="year" 
                        className="form-control" type="text" placeholder="YYYY" minLength="4" maxLength="4" />
                </div>
                <p style={{color: 'red'}}> {error}</p>
                <div className='row'>
                    <div className='col'>
                        <button  onClick={togglePage} className="btn btn-secondary w-100">Cancel</button>
                    </div>
                    <div className='col'>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </div>
                </div>
            </form>

            <div className='row mt-5'>
                <footer style={{fontSize: '12px', height:  '5vh', textAlign: 'center', marginTop: '3vh'}}>
                    <p>Copyright &#169; 2025 <span style={{color:'blue'}}>Rate_My_Classes_GB</span>. All Rights Reserved.</p>
                </footer>
            </div>
        </div>

    )
}