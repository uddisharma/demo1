import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import {baseUrl} from '../../pages/api/hello.js';
const Blogs = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/blogs`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function generateRandomDate(from, to) {
    return new Date(
      from.getTime() + Math.random() * (to.getTime() - from.getTime())
    );
  }
  // console.log(generateRandomDate(new Date(2023, 0, 1), new Date()).getDate());
  return (
    <div>
      <div className="container">
        <div className="section-title text-center mb-60">
          <span className="sub-title mb-20">Read Article Tips</span>
          <h2>Latest Blogs</h2>
        </div>
        <div className="row justify-content-center">
          {data
            ? data.map((e) => (
                <div className="col-xl-4 col-md-6">
                  <div className="news-item wow fadeInUp delay-0-2s">
                    <div className="image">
                      <img
                        src={`${baseUrl}/${e.images[0]}`}
                        alt="News"
                      />
                      {/* <span className="date">
                        <Moment format="MMMM Do ">
                          <b>
                            {generateRandomDate(
                              new Date(2023, 0, 1),
                              new Date()
                            )}
                          </b>
                        </Moment>
                      </span> */}
                    </div>
                    <div className="content">
                      {/* <span className="sub-title">Apple Cider Vinegar</span> */}
                      <h4>
                        <Link href={`/blog/${e._id}`}>
                          {e.heading}
                        </Link>
                      </h4>
                      <Link href={`/blog/${e._id}`}>
                        <a className="read-more">
                          Read More <i className="fas fa-angle-double-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : ""}

          {/* <div className="col-xl-4 col-md-6">
            <div className="news-item wow fadeInUp delay-0-4s">
              <div className="image">
                <img src="assets/images/news/melatonin.jpg" alt="News" />
                <span className="date">
                  <b>19</b> Dec
                </span>
              </div>
              <div className="content">
                <span className="sub-title">Melatonin and L-theanine</span>
                <h4>
                  <Link href="/blog/melatonin-and-L-theanine">
                    Poor sleep affects Indians, with over 37% of adult Indians
                    having difficulties falling asleep,
                  </Link>
                </h4>
                <Link href="/blog/melatonin-and-L-theanine">
                  <a className="read-more">
                    Read More <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="news-item wow fadeInUp delay-0-6s">
              <div className="image">
                <img src="assets/images/news/calcium.jpg" alt="News" />
                <span className="date">
                  <b>11</b> Jan
                </span>
              </div>
              <div className="content">
                <span className="sub-title">Calcium Deficiency</span>
                <h4>
                  <Link href="/blog/calcium-deficiency">
                    Calcium is an essential mineral that plays a critical role
                    in our body's health and well-being.
                  </Link>
                </h4>
                <Link href="/blog/calcium-deficiency">
                  <a className="read-more">
                    Read More <i className="fas fa-angle-double-right" />
                  </a>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="news-shapes">
        <img
          className="onion"
          src="assets/images/shapes/onion.png"
          alt="Onion"
        />
        <img
          className="two-leaf"
          src="assets/images/slider/two-lear.png"
          alt="Leaf"
        />
        <img
          className="half-leaf"
          src="assets/images/slider/half-leaf.png"
          alt="Leaf"
        />
        <img
          className="leaf-two"
          src="assets/images/shapes/leaf-three.png"
          alt="Leaf"
        />
        <img
          className="leaf-three"
          src="assets/images/shapes/leaf-four.png"
          alt="Leaf"
        />
      </div>
    </div>
  );
};

export default Blogs;
