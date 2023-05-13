import Slider from "react-slick";
import { feedbackTwoActive } from "../sliderProps";
const FeedbackTwoSlider = () => {
  return (
    <Slider {...feedbackTwoActive} className="feedback-two-active mt-20">
      <div className="feedback-item style-two wow fadeInUp delay-0-2s">
        <div className="content-image">
          <p>
            Sit amet consectetur adipiscing eiusmod tempor incididunt labore
            dolore magna aliqae euisum suspendisse ultrices gravid aisuscom
            vivera accumsan facilisis
          </p>
          <div className="image">
            <img
              src="assets/images/reviews/feedback-author1.jpg"
              alt="Authro"
            />
            <img
              className="bg"
              src="assets/images/reviews/feedback-author-bg.png"
              alt="Background"
            />
          </div>
        </div>
        <div className="feedback-author">
          <div className="icon">
            <i className="flaticon-quote" />
          </div>
          <div className="title">
            <h4>Michael D. Foreman</h4>
            <span>CEO &amp; Founder</span>
          </div>
          <div className="ratting">
            <h6>Quality Foods</h6>
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
          </div>
        </div>
      </div>
      <div className="feedback-item style-two wow fadeInUp delay-0-4s">
        <div className="content-image">
          <p>
            Sit amet consectetur adipiscing eiusmod tempor incididunt labore
            dolore magna aliqae euisum suspendisse ultrices gravid aisuscom
            vivera accumsan facilisis
          </p>
          <div className="image">
            <img
              src="assets/images/reviews/feedback-author2.jpg"
              alt="Authro"
            />
            <img
              className="bg"
              src="assets/images/reviews/feedback-author-bg.png"
              alt="Background"
            />
          </div>
        </div>
        <div className="feedback-author">
          <div className="icon">
            <i className="flaticon-quote" />
          </div>
          <div className="title">
            <h4>Kenneth S. Slocum</h4>
            <span>Business Manager</span>
          </div>
          <div className="ratting">
            <h6>Quality Foods</h6>
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
          </div>
        </div>
      </div>
      <div className="feedback-item style-two wow fadeInUp delay-0-6s">
        <div className="content-image">
          <p>
            Sit amet consectetur adipiscing eiusmod tempor incididunt labore
            dolore magna aliqae euisum suspendisse ultrices gravid aisuscom
            vivera accumsan facilisis
          </p>
          <div className="image">
            <img
              src="assets/images/reviews/feedback-author1.jpg"
              alt="Authro"
            />
            <img
              className="bg"
              src="assets/images/reviews/feedback-author-bg.png"
              alt="Background"
            />
          </div>
        </div>
        <div className="feedback-author">
          <div className="icon">
            <i className="flaticon-quote" />
          </div>
          <div className="title">
            <h4>Kenneth S. Smith</h4>
            <span>CEO &amp; Founder</span>
          </div>
          <div className="ratting">
            <h6>Quality Foods</h6>
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
          </div>
        </div>
      </div>
      <div className="feedback-item style-two wow fadeInUp delay-0-8s">
        <div className="content-image">
          <p>
            Sit amet consectetur adipiscing eiusmod tempor incididunt labore
            dolore magna aliqae euisum suspendisse ultrices gravid aisuscom
            vivera accumsan facilisis
          </p>
          <div className="image">
            <img
              src="assets/images/reviews/feedback-author2.jpg"
              alt="Authro"
            />
            <img
              className="bg"
              src="assets/images/reviews/feedback-author-bg.png"
              alt="Background"
            />
          </div>
        </div>
        <div className="feedback-author">
          <div className="icon">
            <i className="flaticon-quote" />
          </div>
          <div className="title">
            <h4>Kenneth S. Slocum</h4>
            <span>Business Manager</span>
          </div>
          <div className="ratting">
            <h6>Quality Foods</h6>
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
          </div>
        </div>
      </div>
    </Slider>
  );
};
export default FeedbackTwoSlider;
