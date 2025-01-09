import avaClasses from '../assets/profList.json'
import { Select } from 'antd'
import { useState } from 'react'

export default function Comment({userID, classID}) {
    const [selectedDep, setSelectedDep] = useState("Computer Science")
    const [professors, setProfessors] = useState(() => {
        const object = avaClasses.find(cl => Object.keys(cl)[0] === selectedDep)
        console.log("object is " + JSON.stringify(object) )
        return object[selectedDep]
    })
    const [selectedProf, setSelectedProf] = useState(professors[0])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedDep(value)

        const object = avaClasses.find(cl => Object.keys(cl)[0] === value)
        console.log("object is " + JSON.stringify(object) )
        setProfessors(object[value])
        setSelectedProf(object[value][0])

    };

    console.log("current professors: " + JSON.stringify(professors))

    const options = avaClasses.map(cl => {
        // console.log("option: " + Object.keys(cl))
        return {
            value: Object.keys(cl)[0],
            label: Object.keys(cl)[0]
        }
    })

    console.log(`options are ${JSON.stringify(options )}`)

    return (
        <div>
            <div>
            <Select
                defaultValue={selectedDep}
                style={{ width: 120 }}
                onChange={handleChange}
                options={options}
            />

            <Select
                defaultValue={selectedProf}
                style={{ width: 120 }}
                // onChange={handleChange}
                options={professors.map(professor => {return {value: professor, label: professor}})}
            />  
            

            </div>
        </div>
    )
}