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
import { toast, ToastContainer } from "react-nextjs-toast";
import { baseUrl } from "../../api/hello";
import axios from "axios";
import Link from "next/link";
import AdminSidebar from "../../../src/components/AdminSidebar";
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [image, setImage] = useState([]);
  const photos = () => {
    axios
      .get(`${baseUrl}/galleryimages`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addimage = () => {
    const link = document.getElementById("link").value;
    let formData = new FormData();
    Array.from(image).forEach((item) => {
      formData.append("products", item);
    });
    formData.append("link", link);
    axios
      .post(`${baseUrl}/addphoto`, formData)
      .then((res) => {
        console.log(res);
        photos();
        toast.notify("Product is Added successfully", {
          duration: 2,
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInitialRenderComplete(true);
    // photos();
  }, []);
  useEffect(() => {
    photos();
  }, []);
  console.log(data);
  const deletephoto = (id) => {
    axios
      .delete(`${baseUrl}/deletephoto/${id}`)
      .then((res) => {
        console.log(res);
        photos();
        toast.notify("Product is Deleted successfully", {
          duration: 2,
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div className="section-title text-center pt-20 mb-10">
          <h2>Home Silders </h2>
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
                    <div className="col-md-5">
                      <div className="form-group">
                        <input
                          onChange={(e) => {
                            setImage(e.target.files);
                          }}
                          multiple
                          type="file"
                          className="form-control border-form-control"
                          name="images"
                        />
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="form-group">
                        <input
                          id="link"
                          type="text"
                          placeholder="Lined attached to image"
                          className="form-control border-form-control"
                          name="link"
                        />
                      </div>
                    </div>
                    <button
                      style={{ backgroundColor: "#ff7800", height: "60px" }}
                      onClick={addimage}
                      className="theme-btn style-two"
                    >
                      Add Photo
                      <i
                        style={{ marginRight: "7px" }}
                        className="fas fa-angle-double-right"
                      />
                    </button>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2,1fr)",
                      gap: "20px",

                      margin: "auto",
                    }}
                  >
                    {data.length > 0 &&
                      data.map((e, i) => (
                        <div style={{ marginBottom: "70px" }}>
                          <img
                            style={{
                              marginBottom: "30px",
                              height: "300px",
                              width: "300px",
                              display: "block",
                              margin: "auto",
                            }}
                            src={`${baseUrl}/${e.photo[0]}`}
                            alt="not found"
                          />
                          <div
                            style={{ marginTop: "10px", textAlign: "center" }}
                          >
                            <a target="_blank" href={e.link}>{e.link}</a>
                          </div>
                          {/* <p style={{marginTop:'10px', textAlign:'center'}}>{e.link}</p> */}
                          <button
                            style={{
                              backgroundColor: "#ff7800",
                              display: "block",
                              margin: "auto",
                              marginTop: "20px",
                            }}
                            onClick={() => {
                              deletephoto(e._id);
                            }}
                            className="theme-btn style-two"
                          >
                            Delete
                            <i
                              style={{ marginRight: "7px" }}
                              className="fas fa-angle-double-right"
                            />
                          </button>
                        </div>
                      ))}
                  </div>
                  {data.length <= 0 && <p>there is no sliders</p>}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
