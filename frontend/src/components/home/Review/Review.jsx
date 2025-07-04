import { useRef } from 'react'
import './Review.css'
import  Star from './Star/Star'

export function Review(){
    const firstColRef = useRef(null)
    const secondColRef = useRef(null)
    const thirdColRef = useRef(null)

    let reviews = [
        {
          "customerName": "Sarah Johnson",
          "starRating": 5,
          "reviewText": "Absolutely thrilled with the laundry service! My clothes came back perfectly folded and smelling amazing. They even managed to remove a stubborn stain I thought was permanent. Will definitely be using them regularly."
        },
        {
          "customerName": "Michael Chen",
          "starRating": 4,
          "reviewText": "Very reliable laundry service. They're always on time with pickup and delivery, and my clothes come back clean and nicely pressed. The only reason I'm not giving 5 stars is that I wish they had weekend service."
        },
        {
          "customerName": "Emma Rodriguez",
          "starRating": 5,
          "reviewText": "This laundry service has been a lifesaver for my busy schedule! The quality is consistently excellent, and I love that they use eco-friendly detergents. My whites have never looked so bright!"
        },
        {
          "customerName": "David Wilson",
          "starRating": 4.5,
          "reviewText": "Great service with attention to detail. They handled my delicate items with care and followed all my specific instructions. The online booking system is also very convenient."
        },
        {
          "customerName": "Jennifer Patel",
          "starRating": 5,
          "reviewText": "I've tried several laundry services in the area, and this one is by far the best. Their staff is professional, the turnaround time is quick, and the results are always perfect. Worth every penny!"
        },
        {
          "customerName": "Thomas Garcia",
          "starRating": 4,
          "reviewText": "Consistent quality and good value for money. I appreciate how they separated my dark and light clothes without me having to ask. The fresh scent they use is pleasant without being overwhelming."
        },
        {
          "customerName": "Olivia Kim",
          "starRating": 5,
          "reviewText": "Exceptional service! They rescued my favorite dress that had what I thought was a permanent wine stain. Their attention to detail is impressive, and the staff is always friendly."
        },
        {
          "customerName": "Robert Taylor",
          "starRating": 4.5,
          "reviewText": "I've been using this laundry service for six months now and have been consistently impressed. My work shirts have never looked so crisp, and they're very accommodating with special requests."
        },
        {
          "customerName": "Amelia Washington",
          "starRating": 5,
          "reviewText": "The convenience and quality of this laundry service can't be beat! They text when they're on the way for pickup and delivery, which I really appreciate. My clothes look and smell fantastic every time."
        },
        {
          "customerName": "James Nguyen",
          "starRating": 4,
          "reviewText": "Reliable and professional service. I trust them with all my laundry needs, including my expensive suits. They're a bit pricier than others, but the quality justifies it."
        },
        {
          "customerName": "Sophia Martinez",
          "starRating": 5,
          "reviewText": "As a busy parent, this laundry service has been a game-changer for our household. They handle everything from our kids' sports uniforms to my husband's work clothes perfectly. Outstanding service!"
        },
        {
          "customerName": "Daniel Thompson",
          "starRating": 4.5,
          "reviewText": "Highly recommend this laundry service! They're always punctual, the staff is courteous, and they do an excellent job with stain removal. My clothes have never looked better."
        }
    ]

    return(
        <div className='reviewMainContainer'>
            <div className='reviewHeader'>
                <h1>Customer Review</h1>
            </div>
            <div className='reviewBody'>
                <div className='reviewBodyFirstCol' ref={firstColRef}>
                    {reviews.slice(0,4).map(review => {
                        return(
                        <div className='reviewContainer'>
                            <Star rating={5}/>
                            <div className='reviewCustomerName'>
                                {review.customerName}
                            </div>
                            <div className='reviewText'>
                                {review.reviewText} 
                            </div>  
                        </div>)
                    })}
                    {reviews.slice(0,4).map(review => {
                        return(
                        <div className='reviewContainer'>
                            <Star rating={5}/>
                            <div className='reviewCustomerName'>
                                {review.customerName}
                            </div>
                            <div className='reviewText'>
                                {review.reviewText} 
                            </div>  
                        </div>)
                    })}
                </div>
                <div className='reviewBodySecondCol' ref={secondColRef}>
                    {reviews.slice(4,8).map(review => {
                            return(
                            <div className='reviewContainer'>
                              <Star rating={5}/>
                                <div className='reviewCustomerName'>
                                    {review.customerName}
                                </div>
                                <div className='reviewText'>
                                    {review.reviewText} 
                                </div>  
                            </div>)
                        })}
                    {reviews.slice(4,8).map(review => {
                            return(
                            <div className='reviewContainer'>
                              <Star rating={5}/>
                                <div className='reviewCustomerName'>
                                    {review.customerName}
                                </div>
                                <div className='reviewText'>
                                    {review.reviewText} 
                                </div>  
                            </div>)
                        })}
                </div>
                <div className='reviewBodyThirdCol' ref={thirdColRef}>
                    {reviews.slice(8,12).map(review => {
                            return(
                            <div className='reviewContainer'>
                                <Star rating={5}/>
                                <div className='reviewCustomerName'>
                                    {review.customerName}
                                </div>
                                <div className='reviewText'>
                                    {review.reviewText} 
                                </div>  
                            </div>)
                        })}
                    {reviews.slice(8,12).map(review => {
                            return(
                            <div className='reviewContainer'>
                                <Star rating={5}/>
                                <div className='reviewCustomerName'>
                                    {review.customerName}
                                </div>
                                <div className='reviewText'>
                                    {review.reviewText} 
                                </div>  
                            </div>)
                        })}
                </div>
            </div> 
        </div>
    )
}