import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import PageBanner from "../../src/components/PageBanner";
import ReactImageMagnify from "react-image-magnify";
// import '../../src/components/images.js'
import { addItemToCart, addToBasket } from "../../slices/basketSlice";
import Layout from "../../src/layout/Layout";
import { productActiveTwo } from "../../src/sliderProps";
import { useRouter } from "next/router";
// import '../../public/assets/css/style.css'
import { addToCart } from "../../slices/cartSlice";
import {
  baseUrl,
  shiprocketAuth,
  shiprocketHost,
  hostPass,
} from "../api/hello";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../src/components/Modal";

const ProductDetails = () => {
  var items = useSelector((state) => state.basket);
  // console.log(shiprocketAuth, hostPass, shiprocketHost, baseUrl)
  const dispatch = useDispatch();
  // console.log(shiprocketHost)
  const [added, setAdded] = useState(false);
  const [products, setProducts] = useState([]);
  const [isData, setIsData] = useState(false);
  const [isloaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [sort, setSort] = useState("name");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const Id = router.query.Id;
  console.log(Id);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  if (typeof window === "object") {
    document.addEventListener("DOMContentLoaded", function () {
      alert("Finished loading");
    });
  }

  useEffect(() => {
    setLoading(true);
    axios

      .get(`${baseUrl}/product/${Id}`)

      .then((response) => {
        console.log(response);
        setProducts(response.data.products);
        setIsData(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Id]);
  // console.log(products);
  const videoUrl = products && products.length > 0 ? products.video : "";
  const [Idata, setIData] = useState({
    image: products && products.length > 0 ? products[0].images[0] : "",
    index: 0,
  });
  const [modal, setModal] = useState(true);

  const imgAction = (action) => {
    let i = data.index;
    if (action === "next-img") {
      setData({ image: products.images[i + 1], index: i + 1 });
    }
    if (action === "previos-img") {
      setData({ image: products.images[i - 1], index: i - 1 });
    }
  };
  useEffect(() => {
    setIsLoaded(true);
    axios
      .get(`${baseUrl}/products`)
      .then((response) => {
        setIsLoaded(false);
        setData(response.data.products);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  }, [sort, limit, page]);
  const [showModal, setShowModal] = useState(false);

  const handleaddtocart = () => {
    dispatch(addToBasket(items.items, products));

    setAdded(true);
  };
  const [shippingtoken, setShippingToken] = useState("");

  useEffect(() => {
    axios
      .post(`${shiprocketAuth}`, {
        email: `${shiprocketHost}`,
        password: `${hostPass}`,
      })
      .then((res) => {
        setShippingToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [zipcode, setZipCode] = useState("");
  const [available, setAvailable] = useState("");
  const checkorder = () => {
    const api = `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=134113&delivery_postcode=${zipcode}&weight=1&cod=1`;

    if (zipcode == "") {
      alert("Please Enter Zipcode");
    } else {
      axios
        .get(api, { headers: { Authorization: `Bearer ${shippingtoken}` } })
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            setAvailable(res.data.status);
          } else {
            setAvailable(res.data.status);
          }
        })
        .catch((err) => {
          console.log(err);
          setAvailable(404);
        });
    }
  };

  if (!initialRenderComplete) {
    return null;
  } else if (loading) {
    <div style={{ display: "grid", placeItems: "center" }}>
      <img src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif" />
    </div>;
  } else {
    return (
      <Layout>
        <section className="product-details-area pt-10 rpt-100">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              {isData && (
                <div id="content-wrapper">
                  <div class="column">
                    <div style={{ paddingBottom: "20px" }}>
                      <div id="featured">
                        <ReactImageMagnify
                          {...{
                            smallImage: {
                              alt: "not found",
                              isFluidWidth: true,
                              src: Idata.image
                                ? `${baseUrl}/${Idata.image}`
                                : `${baseUrl}/${products[0].images[0]}`,
                              lensStyle: {
                                background: "hsla(0, 0%, 100%, .3)",
                                border: "1px solid #ccc",
                              },
                              shouldUsePositiveSpaceLens: true,
                            },
                            largeImage: {
                              lensStyle: {
                                background: "hsla(0, 0%, 100%, .3)",
                                border: "1px solid #ccc",
                              },
                              src: Idata.image
                                ? `${baseUrl}/${Idata.image}`
                                : `${baseUrl}/${products[0].images[0]}`,
                              width: 1800,
                              height: 1800,
                            },
                          }}
                        />
                        {/* <img
                        id="featured"
                        style={{
                          width: "100%",
                          margin: "auto",
                        }}
                        src={
                          // products.length > 0
                          //   ? `${baseUrl}/${products.images[0]}`
                          //   : "/assets/images/videosign.png"
                          Idata.image
                            ? `${baseUrl}/${Idata.image}`
                            : `${baseUrl}/${products.images[0]}`
                        }
                        alt=""
                      /> */}
                      </div>
                    </div>
                    {/* <div id="featureddiv"></div> */}
                    <div
                      style={{ width: "100%", margin: "auto" }}
                      id="slide-wrapper"
                    >
                      {products.length > 0 &&
                        products[0].images.map((image, index) => {
                          return index < 4 ? (
                            <div
                              id="slide"
                              key={index}
                              onClick={() => setIData({ image, index })}
                              style={{}}
                            >
                              <img
                                style={{}}
                                src={`${baseUrl}/${image}`}
                                alt=""
                              />
                            </div>
                          ) : null;
                        })}

                      <div>
                        <img
                          style={{
                            width: "120px",
                            height: "120px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setShowModal(true);
                            // document.getElementById("detail").style.zIndex = 1;
                          }}
                          src="/assets/images/videosign.png"
                        />
                        <Modal
                          onClose={() => setShowModal(false)}
                          show={showModal}
                        >
                          <iframe
                            width="100%"
                            height="500px"
                            src={`https://www.youtube.com/embed/${videoUrl}`}
                          ></iframe>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div
                id="detail"
                // style={{ zIndex: -1 }}
                className="col-xl-5 col-lg-6"
              >
                <div className="product-details-content mb-30 wow fadeInRight delay-0-2s">
                  <div className="off-ratting mb-15">
                    <span className="off">
                      {products ? products[0].discount : ""}% Off
                    </span>
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                  <div className="section-title mb-20">
                    <h3>{products ? products[0].name : ""}</h3>
                  </div>

                  <span className="price mb-20">{products[0].price}</span>
                  <hr />
                  <div id="featureddiv"></div>
                  {products[0].stock == 0 ? (
                    <>
                      <button className="theme-btn">
                        Out Of Stock <i className="fas fa-angle-double-right" />
                      </button>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "20px",
                          marginTop: "30px",
                        }}
                      >
                        <input
                          style={{ flex: "6", height: "50px" }}
                          type="email"
                          placeholder="your email address"
                          autoComplete="email"
                          required=""
                        />
                        <button
                          style={{
                            flex: "4",
                            height: "50px",
                            background: "#76a713",
                          }}
                          className="theme-btn"
                        >
                          Notify me !{" "}
                          <i className="fas fa-angle-double-right" />
                        </button>
                      </div>
                    </>
                  ) : added == false ? (
                    <button
                      onClick={() => {
                        dispatch(addToCart(products ? products[0] : ""));
                        setAdded(true);
                      }}
                      type="submit"
                      className="theme-btn"
                    >
                      Add to Cart <i className="fas fa-angle-double-right" />
                    </button>
                  ) : (
                    <Link href="/cart">
                      <button className="theme-btn">
                        View Cart <i className="fas fa-angle-double-right" />
                      </button>
                    </Link>
                  )}

                  <hr />
                  <b>Check Delivery Availablity</b>
                  <div className="discount-wrapper rmb-30">
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      action="#"
                      className="d-sm-flex justify-content-center justify-content-lg-start"
                    >
                      <input
                        value={zipcode}
                        onChange={(e) => {
                          setZipCode(e.target.value);
                        }}
                        type="number"
                        id="coupon"
                        name="zipcode"
                        placeholder="Your area pincode"
                        required=""
                      />
                      {/* {available.length == 0 ? ( */}
                      <button
                        className="theme-btn style-two"
                        onClick={checkorder}
                      >
                        check delivery{" "}
                        <i className="fas fa-angle-double-right" />
                      </button>
                    </form>
                    {available == 200 ? (
                      <p
                        style={{
                          color: "green",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Delivery Available in this area
                      </p>
                    ) : (
                      ""
                    )}
                    {available == 404 ? (
                      <p
                        style={{
                          color: "red",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        Delivery is not Available in this area
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <hr />
                  <ul className="category-tags pt-10">
                    <li>
                      <b>Category</b>
                      <span>:</span>
                      {/* <a href="#">{products ? products.category : ""}</a> */}
                    </li>
                    <li>
                      <b>Tags</b>
                      <span>:</span>
                      <a href="#">{products ? products[0].keywords : ""}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Tab.Container defaultActiveKey={"details"}>
              <Nav className="nav nav-tabs product-information-tab pt-35 mb-25">
                <li>
                  <Nav.Link
                    eventKey={"review"}
                    href="#review"
                    data-toggle="tab"
                  >
                    Review (03)
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link
                    eventKey={"details"}
                    href="#details"
                    data-toggle="tab"
                  >
                    Description
                  </Nav.Link>
                </li>
              </Nav>
              <Tab.Content className="tab-content wow fadeInUp delay-0-2s">
                <Tab.Pane className="tab-pane" eventKey="review">
                  <ul className="comment-list">
                    <li>
                      <div className="comment-body">
                        <div className="author-thumb">
                          <img
                            src="/assets/images/reviews/Screenshot_3.png"
                            alt="Author"
                          />
                        </div>
                        <div className="comment-content">
                          <div className="name-date">
                            <h6>Rohit Negi</h6>
                            <span className="comment-date">25 Mar 2023</span>
                            <div className="ratting">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                          </div>
                          <p>
                            I have been using this product for a month now and
                            have noticed a significant improvement in my energy
                            levels and digestion. The taste is pleasant, and the
                            ingredients are all-natural, which is important to
                            me. Overall, I highly recommend this product to
                            anyone looking to improve their overall health and
                            well-being.
                          </p>
                          <a href="#" className="reply-link">
                            Reply <i className="fas fa-long-arrow-alt-right" />
                          </a>
                        </div>
                      </div>
                      <ul className="children">
                        <li>
                          <div className="comment-body">
                            <div className="author-thumb">
                              <img
                                src="/assets/images/reviews/Screenshot_2.png"
                                alt="Author"
                              />
                            </div>
                            <div className="comment-content">
                              <div className="name-date">
                                <h6>Vandana Sharma</h6>
                                <span className="comment-date">
                                  12 Mar 2023
                                </span>
                                <div className="ratting">
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star" />
                                </div>
                              </div>
                              <p>
                                I have been taking this for the past month and
                                have noticed a significant increase in my energy
                                levels and overall well-being. The combination
                                of vitamins and minerals in this supplement
                                seems to be just what my body needed. I highly
                                recommend giving Vitality Max a try for anyone
                                looking to boost their health.
                              </p>
                              <a href="#" className="reply-link">
                                Reply{" "}
                                <i className="fas fa-long-arrow-alt-right" />
                              </a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="comment-body">
                        <div className="author-thumb">
                          <img
                            src="/assets/images/reviews/Screenshot_1.png"
                            alt="Author"
                          />
                        </div>
                        <div className="comment-content">
                          <div className="name-date">
                            <h6>Priya Malik</h6>
                            <span className="comment-date">19 Feb 2023</span>
                            <div className="ratting">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </div>
                          </div>
                          <p>
                            I recently tried this product, and I must say, I was
                            impressed. Not only did it provide me with the
                            stress that I was looking for, but it also tasted
                            great. I would highly recommend this product to
                            anyone looking for a natural solution to his
                            concerns.
                          </p>
                          <a href="#" className="reply-link">
                            Reply <i className="fas fa-long-arrow-alt-right" />
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Tab.Pane>
                <Tab.Pane className="tab-pane" eventKey="details">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: products ? products[0].description : "",
                    }}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </section>
        {/* Product Details End */}
        {/* Revidew Form Area Start */}
        <div className="review-form-area pt-65">
          <div className="container">
            <form
              onSubmit={(e) => e.preventDefault()}
              id="review-form"
              className="review-form wow fadeInUp delay-0-2s"
              name="comment-form"
              action="#"
              method="post"
            >
              <div className="section-title mb-15">
                <h3>Leave a Comments</h3>
              </div>
              <div className="ratting mb-40">
                <span>Your Rating</span>
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      id="full-name"
                      name="full-name"
                      className="form-control"
                      defaultValue=""
                      placeholder="Full Name"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      id="number"
                      name="number"
                      className="form-control"
                      defaultValue=""
                      placeholder="Phone Number"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      defaultValue=""
                      placeholder="Email Address"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows={4}
                      placeholder="Write Message"
                      required=""
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group mb-0">
                    <button
                      // onClick={handleonload}
                      type="submit"
                      className="theme-btn"
                    >
                      Send Reviews
                      <i className="fas fa-angle-double-right" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Revidew Form Area End */}
        {/* Related Products Start */}
        <section className="related-product rel z-1 pt-125 rpt-95 pb-130 rpb-100">
          <div className="container">
            <div className="section-title text-center mb-60">
              <h3>Related Products</h3>
            </div>
            <Slider {...productActiveTwo} className="product-active-two">
              {data.map((e) => (
                <Link href={`/product/${e._id}`}>
                  <div
                    style={{ cursor: "pointer" }}
                    className="product-item wow fadeInUp delay-0-2s"
                  >
                    <div className="image">
                      <img
                        style={{ height: "100%" }}
                        src={`${baseUrl}/${e.images[0]}`}
                        alt="Product"
                      />
                    </div>
                    <div className="content">
                      <div className="ratting">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                      <h5>
                        <Link href="/product-details">
                          {e.name ? e.name.slice(0, 20) + "..." : ""}
                        </Link>
                      </h5>
                      <span className="price">
                        <span>₹{e.price}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </section>
      </Layout>
    );
  }
};

export default ProductDetails;

