import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../pages/api/hello";
import Link from "next/link";
import Slider from "react-slick";
import { productActive } from "../sliderProps";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/products?sort=-price`)
      .then((response) => {
        setLoading(false);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <section
        style={{ width: "95%", margin: "auto" }}
        className="product-section pt-50 rpt-70 pb-50 rpb-100"
      >
        <div className="container-fluid">
          <div className="section-title text-center mb-60">
            <h2>Quality Products </h2>
          </div>
          {loading ? (
            <Slider {...productActive} >
              {["1", "2", "3", "4"].map((e) => (
                <div
                  style={{
                    border:"2px solid red",
                    cursor: "pointer",
                    width: "120%",
                   
                  }}
                  className=" wow fadeInUp delay-0-2s"
                >
                  <img
                  style={{height:"150%", width:"150%", scale:"1.2"}}
                    src="https://miro.medium.com/v2/resize:fit:1200/1*xAUnGJlMvI622sjInCO6Bg.gif"
                    alt="not found"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...productActive} className="product-active">
              {products
                ? products.map((e) => (
                    <Link href={`/product/${e._id}`}>
                      <div
                        style={{
                          cursor: "pointer",
                          width: "120%",
                          margin: "10px",
                        }}
                        className="product-item wow fadeInUp delay-0-2s"
                      >
                        <span className="offer">{e.discount}% Off</span>
                        <div className="image">
                          <img
                            style={{ height: "170%" }}
                            src={`${baseUrl}/${e.images[0]}`}
                            alt="Product"
                          />
                        </div>
                        <div className="content">
                          <div style={{ marginTop: "60px" }}>
                            <h5>
                              <Link href="/product-details">
                                {e.name ? e.name.slice(0, 15) + "..." : ""}
                              </Link>
                            </h5>

                            <span className="price">
                              <del>₹{e.mrp}</del>
                              <span>₹{e.price}</span>
                            </span>
                          </div>
                          <div className="ratting">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                : ""}
            </Slider>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
