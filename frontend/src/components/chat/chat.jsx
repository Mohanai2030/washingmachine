import { useEffect, useState } from 'react'
import './chat.css'
import { adminChatCopy, chatgrouper, customerChatCopy } from './chatgrouper'
import useProfile from '../../wrappers/profilecontext/useProfile'
import useAuth from '../../wrappers/AuthContext/useAuth'

import axios from 'axios'
import useAxiosPrivate from '../../wrappers/useAxiosPrivate'
import { useLocation } from 'react-router-dom'
import { useRef } from 'react'
import { produce } from 'immer';

export function Chat(){
    const [textMessage,setTextmessage] = useState('')
    let [chatData,setChatData] = useState([])
    let [ready,setReady] = useState(false)
    let [messageRecieverId,setMessageRecieverId] = useState('')
    let [messageRecieverName,setMessageRecieverName] = useState('')
    let {profile} = useProfile();
    let {auth} = useAuth();
    let axiosPrivate = useAxiosPrivate()
    let location = useLocation()
    let [ws,setws] = useState({})
    

    let authObject;
    if(auth?.roles[0]==1000){
      authObject = 'customer'
    }else if(auth?.roles[0]==2000){
      authObject = 'admin'
    }else{
      authObject = 'notLoggedIn'
    }
    
    console.log(profile,auth)
    const [currentCustomer,setCurrentCustomer] = useState(null)
    

    function handleSendMessage(){
        if(textMessage.length>0){
            if(auth?.roles[0]==1000){
                ws.send(messagewrapper({
                  'auth':auth.accessToken,
                  'body':textMessage,
                  'name':profile.name,
                  'id':profile.customer_id
                },'normalmessage'))
            }else if(auth?.roles[0]==2000){
                if(currentCustomer!=null){
                    ws.send(messagewrapper({
                        'auth':auth.accessToken,
                        'body':textMessage,
                        'recieverid':chatData[currentCustomer][0]['datemsg'][0]['customer_id'],
                        'recieverName':currentCustomer
                    },'normalmessage'))}
                }else{
                    alert('Select a customer to send the message to')
                }
        }else{
            alert('message must not be empty.Must contain atleast one charachter')
        }
    }

    function newMessageadder(oldList,newmessage){
        let newchatdata;
        if(auth.roles[0]==1000){
            newchatdata = customerChatCopy(oldList)
            let index = newchatdata.findIndex(x => x.date.slice(0,10) == newmessage.message_date);
            if(index == -1){
                let newdateobj = {
                    'date':newmessage.message_date,
                    'datemsg':[newmessage]
                }
                newchatdata.push(newdateobj)
            }else{
                newchatdata[index].datemsg.push(newmessage)
            }
        }else if(auth.roles[0]=2000){
            newchatdata = adminChatCopy(oldList);
            if(newchatdata?.[newmessage.customer_name]){
                if(newchatdata[newmessage.customer_name].map(x => x.date).includes(newmessage.message_date)){
                    console.log('1',newchatdata[newmessage.customer_name],newchatdata[newmessage.customer_name].findIndex(x => x.date == newmessage.message_date))
                    newchatdata[newmessage.customer_name][newchatdata[newmessage.customer_name].findIndex(x => x.date == newmessage.message_date)]['datemsg'].push(newmessage)
                }else{
                    console.log('2')
                    let newdateobj = {
                        'date':newmessage.message_date,
                        'datemsg':[newmessage]
                    }
                    newchatdata[newmessage.customer_name].push(newdateobj)
                }
            }else{
                console.log('3')
                newchatdata[newmessage.customer_name] = {
                    'date':newmessage.message_date,
                    'datemsg':[newmessage]
                }
            }
            console.log("admin new message add",newchatdata)
        }
        return newchatdata;
    }

    // function messageconfirmedAdder(oldList,newmessage){
    //     let newchatdata;
    //     if(auth.roles[0]==1000){
    //         newchatdata = customerChatCopy(oldList)
    //         let index = newchatdata.findIndex(x => x.date.slice(0,10) == newmessage.message_date);
    //         if(index == -1){
    //             let newdateobj = {
    //                 'date':newmessage.message_date,
    //                 'datemsg':[newmessage]
    //             }
    //             newchatdata.push(newdateobj)
    //         }else{
    //             newchatdata[index].datemsg.push(newmessage)
    //         }
    //     }else if(auth.roles[0]==2000){
    //         newchatdata = adminChatCopy(oldList)

    //     }

    function messagewrapper(message,purposeofmessage){
        return JSON.stringify({
            'purpose':purposeofmessage,
            'content':message
        })
    }
    
    function newmessageHandler(newmessage,purpose){
        setChatData(prev => {
            let updated;
            if(purpose=='normalmessage'){
                updated = newMessageadder(prev, newmessage);
            }else if(purpose=='messagesendconfirmation'){
                updated = newMessageadder(prev,newmessage)
            }            
            return updated; // Ensure new reference
        });
    }
    const params = { customer_id: profile?.customer_id };
    

    
    useEffect(() => {
        if (authObject === 'admin') {
        axiosPrivate
            .get('/api/chathistory')
            .then((res) => {
            console.log("chathistory response", res);
            let hold = chatgrouper(res.data,authObject);
            setCurrentCustomer(Object.keys(hold)[0]);
            setChatData(hold);
            setReady(true);
            })
            .catch((err) => console.log("Error when getting previous chats of all users:", err));
        } else if (authObject === 'customer') {
        axiosPrivate
            .get('/api/chathistory', { params })
            .then((res) => {
            console.log(res);
            setChatData(chatgrouper(res.data,authObject));
            setReady(true);
            })
            .catch((err) => console.log("Error when getting previous chats:", err));
        } else {
        console.log("Invalid auth in frontend chat");
        }
  }, [authObject]);

    //ws
    useEffect(()=>{
        let ws = new WebSocket('ws://localhost:3000')
        ws.onmessage = (messageEvent) => {
            console.log("websocket server has messaged: ",messageEvent.data)
            let message = JSON.parse(messageEvent.data);
            let messagepurpose = message?.purpose;
            message = message?.content;

            if(messagepurpose == 'connect'){
                if(message == 'ready to chat'){
                    if(auth.roles[0]==2000){
                        ws.send(messagewrapper({
                                'id':profile.admin_id,
                                'auth':auth.accessToken,
                                'body':"connect"
                            },'connect'))
                    }else if(auth.roles[0]==1000){
                        ws.send(messagewrapper({
                        'id':profile.customer_id,
                        'auth':auth.accessToken,
                        'body':"connect"
                        },'connect'))
                    }
                }
            }else if(messagepurpose == 'normalmessage'){
                console.log("new message recieved",message)
                newmessageHandler(message,'normalmessage')
            }else if(messagepurpose == 'messagesendconfirmation'){
                console.log("sent message confirmation recieved",message)
                newmessageHandler(message,'messagesendconfirmation')
            }else if(messagepurpose == 'readornotupdate'){

            }else{
                console.log("message with different purpose or error purpose",message);
            }
        }
        setws(ws);
        return () => {
            ws.close();
        }
    },[location.pathname])
     // console.log(chatData,currentCustomer)
    

    return(
        authObject=='admin'
        ?<div className='adminChatContainer'>
            <div className='previousChats'>
                {ready==true && Object.keys(chatData).map(customer=>{
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
                                    {chatData[customer][0]['datemsg'][0]['chat_message']}
                                </div>
                                <div className='pastChatMessage'>
                                    {chatData[customer][0]['datemsg'][0]['message_time'].slice(0,5)}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='adminChatContent'>
                { ready==true && 
                    chatData[currentCustomer].map(chatDate => {
                        let thatDayData = chatDate.datemsg
                        return(
                            <div className='chatMessageDateContainer'>
                                <div className='chatMessageDate'>
                                    {chatDate.date.slice(0,10)}
                                </div>
                                <div className='chatMessageDateBody'>
                                    {
                                        thatDayData.map(chat => {
                                            return(
                                                <div className={chat.sender==authObject?'right chatMessage':'left chatMessage'}>
                                                    <div className='chatMessageBody'>
                                                        {chat.chat_message}
                                                    </div>
                                                    <div className='chatMessageTiming'>
                                                        {chat.message_time.slice(0,5)}
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
                    <button className='adminMessageSenderButton' onClick={()=>{handleSendMessage()}}>Send</button>
                </div>
            </div>

        </div>
        :<div className='chatContainer'>
            {console.log(chatData)}
            <div className='chatContent'>
                {
                    ready==true && chatData.map(chatDate => {
                        console.log("chatDate,",chatDate)
                        let thatDayData = chatDate.datemsg
                        return(
                            <div className='chatMessageDateContainer'>
                                <div className='chatMessageDate'>
                                    {chatDate.date.slice(0,10)}
                                </div>
                                <div className='chatMessageDateBody'>
                                    {
                                        thatDayData.map((chat,chatindex) => {
                                            console.log("chatindex:",chatindex)
                                            return(
                                                <div className={chat.sender==authObject?'right chatMessage':'left chatMessage'}>
                                                    <div className='chatMessageBody'>
                                                        {chat.chat_message}
                                                    </div>
                                                    <div className='chatMessageTiming'>
                                                        {chat.message_time.slice(0,5)}
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