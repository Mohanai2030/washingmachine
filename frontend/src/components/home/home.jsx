import { useEffect, useRef, useState } from 'react'
import './home.css'


export function Home(){
    const services = ['Dry wash','Normal washing','Ironing'];
    let [current,setCurrent] = useState(0);
    let animateRef = useRef({})


    async function wait(time){
        return Promise((resolve,reject)=>{setTimeout(()=>{resolve()},time)})
    }

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
                <div>
                    <button className='homeContactButton'>
                        Sign up for 25% discount
                    </button>
                </div>
            </div>
            <div className='homeImageContainer'>
                <div className='homeImageTagContainer'>
                     <img src="../../../public/images/homepic.png" alt="" height='300px' width='500px'/>
                </div>
                <div className='homePicBackgroundLayer'>
                    
                </div>
            </div>
        </div>  
    )
}