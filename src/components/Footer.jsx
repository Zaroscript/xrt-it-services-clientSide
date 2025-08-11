import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "../assets/css/components/footer.css"


// React Icons
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";



const Footer = () => {
  return (

    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col col-lg-3 mx-auto">
            <div className="logo">
              {/* <img src="..." alt="" /> */}
              <h2>Xrt Tech</h2>
            </div>
            <ul>
              <li>58 Howard Street #2 San Francisco, CA 941</li>
              <li>support@xrttech.com</li>
              <li>(+68)1221 09876</li>
              <li>www.mitech.xperts.com</li>
            </ul>
          </div>
          <div className="col col-lg-3 text-center">
            <h3 className='mb-4'>IT Services</h3>
            <ul>
              <li className='my-2'>Managed IT</li>
              <li className='my-2'>IT Support</li>
              <li className='my-2'>IT Consultancy</li>
              <li className='my-2'>Cloud Computing</li>
              <li className='my-2'>Cyber Security</li>
            </ul>
          </div>
          <div className="col col-lg-3 text-center">
            <h3 className='mb-4'>Quick links</h3>
            <ul>
              <li className='my-2'>Pick up locations</li>
              <li className='my-2'>Terms of Payment</li>
              <li className='my-2'>Privacy Policy</li>
              <li className='my-2'>Where to Find Us</li>
            </ul>
          </div>
          <div className="col col-lg-3 text-center">
            <h3 className='mb-4'>Support</h3>
            <ul>
              <li className='my-2'>Forum Support</li>
              <li className='my-2'>Help & FAQ</li>
              <li className='my-2'>Contact Us</li>
              <li className='my-2'>Pricing and plans</li>
              <li className='my-2'>Cookies Policy</li>
            </ul>
          </div>
        </div>
        {/* <!-- social --> */}
        <div className="row justify-content-center">
          <div className="col col-lg-9">
            <h4 className="py-5">© 2025 Xrt Tech. All Rights Reserved.</h4>
          </div>
          <div className="col col-lg-3 py-5 ">
            <ul className="social d-flex ">
              <li className="d-flex justify-content-center align-items-center">
                <FaFacebookF size={25} className='mx-4 cursor-pointer'/>
              </li>
              <li className="d-flex justify-content-center align-items-center mx-4">
                <FaTwitter size={25} className='me-4 cursor-pointer'/>
              </li>
              <li className="d-flex justify-content-center align-items-center me-4">
                <FaInstagram size={25} className='me-4 cursor-pointer'/>
              </li>
              <li className="d-flex justify-content-center align-items-center">
                <FaLinkedin size ={25}/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer;