import axios from 'axios'
import {backendBase} from '../utils/homeUrl'

const baseUrl = `${backendBase}/api/professor`

const getAll = async () => {
    return await axios.get(baseUrl)
}

const getByID = async (id) => {
    return await axios.get(`${baseUrl}/${id}`)
}

const getByDepartment = async (department) => {
    return await axios.get(`${baseUrl}/byDepartment/${department}`)
}
export default {getAll, getByID, getByDepartment}