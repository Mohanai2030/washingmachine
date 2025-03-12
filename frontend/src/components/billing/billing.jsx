import './billing.css'

export function Billing(){
    const clothes = ['shirt','pant','shorts','tshirt','bedsheet','innerwear','socks'];
    const services = ['DryWash','NormalWash','Ironing'];

    return(
        <div className='billingContainer'>
            <div className='billingHeadingContainer'>
                <h1>
                    Billing
                </h1>
            </div>
            <div className='billingBody'>
                <div className='billingPricer'>
                    {services.map(service => {
                        return(
                        <div className='billingServiceContainer'>

                            <div className='billingServiceHeading'>
                                <h2>
                                    {service}
                                </h2>
                            </div>
                            <div className='clothList'>
                            {clothes.map(cloth => {
                                    return(
                                        <div className='clothPriceContainer'>  
                                            <div className='clothImageContainer'>
                                                <div className='clothImageBackground'>

                                                </div>
                                                <div className='clothImage'>
                                                    <img src={`../../../public/images/${cloth}.png`} alt="" height='100px' width='120px'/>
                                                </div>
                                            </div>
                                            
                                                 <div>
                                                    <input type="number" min={1} />
                                                </div>
                                                <div className='itemTotal'>
                                                    <input type="text" readOnly/>
                                                </div>
                                            
                                        </div>
                                    )
                                })}
                                </div>
                        </div>
                        )
                    })}
            
                <div className='billingSummariser'>

                </div>
            </div>
        </div>
        </div>
    )
}