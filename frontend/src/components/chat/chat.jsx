import { useEffect, useState } from 'react'
import './chat.css'
import { chatgrouper } from './chatgrouper'
import useProfile from '../../wrappers/profilecontext/useProfile'
import useAuth from '../../wrappers/AuthContext/useAuth'
import { Unauthorized } from '../unauthorized/unauthorized'
import axios from 'axios'
import useAxiosPrivate from '../../wrappers/useAxiosPrivate'

export function Chat(){
    const [textMessage,setTextmessage] = useState('')
    let [rawChatData,setrawChatData] = useState([])
    let chatData = chatgrouper(rawChatData);
    let [messageRecieverId,setMessageRecieverId] = useState('')
    let [messageRecieverName,setMessageRecieverName] = useState('')
    let {profile} = useProfile();
    let {auth} = useAuth();
    let axiosPrivate = useAxiosPrivate()
    let ws = new WebSocket('ws://localhost:3000')
    

    const [currentCustomer,setCurrentCustomer] = useState(Object.keys(chatData)[0])
    let authObject;
    if(auth?.roles[0]==1000){
      authObject = 'customer'
    }else if(auth?.roles[0]==2000){
      authObject = 'admin'
    }else{
      authObject = 'notLoggedIn'
    }
      
    console.log(profile,auth)

    authObject = 'admin'
    

    // initial verify
    
    function handleSendMessage(){
      if(auth?.roles[0]==1000){
        ws.send(JSON.stringify({
          'auth':auth.accessToken,
          'body':textMessage,
          'name':profile.name
        }))
      }else if(auth?.roles[0]==2000){
        ws.send(JSON.stringify({
          'auth':auth.accessToken,
          'body':textMessage,
          'recieverid':messageRecieverId,
          'recieverName':messageRecieverName
        }))}
      
    }


    useEffect(()=>{
      let params = {customer_id:profile.customer_id}
      console.log("params:",params)
      if(authObject=='admin'){
        axiosPrivate.get(`/api/chathistory`,{params})
        .then((res)=>{console.log("-------------------",res);setrawChatData(res.data)})
        .catch(err => console.log("error when getting previous chats:",err))
      }else if(authObject == 'customer'){
        axiosPrivate.get('/api/chathistory')
        .then((res)=>{console.log(res);setrawChatData(res.data)})
        .catch(err => console.log("error when getting previous chats:",err))
      }else{
        console.log("INvalid auth in forntendchat")
      }
      
      // ws.onmessage = (messageEvent) => {
      //   if(messageEvent.data == 'ready to chat'){
      //     if(auth.roles[0]==2000){
      //       ws.send(JSON.stringify({
      //               'id':profile.admin_id,
      //               'auth':auth.accessToken,
      //               'body':"connect"
      //             }))
      //    }else if(auth.roles[0]==1000){
      //        ws.send(JSON.stringify({
      //         'id':profile.customer_id,
      //         'auth':auth.accessToken,
      //         'body':"connect"
      //       }))
      //     }
      //   }else{
      //     setrawChatData([...rawChatData,JSON.parse(messageEvent.data)])
      //     setTextmessage('')
      //   }
      // }

    },[])

    return(
        authObject=='admin'
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
                                                <div className={chat.sender==authObject?'right chatMessage':'left chatMessage'}>
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
            {console.log(chatData)}
            <div className='chatContent'>
                {
                    Object.keys(chatData).length>0 && chatData[Object.keys(chatData)[0]].map(chatDate => {
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
                                                <div className={chat.sender==authObject?'right chatMessage':'left chatMessage'}>
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
                    <button className='messageSenderButton' onClick={()=>{handleSendMessage()}}>Send</button>
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