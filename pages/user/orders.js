import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import Layout from "../../src/layout/Layout";
import axios from "axios";
import Link from "next/link";
import { baseUrl } from "../api/hello";
export default function ProfilePage() {
  let username;
  if (typeof window !== "undefined") {
    username = localStorage.getItem("username");
  }
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  // console.log(username);
  const [invoicelink, setInvoicelink] = useState("");
  const [details, setDetails] = useState([]);
  useEffect(() => {
    axios
      .post(`${baseUrl}/userprofile/${username}`)
      .then((res) => {
        setDetails(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  var [orders, setorders] = useState([]);
  const [shippingtoken, setShippingToken] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let username = localStorage.getItem("username");
    setLoading(true);
    axios
      .get(`${baseUrl}/orders/${username}`)
      .then((res) => {
        setorders(res.data);
        // console.log(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  orders = orders.sort(function (a, b) {
    return new Date(b.OrderDate) - new Date(a.OrderDate);
  });

  useEffect(() => {
    axios
      .post("https://apiv2.shiprocket.in/v1/external/auth/login", {
        email: "mitskart@gmail.com",
        password: "123456",
      })
      .then((res) => {
        setShippingToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(orders);
  const api = `https://apiv2.shiprocket.in/v1/external/orders/print/invoice`;
  function Invoice(id) {
    axios
      .post(
        api,
        {
          ids: [id],
        },
        { headers: { Authorization: `Bearer ${shippingtoken}` } }
      )
      .then((res) => {
        // console.log(res.data.invoice_url);
        setInvoicelink(res.data.invoice_url);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <Layout>
        <section style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-30">
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    {details.photo ? (
                      <MDBCardImage
                        src={details.photo}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: "150px" }}
                        fluid
                      />
                    ) : (
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                        alt="not found"
                      />
                    )}

                    <p
                      style={{ fontWeight: "bold" }}
                      className="text-muted mb-1"
                    >
                      {details.name}
                    </p>
                    <p className="text-muted mb-4">{details.email}</p>
                    <div className="d-flex justify-content-center mb-2">
                      {/* <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                    </div>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <Link href="/user/profile">
                        <MDBListGroupItem
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-between align-items-center p-3"
                        >
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src="/assets/images/user.png"
                            alt="not"
                          />
                          <MDBCardText style={{ fontWeight: "bold" }}>
                            Profile
                          </MDBCardText>
                        </MDBListGroupItem>
                      </Link>
                      <Link href="/user/orders">
                        <MDBListGroupItem
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-between align-items-center p-3"
                        >
                          {/* <MDBIcon
                        fab
                        icon="github fa-lg"
                        style={{ color: "#333333" }}
                      /> */}
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src="/assets/images/clipboard.png"
                            alt="not"
                          />
                          <MDBCardText style={{ fontWeight: "bold" }}>
                            Orders
                          </MDBCardText>
                        </MDBListGroupItem>
                      </Link>
                      <Link href="/wishlist">
                        <MDBListGroupItem
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-between align-items-center p-3"
                        >
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src="/assets/images/love.png"
                            alt="not"
                          />
                          <MDBCardText style={{ fontWeight: "bold" }}>
                            Wishlist
                          </MDBCardText>
                        </MDBListGroupItem>
                      </Link>
                      <Link href="/cart">
                        <MDBListGroupItem
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-between align-items-center p-3"
                        >
                          <img
                            style={{ height: "20px", width: "20px" }}
                            src="/assets/images/shopping-cart.png"
                            alt="not"
                          />
                          <MDBCardText style={{ fontWeight: "bold" }}>
                            Cart
                          </MDBCardText>
                        </MDBListGroupItem>
                      </Link>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                {loading && (
                  <div
                    style={{
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <img src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif" />
                  </div>
                )}
                {orders.map((e) => (
                  <div className="feedback-item style-two wow fadeInUp delay-0-2s">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="content-image"
                    >
                      <div>
                        <h6>#{e.orderID ? e.orderID : ""}</h6>
                        <h5>
                          <Moment format="MMMM Do YYYY">
                            {e.OrderDate ? e.OrderDate : ""}
                          </Moment>
                        </h5>
                        <h5>Status : {e.status ? e.status : ""}</h5>
                        <h5>
                          Payment : {e.paymentmethod ? e.paymentmethod : ""}
                        </h5>
                      </div>
                 
                      <div>
                        <Link href="/track-order">
                          <a
                            style={{
                              height: "45px",
                              backgroundColor: "whitesmoke",
                              color: "black",
                            }}
                            className="theme-btn style-two"
                          >
                            Track Order{" "}
                            <i className="fas fa-angle-double-right" />
                          </a>
                        </Link>{" "}
                        <br /> <br />
                        
                        <a
                          style={{
                            height: "45px",
                            backgroundColor: "whitesmoke",
                            color: "black",
                          }}
                          className="theme-btn style-two"
                          onClick={() => {
                            Invoice(e.orderID);
                          }}
                        >
                          Invoice <i className="fas fa-angle-double-right" />
                        </a>
                        {invoicelink ? (
                          <a
                            href={invoicelink}
                            style={{
                              height: "45px",
                              backgroundColor: "whitesmoke",
                              color: "black",
                            }}
                            className="theme-btn style-two"
                          >
                            Download <i className="fas fa-angle-double-right" />
                          </a>
                        ) : (
                          ""
                        )}
                        
                      </div>
                      <div className="image">
                        <img
                          src={`${baseUrl}/${e.order[0].images[0]}`}
                          alt="Authro"
                        />
                       
                      </div>
                    </div>
                    <div className="feedback-author">
                     
                      <div className="title">
                        <h4>
                          {e.order[0].name
                            ? e.order[0].name.slice(0, 20) + "..."
                            : ""}
                        </h4>
                        <span>
                          Qty : {e.order[0].quantity ? e.order[0].quantity : ""}
                        </span>
                        {/* <span style={{ marginLeft: "15px" }}>
                          Category :{" "}
                          {e.order[0].category ? e.order[0].category : ""}
                        </span> */}
                      </div>
                      <Link href={`/user/order/${e._id}`}>
                        <a
                          style={{
                            height: "45px",
                            backgroundColor: "whitesmoke",
                            color: "black",
                          }}
                          className="theme-btn style-two"
                        >
                          View Details{" "}
                          <i className="fas fa-angle-double-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </Layout>
    );
  }
}
