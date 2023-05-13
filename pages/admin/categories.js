import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import Link from "next/link";
import { baseUrl } from "../api/hello";
import { toast, ToastContainer } from "react-nextjs-toast";
import AdminSidebar from "../../src/components/AdminSidebar";
export default function Orders() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [products, setProducts] = useState([]);
  const [laoding, setLoading] = useState(false);
  const Orders = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/categories`)
      .then((res) => {
        setProducts(res.data.categories);
        // console.log(res.data.categories);
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
      .delete(`${baseUrl}/deletecategory/${id}`)
      .then((res) => {
        console.log(res);
        Orders();
        toast.notify("Category is deleted successfully", {
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
          <h2>Categories </h2>
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
                    <Link href="/admin/addcategory">
                      <button
                        style={{ backgroundColor: "#ff7800" }}
                        type="submit"
                        className="theme-btn style-two"
                      >
                        Add Category
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
                        <th scope="col">Category</th>
                        <th scope="col">SubCategory</th>

                        <th style={{ textAlign: "center" }} scope="col">
                          Actions
                        </th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {products &&
                        products.map((e) => (
                          <tr>
                            <td>
                              <img
                                style={{ height: "50px", width: "50px" }}
                                src={`${baseUrl}/${e.photo ? e.photo[0] : ""}`}
                              />
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">
                                    {e.category ? e.category : ""}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">
                                {e.subCategory.length == 0
                                  ? "No Subcategory"
                                  : e.subCategory.length}
                              </p>
                            </td>

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
                                <Link href={`/admin/categoryedit/${e._id}`}>
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
                              </div>
                            </td>
                          </tr>
                        ))}
                    </MDBTableBody>
                  </MDBTable>
                  <div style={{ width: "100%" }}>
                    {products.length <= 0 && (
                      <div
                        style={{
                          width: "100%",
                          textAlign: "center",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <h2>There is no coupons</h2>
                        <div>
                          <img
                            style={{
                              width: "150px",
                              height: "150px",
                              marginTop: "20px",
                            }}
                            src="/assets/images/coupon.png"
                            alt="Authro"
                          />
                        </div>
                      </div>
                    )}
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
