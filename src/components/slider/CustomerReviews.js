import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import { baseUrl } from "../../../pages/api/hello";
const CustomerReviews = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const props = {
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 400,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => setSlideIndex((next / 2) * 100),
  };
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/reviews`)
      .then((res) => {
        setReviews(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Fragment>
      <div className="feedback-content-area rmb-65 wow fadeInLeft delay-0-2s">
        <div className="section-title mb-50">
          <span className="sub-title mb-20">Customer Reviews</span>
          <h2>Valuable {`Customer’s`} Feedback </h2>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          style={{ backgroundSize: `${slideIndex}% 100%` }}
        >
          <span className="slider__label sr-only">50% completed</span>
        </div>

        <Slider {...props} className="feedback-active mt-20">
          {reviews
            ? reviews.map((e) => (
                <div className="feedback-item">
                  <p>{e.review ? e.review : ""}</p>
                  <div className="feedback-author">
                    <img
                      src={`${baseUrl}/${e.photos ? e.photos[0] : ""}`}
                      alt="Authro"
                    />
                    <div className="title">
                      <h4>{e.name ? e.name : ""}-</h4>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </Slider>
      </div>
    </Fragment>
  );
};
export default CustomerReviews;
