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
      .get(`${baseUrl}/users`)
      .then((res) => {
        setProducts(res.data.users);
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
  const deleteuser=(id)=>{
    axios.delete(`${baseUrl}/user/delete${id}`)
    .then((res)=>{
      console.log(res)
      Orders()
      toast.notify("User is deleted successfully", {
        duration: 2,
        type: "success",
      });
    })
    .catch((err)=>{
      console.log(err)
      toast.notify("Something went wrong", {
        duration: 2,
        type: "error",
      });
    })
  }
  // console.log(orders);
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
    <ToastContainer/>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Users </h2>
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
                        <th scope="col">Photo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Alternate Number</th>
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
                                {e.photo ? <img
                                src={e.photo}
                                alt=""
                                style={{ width: "45px", height: "45px" }}
                                className="rounded-circle"
                              />:
                              <img
                                src={'https://cdn.pixabay.com/photo/2014/04/03/11/56/avatar-312603__340.png'}
                                alt=""
                                style={{ width: "45px", height: "45px" }}
                                className="rounded-circle"
                              />}
                              
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">{e.name} {e.lastname?e.lastname:""}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">
                                {e.email ? e.email : ""}
                              </p>
                            </td>
                            <td>{e.phone ? e.phone : ""}</td>
                            <td>{e.alternatephone}</td>
                            <td style={{ width: "150px" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                  gap: "10px",
                                }}
                              >
                                <img
                                onClick={()=>{
                                    deleteuser(e._id)
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
                                <Link href={`/admin/useredit/${e._id}`}>
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
                                <Link href={`/admin/user/${e._id}`}>
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


