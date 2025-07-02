import { PriceLoader } from '../priceLoader/priceloader'
import './pricing.css'

export function Pricing(){
    
    return(
        <div className='pricingContianer'>
            <div>
                <h2>
                    Our pricing
                </h2>
                <PriceLoader/>
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
                            <tr>
                                <td>Shirt</td>
                                <td>15</td>
                            </tr>
                            <tr>
                                <td>Pant</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>Shirts</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>T-shirts</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>Bedsheet</td>
                                <td>30</td>
                            </tr>
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
                            <tr>
                                <td>Shirt</td>
                                <td>15</td>
                            </tr>
                            <tr>
                                <td>Pant</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>Shirts</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>T-shirts</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>Bedsheet</td>
                                <td>30</td>
                            </tr>
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
                            <tr>
                                <td>Shirt</td>
                                <td>15</td>
                            </tr>
                            <tr>
                                <td>Pant</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>Shirts</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>T-shirts</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>Bedsheet</td>
                                <td>30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>  
    )
}