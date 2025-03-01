import { useEffect, useState } from 'react'
import './chat.css'

export function Chat(){
    const [textMessage,setTextmessage] = useState('')
    
    function handleClick(){

    }


    return(
        <div className='chatContainer'>

            <div className='chatContent'>

                    <div className='left'>
                        <li>From company</li>
                    </div>
                    <div className='right'>
                        <li>From user</li>
                    </div>
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