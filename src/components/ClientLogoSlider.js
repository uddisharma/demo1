import Link from "next/link";
import { Fragment } from "react";
import Slider from "react-slick";
import { clientLogo } from "../sliderProps";
const ClientLogoSlider = () => {
  return (
    <Fragment >
      <Slider style={{backgroundColor:'white', borderRadius:"20px",padding:'30px', paddingTop:'20px'}} {...clientLogo} className="client-logo-wrap">
     
       
        <div className="client-logo-item">
         
            <a>
              <img
              style={{height:'120px'}}
                src="assets/images/client-logo/GMP.png"
                alt="Client Logo"
              />
            </a>
      
        </div>
        <div className="client-logo-item">
         
            <a>
              <img
             style={{height:'120px'}}
                src="assets/images/client-logo/Fssai.png"
                alt="Client Logo"
              />
            </a>
       
        </div>
        <div className="client-logo-item">
         
         <a>
           <img
          style={{height:'100px', marginTop:'10px'}}
             src="assets/images/client-logo/recycle.png"
             alt="Client Logo"
           />
         </a>
    
     </div>
        <div className="client-logo-item">
         
            <a>
              <img
              style={{height:'120px'}}
                src="assets/images/client-logo/ISO.png"
                alt="Client Logo"
              />
            </a>
          
        </div>
        <div className="client-logo-item">
         
         <a>
           <img
           style={{height:'120px'}}
             src="assets/images/client-logo/GMP.png"
             alt="Client Logo"
           />
         </a>
   
     </div>
     <div className="client-logo-item">
      
         <a>
           <img
          style={{height:'120px'}}
             src="assets/images/client-logo/Fssai.png"
             alt="Client Logo"
           />
         </a>
    
     </div>
     <div className="client-logo-item">
         
         <a>
           <img
          style={{height:'100px', marginTop:'10px'}}
             src="assets/images/client-logo/recycle.png"
             alt="Client Logo"
           />
         </a>
    
     </div>
     <div className="client-logo-item">
      
         <a>
           <img
           style={{height:'120px'}}
             src="assets/images/client-logo/ISO.png"
             alt="Client Logo"
           />
         </a>
       
     </div>
        {/* <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                src="assets/images/client-logo/client-logo1.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                src="assets/images/client-logo/client-logo2.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                src="assets/images/client-logo/client-logo3.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                src="assets/images/client-logo/client-logo4.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                src="assets/images/client-logo/client-logo5.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                src="assets/images/client-logo/client-logo6.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div> */}
      </Slider>
    </Fragment>
  );
};
export default ClientLogoSlider;
