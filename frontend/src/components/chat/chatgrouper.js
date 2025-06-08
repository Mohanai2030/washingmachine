export function chatgrouper(data,auth){
  if (auth=='admin'){
    let answer = {}
    data.forEach(message => {
      if(!answer?.[message.customer_name]){
        answer[message.customer_name] = []
      }
      answer[message.customer_name].push(message)
    })
  
    // console.log(answer);
    
    Object.keys(answer).forEach(customer => {
      let now = answer[customer];
      let newnow = {}
      now.forEach(message => {
        if(!newnow?.[message.message_date]){
          newnow[message.message_date] = []
        }
        newnow[message.message_date].push(message)
      })
      answer[customer] = newnow
    })
  
    Object.keys(answer).forEach(customer => {
      let eachCustomerDate = Object.keys(answer[customer]);
      eachCustomerDate.sort(function(a,b){return ((new Date(b)).valueOf() - (new Date(a)).valueOf())});
      eachCustomerDate.reverse();
      console.log(customer,eachCustomerDate)
      let neworder = []
      eachCustomerDate.forEach(msgdate => {
        neworder.push({
          date:msgdate,
          datemsg:answer[customer][msgdate]
        })
      })
      answer[customer] = neworder
    })

    console.log("answer:",answer);
    return answer;
  }else if(auth=='customer'){

    let newnow = {}
    data.forEach(message => {
      if(!newnow?.[message.message_date]){
          newnow[message.message_date] = []
      }
      newnow[message.message_date].push(message)
    })     
  
    let eachCustomerDate = Object.keys(newnow);
    eachCustomerDate.sort(function(a,b){return ((new Date(a)).valueOf() - (new Date(b)).valueOf())});

    console.log("customerDate:",eachCustomerDate)

    let neworder = []
    eachCustomerDate.forEach(msgdate => {
        neworder.push({
          date:msgdate,
          datemsg:newnow[msgdate]
        })
    })
    
    console.log("neworder:",neworder);
    return neworder;
  }
}


export function newMessageAdder(oldList,newMessage,auth){
  console.log("oldlist:",oldList)
  if(auth=='admin'){

  }else if(auth=='customer'){
    if(oldList.map(x=>x['date'].slice(0,10)).contains(newMessage.message_date)){
      oldList[oldList.findIndex(x => x['date'].slice(0,10)==newMessage.message_date)]['datemsg'].push(newMessage)
    }else{
      let datemsgobj = {date:newMessage.message_date,datemsg:[newMessage]}
      oldList.push(datemsgobj)
    }
    return oldList
  }else{
    alert('Ibvalid auth inside newMessageAdder')
  }
}

