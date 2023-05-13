import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { baseUrl } from "../../api/hello";
import Layout from "../../../src/layout/Layout";
import axios from "axios";
import Link from "next/link";
import Moment from "react-moment";
import AdminSidebar from "../../../src/components/AdminSidebar";
import { useRouter } from "next/router";
export default function product() {
  const router = useRouter();
  const id = router.query;
  //   console.log(id);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [orders, setOrders] = useState([]);
  const [laoding, setLoading] = useState(false);

  const Orders = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/product/${id.id}`)
      .then((res) => {
        setOrders(res.data.products);
        setLoading(false);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInitialRenderComplete(true);
    Orders();
  }, [id]);

  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2> product Details</h2>
        </div>
        <MDBContainer className="py-30">
          <MDBRow>
            <MDBCol lg="2">
              <AdminSidebar />
            </MDBCol>
            <MDBCol lg="10">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          gap: "15px",
                        }}
                      >
                        <Link
                          href={`/admin/productedit/${
                            orders.length > 0 && orders[0]._id
                          }`}
                        >
                          <button
                            style={{ backgroundColor: "#ff7800" }}
                            type="submit"
                            className="theme-btn style-two"
                          >
                            Edit Product
                            <i
                              style={{ marginRight: "7px" }}
                              className="fas fa-angle-double-right"
                            />
                          </button>
                        </Link>
                      </div>
                      {laoding && (
                        <div style={{ display: "grid", placeItems: "center" }}>
                          <img src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif" />
                        </div>
                      )}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>product Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {orders.length > 0 && orders.map((e) => e.name)}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Price</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            ₹{orders.length > 0 && orders.map((e) => e.price)}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>MRP</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            ₹{orders.length > 0 && orders.map((e) => e.mrp)}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Discount</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {orders.length > 0 && orders.map((e) => e.discount)}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Youtube Video</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="">
                            {orders.length > 0 && orders.map((e) => e.video)}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Stock</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText
                            style={{ fontWeight: "bold" }}
                            className="text-muted"
                          >
                            {orders.length > 0 && orders.map((e) => e.stock)}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Tags</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {orders.length > 0 && orders.map((e) => e.keywords)}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Categories</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {orders.length > 0 &&
                              orders[0].category.map((e) => e.category + "  ")}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <br />
                      <section className=" ">
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
                              style={{
                                backgroundColor: "#fdf4d7",
                                height: "300px",
                              }}
                              className=" wow fadeInUp delay-0-5s"
                            >
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${
                                  orders.length > 0 && orders[0].video
                                }?controls=0`}
                              ></iframe>
                            </div>
                          </div>
                          {orders.length > 0 &&
                            orders[0].images.map((e) => (
                              <div className="col-xl-4 col-md-6">
                                <div
                                  style={{
                                    backgroundColor: "#fdf4d7",
                                    height: "300px",
                                  }}
                                  className=" wow fadeInUp delay-0-5s"
                                >
                                  <img src={`${baseUrl}/${e}`} />
                                </div>
                              </div>
                            ))}
                        </div>
                        {/* <div
                          style={{
                            width: "90%",
                            display: "flex",
                            margin: "auto",
                            justifyContent: "center",
                            //  backgroundColor:'#fdf4d7'
                          }}
                          className="row"
                        >
                          {laoding == false && orders && orders.images[0] ? (
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
                                  src={`https://www.youtube.com/embed/${orders.video}?controls=0`}
                                ></iframe>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {laoding == false && orders && orders.images[0] ? (
                            <div className="col-xl-4 col-md-6">
                              <div
                                style={{
                                  backgroundColor: "#fdf4d7",
                                  height: "300px",
                                }}
                                className=" wow fadeInUp delay-0-5s"
                              >
                                <img src={`${baseUrl}/${orders.images[0]}`} />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {laoding == false && orders && orders.images[1] ? (
                            <div className="col-xl-4 col-md-6">
                              <div
                                style={{
                                  backgroundColor: "#fdf4d7",
                                  height: "300px",
                                }}
                                className=" wow fadeInUp delay-0-5s"
                              >
                                <img src={`${baseUrl}/${orders.images[1]}`} />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {laoding == false && orders && orders.images[2] ? (
                            <div className="col-xl-4 col-md-6">
                              <div
                                style={{
                                  backgroundColor: "#fdf4d7",
                                  height: "300px",
                                }}
                                className=" wow fadeInUp delay-0-5s"
                              >
                                <img src={`${baseUrl}/${orders.images[2]}`} />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          {laoding == false && orders && orders.images[3] ? (
                            <div className="col-xl-4 col-md-6">
                              <div
                                style={{
                                  backgroundColor: "#fdf4d7",
                                  height: "300px",
                                }}
                                className=" wow fadeInUp delay-0-5s"
                              >
                                <img src={`${baseUrl}/${orders.images[3]}`} />
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div> */}
                      </section>
                    </MDBCardBody>
                  </MDBCard>
                  <hr />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
