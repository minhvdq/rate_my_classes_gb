import axios from 'axios'
import {backendBase} from '../utils/homeUrl'

const baseUrl = `${backendBase}/api/review`
let token = null
const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    return await axios.get(baseUrl)
}

const getByID = async (id) => {
    return await axios.get(`${baseUrl}/${id}`)
}

const submitReview = async (reqBody) => {
    const config = {
        headers: { Authorization: token },
    }
    return await axios.post(`${baseUrl}`, reqBody, config)
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    return await axios.delete(`${baseUrl}/${id}`, config)
}


export default {getByID, getAll, submitReview, setToken, remove}