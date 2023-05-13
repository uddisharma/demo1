import Link from "next/link";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import FeedbackTwoSlider from "../src/components/FeedbackTwoSlider";
import PageBanner from "../src/components/PageBanner";
import ExperienceTeam from "../src/components/slider/ExperienceTeam";
import PhotoGallery from "../src/components/slider/PhotoGallery";
import Layout from "../src/layout/Layout";
import { baseUrl } from "./api/hello";
// import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const About = () => {
  // var items = useSelector((state) => state.cartitems);
  // console.log(items);
  return (
    <Layout>
      {/* <PageBanner pageName={"about us"} /> */}
      {/* Page Banner End */}
      {/* About Section Start */}
      <section className="about-page-section rel z-1 py-50 rpy-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-three-content rmb-35 wow fadeInLeft delay-0-2s">
                <div className="section-title mb-20">
                  {/* <span className="sub-title mb-20">About Company</span> */}
                  <h2>About Us</h2>
                </div>
                <p>
                  Welcome to Fitbuzz Family! We are a company dedicated to
                  providing high-quality effervescent tablets to help you
                  maintain a healthy lifestyle. Our mission is to make it easy
                  for you to stay healthy and feel your best, no matter how busy
                  your life will be.
                  <br />
                  Fitbuzz effervescent tablets are made with the highest-quality
                  ingredients. They are designed to dissolve quickly and easily
                  in water, making them a convenient and easy-to-use option for
                  people on the go. We offer a wide range of effervescent
                  tablets, including those designed to support your immune
                  system, help you recover from exercise, promote better sleep,
                  and more.
                  <br />
                  <br />
                  At our core, we believe everyone deserves to live a healthy
                  and happy life. That's why we work tirelessly to ensure that
                  our effervescent tablets are the best they can be. We use only
                  the highest-quality ingredients and work closely with experts
                  in the field to develop products that are safe, effective, and
                  easy to use.
                  <br />
                  <br />
                  We are committed to providing excellent customer service and
                  are always here to answer any questions you may have. So if
                  you're looking for a convenient and effective way to maintain
                  your health, look no further than our effervescent tablets.
                  Thank you for choosing us as your trusted source for health
                  and wellness products!
                  <br />
                </p>
                {/* <div className="row mt-30">
                  <div className="col-md-6">
                    <div className="about-feature-two">
                      <div className="icon">
                        <i className="flaticon-wheat-sack" />
                      </div>
                      <h4>
                        <Link href="/service-details">
                          Agriculture &amp; Foods
                        </Link>
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-feature-two">
                      <div className="icon">
                        <i className="flaticon-fruits" />
                      </div>
                      <h4>
                        <Link href="/service-details">
                          Vegetables &amp; Fruits
                        </Link>
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-feature-two">
                      <div className="icon">
                        <i className="flaticon-eggs-1" />
                      </div>
                      <h4>
                        <Link href="/service-details">Farming products</Link>
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-feature-two">
                      <div className="icon">
                        <i className="flaticon-social-care" />
                      </div>
                      <h4>
                        <Link href="/service-details">
                          Crisp Bread &amp; Cake’s
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-lg-6 text-lg-right">
              <div className="about-video wow fadeInRight delay-0-2s">
                <img
                  className="image"
                  src="assets/images/about/about-page.jpg"
                  alt="About"
                />
                <a
                  href="https://www.youtube.com/watch?v=9Y7ma241N8k"
                  className="mfp-iframe video-play"
                >
                  <i className="fas fa-play" />
                </a>
                <img
                  className="bg-shape"
                  src="assets/images/about/about-bg-shape.png"
                  alt="Shape"
                />
              </div>
            </div>
          </div>
        </div>
        <img
          src="assets/images/shapes/about-page.png"
          alt="Shape"
          className="shape"
        />
      </section>

      <section className="about-section-two rel z-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-two-image not-rounded wow fadeInUp delay-0-2s">
                <img
                  className="image"
                  src="assets/images/about/about-page-left.jpg"
                  alt="About"
                />
                <img
                  className="about-over"
                  src="assets/images/about/about-left-over.png"
                  alt="About"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-two-content pt-60 wow fadeInUp delay-0-4s">
                <div className="section-title mb-35">
                  {/* <span className="sub-title mb-20">Why Choose Us</span> */}
                  <h2>Get your daily dose of vitamins with Fitbuzz Effervescent Tablets</h2>
                </div>
                <div className="about-features mt-60">
                  <div className="row">
                    <div className="col-xl-4 col-md-6">
                      <div
                        style={{ backgroundColor: "white" }}
                        className="about-feature-item wow fadeInUp delay-0-5s"
                      >
                        <span className="number">1</span>
                        <div className="icon">
                          <img
                            style={{
                              height: "90px",
                              display: "block",
                              margin: "auto",
                            }}
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
                        style={{ backgroundColor: "white" }}
                        className="about-feature-item wow fadeInUp delay-0-6s"
                      >
                        <span className="number">2</span>
                        <div className="icon">
                          <img
                            style={{
                              height: "90px",
                              display: "block",
                              margin: "auto",
                            }}
                            src="https://cdn-icons-png.flaticon.com/512/670/670910.png"
                          />
                        </div>
                        <h4 style={{ textAlign: "center" }}>
                          <Link
                            href="/service-details"
                            style={{ color: "white" }}
                          >
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
                        style={{ backgroundColor: "white" }}
                        className="about-feature-item wow fadeInUp delay-0-7s"
                      >
                        <span className="number">3</span>
                        <div className="icon">
                          <img
                            style={{
                              height: "90px",
                              display: "block",
                              margin: "auto",
                            }}
                            src="https://cdn-icons-png.flaticon.com/512/3745/3745355.png"
                          />
                        </div>
                        <h4 style={{ textAlign: "center" }}>
                          <Link href="/service-details">Secure Payments</Link>
                        </h4>
                        <p style={{ color: "black", textAlign: "center" }}>
                          Securely payment processed
                        </p>
                        <img
                          style={{ display: "block", margin: "auto" }}
                          src="assets/images/about/arrow.png"
                          alt="Arrow"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-shapes">
          <img src="assets/images/shapes/about-shape1.png" alt="Shape" />
          <img src="assets/images/shapes/about-shape2.png" alt="Shape" />
        </div>
      </section>
      {/* About Section End */}
      {/* Feedback Section Start */}
      {/* <section className="feedback-section pt-100 rpt-70 pb-130 rpb-100">
        <div className="container">
          <div className="section-title text-center mb-60">
            <span className="sub-title mb-20">Customer Reviews</span>
            <h2>Valuable Customer’s Feedback</h2>
          </div>
        </div>
        <FeedbackTwoSlider />
      </section> */}
      {/* Feedback Section End */}
      {/* Client Logo Section Start */}
      <div className="client-logo-section text-center bg-light-green py-60">
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
};
export default About;
