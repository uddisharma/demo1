import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import { clientLogo } from "../sliderProps";
import axios from "axios";
const AvailableSlider = () => {

  return (
    <Fragment>
      <Slider {...clientLogo} className="client-logo-wrap">
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "80%", width: "80%" }}
                src="assets/images/client-logo/Amazon.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "80%", width: "80%" }}
                src="assets/images/client-logo/flipkart.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "80%", width: "80%" }}
                src="assets/images/client-logo/Meesho.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "70%", width: "80%" }}
                // style={{height:'90%', width:'90%', marginTop:'7px'}}
                src="assets/images/client-logo/Mitskart.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div style={{ border: "2px solid red" }} className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "80%", width: "80%" }}
                src="assets/images/client-logo/Amazon.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "80%", width: "80%" }}
                src="assets/images/client-logo/flipkart.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "80%", width: "80%" }}
                src="assets/images/client-logo/Meesho.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                // style={{height:'90%', width:'90%', marginTop:'7px'}}

                style={{ height: "70%", width: "80%"}}
                src="assets/images/client-logo/Mitskart.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div style={{ border: "2px solid red" }} className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "80%", width: "80%" }}
                src="assets/images/client-logo/Amazon.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "80%", width: "80%" }}
                src="assets/images/client-logo/flipkart.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "80%", width: "80%" }}
                src="assets/images/client-logo/Meesho.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        <div className="client-logo-item">
          <Link href="/contact">
            <a>
              <img
                style={{ height: "70%", width: "80%" }}
                // style={{height:'50%', width:'50%', marginTop:'7px', border:'2px solid red'}}
                src="assets/images/client-logo/Mitskart.png"
                alt="Client Logo"
              />
            </a>
          </Link>
        </div>
        {/* <div className="client-logo-item">
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
        </div>
        <div className="client-logo-item">
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
export default AvailableSlider;
