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
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import Link from "next/link";
import { baseUrl } from "../../api/hello";
import AdminSidebar from "../../../src/components/AdminSidebar";
import { toast, ToastContainer } from "react-nextjs-toast";
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [loading,setLoading] = useState(false);
  const videos = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/blogs`)
      .then((res) => {
        setData(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setInitialRenderComplete(true);
    videos();
  }, []);
  // console.log(data);
  const deleteblog = (id) => {
    axios
      .delete(`${baseUrl}/delete-blog/${id}`)
      .then((res) => {
        console.log(res);
        videos();
        toast.notify("Blog is deleted successfully", {
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
        <div className="section-title text-center pt-20 mb-10">
          <h2>Blogs </h2>
        </div>
        <MDBContainer className="py-30">
          <MDBRow>
            <MDBCol lg="2">
              <AdminSidebar />
            </MDBCol>
            <MDBCol style={{}} lg="10">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <ToastContainer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      gap: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    <Link href="/admin/addblog">
                      <button
                        style={{ backgroundColor: "#ff7800" }}
                        className="theme-btn style-two"
                      >
                        Add Blog
                        <i
                          style={{ marginRight: "7px" }}
                          className="fas fa-angle-double-right"
                        />
                      </button>
                    </Link>
                  </div>
                  <MDBTable align="middle">
                    <MDBTableHead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col"> Blog</th>
                        <th style={{ textAlign: "center" }} scope="col">
                          actions
                        </th>
                        {/* <th scope="col">View</th> */}
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
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
                      {data
                        ? data.map((e) => (
                            <tr>
                              <td>
                                <img
                                  style={{ height: "50px", width: "50px" }}
                                  src={`${baseUrl}/${e.images[0]}`}
                                  alt="News"
                                />
                              </td>
                              <td>{e.heading ? e.heading : ""}</td>

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
                                      deleteblog(e._id);
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
                                  <Link href={`/admin/blogedit/${e._id}`}>
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
                          ))
                        : ""}
                    </MDBTableBody>
                  </MDBTable>
                  {data.length <= 0 && <p>there is no blogs</p>}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
