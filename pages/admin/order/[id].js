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
export default function Orders() {
  const router = useRouter();
  const id = router.query;
  // console.log(id);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [orders, setOrders] = useState([]);
  const [laoding, setLoading] = useState(false);

  const Orders = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/order/${id.id}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInitialRenderComplete(true);
    Orders();
  }, []);
  console.log(orders);
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
     
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Order #{orders.orderID}</h2>
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
                    {laoding && (
                        <div style={{ display: "grid", placeItems: "center" }}>
                          <img src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif" />
                        </div>
                      )}
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Full Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {orders.name
                              ? orders.name
                              : "Your name" + " " + orders.lastname
                              ? orders.lastname
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
                            {orders.email ? orders.email : "Your email address"}
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
                            {orders.phone ? orders.phone : "not added till now"}
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
                            {orders.alternatephone
                              ? orders.alternatephone
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
                            {orders.address
                              ? orders.address
                              : "not addeed till now"}{" "}
                            {orders.district ? orders.district : ""}{" "}
                            {orders.zipcode ? orders.zipcode : ""}{" "}
                            {orders.state ? orders.state : ""}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Payment</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText
                            style={{ fontWeight: "bold" }}
                            className="text-muted"
                          >
                            {orders.paymentmethod ? orders.paymentmethod : ""}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Subtotal</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {orders.amount ? Math.floor(orders.amount) : ""}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                  <hr />
                  <MDBTable align="middle">
                    <MDBTableHead>
                      <tr>
                        <th scope="col">Product Name</th>
                        {/* <th scope="col">Category</th> */}
                        <th scope="col">Status</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                   
                      {orders.order &&
                        orders.order.map((e) => (
                        
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src={`${baseUrl}/${e.images[0]}`}
                                  alt=""
                                  style={{ width: "45px", height: "45px" }}
                                  className="rounded-circle"
                                />
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">{e.name}</p>
                                
                                </div>
                              </div>
                            </td>
                            {/* <td>
                              <p className="fw-normal mb-1">{e.category}</p>
                             
                            </td> */}
                            <td>
                              {orders.status == "NEW" ? (
                                <MDBBadge color="success" pill>
                                  {orders.status}
                                </MDBBadge>
                              ) : (
                                <MDBBadge color="warning" pill>
                                  {Orders.status}
                                </MDBBadge>
                              )}
                            </td>
                            <td>{e.quantity}</td>
                            <td>{e.quantity * e.price}</td>
                          </tr>
                        ))}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
