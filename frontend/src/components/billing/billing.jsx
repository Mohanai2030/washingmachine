import { useEffect, useState } from 'react';
import './billing.css'
import useAxiosPrivate from '../../wrappers/useAxiosPrivate'

export function Billing(){
    const axios = useAxiosPrivate(); 
    const [price,setprice] = useState({});
    const [customerId,setCustomerId] = useState('');
    const [billingSuccess,setBillingSuccess] = useState('neutral');
    

    function handleQuantityChange(service,clothtype,newQuantity){
        console.log(service,clothtype,newQuantity);
        let newPriceObject = structuredClone(price);
        let clothObject = newPriceObject[service].find(clothObject => clothObject.item_name == clothtype)
        clothObject['quantity'] = newQuantity;
        console.log(newPriceObject)
        setprice(newPriceObject);
    }

    function totalClothes(){
        return Object.keys(price).reduce((serviceAccumulator,currentService,index) => {
            return serviceAccumulator + price[currentService].reduce((clothAccumulator,currentCloth,index)=>clothAccumulator+Number(currentCloth['quantity']),0)
        },0)
    }

    function totalPrice(){
        return Object.keys(price).reduce((serviceAccumulator,currentService,index) => {
            return serviceAccumulator + price[currentService].reduce((clothAccumulator,currentCloth,index)=>clothAccumulator+(currentCloth['quantity']*currentCloth['price']),0)
        },0)
    }

    function resetPrice(){
        let newPrice = structuredClone(price)
        Object.keys(newPrice).forEach(service => {
            newPrice[service] = newPrice[service].map(cloth => {
                return(
                    {
                        ...cloth,
                        quantity:0
                    }
                )
            })
        })
        return newPrice
    }

    function billingSuccessHandler(){
        setBillingSuccess('success');
        setTimeout(()=>{
            setBillingSuccess('neutral')
        },3000)
    }


    function handleBilling(){
        let billBody = {
            customer_id:customerId,
            total_clothes:totalClothes(),
            total_price:totalPrice(),
            serviceDetails:price
        }
        axios.post('/api/billing',billBody)
        .then(res => {
            if(res.data == "Service recorded successfully"){
                setprice(resetPrice());
                setCustomerId(null);
                billingSuccessHandler();
            }else{
                console.log(res," was recieved from service api,but not done successfully")
            }
        })
        .catch(err => {
            setBillingSuccess('failure')
            console.log("Service api error:",err)
        })
    }


    function addQuantityColumn(price){
        Object.keys(price).forEach(service => {
            price[service] = price[service].map(cloth => {
                return(
                    {
                        ...cloth,
                        quantity:Math.random()>0.7?1:0
                    }
                )
            })
        })
        return price
    }

    useEffect(()=>{
        axios.get('/api/pricing')
        .then(res => {console.log(res);
                      setprice(addQuantityColumn(res.data))})
        .catch(err => {console.log(err);})
    },[])

    return(
        <div className='billingContainer'>
            <div className='billingHeadingContainer'>
                <h1>
                    Billing
                </h1>
            </div>
            <div className='billingBody'>
                <div className='billingPricer'>
                    {Object.keys(price).length>0 && Object.keys(price).map(service => {
                        return(
                            <div className='billingServiceContainer'>
                                
                                <div className='billingServiceHeading'>
                                    <h2 className='capitalize'>
                                        {service}
                                    </h2>
                                </div>
                                <div className='clothList'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div>
                                                    Item Name
                                                </div>
                                            </th>
                                            <th>
                                                <div>
                                                Price per Item
                                                </div>
                                            </th>

                                            <th>
                                                <div>
                                                    price
                                                </div>
                                            </th>
                                            
                                            <th>
                                                <div>
                                                    Total
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {price[service].map(cloth => {
                                                return(
                                                    <tr>
                                                        <td>  
                                                            <div className='clothNameContainer capitalize'>
                                                                {cloth.item_name}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='itemPrice'>
                                                                {cloth.price}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <input type="number" min={0} value={cloth['quantity']} onChange={(e) => {handleQuantityChange(service,cloth.item_name,e.target.value)}}/>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='itemTotal'>
                                                                <input type="text" readOnly value={cloth['quantity']>0?cloth['quantity']*cloth['price']:0}/>
                                                            </div>
                                                        </td>
                                                        
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2}>
                                                <strong>Total</strong>
                                            </td>
                                            <td>
                                            {price[service].reduce((accumulator,current,index)=>{console.log(current,index);return accumulator+Number(current['quantity'])},0)} Clothes
                                            </td>
                                            <td>
                                            {price[service].reduce((accumulator,current,index)=> accumulator+(current['quantity']*current['price']),0)} Rupees
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                    
                                </div>
                        </div>
                        )
                    })}
                
            </div>
            <div className='billingSummariser'>
                <div>
                {Object.keys(price).length>0?<table>
                        <thead>
                            <th>
                                Service name
                            </th>
                            <th>
                                Clothes
                            </th>
                            <th>
                                Money
                            </th>
                        </thead>
                        <tbody>
                            {Object.keys(price).map(service => {
                                return (
                                    <tr>
                                        <td className='capitalize'>
                                            {service}
                                        </td>
                                        <td>
                                            {price[service].reduce((accumulator,current,index)=>accumulator+Number(current['quantity']),0)}
                                        </td>
                                        <td>
                                            {price[service].reduce((accumulator,current,index)=> accumulator+(current['quantity']*current["price"]),0)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <strong>Total</strong>
                                </td>
                                <td>
                                {totalClothes()}  clothes
                                </td>
                                <td>
                                {totalPrice()} rupees
                                </td>
                            </tr>
                        </tfoot>
                    </table>:""}
                </div>
                    
                {
                    billingSuccess=='success'
                    ?<div className='green Text'>
                        Bill was recorded successfully.
                    </div>
                    :billingSuccess=='failure'&&
                    <div className='red Text'>
                        Bill wasn't recorded properly.Try again.
                    </div>
                }
                <div className='confirmBillButton'>
                    <div>
                        <label htmlFor="">Customer id</label>
                        <input type="number" value={customerId} onChange={(e)=>{setCustomerId(e.target.value)}}/>
                    </div>
                    <div>
                        <button onClick={handleBilling}>Confirm Bill</button>
                    </div>
                </div>
            </div>
            
            </div>
        </div>
    )
}