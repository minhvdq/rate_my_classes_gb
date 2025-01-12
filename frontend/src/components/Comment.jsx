import avaClasses from '../assets/profList.json'
import { Select } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classService from '../services/class'
import reviewService from '../services/review'

const homePageUrl = 'http://localhost:5173'

export default function Comment({curUser}) {
    const {classID} = useParams()
    const [curclass, setCurClass] = useState(null)
    const [selectedDep, setSelectedDep] = useState("Computer Science")
    const [professors, setProfessors] = useState([])
    const [comment, setComment] = useState("")
    const [workload, setWorkload] = useState(3)
    const [difficulty, setDifficulty] = useState(3)
    const [attendance, setAttendance] = useState(false)
    const [term, setTerm] = useState("Fall")
    const [year, setYear] = useState(2025)
    const [grade, setGrade] = useState("")
    const [selectedProf, setSelectedProf] = useState("")
    const scores = [1, 2, 3, 4, 5]
    const grades = ["N/A", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"]

    useEffect(() => {
        classService.getByID(classID).then(data =>{
            const foundClass = data.data
            setCurClass(foundClass)
            setProfessors(foundClass.professors)
        } ).catch(e =>  {
            // throw new Error("NO SUCH CLASS FOUND")
            window.location.href = homePageUrl
        })
    }, [])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedProf(value)
    };

    const handleChangeDiff = (value) => {
        console.log(`Select difficulty ${value}`)
        setDifficulty(value)
    }

    const handleChangeWorkload = (value) => {
        console.log(`Select workload ${value}`)
        setWorkload(value)
    }

    const handleChangeComment = (e) => {
        const text = e.target.value
        console.log("comment: " + text)
        setComment(text)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!curUser) window.location.href = `${homePageUrl}/authen`

        const requestBody = {
            class: classID,
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
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{curclass ? curclass.name : ""}</h1>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label htmlFor="select-professor" className="form-label">Professor:</label>
                    <Select id="select-professor"
                        defaultValue="No Selection"
                        className="form-select"
                        onChange={handleChange}
                        options={professors.map(professor => { return { value: professor, label: professor } })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Comment:</label>
                    <textarea onChange={handleChangeComment} className="form-control" id="comment" rows="4" placeholder="Enter your comment here..."></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="attendance" className="form-label">Is attendance required ?</label>
                    <Select id="attendance"
                        defaultValue={false}
                        className="form-select"
                        onChange={(value) => {console.log('attendance: ' + value); setAttendance(value)}}
                        options={[{ value: true, label: "Yes" }, { value: false, label: "No" }]}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="difficulty" className="form-label">Difficulty:</label>
                    <Select id="difficulty"
                        defaultValue={3}
                        className="form-select"
                        onChange={handleChangeDiff}
                        options={scores.map(score => { return { value: score, label: score } })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="workload" className="form-label">Workload:</label>
                    <Select id="workload"
                        defaultValue={3}
                        className="form-select"
                        onChange={handleChangeWorkload}
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
                    <label htmlFor="term" className="form-label">Term:</label>
                    <Select id="term"
                        defaultValue="Fall"
                        className="form-select"
                        onChange={(value) => setTerm(value)}
                        options={[{ value: "Fall", label: "Fall" }, { value: "Spring", label: "Spring" }]}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year:</label>
                    <input onChange={(e) => { e.preventDefault(); setYear(e.target.value) }} id="year" 
                        className="form-control" type="text" placeholder="YYYY" minLength="4" maxLength="4" />
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>

    )
}