import './footer.css'

export default function  Footer(){
    return(
        <div className='footerContainer'>
            
            <div className='footerText'>
                    <h1>
                        Tidy Laundry
                    </h1>
                    <h3>
                        Our prices - fair,<br/>
                        Your clothes handled with care
                    </h3>
            </div>
                
            <div className='footerAddressContainer'>
                <div>
                    <h3>
                        Location
                    </h3>
                </div>
                <div className='addressText'>
                    <img src="/images/location.jpg" alt="" height='25px' width='25px'/>
                    <p>No.13/55, S.D.P Street, Ring Road Area<br/>Dharwad - 580 007, Karntaka</p>
                </div>
                
            </div>
            

            <div className='footerContactUs'>
                <div>
                    <h3>Contact us</h3>
                </div>
                <div>
                    <div><strong>Email</strong>:123bds@gmail.com</div>
                    <div><strong>Phone</strong>: +91 1231231234</div>
                </div>
                
            </div>

            <div className='footersocialMedia'>
                <div>
                    <h3>Follow us</h3>
                </div>
                <div>
                    <img src="/images/instagram.jpg" alt="" height='40px' width='40px'/>
                    <img src="/images/facebook.jpg" alt="" height='40px' width='40px'/>
                    <img src="/images/youtube.jpg" alt="" height='40px' width='40px'/>
                </div>
            </div>
            
        </div>
    )
}