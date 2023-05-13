import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Slider from "react-slick";
import { Topseller, productActive } from "../sliderProps";
import axios from "axios";
import { baseUrl } from "../../pages/api/hello";
const TopSellers = () => {
  const [best, setBest] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/products?sort=name&page=1&limit=10&keywords=best`)
      .then((response) => {
        setLoading(false);
        setBest(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {best ? (
        <section
          style={{ width: "90%", margin: "auto" }}
          className="offer-banners-area"
        >
          {best.length > 0 ? (
            <div
              style={{ paddingBottom: "30px" }}
              className="section-title text-center mb-20"
            >
              <h2>Best Sellers </h2>
            </div>
          ) : (
            ""
          )}
          {loading ? (
            <Slider {...productActive}>
              {["1", "2", "3", "4"].map((e) => (
                <div
                  style={{
                    border: "2px solid red",
                    cursor: "pointer",
                    width: "120%",
                  }}
                  className=" wow fadeInUp delay-0-2s"
                >
                  <img
                    style={{ height: "150%", width: "150%", scale: "1.2" }}
                    src="https://miro.medium.com/v2/resize:fit:1200/1*xAUnGJlMvI622sjInCO6Bg.gif"
                    alt="not found"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...Topseller} className="product-active">
              {best
                ? best.map((e) => (
                    <Link href={`/product/${e._id}`}>
                      <MDBCard
                        style={{
                          maxWidth: "540px",
                          backgroundImage: `url("/assets/images/offers/offer-baner-bg1.png")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          padding: "20px",
                          margin: "auto",
                        }}
                      >
                        <MDBRow className="g-0">
                          <MDBCol md="6">
                            <MDBCardImage
                              style={{
                                position: "absolute",
                                top: "0%",
                                left: "0%",
                                height: "100px",
                                width: "100px",
                                opacity: "0.5",
                              }}
                              src="/assets/images/favorites.png"
                            />
                            <MDBCardImage
                              style={{
                                height: "250px",
                                width: "350px",
                                scale: "1.2",
                              }}
                              src={`${baseUrl}/${e.images[0]}`}
                              alt="..."
                              fluid
                            />
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBCardBody>
                              <MDBCardTitle>
                                {e.name ? e.name : ""}
                              </MDBCardTitle>
                              <MDBCardText>
                                {e.keywoards ? e.keywoards : ""}
                              </MDBCardText>

                              <Link href={`/product/${e._id}`}>
                                <a
                                  style={{ position: "absolute", top: "60%" }}
                                  className="theme-btn style-two"
                                >
                                  Shop Now{" "}
                                  <i className="fas fa-angle-double-right" />
                                </a>
                              </Link>
                            </MDBCardBody>
                          </MDBCol>
                        </MDBRow>
                      </MDBCard>
                    </Link>
                  ))
                : ""}
            </Slider>
          )}
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default TopSellers;
