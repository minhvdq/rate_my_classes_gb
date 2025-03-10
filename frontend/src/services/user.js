import axios from 'axios'
import {backendBase, frontendBase} from '../utils/homeUrl'

const baseUrl = `${backendBase}/api/user`

const signup = async (signInfo) => {
    const response = await axios.post(baseUrl, signInfo)
    console.log(response.data)
    return response.data
}

export default { signup }