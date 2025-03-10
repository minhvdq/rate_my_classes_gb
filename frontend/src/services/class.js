import axios from 'axios'
import {backendBase} from '../utils/homeUrl'

const baseUrl = `${backendBase}/api/class`

const getAll = async () => {
    return await axios.get(baseUrl)
}

const getByID = async (id) => {
    return await axios.get(`${baseUrl}/${id}`)
}

export default {getAll, getByID}