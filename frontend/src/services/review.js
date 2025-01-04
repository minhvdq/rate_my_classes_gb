import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/review'
const getAll = async () => {
    return await axios.get(baseUrl)
}

const getByID = async (id) => {
    return await axios.get(`${baseUrl}/${id}`)
}


export default {getByID, getAll}