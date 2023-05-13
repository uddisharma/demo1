import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import CustomerReviews from "../src/components/slider/CustomerReviews";
import Layout from "../src/layout/Layout";
import { Topseller } from "../src/sliderProps";
import { productActive } from "../src/sliderProps";
import AvailableSlider from "../src/components/AvailableSlider";
import { baseUrl, hostPass, shiprocketAuth, shiprocketHost } from "./api/hello";
import HomeSlider4 from "../src/components/HomeSlider4";
import GallerySlider from "../src/components/GallerySlider";
import Blogs from "../src/components/Blogs";
import TopSellers from "../src/components/TopSellers";
import Products from "../src/components/Products";
import Categories from "../src/components/Categories";
// import Videos from "../src/components/Videos";
const MunfimCountdown = dynamic(
  () => import("../src/components/MunfimCountdown"),
  {
    ssr: false,
  }
);
const Index = () => {
  const [videos, setVideos] = useState([]);
 
  useEffect(() => {
    axios
      .get(`${baseUrl}/videos`)
      .then((res) => {
        setVideos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  
  }, []);

  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <Layout header={1}>
        <section style={{ marginTop: "150px" }}>
          <HomeSlider4 />
        </section>
        {/* <section className="category-section pt-50 rpt-100">
          <div className="section-title text-center mb-10">
            <h2>Shop by Categories </h2>
           
          </div>
          <div className="">
            <div
              style={{
                width: "90%",
                display: "flex",
                margin: "auto",
                justifyContent: "center",
              }}
              className="category-wrap"
            >
              <div className="category-item wow fadeInUp delay-0-3s">
                <div className="icon">
                  <img src="assets/images/category/skincare.png" alt="Icon" />
                </div>
                <h5>
                  <Link href="/services">Skin health</Link>
                </h5>
                <img src="assets/images/category/arrow.png" alt="Arrow" />
              </div>
              <div className="category-item wow fadeInUp delay-0-4s">
                <div className="icon">
                  <img src="assets/images/category/healthy.png" alt="Icon" />
                </div>
                <h5>
                  <Link href="/services">Boost Immunity</Link>
                </h5>
                <img src="assets/images/category/arrow.png" alt="Arrow" />
              </div>
              <div className="category-item wow fadeInUp delay-0-5s">
                <div className="icon">
                  <img src="assets/images/category/bone.png" alt="Icon" />
                </div>
                <h5>
                  <Link href="/services">Stronger bone</Link>
                </h5>
                <img src="assets/images/category/arrow.png" alt="Arrow" />
              </div>
              <div
                style={{ flex: 1.5 }}
                className="category-item wow fadeInUp delay-0-6s"
              >
                <div className="icon">
                  <img src="assets/images/category/weight.png" alt="Icon" />
                </div>
                <h5>
                  <Link href="/services">Weight management</Link>
                </h5>
                <img src="assets/images/category/arrow.png" alt="Arrow" />
              </div>
              <div className="category-item wow fadeInUp delay-0-7s">
                <div className="icon">
                  <img src="assets/images/category/wellness.png" alt="Icon" />
                </div>
                <h5>
                  <Link href="/services">Daily Wellness</Link>
                </h5>
                <img src="assets/images/category/arrow.png" alt="Arrow" />
              </div>
            </div>
          </div>
        </section> */}
        <Categories />
        <TopSellers />
        <Products />
        {videos.length > 0 && (
          <>
            <div className="section-title text-center mb-60">
              <h2>Video Testimonials </h2>
            </div>
            <section className="video-area ">
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  margin: "auto",
                  justifyContent: "center",
                  //  backgroundColor:'#fdf4d7'
                }}
                className="row"
              >
                {videos
                  ? videos.slice(0, 3).map((e) => (
                      <div className="col-xl-4 col-md-6">
                        <div
                          style={{
                            backgroundColor: "#fdf4d7",
                            height: "300px",
                          }}
                          className=" wow fadeInUp delay-0-5s"
                        >
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${e.video}?controls=0`}
                          ></iframe>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </section>
          </>
        )}

        <section style={{}} className="special-offer bg-lighter pt-250 pb-80">
          <div className="special-offer-content text-center py-130 rpy-100 wow fadeInUp delay-0-2s">
            <div className="section-title mb-30">
              <span className="sub-title mb-20">Bubble up with FITBUZZ</span>
              <h2>Good Nutrition With Healthy Goals</h2>
            </div>
            <p>
              Never have a dull day when it comes to your nutrition journey with
              FITBUZZ! Our products are designed to make it easy for you to
              prioritize your health and wellness. So why wait? Get your hands
              on FITBUZZ nutrition goodies today and experience the
              deliciousness and effectiveness yourself!
            </p>
            {/* <MunfimCountdown /> */}
            <div className="count-down-btns mt-10">
              <Link href="/shop">
                <a className="theme-btn">
                  Shop Now <i className="fas fa-angle-double-right" />
                </a>
              </Link>
              <Link href="/about">
                <a className="theme-btn style-two">
                  About Us <i className="fas fa-angle-double-right" />
                </a>
              </Link>
            </div>
          </div>
          <img
            className="offer-bg"
            src="assets/images/offers/special-offer-bg.png"
            alt="Offer BG"
          />
          <img
            className="munakoiso"
            src="assets/images/shapes/munakoiso.png"
            alt="Munakoiso"
          />
          <img
            className="litchi"
            src="assets/images/shapes/litchi.png"
            alt="Litchi"
          />

          <img
            style={
              {
                // height: "400px",
                // transform: "rotate(-30deg)"
              }
            }
            className="special-offer-left  wow slideInLeft delay-0-10s"
            src="assets/images/Fitbuzz/left.png"
            alt="Offer"
          />
          <img
            style={
              {
                // transform: "rotate(-30deg)"
              }
            }
            className="special-offer-right  wow slideInRight delay-0-5s"
            src="assets/images/Fitbuzz/right.png"
            alt="Offer"
          />
        </section>
        {/* Special Offer End */}
        {/* Call To Action Area Start */}
        <section className="cta-area">
          <div className="container">
            <div
              className="cta-inner overlay text-white wow fadeInUp delay-0-2s"
              style={{
                backgroundImage: "url(assets/images/background/cta-bg.jpg)",
              }}
            >
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <div className="section-title mt-20 mb-15">
                    {/* <span className="sub-title mb-15">Need Any Supports</span> */}
                    <h3>Have You Any Question ?</h3>
                  </div>
                </div>
                <div className="col-lg-4 text-lg-right">
                  <Link href="/contact">
                    <a className="theme-btn btn-white my-15">
                      Get In Touch With Us{" "}
                      <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Call To Action Area End */}
        {/* Gallery Area Start */}
        <section className="gallery-area pt-130 rpt-100">
          <GallerySlider />
        </section>
        {/* Gallery Area End */}
        {/* Feedback Section Start */}
        <section className="feedback-section pt-50 rpt-20">
          <div className="container">
            <div className="row large-gap">
              <div className="col-lg-6">
                <CustomerReviews />
              </div>
              <div className="col-lg-6">
                <div className="feedback-images wow fadeInRight delay-0-2s">
                  <img
                    className="first-image"
                    src="assets/images/reviews/Girlimage.jpg"
                    alt="Feedback"
                  />
                  <img
                    style={{ height: "500px", width: "600px" }}
                    className="last-image wow slideInRight delay-0-10s"
                    src="assets/images/reviews/apple.png"
                    alt="Feedback"
                  />
                  <img
                    className="bg-image"
                    src="assets/images/shapes/feedback-bg.png"
                    alt="Feedback"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="news-section pt-30 rpt-100 pb-0 rpb-40">
          <div
            style={{
              width: "90%",
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              //  backgroundColor:'#fdf4d7'
            }}
            className="row"
          >
            <div className="col-xl-4 col-md-6">
              <div
                style={{ backgroundColor: "#fdf4d7" }}
                className="about-feature-item wow fadeInUp delay-0-5s"
              >
                <span className="number">1</span>
                <div className="icon">
                  <img
                    style={{ height: "90px", display: "block", margin: "auto" }}
                    src="https://cdn-icons-png.flaticon.com/512/6213/6213156.png"
                  />
                </div>
                <h4 style={{ textAlign: "center" }}>
                  <Link href="/service-details">Free Shipping</Link>
                </h4>
                <p style={{ color: "black", textAlign: "center" }}>
                  On order above ₹ 699
                </p>
                <img
                  style={{ display: "block", margin: "auto" }}
                  src="assets/images/about/arrow.png"
                  alt="Arrow"
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div
                style={{ backgroundColor: "#fdf4d7" }}
                className="about-feature-item wow fadeInUp delay-0-6s"
              >
                <span className="number">2</span>
                <div className="icon">
                  {/* <i
                  style={{
                    display: "block",
                    margin: "auto",
                    textAlign: "center",
                  }}
                  className="flaticon-return-box"
                /> */}
                  <img
                    style={{ height: "90px", display: "block", margin: "auto" }}
                    src="https://cdn-icons-png.flaticon.com/512/670/670910.png"
                  />
                </div>
                <h4 style={{ textAlign: "center" }}>
                  <Link href="/service-details" style={{ color: "white" }}>
                    Easy Return
                  </Link>
                </h4>
                <p style={{ color: "black", textAlign: "center" }}>
                  15 days return policy
                </p>
                <img
                  style={{ display: "block", margin: "auto" }}
                  src="assets/images/about/arrow.png"
                  alt="Arrow"
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div
                style={{ backgroundColor: "#fdf4d7" }}
                className="about-feature-item wow fadeInUp delay-0-7s"
              >
                <span className="number">3</span>
                <div className="icon">
                  <img
                    style={{ height: "90px", display: "block", margin: "auto" }}
                    src="https://cdn-icons-png.flaticon.com/512/3745/3745355.png"
                  />
                </div>
                <h4 style={{ textAlign: "center" }}>
                  <Link href="/service-details">Secure Payments</Link>
                </h4>
                <p style={{ color: "black", textAlign: "center" }}>
                  Your payment is processed securely
                </p>
                <img
                  style={{ display: "block", margin: "auto" }}
                  src="assets/images/about/arrow.png"
                  alt="Arrow"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="news-section pt-70 rpt-100 pb-0 rpb-40">
          <div className="section-title text-center mb-60">
            <h2>We are Available at </h2>
          </div>
          <AvailableSlider />
        </section>
        <section className="news-section pt-130 rpt-100 pb-70 rpb-40">
          <Blogs />
        </section>
        <div className="client-logo-section text-center  py-60">
          <div className="container">
            <ClientLogoSlider />
          </div>
          <div className="client-logo-shapes">
            <img
              className="shape-one"
              src="assets/images/shapes/cl-shape1.png"
              alt="Shape"
            />
            <img
              className="shape-two"
              src="assets/images/shapes/cl-shape2.png"
              alt="Shape"
            />
            <img
              className="shape-three"
              src="assets/images/shapes/cl-shape3.png"
              alt="Shape"
            />
            <img
              className="shape-four"
              src="assets/images/shapes/cl-shape4.png"
              alt="Shape"
            />
            <img
              className="shape-five"
              src="assets/images/shapes/cl-shape5.png"
              alt="Shape"
            />
            <img
              className="shape-six"
              src="assets/images/shapes/cl-shape6.png"
              alt="Shape"
            />
          </div>
        </div>
      </Layout>
    );
  }
};
export default Index;
