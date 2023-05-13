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
import axios from "axios";
import Link from "next/link";
import AdminSidebar from "../../../src/components/AdminSidebar";
import { toast, ToastContainer } from "react-nextjs-toast";
import { baseUrl } from "../../api/hello";
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const videos = () => {
    axios
      .get(`${baseUrl}/videos`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setInitialRenderComplete(true);
    videos();
  }, []);
  const deletevideo = (id) => {
    axios
      .delete(`${baseUrl}/deletevideo/${id}`)
      .then((res) => {
        console.log(res);
        videos();
        toast.notify("Video is deleted successfully", {
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
  const addvideo = () => {
    const video = document.getElementById("video").value;
    if (video == "") {
      alert("please add a video link");
    } else {
      axios
        .post(`${baseUrl}/addvideo`, {
          video: video,
        })
        .then((res) => {
          console.log(res);
          if(res.status==200){
            videos();
            toast.notify("Video is added successfully", {
                duration: 2,
                type: "success",
              });
          }else{
            toast.notify("Something went wrong", {
                duration: 2,
                type: "error",
              });
          }
          
        })
        .catch((err) => {
          console.log(err);
          toast.notify("Something went wrong", {
            duration: 2,
            type: "error",
          });
        });
    }
  };
  //   let id = data.length > 0 ? data[0]._id : null;
  if (!initialRenderComplete) {
    return null;
  } else {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        
        <div className="section-title text-center pt-20 mb-10">
          <h2>Videos </h2>
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
                    <div className="col-md-10">
                      <div className="form-group">
                        <input
                          type="text"
                          id="video"
                          name="discount"
                          className="form-control"
                          placeholder="Add New Video"
                          required=""
                          data-error="Please enter discount amount"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>

                    <button
                      style={{ backgroundColor: "#ff7800", height: "60px" }}
                      onClick={addvideo}
                      className="theme-btn style-two"
                    >
                      Add
                      <i
                        style={{ marginRight: "7px" }}
                        className="fas fa-angle-double-right"
                      />
                    </button>
                  </div>
                  {data.length > 0 &&
                    data.map((e) => (
                      <>
                        <div style={{ marginBottom: "30px" }}>
                          <iframe
                            width="100%"
                            height="415"
                            src={`https://www.youtube.com/embed/${e.video}`}
                          ></iframe>
                          <button
                            style={{ backgroundColor: "#ff7800" }}
                            onClick={() => {
                              deletevideo(e._id);
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
                      </>
                    ))}
                  {data.length <= 0 && <p>there is no Videos</p>}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }
}
