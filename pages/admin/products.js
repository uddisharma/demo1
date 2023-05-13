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
import { toast, ToastContainer } from "react-nextjs-toast";
import AdminSidebar from "../../src/components/AdminSidebar";
export default function Orders() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [products, setProducts] = useState([]);
  const [laoding, setLoading] = useState(false);
  const Orders = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        setProducts(res.data.products);
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
  // console.log(products);
  const deleteproduct = (id) => {
    axios
      .delete(`${baseUrl}/product/delete/${id}`)
      .then((res) => {
        console.log(res);
        Orders();
        toast.notify("Product is deleted successfully", {
          duration: 2,
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.notify("Something went wrong", {
          duration: 2,
          type: "error",
        });
      });
  };
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <ToastContainer />
        <div className="section-title text-center pt-20 mb-10">
          <h2>Products </h2>
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
                      display: "flex",
                      justifyContent: "end",
                      gap: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <Link href="/admin/addproduct">
                      <button
                        style={{ backgroundColor: "#ff7800" }}
                        type="submit"
                        className="theme-btn style-two"
                      >
                        Add Product
                        <i
                          style={{ marginRight: "7px" }}
                          className="fas fa-angle-double-right"
                        />
                      </button>
                    </Link>
                  </div>
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
                        <th scope="col">Image</th>
                        <th scope="col">Product</th>
                        {/* <th scope="col">Category</th> */}
                        <th scope="col">Price</th>
                        <th scope="col">Discount</th>
                        <th style={{ textAlign: "center" }} scope="col">
                          Actions
                        </th>
                        {/* <th scope="col">View</th> */}
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {products &&
                        products.map((e) => (
                          <tr>
                            <td>
                              <img
                                src={`${baseUrl}/${e.images[0]}`}
                                alt=""
                                style={{ width: "45px", height: "45px" }}
                                className="rounded-circle"
                              />
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">{e.name}</p>
                                </div>
                              </div>
                            </td>
                            {/* <td>
                              <p className="fw-normal mb-1">
                                {e.category ? e.category : ""}
                              </p>
                            </td> */}
                            <td>₹{e.price ? e.price : ""}</td>
                            <td>{e.discount}%</td>
                            <td style={{ width: "150px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                  gap: "10px",
                                }}
                              >
                                <img
                                  onClick={() => {
                                    deleteproduct(e._id);
                                  }}
                                  src="/assets/images/admin/trash.png"
                                  alt=""
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer",
                                  }}
                                  className="rounded-circle"
                                />
                                <Link href={`/admin/productedit/${e._id}`}>
                                  <img
                                    src="/assets/images/admin/pencil.png"
                                    alt=""
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      cursor: "pointer",
                                    }}
                                    className="rounded-circle"
                                  />
                                </Link>
                                <Link href={`/admin/product/${e._id}`}>
                                  <img
                                    src="/assets/images/admin/show.png"
                                    alt=""
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      cursor: "pointer",
                                    }}
                                    className="rounded-circle"
                                  />
                                </Link>
                              </div>
                            </td>
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
