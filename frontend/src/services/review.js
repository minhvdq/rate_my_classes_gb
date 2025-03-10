import axios from 'axios'
import {backendBase} from '../utils/homeUrl'

const baseUrl = `${backendBase}/api/review`
const getAll = async () => {
    return await axios.get(baseUrl)
}

const getByID = async (id) => {
    return await axios.get(`${baseUrl}/${id}`)
}

const submitReview = async (reqBody) => {
    return await axios.post(`${baseUrl}`, reqBody)
}


export default {getByID, getAll, submitReview}