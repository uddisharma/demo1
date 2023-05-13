import React, { useEffect, useState } from "react";
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
import { baseUrl } from "../api/hello";
import Layout from "../../src/layout/Layout";
import axios from "axios";
import Link from "next/link";
export default function ProfilePage() {
  // console.log(username);
  let username;
  if (typeof window !== "undefined") {
    username = localStorage.getItem("username");
  }
  const [details, setDetails] = useState([]);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .post(`${baseUrl}/userprofile/${username}`)
      .then((res) => {
        setLoading(false);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {details.name
                            ? details.name
                            : "Your name" + " " + details.lastname
                            ? details.lastname
                            : ""}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {details.email ? details.email : "Your email address"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {details.phone ? details.phone : "not added till now"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mobile</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {details.alternatephone
                            ? details.alternatephone
                            : "not added till now"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="">
                          {details.address
                            ? details.address
                            : "not addeed till now"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>District</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="">
                          {details.district
                            ? details.district
                            : "not added till now"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>State</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="">
                          {details.state ? details.state : "not added till now"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                <div style={{ display: "grid", placeItems: "end" }}>
                  <Link href={`/user/${details._id}`}>
                    <button type="submit" className="theme-btn style-two">
                      Edit profile
                      <i className="fas fa-angle-double-right" />
                    </button>
                  </Link>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </Layout>
    );
  }
}
