import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/class'
const getAll = async () => {
    return await axios.get(baseUrl)
}

const getByID = async (id) => {
    return await axios.get(`${baseUrl}/${id}`)
}

// const getForUser = async (userId) => {
//     const url = `${baseUrl}/user/${userId}`
//     return await axios.get(url)
// }

// const addEvent = async (eventData,userId)=>{
//     const url = `${baseUrl}/addEvents/${userId}`
//     return await axios.post(url,eventData)
// }

// const editEvent = async (eventData,userId)=>{
//     const url = `${baseUrl}/editEvents/${userId}`
//     await axios.post(url,eventData)
// }

// const deleteEvent = async (eventId) => {
//     const url = `${baseUrl}/${eventId}`
//     await axios.delete(url)
// }
// const editMultipleEvent = async(eventData,eventId)=>
// {
//     const url = `${baseUrl}/editMultipleEvents/${eventId}`
//     await axios.put(url, eventData)
// }
// const deleteMultipleEvents = async (eventID)=>{
//     const url = `${baseUrl}/deleteMultipleEvents/${eventID}`
//     await axios.delete(url)
// }



export default {getAll, getByID}