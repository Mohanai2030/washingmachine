import { useEffect, useState } from 'react'
import './chat.css'
import { chatgrouper } from './chatgrouper'

export function Chat(){
    const [textMessage,setTextmessage] = useState('')
    let chatData = chatgrouper([
        {
          "chatcontent": "Hello, I need help with my order.",
          "message_date": "2025-03-01",
          "message_time": "14:35",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "yes",
          "customer_name": "John Doe"
        },
        {
          "chatcontent": "Sure, can you provide your order ID?",
          "message_date": "2025-03-01",
          "message_time": "14:37",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "yes",
          "customer_name": "John Doe"
        },
        {
          "chatcontent": "Yes, it's #12345.",
          "message_date": "2025-03-01",
          "message_time": "14:40",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "yes",
          "customer_name": "John Doe"
        },
        {
          "chatcontent": "Thank you! Let me check the details.",
          "message_date": "2025-03-01",
          "message_time": "14:42",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "no",
          "customer_name": "John Doe"
        },
        {
          "chatcontent": "Hi, I haven't received my refund yet.",
          "message_date": "2025-02-28",
          "message_time": "10:15",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "yes",
          "customer_name": "Jane Smith"
        },
        {
          "chatcontent": "Let me check the status for you.",
          "message_date": "2025-02-28",
          "message_time": "10:18",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "yes",
          "customer_name": "Jane Smith"
        },
        {
          "chatcontent": "Any updates on my request?",
          "message_date": "2025-02-28",
          "message_time": "12:05",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "no",
          "customer_name": "Jane Smith"
        },
        {
          "chatcontent": "Your refund has been processed. You should receive it within 3-5 business days.",
          "message_date": "2025-02-28",
          "message_time": "12:10",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "no",
          "customer_name": "Jane Smith"
        },
        {
          "chatcontent": "Hey, my delivery is delayed. Can you check?",
          "message_date": "2025-03-01",
          "message_time": "16:22",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "yes",
          "customer_name": "Michael Johnson"
        },
        {
          "chatcontent": "Yes, I will check and update you shortly.",
          "message_date": "2025-03-01",
          "message_time": "16:25",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "yes",
          "customer_name": "Michael Johnson"
        },
        {
          "chatcontent": "I still haven't received an update.",
          "message_date": "2025-03-02",
          "message_time": "09:30",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "no",
          "customer_name": "Michael Johnson"
        },
        {
          "chatcontent": "The package is out for delivery today.",
          "message_date": "2025-03-02",
          "message_time": "10:00",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "no",
          "customer_name": "Michael Johnson"
        },
        {
          "chatcontent": "Can I change my delivery address?",
          "message_date": "2025-02-27",
          "message_time": "13:50",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "yes",
          "customer_name": "Emily Davis"
        },
        {
          "chatcontent": "I'm sorry, but the order has already been shipped.",
          "message_date": "2025-02-27",
          "message_time": "14:00",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "yes",
          "customer_name": "Emily Davis"
        },
        {
          "chatcontent": "I received the wrong item in my order.",
          "message_date": "2025-03-01",
          "message_time": "17:10",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "no",
          "customer_name": "Emily Davis"
        },
        {
          "chatcontent": "We apologize for the mistake. We will arrange a replacement.",
          "message_date": "2025-03-01",
          "message_time": "17:20",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "no",
          "customer_name": "Emily Davis"
        },
        {
          "chatcontent": "Is there a discount for first-time buyers?",
          "message_date": "2025-02-26",
          "message_time": "11:05",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "yes",
          "customer_name": "David Wilson"
        },
        {
          "chatcontent": "Yes! You get a 10% discount on your first purchase.",
          "message_date": "2025-02-26",
          "message_time": "11:10",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "yes",
          "customer_name": "David Wilson"
        },
        {
          "chatcontent": "How do I apply the discount code?",
          "message_date": "2025-02-27",
          "message_time": "09:20",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "no",
          "customer_name": "David Wilson"
        },
        {
          "chatcontent": "You can enter the code at checkout under the 'Promo Code' section.",
          "message_date": "2025-02-27",
          "message_time": "09:25",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "no",
          "customer_name": "David Wilson"
        },
        {
          "chatcontent": "Why is my payment not going through?",
          "message_date": "2025-02-25",
          "message_time": "15:45",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "yes",
          "customer_name": "Sophia Martinez"
        },
        {
          "chatcontent": "Can you check if your card details are entered correctly?",
          "message_date": "2025-02-25",
          "message_time": "15:50",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "yes",
          "customer_name": "Sophia Martinez"
        },
        {
          "chatcontent": "I checked, and it's still not working.",
          "message_date": "2025-02-26",
          "message_time": "08:10",
          "sender": "customer",
          "reciever": "admin",
          "readornot": "no",
          "customer_name": "Sophia Martinez"
        },
        {
          "chatcontent": "Try using a different payment method or contact your bank.",
          "message_date": "2025-02-26",
          "message_time": "08:15",
          "sender": "admin",
          "reciever": "customer",
          "readornot": "no",
          "customer_name": "Sophia Martinez"
        }
    ])
    const [currentCustomer,setCurrentCustomer] = useState(Object.keys(chatData)[0])
    let auth = 'admin'


    function handleClick(){

    }


    return(
        auth=='admin'
        ?<div className='adminChatContainer'>
            <div className='previousChats'>
                {Object.keys(chatData).map(customer=>{
                    return(
                        <div className={`pastChatContainer ${currentCustomer==customer?'currentCustomer':''}`} onClick={()=>{setCurrentCustomer(customer)}}>
                            <div className='pastChatNameUnread'>
                                <div className='pastChatName'>
                                    <strong>{customer}</strong>
                                </div>
                                <div className={`pastChatUnread ${chatData[customer][chatData[customer].length-1]['datemsg'][0]['readornot'] ? 'yes':'no'}}`}>
                                </div>
                            </div>
                            <div className='pastChatMsgAndTime'>
                                <div className='pastChatContent'>
                                    {chatData[customer][0]['datemsg'][0]['chatcontent']}
                                </div>
                                <div className='pastChatMessage'>
                                    {chatData[customer][0]['datemsg'][0]['message_time']}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='adminChatContent'>
                {
                    chatData[currentCustomer].map(chatDate => {
                        let thatDayData = chatDate.datemsg
                        return(
                            <div className='chatMessageDateContainer'>
                                <div className='chatMessageDate'>
                                    {chatDate.date}
                                </div>
                                <div className='chatMessageDateBody'>
                                    {
                                        thatDayData.map(chat => {
                                            return(
                                                <div className={chat.sender==auth?'right chatMessage':'left chatMessage'}>
                                                    <div className='chatMessageBody'>
                                                        {chat.chatcontent}
                                                    </div>
                                                    <div className='chatMessageTiming'>
                                                        {chat.message_time}
                                                    </div>
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='adminMessageSenderContainer'>
                <div className='adminMessageSenderInputContainer'>
                    <input type="text" value={textMessage} onChange={(e)=>{setTextmessage(e.target.value)}} className='adminMessageSenderInput' placeholder='Type your message here'/>
                </div>
                <div className='adminMessageSenderButtonContainer'>
                    <button className='adminMessageSenderButton'>Send</button>
                </div>
            </div>

        </div>
        :<div className='chatContainer'>

            <div className='chatContent'>
                {
                    chatData[currentCustomer].map(chatDate => {
                        let thatDayData = chatDate.datemsg
                        return(
                            <div className='chatMessageDateContainer'>
                                <div className='chatMessageDate'>
                                    {chatDate.date}
                                </div>
                                <div className='chatMessageDateBody'>
                                    {
                                        thatDayData.map(chat => {
                                            return(
                                                <div className={chat.sender==auth?'right chatMessage':'left chatMessage'}>
                                                    <div className='chatMessageBody'>
                                                        {chat.chatcontent}
                                                    </div>
                                                    <div className='chatMessageTiming'>
                                                        {chat.message_time}
                                                    </div>
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='messageSenderContainer'>
                <div className='messageSenderInputContainer'>
                    <input type="text" value={textMessage} onChange={(e)=>{setTextmessage(e.target.value)}} className='messageSenderInput' placeholder='Type your message here'/>
                </div>
                <div className='messageSenderButtonContainer'>
                    <button className='messageSenderButton'>Send</button>
                </div>
            </div>

        </div>
    )
}


// useEffect(()=>{
//     ws.onmessage = (message) => {
//         console.log(message)
//         setMessageBody(messageBody+message.data)
//     }
// },[])

// function handleClick(){
//     ws.send('Hi from user 1')
// }

// return(
//     <div>
//         Chat
//         <div>
//             Messages
//             <div>
//                 {messageBody}
//             </div>
//             <button onClick={handleClick}>
//                 CHECK
//             </button>
//         </div>
//     </div>
// )

// let chatData = {
//     "23-01-2024":
//         [{
//     "chatcontent": "Hello, I'm having trouble with my recent order #45678.",
//     "message_date": "2025-03-01",
//     "message_time": "09:23",
//     "sender": "customer",
//     "receiver": "admin"
//   },
//   {
//     "chatcontent": "Hi there! I'd be happy to help with your order. Could you please provide more details about the issue?",
//     "message_date": "2025-03-01",
//     "message_time": "09:25",
//     "sender": "admin",
//     "receiver": "customer"
//   },
//   {
//     "chatcontent": "The product arrived damaged. The package looked like it was mishandled during shipping.",
//     "message_date": "2025-03-01",
//     "message_time": "09:28",
//     "sender": "customer",
//     "receiver": "admin"
//   },
//   {
//     "chatcontent": "I'm sorry to hear that. Could you send some photos of the damaged item and packaging?",
//     "message_date": "2025-03-01",
//     "message_time": "09:30",
//     "sender": "admin",
//     "receiver": "customer"
//   },
//   {
//     "chatcontent": "Just sent the photos to your email address.",
//     "message_date": "2025-03-01",
//     "message_time": "09:42",
//     "sender": "customer",
//     "receiver": "admin"
//   },
//   {
//     "chatcontent": "Thank you. I've received the photos and filed a damage claim. We'll ship a replacement immediately.",
//     "message_date": "2025-03-01",
//     "message_time": "09:45",
//     "sender": "admin",
//     "receiver": "customer"
//   },
//   {
//     "chatcontent": "That's great! How long will it take to arrive?",
//     "message_date": "2025-03-01",
//     "message_time": "09:47",
//     "sender": "customer",
//     "receiver": "admin"
//   }]
//     ,
//     "23-02-2024":[
//     {
//         "chatcontent": "I'd be happy to check that for you. Could you provide your account email or subscription ID?",
//         "message_date": "2025-03-01",
//         "message_time": "15:32",
//         "sender": "admin",
//         "receiver": "customer"
//         },
//         {
//         "chatcontent": "My email is customer@example.com",
//         "message_date": "2025-03-01",
//         "message_time": "15:35",
//         "sender": "customer",
//         "receiver": "admin"
//         },
//         {
//         "chatcontent": "Thank you. I can see that your subscription is set to renew on April 15, 2025.",
//         "message_date": "2025-03-01",
//         "message_time": "15:38",
//         "sender": "admin",
//         "receiver": "customer"
//         },
//         {
//         "chatcontent": "I'd like to cancel my subscription before it renews. How do I do that?",
//         "message_date": "2025-03-01",
//         "message_time": "15:40",
//         "sender": "customer",
//         "receiver": "admin"
//         },
//         {
//         "chatcontent": "You can cancel by going to Account Settings > Subscriptions > Cancel. Would you like me to help you with that now?",
//         "message_date": "2025-03-01",
//         "message_time": "15:42",
//         "sender": "admin",
//         "receiver": "customer"
//         },
//         {
//         "chatcontent": "Yes, please help me cancel it now.",
//         "message_date": "2025-03-01",
//         "message_time": "15:45",
//         "sender": "customer",
//         "receiver": "admin"
//         }
//     ]   
// }