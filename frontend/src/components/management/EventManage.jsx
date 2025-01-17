import {useState, useEffect} from 'react'
const mainUrl = 'http://localhost:5173'

export default function EventManage({curUser}) {
    const [reviews, setReviews] = useState([])

    const fetchData = async() => {
        try {
            if (!curUser) {
                throw new Error("NO PAGE FOUND");
            }
    
            const reviewPromises = curUser.reviews.map(async rvId => {
    
                const data = await reviewService.getByID(rvId)
                const foundReview = data.data
                console.log('review found is ' + JSON.stringify(foundReview))
    
                return foundReview
            })
    
            const fetchedReviews = await Promise.all(reviewPromises);

            setReviews(fetchedReviews)
        }catch(e){
            console.error("Error fetching data:", error)
        }
    }
    useEffect(() => {
        if( !curUser ) {
            window.location.href = `${mainUrl}/authen`
        }
        
        fetchData()
    }, [])

    return(
        <div>
            Welcome {curUser.name}

            
        </div>
    )
}