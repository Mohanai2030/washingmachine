import { useEffect, useRef, useState } from 'react'
import './home.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Review } from './Review/Review';


export function Home(){
    const services = ['Dry wash','Normal washing','Ironing'];
    let [current,setCurrent] = useState(0);
    let animateRef = useRef({});
    let navigate = useNavigate()    

    useEffect(()=>{
        let holdIntervalId = setInterval(()=>{
            setCurrent(current => (current+1)%3);
            animateRef.current.classList.add('before')
        },5000)

        return ()=>{
            clearInterval(holdIntervalId);
        }
    })

    return(
        <div className='homeContainer'>
            <div className='homeFirstPageContainer'>
                <div className='homeTextContainer'>
                    <div>
                        <h1>
                            <div className='topicFirstLine'>
                                <div>
                                    Get all laundry services - &nbsp;
                                </div>
                                <span className='animateServiceContainer'>
                                    <div className={`animateService before` } ref={animateRef}>
                                        {services[current]}
                                    </div>
                                </span>
                            </div>
                            done at one place.
                        </h1>
                    </div>
                    <div>
                        <h3>
                            Our prices - fair,<br/>
                            Your clothes handled with care
                        </h3>
                    </div>
                    <Link to='./login'>
                        <div>
                            <button className='homeContactButton' >
                                Sign up for 25% discount
                            </button>
                        </div>
                    </Link>
                    
                </div>
                <div className='homeImageContainer'>
                    <div className='homeImageTagContainer'>
                        <img src="../../../public/images/homepic.png" alt="" height='300px' width='500px'/>
                    </div>
                    <div className='homePicBackgroundLayer'>
                        
                    </div>
                </div>
            </div>
            
            <div className='servicesPageContainer'>
                <div className='servicesHeadingContainer'>
                    <h1>
                        Our services
                    </h1>
                </div>
                <div className='servicesBodyContainer'>
                    <div className='serviceContainer'>
                        <img src="../../../public/images/NormalWash.jpg" alt="" height='250px' width='350px'/>
                        <div className='serviceTextContainer'>
                            <h2>Normal Washing</h2>
                            <div>
                                Convenient and affordable everyday laundry service. Washed, dried, and neatly folded. Ideal for your <strong>everyday clothes</strong>. Detergents are environmentally friendly.
                            </div>
                        </div>
                    </div>
                    <div className='serviceContainer'>
                        <img src="../../../public/images/DryWash.jpg" alt="" height='250px' width='350px'/>
                        <div className='serviceTextContainer'>
                            <h2>Dry Washing</h2>
                            <div>
                                Gentle care for your <strong>delicate and specialty items</strong>. Perfect for suits, dresses, and items requiring special attention. Uses eco-friendly solvents to remove stains and refresh fabrics.
                            </div>
                        </div>
                    </div>
                    <div className='serviceContainer'>
                        <img src="../../../public/images/Ironing.jpg" alt="" height='250px' width='350px'/>
                        <div className='serviceTextContainer'>
                            <h2>Ironing</h2>
                            <div>
                                Professional ironing service for a <strong>crisp, polished look.</strong> Shirts, pants, and more expertly pressed and returned on hangers.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='chooseUsPageContainer'>
                <div className='chooseUsHeadingContainer'>
                    <h1>Why Choose Tidy Laundry?</h1>
                </div>
                <div className='chooseUsReasonContainer'>
                    <div className='chooseUsReasonCard'>
                        <div className='chooseUsReasonHeadingContainer'>
                            <h2>Convenience</h2>
                        </div>
                        <div className='chooseUsReasonHeadingText'>
                            Customer support through chat. You will be notified when your order is ready. You can also ask other queries you have through chat and we will respond.
                        </div>
                    </div>
                    <div className='chooseUsReasonCard'>
                        <div className='chooseUsReasonHeadingContainer'>
                            <h2>Eco-Friendly</h2>
                        </div>
                        <div className='chooseUsReasonHeadingText'>
                            Environmentally conscious practices, sustainable detergents, and reduced water consumption. We use 30% less water than traditional laundry methods.
                        </div>
                    </div>
                    <div className='chooseUsReasonCard'>
                        <div className='chooseUsReasonHeadingContainer'>
                            <h2>Affordability</h2>
                        </div>
                        <div className='chooseUsReasonHeadingText'>
                            Competitive pricing with no hidden fees. Transparent pricing structure. Save time and money. Save an average of 4 hours per week by outsourcing your laundry.
                        </div>
                    </div>
                </div>
            </div>

            <Review/>
        </div>  
    )
}