import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div style={{height:'300px'}} className='mt-5 container w-100 '>
        <div className='d-flex justify-content-between'>
             {/* intro */}
             <div style={{height:'400px'}}>
                <h5>Book Managment</h5>
                <p>Lorem, ipsum dolor sit amet consectetur <br /> adipisicing  brelit. Aliquam, reiciendis ut vitae <br />est libero alias ex nesciunt</p>
                <p>Code licensed MIT, docs CC BY 3.0.</p>
                <p>Currently v5.3.3.</p>
            </div>
            {/* links */}
            <div className="d-flex flex-column">
                <h5>Likes</h5>
                <a href="" style={{textDecoration:'none', color:'black' }}>Home</a>
                    <a href="" style={{textDecoration:'none', color:'black'}}>View</a>
                    <a href="" style={{textDecoration:'none', color:'black'}}>History</a>

                

            </div>
            
            {/* contacts */}

            <div className="d-flex flex-column">
                <h5>Contacts us</h5>
                <div className='d-flex '>
                    <input type="text" placeholder="enter your name "  className=" form-control me-2"/>
                    <button className="btn btn-info"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <a href="" style={{textDecoration:'none', color:'black'}}><i class="fa-brands fa-twitter"></i></a>
                    <a href="" style={{textDecoration:'none', color:'black'}}><i class="fa-brands fa-linkedin-in"></i></a>

                    <a href="" style={{textDecoration:'none', color:'black'}}><i class="fa-brands fa-facebook"></i></a>
                    <a href="" style={{textDecoration:'none', color:'black'}}><i class="fa-brands fa-instagram"></i></a>
                    <a href="" style={{textDecoration:'none', color:'black'}}><i class="fa-solid fa-phone"></i></a>

                </div>

            </div>


        </div>
    </div>
  )
}

export default Footer