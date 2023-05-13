import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { baseUrl } from "../api/hello";
import Layout from "../../src/layout/Layout";
import axios from "axios";
import Link from "next/link";
import AdminSidebar from "../../src/components/AdminSidebar";
export default function Dashboard() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const AllProducts = () => {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Orders = () => {
    axios
      .get(`${baseUrl}/orders`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Users = () => {
    axios
      .get(`${baseUrl}/users`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setInitialRenderComplete(true);
    Users();
    AllProducts();
    Orders();
  }, []);

  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Welcome back Admin </h2>
        </div>
        <MDBContainer className="py-30">
          <MDBRow>
            <MDBCol lg="2">
              <AdminSidebar />
            </MDBCol>
            <MDBCol style={{}} lg="10">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2,1fr)",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      placeItems: "center",
                    }}
                  >
                    <Link href="/admin/orders">
                      <div
                        style={{ cursor: "pointer" }}
                        className="col-xl-8 col-md-6"
                      >
                        <div
                          style={{ backgroundColor: "#fdf4d7" }}
                          className="about-feature-item wow fadeInUp delay-0-5s"
                        >
                          <span className="number">
                            {orders ? orders.length : ""}
                          </span>
                          <div className="icon">
                            <img
                              style={{
                                height: "90px",
                                display: "block",
                                margin: "auto",
                              }}
                              src="/assets/images/admin/delivered.png"
                              alt="not found"
                            />
                          </div>
                          <h4 style={{ textAlign: "center" }}>Orders</h4>
                          <p style={{ color: "black", textAlign: "center" }}>
                            {/* On order above ₹ 699 */}
                          </p>
                          <img
                            style={{ display: "block", margin: "auto" }}
                            src="/assets/images/about/arrow.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </Link>
                    <Link href="/admin/products">
                      <div
                        style={{ cursor: "pointer" }}
                        className="col-xl-8 col-md-6"
                      >
                        <div
                          style={{ backgroundColor: "#fdf4d7" }}
                          className="about-feature-item wow fadeInUp delay-0-5s"
                        >
                          <span className="number">
                            {products ? products.length : ""}
                          </span>
                          <div className="icon">
                            <img
                              style={{
                                height: "90px",
                                display: "block",
                                margin: "auto",
                              }}
                              src="/assets/images/admin/products.png"
                            />
                          </div>
                          <h4 style={{ textAlign: "center" }}>Products</h4>
                          <p style={{ color: "black", textAlign: "center" }}>
                            {/* On order above ₹ 699 */}
                          </p>
                          <img
                            style={{ display: "block", margin: "auto" }}
                            src="/assets/images/about/arrow.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </Link>
                    <Link href="/admin/payments">
                      <div
                        style={{ cursor: "pointer" }}
                        className="col-xl-8 col-md-6"
                      >
                        <div
                          style={{ backgroundColor: "#fdf4d7" }}
                          className="about-feature-item wow fadeInUp delay-0-5s"
                        >
                          <span className="number">
                            {orders ? orders.length : ""}
                          </span>
                          <div className="icon">
                            <img
                              style={{
                                height: "90px",
                                display: "block",
                                margin: "auto",
                              }}
                              src="/assets/images/admin/creditcard.png"
                            />
                          </div>
                          <h4 style={{ textAlign: "center" }}>Payments</h4>
                          <p style={{ color: "black", textAlign: "center" }}>
                            {/* On order above ₹ 699 */}
                          </p>
                          <img
                            style={{ display: "block", margin: "auto" }}
                            src="/assets/images/about/arrow.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </Link>
                    <Link href="/admin/users">
                      <div
                        style={{ cursor: "pointer" }}
                        className="col-xl-8 col-md-6"
                      >
                        <div
                          style={{ backgroundColor: "#fdf4d7" }}
                          className="about-feature-item wow fadeInUp delay-0-5s"
                        >
                          <span className="number">
                            {users ? users.length : ""}
                          </span>
                          <div className="icon">
                            <img
                              style={{
                                height: "90px",
                                display: "block",
                                margin: "auto",
                              }}
                              src="/assets/images/admin/man.png"
                            />
                          </div>
                          <h4 style={{ textAlign: "center" }}>Users</h4>
                          <p style={{ color: "black", textAlign: "center" }}>
                            {/* On order above ₹ 699 */}
                          </p>
                          <img
                            style={{ display: "block", margin: "auto" }}
                            src="/assets/images/about/arrow.png"
                            alt="Arrow"
                          />
                        </div>
                      </div>
                    </Link>
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
