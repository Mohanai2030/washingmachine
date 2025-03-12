import './star.css'

export function Star({rating}){
    let hold = []
    let revhold = []
    for(let i=0;i<rating;i++){
        hold.push(i)
        console.log("inside ,hold",hold)
    }
    for(let i=0;i<5-rating;i++){
        revhold.push(i)
    }
    console.log(rating,hold,revhold)
    return (
        <div className='starContainer'>
            {hold.map(star => {
                return(
                    <div className='star'>

                    </div>
                )
            })}
            {revhold.map(star => {
                return(
                    <div className='star blank'>

                    </div>
                )
            })}
            
            
        </div>
    )
}