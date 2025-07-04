import Footer from '../footer/footer'
import './Aligner.css'

export function Aligner({children}){
    return (
        <div className='aligner'>
            {children}
            <Footer/>
        </div>
    )
}