import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/user'

const signup = async (signInfo) => {
    const response = await axios.post(baseUrl, signInfo)
    console.log(response.data)
    return response.data
}

export default { signup }