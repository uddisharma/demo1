import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import { clientLogo } from "../sliderProps";
import axios from "axios";
import {baseUrl} from '../../pages/api/hello.js';
const GallerySlider = () => {
  const [data, setData] = useState([]);

  const photos = () => {
    axios
      .get(`http://localhost:5000/galleryimages`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    photos();
  }, []);
  // console.log(data);
  return (
    <Fragment>
      <div className="container">
        <div className="col-lg-8">
          <div className="section-title mb-25">
            <span className="sub-title mb-15">Photo Gallery</span>
            <h2>Insite Photo Gallery</h2>
          </div>
        </div>
        <Slider {...clientLogo} className="client-logo-wrap">
          {data
            ? data.map((e) => (
                <div className="gallery-item wow fadeInUp delay-0-2s">
                  <img
                    style={{ cursor: "pointer",  width:'300px', height:"250px" }}
                    src={`http://localhost:5000/${e.photo[0]}`}
                    alt="Gallery"
                  />
                  <div className="gallery-over">
                    <div className="content">
                      <h4>View</h4>
                      {/* <p>Fresh Food</p> */}
                    </div>
                    <Link href="/portfolio-details">
                      <a target="_blank" href={e.link ? e.link : ""} className="details-btn">
                        <i className="fas fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              ))
            : ""}
        </Slider>
      </div>
    </Fragment>
  );
};
export default GallerySlider;
