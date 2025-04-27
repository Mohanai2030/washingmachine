import { useEffect, useState } from 'react';
import './billing.css'
import axios from 'axios'
export function Billing(){
    const clothes = ['shirt','pant','shorts','tshirt','bedsheet','innerwear','socks'];
    const services = ['DryWash','NormalWash','Ironing'];
    const [quantity,setQuantity] = useState({
        "drywash":{
            'bedsheet':0,
            'pant':0,
            'shirt':0,
            'shorts':0,
            't-shirt':0
        },
        "normalwash":{
            'bedsheet':0,
            'pant':0,
            'shirt':0,
            'shorts':0,
            't-shirt':0,
            'innerwear':0,
            'socks':0
        },
        "ironing":{
            'bedsheet':0,
            'pant':0,
            'shirt':0,
            't-shirt':0
        }
    }) 
    const [price,setprice] = useState({})

    function handleQuantityChange(service,clothtype,newQuantity){
        console.log(service,clothtype,newQuantity);
        let newQuantityObject = {...quantity};
        newQuantityObject[service][clothtype] = newQuantity;
        console.log(newQuantityObject)
        setQuantity(newQuantityObject);
    }

    useEffect(()=>{
        axios.get('/api/pricing')
        .then(res => {console.log(res);setprice(res.data)})
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
                    {Object.keys(price).map(service => {
                        return(
                            <div className='billingServiceContainer'>
                                
                                <div className='billingServiceHeading'>
                                    <h2>
                                        {service.toUpperCase()}
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
                                                    Quantity
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
                                                            <div className='clothNameContainer'>
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
                                                                <input type="number" min={0} value={quantity[service][cloth]} onChange={(e) => {handleQuantityChange(service,cloth.item_name,e.target.value)}}/>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='itemTotal'>
                                                                <input type="text" readOnly value={quantity[service][cloth.item_name]>0?quantity[service][cloth.item_name]*cloth.price:0}/>
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
                                            {Object.keys(quantity[service]).reduce((accumulator,current)=>accumulator+Number(quantity[service][current]),0)} Clothes
                                            </td>
                                            <td>
                                            {Object.keys(quantity[service]).reduce((accumulator,current)=> accumulator+(quantity[service][current]*price[service].find(cloth => cloth.item_name==current)["price"]),0)} rupees
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
                            <tr>
                                <td>
                                    Dry Washing
                                </td>
                                <td>
                                    {Object.keys(quantity["drywash"]).reduce((accumulator,current)=>accumulator+Number(quantity["drywash"][current]),0)}
                                </td>
                                <td>
                                    {Object.keys(quantity["drywash"]).reduce((accumulator,current)=> accumulator+(quantity["drywash"][current]*price["drywash"].find(cloth => cloth.item_name==current)["price"]),0)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Normal Washing
                                </td>
                                <td>
                                    {Object.keys(quantity["normalwash"]).reduce((accumulator,current)=>accumulator+Number(quantity["normalwash"][current]),0)}
                                </td>
                                <td>
                                    {Object.keys(quantity["normalwash"]).reduce((accumulator,current)=> accumulator+(quantity["normalwash"][current]*price["normalwash"].find(cloth => cloth.item_name==current)["price"]),0)} 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Ironing
                                </td>
                                <td>
                                {Object.keys(quantity["ironing"]).reduce((accumulator,current)=>accumulator+Number(quantity["ironing"][current]),0)}
                                </td>
                                <td>
                                    {Object.keys(quantity["ironing"]).reduce((accumulator,current)=> accumulator+(quantity["ironing"][current]*price["ironing"].find(cloth => cloth.item_name==current)["price"]),0)} 
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <strong>Total</strong>
                                </td>
                                <td>
                                {Number(Object.keys(quantity["ironing"]).reduce((accumulator,current)=>accumulator+Number(quantity["ironing"][current]),0)) 
                                + Number(Object.keys(quantity["drywash"]).reduce((accumulator,current)=>accumulator+Number(quantity["drywash"][current]),0)) + 
                                Number(Object.keys(quantity["normalwash"]).reduce((accumulator,current)=>accumulator+Number(quantity["normalwash"][current]),0))}  clothes
                                </td>
                                <td>
                                {Number(Object.keys(quantity["drywash"]).reduce((accumulator,current)=> accumulator+(quantity["drywash"][current]*price["drywash"].find(cloth => cloth.item_name==current)["price"]),0))
                                +
                                Number(Object.keys(quantity["normalwash"]).reduce((accumulator,current)=> accumulator+(quantity["normalwash"][current]*price["normalwash"].find(cloth => cloth.item_name==current)["price"]),0))
                                +
                                Number(Object.keys(quantity["ironing"]).reduce((accumulator,current)=> accumulator+(quantity["ironing"][current]*price["ironing"].find(cloth => cloth.item_name==current)["price"]),0))} Rupees
                                </td>
                            </tr>
                        </tfoot>
                    </table>:""}
                </div>
                    

                <div className='confirmBillButton'>
                    <div>
                        <label htmlFor="">Customer Name</label>
                        <input type="text" />
                    </div>
                    <div>
                        <button>Confirm Bill</button>
                    </div>
                </div>
            </div>
            
            </div>
        </div>
    )
}