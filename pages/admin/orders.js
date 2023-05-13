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
  MDBTypography,
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { baseUrl } from "../api/hello";
import Layout from "../../src/layout/Layout";
import axios from "axios";
import Link from "next/link";
import Moment from "react-moment";
import AdminSidebar from "../../src/components/AdminSidebar";
export default function Orders() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  let [orders, setOrders] = useState([]);
  const [laoding, setLoading] = useState(false);
  const Orders = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/orders`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInitialRenderComplete(true);

    Orders();
  }, []);
  orders = orders.sort(function (a, b) {
    return new Date(b.OrderDate) - new Date(a.OrderDate);
  });
  console.log(orders);
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Recent Orders </h2>
        </div>
        <MDBContainer className="py-30">
          <MDBRow>
            <MDBCol lg="2">
              <AdminSidebar />
            </MDBCol>
            <MDBCol style={{}} lg="10">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  {laoding && (
                    <div
                      style={{
                        display: "grid",
                        placeItems: "center",
                        
                      }}
                    >
                      <img src="https://i.pinimg.com/originals/45/12/4d/45124d126d0f0b6d8f5c4d635d466246.gif" />
                    </div>
                  )}
                  <MDBTable align="middle">
                    <MDBTableHead>
                      <tr>
                      <th scope="col">Date</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total</th>
                        <th scope="col">View</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {orders &&
                        orders.map((e) => (
                          <tr>
                             <td>
                              <div className="d-flex align-items-center">
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">  <Moment format="MMMM Do YYYY">
                                      {e.OrderDate}
                                    </Moment></p>
                                </div>
                              </div>
                            </td>
                           
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">{e.name}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">
                                {e.address ? e.address : ""}{" "}
                                {e.district ? e.district : ""}{" "}
                                {e.zipcode ? e.zipcode : ""}{" "}
                                {e.state ? e.state : ""}
                              </p>
                            </td>
                            <td>
                              {e.status == "NEW" ? (
                                <MDBBadge color="success" pill>
                                  {e.status}
                                </MDBBadge>
                              ) : (
                                <MDBBadge color="warning" pill>
                                  {e.status}
                                </MDBBadge>
                              )}
                            </td>
                            <td>{e.order.length}</td>
                            <td>{e.amount}</td>
                            <Link href={`/admin/order/${e._id}`}>
                              <td style={{ cursor: "pointer" }}>View</td>
                            </Link>
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
