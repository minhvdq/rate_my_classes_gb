import axios from 'axios'
import {backendBase, frontendBase} from '../utils/homeUrl'

const baseUrl = `${backendBase}/api/login`
const login = async (logInfo) => {
    const response = await axios.post(baseUrl, logInfo)
    console.log(response.data)
    return response.data
}

export default {login}