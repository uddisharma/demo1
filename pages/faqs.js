import Link from "next/link";
import { Accordion } from "react-bootstrap";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import FeedbackTwoSlider from "../src/components/FeedbackTwoSlider";
import MunfirmAccordion from "../src/components/MunfirmAccordion";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
const Faqs = () => {
  return (
    <Layout>
      {/* <PageBanner pageName={"FAQs"} /> */}
      <section className="what-we-want rel z-1 bg-lighter pt-130 rpt-100 pb-95 rpb-65">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-5">
              <div className="what-we-want-content mb-30 rmb-65 wow fadeInUp delay-0-2s">
                <div className="section-title mb-20">
                  <span className="sub-title mb-20">What We Want</span>
                  <h2>Know Something About We Want Customers</h2>
                </div>
                <p>
                  On the other hand we denounce with righteou indignation
                  dislike men who are beguiled and demoralized by the charms
                </p>
                <Link href="/services">
                  <a className="read-more color-secondary">
                    Read More <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="what-we-want-features">
                <div className="row">
                  <div className="col-md-6">
                    <div className="about-feature-item style-two wow fadeInUp delay-0-4s">
                      <div className="icon">
                        <i className="flaticon-offer" />
                      </div>
                      <h4>
                        <Link href="/service-details">Discount Options</Link>
                      </h4>
                      <p>Sit amet consectetur adipis cing elit sed eiusmoe</p>
                      <img src="assets/images/about/arrow.png" alt="Arrow" />
                      <div
                        className="feature-bg"
                        style={{
                          backgroundImage:
                            "url(assets/images/features/feature-bg.jpg)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="about-feature-item style-two wow fadeInUp delay-0-6s">
                      <div className="icon">
                        <i className="flaticon-return-box" />
                      </div>
                      <h4>
                        <Link href="/service-details">Best Return Policy</Link>
                      </h4>
                      <p>Sit amet consectetur adipis cing elit sed eiusmoe</p>
                      <img src="assets/images/about/arrow.png" alt="Arrow" />
                      <div
                        className="feature-bg"
                        style={{
                          backgroundImage:
                            "url(assets/images/features/feature-bg.jpg)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="what-we-want-shapes">
          <img
            className="shape-one"
            src="assets/images/shapes/www-shape1.png"
            alt="Shape"
          />
          <img
            className="shape-two"
            src="assets/images/shapes/www-shape2.png"
            alt="Shape"
          />
        </div>
      </section>
      {/* What We Want Section End */}
      {/* FAQs Section Start */}
      <section className="faq-section rel z-1 pt-130 rpt-100">
        <div className="container">
          <div className="section-title text-center mb-60">
            <span className="sub-title mb-20">Asked Questions</span>
            <h2>Have any Questions</h2>
          </div>
          <Accordion
            defaultActiveKey="collapse0"
            className="faqs wow fadeInUp delay-0-2s"
            id="faqs"
          >
            <MunfirmAccordion
              title={`How Even Small UX Changes Can Result In An Increase In Conversion (A
        Case Study)`}
              event="collapse0"
            />
            <MunfirmAccordion
              title={`Performance Game Changer: Browser Back/Forward Cache`}
              event="collapse1"
            />
            <MunfirmAccordion
              title={`Resilience, Flexibility And Immediacy: Working With Headless
              Systems`}
              event="collapse2"
            />
            <MunfirmAccordion
              title={`How Partytown Eliminates Website Bloat From Third-Party Scripts`}
              event="collapse3"
            />
            <MunfirmAccordion
              title={`Preventing Bad UX Through Integrated Design Workflows`}
              event="collapse4"
            />
            <MunfirmAccordion
              title={`Designing Better Navigation With Navigation Queries `}
              event="collapse5"
            />
            <MunfirmAccordion
              title={`Productivity Tips And Tools For A More Efficient Workflow `}
              event="collapse6"
            />
            <MunfirmAccordion
              title={`The Ultimate Guide To Push Notifications For Developers `}
              event="collapse7"
            />
            <MunfirmAccordion
              title={`When And How To Use Freelancers In Your Organization `}
              event="collapse8"
            />
            <MunfirmAccordion
              title={`Boost Resource Loading With fetchpriority, A New Priority Hint `}
              event="collapse10"
            />
          </Accordion>
        </div>
        <div className="faq-shapes">
          <img
            className="shape-one"
            src="assets/images/shapes/faq-shape1.png"
            alt="Shape"
          />
          <img
            className="shape-two"
            src="assets/images/shapes/faq-shape2.png"
            alt="Shape"
          />
          <img
            className="shape-three"
            src="assets/images/shapes/faq-shape3.png"
            alt="Shape"
          />
          <img
            className="shape-four"
            src="assets/images/shapes/faq-shape4.png"
            alt="Shape"
          />
        </div>
      </section>
      {/* FAQs Section End */}
      {/* Feedback Section Start */}
      <section className="feedback-section pt-110 rpt-80 pb-130 rpb-100">
        <div className="container">
          <div className="section-title text-center mb-60">
            <span className="sub-title mb-20">Customer Reviews</span>
            <h2>Valuable Customer’s Feedback</h2>
          </div>
        </div>
        <FeedbackTwoSlider />
      </section>
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
export default Faqs;
