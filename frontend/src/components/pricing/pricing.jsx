import { useEffect, useState } from 'react'
import { PriceLoader } from '../priceLoader/priceloader'
import axios from 'axios'
import './pricing.css'

export function Pricing(){
    let [loading,setLoading] = useState('needtofetch')
    let [priceData,setPriceData] = useState(true)

    useEffect(()=>{
        setLoading('loading')
        axios.get('/api/pricing')
        .then(res => {setPriceData(res.data);setLoading('ready')})
        .catch(err => {console.log(err);alert("There seems to be an error in getting the prices for our services")})
    },[])

    

    return(
        <div className='pricingContainer'>
            <div>
                <h2>
                    Our pricing
                </h2>
                {/* <PriceLoader width={25} height={25}/> */}
            </div>
            <div className='pricingCardContainer'>
                <div className='pricingCard'>
                    <h3>Normal Wash</h3>
                    <img src="../../../public/images/NormalWash.jpg" alt="" height='200px' width='300px'/>
                    <table>
                        <colgroup>
                            <col style={{width:"70%"}}/>
                            <col style={{width:"30%"}}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th className='leftAlignHeading'>Clothing type</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading!='ready'
                            ?[1,2,3,4,5].map(i => {
                                return(
                                <tr>
                                    <td><PriceLoader width={75} height={25}/></td>
                                    <td><PriceLoader width={25} height={25}/></td>
                                </tr>)
                            })
                            :priceData['normalwash'].map(item => {
                                return(
                                <tr>
                                    <td style={{textTransform:'capitalize'}}>{item.item_name}</td>
                                    <td>{item.price}</td>
                                </tr>)
                            })}  
                        </tbody>
                    </table>
                </div>
                <div className='pricingCard'>
                    <h3>Dry Wash</h3>
                    <img src="../../../public/images/Drywash.jpg" alt="" height='200px' width='300px'/>
                    <table>
                        <colgroup>
                            <col style={{width:"70%"}}/>
                            <col style={{width:"30%"}}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th className='leftAlignHeading'>Clothing type</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading!='ready'
                            ?[1,2,3,4,5].map(i => {
                                return(
                                <tr>
                                    <td><PriceLoader width={75} height={25}/></td>
                                    <td><PriceLoader width={25} height={25}/></td>
                                </tr>)
                            })
                            :priceData['drywash'].map(item => {
                                return(
                                <tr>
                                    <td style={{textTransform:'capitalize'}}>{item.item_name}</td>
                                    <td>{item.price}</td>
                                </tr>)
                            })}  
                        </tbody>
                    </table>
                </div>
                <div className='pricingCard'>
                    <h3>Ironing</h3>
                    <img src="../../../public/images/Ironing.jpg" alt="" height='200px' width='300px'/>
                    <table>
                        <colgroup>
                            <col style={{width:"70%"}}/>
                            <col style={{width:"30%"}}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th className='leftAlignHeading'>Clothing type</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                          <tbody>
                            {loading!='ready'
                            ?[1,2,3,4,5].map(i => {
                                return(
                                <tr>
                                    <td><PriceLoader width={75} height={25}/></td>
                                    <td><PriceLoader width={25} height={25}/></td>
                                </tr>)
                            })
                            :priceData['ironing'].map(item => {
                                return(
                                <tr>
                                    <td style={{textTransform:'capitalize'}}>{item.item_name}</td>
                                    <td>{item.price}</td>
                                </tr>)
                            })}  
                        </tbody>
                    </table>
                </div>
            </div>
        </div>  
    )
}