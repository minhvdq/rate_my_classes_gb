import {useState, useEffect} from 'react'
import customStorage from '../../services/customStorage'
import {frontendBase} from '../../utils/homeUrl'
const mainUrl = frontendBase

export default function EventManage() {
    const [user, setUser] = useState(null)
    const [reviews, setReviews] = useState([])

    const fetchData = async(curUser) => {
        try {
            if (!curUser) {
                throw new Error("NO PAGE FOUND");
            }

            const reviewPromises = curUser.reviews.map(async rvId => {
    
                const data = await reviewService.getByID(rvId)
                const foundReview = data.data
                // console.log('review found is ' + JSON.stringify(foundReview))
    
                return foundReview
            })
    
            const fetchedReviews = await Promise.all(reviewPromises)

            setReviews(fetchedReviews)
        }catch(e){
            console.error("Error fetching data:", e)
        }
    }
    useEffect(() => {
        const loggedUser = customStorage.getItem('localUser')
        if(!loggedUser){
            window.location.href = `${mainUrl}/authen`
        }
        const lUser = JSON.parse(loggedUser)

        // console.log('cur user is ' + JSON.stringify(lUser) )
        setUser(lUser)
        fetchData(lUser)
    }, [])

    return(
        <div>
            Welcome {user ? user.name : ""}

            
        </div>
    )
}