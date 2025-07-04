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


export function customerChatCopy(oldList){
  console.log("inside oldlist",oldList)
  let newList = []
  oldList.forEach(dateclubber => {
    let adder = {
      date:dateclubber.date,
      datemsg:[]
    }

    // console.log("dateclubber:",dateclubber.datemsg);
    dateclubber.datemsg.forEach(msg => {
      adder.datemsg = [...adder.datemsg,{...msg}]
    })
    newList.push(adder)
  }) 
  return newList
}


export function adminChatCopy(oldobject){
  let newobject = {}
  for(let customer in oldobject){
    let lastadder = customerChatCopy(oldobject[customer])//must be an array of objects where each object has date and datemsg 
    newobject[customer] = lastadder
  }
  console.log(oldobject)
  console.log(newobject)
  return newobject;
}