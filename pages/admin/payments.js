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
export default function Payments() {
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
  let sum = 0;
  useEffect(() => {
    setInitialRenderComplete(true);

    Orders();
  }, []);
  orders = orders.sort(function (a, b) {
    return new Date(b.OrderDate) - new Date(a.OrderDate);
  });
  //   console.log(orders);
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Recent Payments </h2>
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
                        <th scope="col"> Date</th>
                        <th scope="col">#Id</th>
                        <th scope="col">#Order</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">View</th> */}
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {orders &&
                        orders.map((e) => (
                          <tr>
                            <td style={{ display: "none" }}>
                              {(sum = sum + e.amount)}
                            </td>{" "}
                            <td style={{ display: "none" }}>
                              {e.status == "CANCELED"
                                ? (sum = sum - e.amount)
                                : (sum = sum)}
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">
                                    {" "}
                                    <Moment format="MMMM Do YYYY">
                                      {e.OrderDate}
                                    </Moment>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">
                                {e.paymentmethod == "COD"
                                  ? "Not Available"
                                  : e.paymentID}
                              </p>
                            </td>
                            <td>{e.orderID}</td>
                            <td>{e.amount}</td>
                            <td>{e.name}</td>
                            {/* <Link href={`/admin/order/${e._id}`}>
                              <td style={{ cursor: "pointer" }}>View</td>
                            </Link> */}
                          </tr>
                        ))}
                    </MDBTableBody>
                  </MDBTable>
                  <div className="section-title text-right pt-20 mb-10">
                    <h5>Total Revenue :{sum} </h5>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
