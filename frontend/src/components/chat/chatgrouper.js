export function chatgrouper(data){
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
      eachCustomerDate.sort(function(a,b){return ((new Date(a)).valueOf() - (new Date(b)).valueOf())});
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
      
    // console.log("answer:",answer);
    // console.log('************************************************')
    console.log("answer:",answer);
    return answer;
}